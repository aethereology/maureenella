-- Apply once to the project's Supabase database before enabling the new forms.
-- No browser role may read PII, write leads, mint jobs, or consume rate buckets.
begin;
create table if not exists public.website_submissions (
  id uuid primary key default gen_random_uuid(),
  idempotency_key text not null unique check (idempotency_key ~ '^[a-f0-9]{64}$'),
  kind text not null check (kind in ('inquiry', 'waitlist')),
  payload jsonb not null check (jsonb_typeof(payload) = 'object' and octet_length(payload::text) <= 32768),
  created_at timestamptz not null default now()
);
create table if not exists public.website_subscribers (
  email text not null check (email = lower(email) and length(email) <= 254),
  list text not null check (list in ('education-waitlist', 'education-starter-checklist')),
  first_name text not null default '',
  status text not null default 'subscribed' check (status in ('subscribed', 'unsubscribed')),
  consent_text text not null,
  consent_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (email, list)
);
create table if not exists public.website_delivery_jobs (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.website_submissions(id) on delete cascade,
  channel text not null check (channel in ('owner','crm','autoresponder','welcome')),
  body jsonb not null check (jsonb_typeof(body) = 'object' and octet_length(body::text) <= 262144),
  status text not null default 'pending' check (status in ('pending','processing','delivered','needs_review','cancelled')),
  attempts integer not null default 0 check (attempts >= 0),
  available_at timestamptz not null default now(),
  lease_until timestamptz,
  lease_token uuid,
  created_at timestamptz not null default now(),
  delivered_at timestamptz,
  last_error text,
  unique (submission_id, channel)
);
create index if not exists website_jobs_due on public.website_delivery_jobs(status, available_at);
create table if not exists public.website_rate_windows (
  key text primary key,
  hits integer not null,
  expires_at timestamptz not null
);
create index if not exists website_rate_expiry on public.website_rate_windows(expires_at);
alter table public.website_submissions enable row level security;
alter table public.website_subscribers enable row level security;
alter table public.website_delivery_jobs enable row level security;
alter table public.website_rate_windows enable row level security;
revoke all on public.website_submissions, public.website_subscribers, public.website_delivery_jobs, public.website_rate_windows from public, anon, authenticated;
grant all on public.website_submissions, public.website_subscribers, public.website_delivery_jobs, public.website_rate_windows to service_role;

create or replace function public.website_rate_limit(p_key text, p_limit integer, p_window integer)
returns boolean language plpgsql security definer set search_path = '' as $$
declare n integer;
begin
  if length(p_key) <> 64 or p_key !~ '^[a-f0-9]{64}$' or p_limit < 1 or p_limit > 10000 or p_window < 1 or p_window > 86400 then raise exception 'invalid rate arguments'; end if;
  insert into public.website_rate_windows as r(key,hits,expires_at) values(p_key,1,now()+make_interval(secs=>p_window))
  on conflict(key) do update set hits = case when r.expires_at <= now() then 1 else least(r.hits+1,p_limit+1) end,
  expires_at = case when r.expires_at <= now() then now()+make_interval(secs=>p_window) else r.expires_at end
  returning hits into n;
  return n <= p_limit;
end;
$$;
create or replace function public.website_accept_submission(p_key text, p_kind text, p_payload jsonb, p_jobs jsonb)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare sid uuid; job jsonb;
begin
  if p_kind not in ('inquiry','waitlist') or jsonb_typeof(p_payload) <> 'object' or jsonb_typeof(p_jobs) <> 'array' or jsonb_array_length(p_jobs) > 4 then raise exception 'invalid submission'; end if;
  if p_kind = 'waitlist' and (coalesce(p_payload->>'consentContact','') <> 'on' or coalesce(p_payload->>'consentText','') = '') then raise exception 'consent required'; end if;
  insert into public.website_submissions(idempotency_key,kind,payload) values(p_key,p_kind,p_payload)
  on conflict(idempotency_key) do nothing returning id into sid;
  if sid is null then
    select id into sid from public.website_submissions where idempotency_key = p_key;
    return jsonb_build_object('id',sid,'duplicate',true);
  end if;
  if p_kind = 'waitlist' then
    insert into public.website_subscribers(email,list,first_name,status,consent_text)
    values(lower(p_payload->>'email'),p_payload->>'list',coalesce(p_payload->>'name',''),'subscribed',p_payload->>'consentText')
    on conflict(email,list) do update set first_name=excluded.first_name,status='subscribed',consent_text=excluded.consent_text,consent_at=now(),updated_at=now();
  end if;
  for job in select * from jsonb_array_elements(p_jobs) loop
    insert into public.website_delivery_jobs(submission_id,channel,body) values(sid,job->>'channel',job->'body');
  end loop;
  return jsonb_build_object('id',sid,'duplicate',false);
