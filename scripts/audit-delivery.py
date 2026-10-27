from pathlib import Path
root=Path.cwd()
def write(path,text):
 p=root/path;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(text.lstrip('\n'))
write('supabase/migrations/202610270001_website_leads.sql',r'''
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
''')
write('lib/subscriber-token.ts',r'''
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
function key(secret: string): Buffer {
  if (secret.length < 32) throw new Error("SUBSCRIBER_TOKEN_SECRET must be at least 32 characters");
  return createHash("sha256").update(secret).digest();
}
/** An opaque authenticated token: no email address appears in its URL. */
export function createSubscriberToken(email: string, secret: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm",key(secret),iv);
  cipher.setAAD(Buffer.from("unsubscribe-v1"));
  const encrypted = Buffer.concat([cipher.update(email.toLowerCase(),"utf8"),cipher.final()]);
  return Buffer.concat([iv,cipher.getAuthTag(),encrypted]).toString("base64url");
}
export function readSubscriberToken(token: string, secret: string): string | null {
  try {
    if (!/^[A-Za-z0-9_-]{40,512}$/.test(token)) return null;
    const bytes=Buffer.from(token,"base64url");
    const decipher=createDecipheriv("aes-256-gcm",key(secret),bytes.subarray(0,12));
    decipher.setAAD(Buffer.from("unsubscribe-v1"));
    decipher.setAuthTag(bytes.subarray(12,28));
    const email=Buffer.concat([decipher.update(bytes.subarray(28)),decipher.final()]).toString("utf8");
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length<=254 ? email : null;
  } catch { return null; }
}
''')
write('lib/server/abuse.ts',r'''
import "server-only";
import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import { headers } from "next/headers";
import { site } from "@/lib/site";
import { databaseRpc } from "./database";
import { required } from "./config";
export function privateDigest(scope: string, value: string): string {
  return createHmac("sha256",required("ABUSE_HASH_SECRET",32)).update(`${scope}:${value}`).digest("hex");
}
export async function trustedClientIp(): Promise<string> {
  const h=await headers();
  // Vercel overwrites x-forwarded-for; other proxies require explicit trust.
  const trusted=process.env.VERCEL === "1" || process.env.TRUST_PROXY_HEADERS === "true";
  if (!trusted) return "unknown";
  const ip=(h.get("x-forwarded-for") || "").split(",")[0].trim();
  return isIP(ip) ? ip : "unknown";
}
export async function enforceLimit(scope: string, value: string, limit: number, seconds: number): Promise<void> {
  const allowed=await databaseRpc<boolean>("website_rate_limit",{p_key:privateDigest(scope,value),p_limit:limit,p_window:seconds});
  if (!allowed) throw new Error("RATE_LIMITED");
}
export async function verifyHuman(form: FormData): Promise<void> {
  const secret=process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    if (process.env.NODE_ENV === "production") throw new Error("CONFIG_TURNSTILE_SECRET_KEY");
    return;
  }
  const token=form.get("cf-turnstile-response");
  if (typeof token !== "string" || !token || token.length>2048) throw new Error("BOT_CHALLENGE_REQUIRED");
  const response=await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{
    method:"POST",cache:"no-store",redirect:"error",signal:AbortSignal.timeout(8000),
    headers:{"Content-Type":"application/json"},body:JSON.stringify({secret,response:token}),
  });
  if (!response.ok) throw new Error("BOT_CHALLENGE_UNAVAILABLE");
  const result=await response.json() as {success?:boolean;hostname?:string;action?:string};
  const allowed=(process.env.TURNSTILE_ALLOWED_HOSTNAMES || new URL(site.baseUrl).hostname).split(",").map((v)=>v.trim()).filter(Boolean);
  if (!result.success || result.action !== "lead_capture" || !result.hostname || !allowed.includes(result.hostname)) throw new Error("BOT_CHALLENGE_REQUIRED");
}
export function publicFailure(error: unknown): string {
  const code=error instanceof Error ? error.message : "UNKNOWN";
  if (code === "RATE_LIMITED") return "Too many attempts. Please wait a few minutes before trying again, or contact us directly.";
  if (code.startsWith("BOT_CHALLENGE")) return "Please complete the security check again and retry. Your entered details are still here.";
  return "We couldn't save your details. Please try again or contact us directly. Your entered details are still here.";
}
''')
write('lib/server/notifications.tsx',r'''
import "server-only";
import { render } from "@react-email/render";
import { InquiryAutoresponder } from "@/emails/InquiryAutoresponder";
import { site } from "@/lib/site";
import { createPricingToken, pricingPath } from "@/lib/pricing-link";
import { INQUIRY_FIELDS, type InquiryValues, type WaitlistValues } from "@/lib/inquiry-validation";
import { getPricingCatalog } from "@/content/pricing";
import { createSubscriberToken } from "@/lib/subscriber-token";
import { deliveryChannels, required, sender } from "./config";
export type DeliveryJobInput = { channel: string; body: Record<string, unknown> };
/** Snapshot complete provider bodies once, including signed links. */
export async function inquiryNotifications(values: InquiryValues): Promise<DeliveryJobInput[]> {
  const channels=deliveryChannels("inquiry");
  let pricingUrl: string | undefined;
  try {
    getPricingCatalog();
    pricingUrl=new URL(pricingPath(createPricingToken({firstName:values.firstName})),site.baseUrl).toString();
  } catch { console.warn("PRICING_LINK_UNAVAILABLE"); }
  const summary=INQUIRY_FIELDS.filter((f)=>values[f.name]).map((f)=>`${f.label}: ${values[f.name]}`).join("\n");
  const jobs: DeliveryJobInput[]=[];
  if (channels.includes("owner")) jobs.push({channel:"owner",body:{
    from:sender(),to:[required("FORM_TO_EMAIL")],reply_to:values.email,
    subject:`New wedding inquiry — ${values.firstName} ${values.lastName} (${values.weddingDate})`,
    text:`${summary}\n\nPricing link: ${pricingUrl || "Unavailable; follow up manually."}`,
  }});
  if (channels.includes("crm")) jobs.push({channel:"crm",body:{source:site.domain,kind:"inquiry",fields:values}});
  if (channels.includes("autoresponder")) {
    const element=<InquiryAutoresponder firstName={values.firstName} cityState={values.cityState} weddingDate={values.weddingDate} interestedIn={values.interestedIn} pricingUrl={pricingUrl} calendlyUrl={site.booking.calendly.value} />;
    const [html,text]=await Promise.all([render(element),render(element,{plainText:true})]);
    jobs.push({channel:"autoresponder",body:{from:sender(),to:[values.email],reply_to:site.contact.email.value,subject:pricingUrl ? `Your bridal pricing guide — ${site.brand}` : `Your inquiry — ${site.brand}`,html,text}});
  }
  return jobs;
}
export async function waitlistNotifications(values: WaitlistValues): Promise<DeliveryJobInput[]> {
  const channels=deliveryChannels("waitlist");
  const jobs: DeliveryJobInput[]=[];
  if (channels.includes("owner")) jobs.push({channel:"owner",body:{from:sender(),to:[required("FORM_TO_EMAIL")],subject:`New signup — ${values.list}`,text:`List: ${values.list}\nName: ${values.name}\nEmail: ${values.email}`}});
  if (channels.includes("welcome")) {
    const token=createSubscriberToken(values.email,required("SUBSCRIBER_TOKEN_SECRET",32));
    const unsubscribe=new URL(`/unsubscribe/${token}`,site.baseUrl).toString();
    jobs.push({channel:"welcome",body:{from:sender(),to:[values.email],reply_to:site.contact.email.value,subject:`Welcome to ${site.brand} Education`,text:[
      values.name ? `Hi ${values.name},` : "Hi there,", "", "Thanks for joining Maureen Ella Education.",
      "Your Bridal Beauty Business Starter Checklist is here:",`${site.baseUrl}/education/starter-checklist`,"",
      "We'll share occasional bridal-business resources and updates. Reply with a topic you would find helpful.","","Warmly,","Maureen","",`Unsubscribe from education emails: ${unsubscribe}`,
    ].join("\n")}});
  }
  return jobs;
}
''')
write('lib/server/outbox.ts',r'''
import "server-only";
import { databaseRpc } from "./database";
import { required, httpsUrl } from "./config";
type Job={id:string;submission_id:string;channel:string;body:Record<string,unknown>;lease_token:string};
export async function drainOutbox(submissionId: string | null = null): Promise<{processed:number;failed:number}> {
  const jobs=await databaseRpc<Job[]>("website_claim_jobs",{p_submission:submissionId,p_limit:4});
  const results=await Promise.all(jobs.map(async(job)=>{
    let successful=false;
    let code="DELIVERY_FAILED";
    try {
      const crm=job.channel === "crm";
      const url=crm ? httpsUrl(required("CRM_WEBHOOK_URL")) : new URL("https://api.resend.com/emails");
      const headers: Record<string,string>={"Content-Type":"application/json","Idempotency-Key":`website/${job.id}`};
      if (!crm) headers.Authorization=`Bearer ${required("RESEND_API_KEY")}`;
      else headers["X-Submission-Id"]=job.submission_id;
      const response=await fetch(url,{method:"POST",headers,body:JSON.stringify(job.body),cache:"no-store",redirect:"error",signal:AbortSignal.timeout(8000)});
      if (!response.ok) throw new Error(`DELIVERY_HTTP_${response.status}`);
      successful=true;
    } catch(error) {
      const message=error instanceof Error ? error.message : "";
      code=/^(DELIVERY_HTTP_\d{3}|CONFIG_[A-Z_]+)$/.test(message) ? message : "DELIVERY_NETWORK_ERROR";
      console.warn("OUTBOX_DELIVERY_FAILED",{jobId:job.id,code});
    }
    const recorded=await databaseRpc<boolean>("website_finish_job",{p_id:job.id,p_lease:job.lease_token,p_success:successful,p_error:successful ? null : code});
    return successful && recorded;
  }));
  return {processed:jobs.length,failed:results.filter((r)=>!r).length};
}
''')
write('lib/server/submit.ts',r'''
import "server-only";
import { after } from "next/server";
import { textField } from "@/lib/inquiry-validation";
import { enforceLimit, trustedClientIp, verifyHuman, privateDigest } from "./abuse";
import { databaseRpc } from "./database";
import { drainOutbox } from "./outbox";
import type { DeliveryJobInput } from "./notifications";
/** Both inquiry and waitlist use this single durable acceptance boundary. */
export async function saveLead(kind: "inquiry" | "waitlist", values: Record<string,string>, form: FormData, notifications: ()=>Promise<DeliveryJobInput[]>): Promise<string> {
  await enforceLimit(`${kind}:ip`,await trustedClientIp(),10,600);
  await verifyHuman(form);
  await enforceLimit(`${kind}:recipient`,values.email.toLowerCase(),5,3600);
  const supplied=textField(form,"submissionId");
  const nonce=/^[0-9a-f-]{36}$/i.test(supplied) ? supplied : new Date().toISOString().slice(0,10);
  const idempotencyKey=privateDigest(`submission:${kind}`,JSON.stringify({nonce,values}));
  const jobs=await notifications();
  const saved=await databaseRpc<{id:string;duplicate:boolean}>("website_accept_submission",{
    p_key:idempotencyKey,p_kind:kind,p_payload:{...values,receivedAt:new Date().toISOString()},p_jobs:jobs,
  });
  if (!saved.id) throw new Error("DATABASE_INVALID_RECEIPT");
  // Scheduled processing resumes durable jobs if this acceleration fails.
  after(async()=>{try{await drainOutbox(saved.id);}catch{console.warn("OUTBOX_WORKER_DEFERRED");}});
  return saved.id;
}
''')
write('app/actions/inquiry.ts',r'''
"use server";
import { validateInquiry, textField, CONTACT_CONSENT } from "@/lib/inquiry-validation";
import type { InquiryState } from "@/lib/form-state";
import { saveLead } from "@/lib/server/submit";
import { inquiryNotifications } from "@/lib/server/notifications";
import { publicFailure } from "@/lib/server/abuse";
import { SUCCESS_MESSAGE_NO_AUTORESPONDER } from "@/lib/inquiry-messages";
export type { InquiryState } from "@/lib/form-state";
export async function submitInquiry(previous: InquiryState, form: FormData): Promise<InquiryState> {
  const attempt=(previous.attempt || 0)+1;
  if (textField(form,"company")) return {status:"success",accepted:false,message:SUCCESS_MESSAGE_NO_AUTORESPONDER,attempt};
  const {values,errors}=validateInquiry(form);
  if (Object.keys(errors).length) return {status:"error",values,errors,message:"Please fix the highlighted fields and try again.",attempt};
  try {
    const submissionId=await saveLead("inquiry",{...values,consentText:CONTACT_CONSENT,consentVersion:"2026-10-27"},form,()=>inquiryNotifications(values));
    return {status:"success",accepted:true,submissionId,message:SUCCESS_MESSAGE_NO_AUTORESPONDER,attempt};
  } catch(error) {
    console.warn("INQUIRY_NOT_SAVED");
    return {status:"error",values,message:publicFailure(error),attempt};
  }
}
''')
write('app/actions/waitlist.ts',r'''
"use server";
import { validateWaitlist, textField, WAITLIST_CONSENT } from "@/lib/inquiry-validation";
import type { WaitlistState } from "@/lib/form-state";
import { saveLead } from "@/lib/server/submit";
import { waitlistNotifications } from "@/lib/server/notifications";
import { publicFailure } from "@/lib/server/abuse";
export type { WaitlistState } from "@/lib/form-state";
export async function joinWaitlist(previous: WaitlistState, form: FormData): Promise<WaitlistState> {
  const attempt=(previous.attempt || 0)+1;
  if (textField(form,"company")) return {status:"success",accepted:false,message:"Thank you for your interest.",attempt};
  const {values,errors}=validateWaitlist(form);
  if (Object.keys(errors).length) return {status:"error",values,errors,message:"Please check the highlighted fields.",attempt};
  try {
    const submissionId=await saveLead("waitlist",{...values,consentText:WAITLIST_CONSENT,consentVersion:"2026-10-27"},form,()=>waitlistNotifications(values));
    return {status:"success",accepted:true,submissionId,message:"Your signup has been saved. Thank you for joining the list.",attempt};
  } catch(error) {
    console.warn("WAITLIST_NOT_SAVED");
    return {status:"error",values,message:publicFailure(error),attempt};
  }
}
''')
write('app/api/jobs/deliver/route.ts',r'''
import { secretEqual } from "@/lib/owner-session";
import { drainOutbox } from "@/lib/server/outbox";
import { databaseRpc } from "@/lib/server/database";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export const maxDuration=60;
export async function POST(request: Request) {
  const secret=process.env.CRON_SECRET;
  if (!secret || secret.length<32 || !secretEqual(request.headers.get("authorization") || "",`Bearer ${secret}`)) return new Response("Unauthorized",{status:401});
  try {
    const result=await drainOutbox();
    const health=await databaseRpc<{pending:number;needsReview:number;oldestPendingSeconds:number}>("website_delivery_health",{});
    return Response.json({...result,...health},{status:health.needsReview || health.oldestPendingSeconds>3600 ? 503 : 200,headers:{"Cache-Control":"no-store"}});
  } catch { return Response.json({error:"Delivery worker unavailable"},{status:503}); }
}
''')
for name in ['lib/rate-limit.ts','lib/email.tsx']:
 (root/name).unlink(missing_ok=True)