end;
$$;
create or replace function public.website_claim_jobs(p_submission uuid default null, p_limit integer default 4)
returns setof public.website_delivery_jobs language plpgsql security definer set search_path = '' as $$
begin
  -- Keep ambiguous old deliveries for review instead of replaying outside the
  -- provider's 24-hour idempotency window.
  update public.website_delivery_jobs set status='needs_review',last_error='RETRY_WINDOW_EXPIRED'
  where status in ('pending','processing') and (created_at < now()-interval '22 hours' or attempts >= 8)
    and (lease_until is null or lease_until < now());
  delete from public.website_rate_windows where expires_at < now()-interval '1 hour';
  return query
    with due as (
      select j.id from public.website_delivery_jobs j
      where (p_submission is null or j.submission_id=p_submission)
        and ((j.status='pending' and j.available_at<=now()) or (j.status='processing' and j.lease_until<now()))
        and j.created_at >= now()-interval '22 hours' and j.attempts < 8
      order by j.created_at for update skip locked limit greatest(1,least(p_limit,10))
    )
    update public.website_delivery_jobs j set status='processing',attempts=j.attempts+1,lease_until=now()+interval '5 minutes',lease_token=gen_random_uuid()
    from due where j.id=due.id returning j.*;
end;
$$;
create or replace function public.website_finish_job(p_id uuid, p_lease uuid, p_success boolean, p_error text default null)
returns boolean language plpgsql security definer set search_path = '' as $$
declare n integer;
begin
  update public.website_delivery_jobs set
    status=case when p_success then 'delivered' when attempts>=8 or created_at<now()-interval '22 hours' then 'needs_review' else 'pending' end,
    delivered_at=case when p_success then now() else null end,
    available_at=now()+make_interval(secs=>least(3600,(30*power(2,attempts))::integer)),
    last_error=case when p_success then null else left(coalesce(p_error,'DELIVERY_FAILED'),80) end,
    lease_until=null,lease_token=null
  where id=p_id and lease_token=p_lease and status='processing';
  get diagnostics n = row_count;
  return n=1;
end;
$$;
create or replace function public.website_unsubscribe(p_email text)
returns boolean language plpgsql security definer set search_path = '' as $$
begin
  update public.website_subscribers set status='unsubscribed',updated_at=now() where email=lower(p_email);
  update public.website_delivery_jobs j set status='cancelled',lease_token=null,lease_until=null
  from public.website_submissions s where s.id=j.submission_id and s.kind='waitlist' and lower(s.payload->>'email')=lower(p_email)
  and j.channel='welcome' and j.status in ('pending','processing');
  return true;
end;
$$;
create or replace function public.website_delivery_health()
returns jsonb language sql security definer set search_path = '' as $$
  select jsonb_build_object(
    'pending',(select count(*) from public.website_delivery_jobs where status in ('pending','processing')),
    'needsReview',(select count(*) from public.website_delivery_jobs where status='needs_review'),
    'oldestPendingSeconds',(select coalesce(extract(epoch from now()-min(created_at))::integer,0) from public.website_delivery_jobs where status in ('pending','processing'))
  );
$$;
revoke all on function public.website_rate_limit(text,integer,integer), public.website_accept_submission(text,text,jsonb,jsonb), public.website_claim_jobs(uuid,integer), public.website_finish_job(uuid,uuid,boolean,text), public.website_unsubscribe(text), public.website_delivery_health() from public, anon, authenticated;
grant execute on function public.website_rate_limit(text,integer,integer), public.website_accept_submission(text,text,jsonb,jsonb), public.website_claim_jobs(uuid,integer), public.website_finish_job(uuid,uuid,boolean,text), public.website_unsubscribe(text), public.website_delivery_health() to service_role;
commit;
