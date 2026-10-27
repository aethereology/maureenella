from pathlib import Path
import json,re
root=Path.cwd()
def write(path,text):
 p=root/path;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(text.lstrip('\n'))
write('scripts/check-production-config.mjs',r'''
import {parsePricingCatalog} from '../lib/pricing-catalog.ts';
const failures=[];
const required=['RESEND_API_KEY','FORM_TO_EMAIL','SUPABASE_SERVICE_ROLE_KEY','NEXT_PUBLIC_TURNSTILE_SITE_KEY','TURNSTILE_SECRET_KEY'];
const secrets=['ABUSE_HASH_SECRET','PRICING_LINK_SECRET','PRICING_OWNER_KEY','OWNER_SESSION_SECRET','SUBSCRIBER_TOKEN_SECRET','CRON_SECRET'];
for(const name of required)if(!process.env[name]?.trim())failures.push(`${name} is missing`);
for(const name of secrets)if((process.env[name]?.trim().length || 0)<32)failures.push(`${name} needs at least 32 random characters`);
for(const [name,value] of [['SUPABASE_URL',process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL],['NEXT_PUBLIC_SITE_URL',process.env.NEXT_PUBLIC_SITE_URL]]){
  try{const u=new URL(value);if(u.protocol!=='https:' || u.username || u.password || u.search || u.hash || u.pathname!=='/')throw new Error();}catch{failures.push(`${name} must be an HTTPS origin`);}
}
try{parsePricingCatalog(process.env.PRICING_CATALOG_JSON || '');}catch{failures.push('PRICING_CATALOG_JSON is missing or invalid');}
if(process.env.CRM_WEBHOOK_URL){try{const u=new URL(process.env.CRM_WEBHOOK_URL);if(u.protocol!=='https:' || u.username || u.password)throw new Error();}catch{failures.push('CRM_WEBHOOK_URL must use HTTPS without embedded credentials');}}
if(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && !/^G-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID))failures.push('NEXT_PUBLIC_GA_MEASUREMENT_ID is invalid');
for(const [name,value] of Object.entries(process.env))if(name.startsWith('NEXT_PUBLIC_') && /SECRET|SERVICE_ROLE|PASSWORD|PRIVATE|OWNER_KEY/.test(name) && value)failures.push(`Server secret is exposed through ${name}`);
if(failures.length){console.error('Production preflight FAILED:\n'+failures.map(x=>`- ${x}`).join('\n'));process.exitCode=1;}
else console.log('Configuration shape is valid. Complete migration, worker setup, and live delivery tests before release. No secret values were printed.');
''')
write('.env.example',r'''
# Implemented settings only. Never commit credentials or private prices.
NEXT_PUBLIC_SITE_URL=https://maureenella.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=
RESEND_API_KEY=
RESEND_FROM_EMAIL=inquiries@maureenella.com
FORM_TO_EMAIL=
EMAIL_ASSET_BASE_URL=
# Optional HTTPS CRM. Deduplicate X-Submission-Id/Idempotency-Key.
CRM_WEBHOOK_URL=
# Apply supabase/migrations/202610270001_website_leads.sql first.
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
# NEXT_PUBLIC_SUPABASE_URL is supported as a fallback. Never expose the role key.
# Generate EACH secret independently:
# node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
ABUSE_HASH_SECRET=
PRICING_LINK_SECRET=
PRICING_OWNER_KEY=
OWNER_SESSION_SECRET=
SUBSCRIBER_TOKEN_SECRET=
CRON_SECRET=
# Server-only JSON matching lib/pricing-catalog.ts. Set in hosting, not Git.
PRICING_CATALOG_JSON=
# Production fails closed when bot verification is missing.
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
TURNSTILE_ALLOWED_HOSTNAMES=maureenella.com,www.maureenella.com
# Vercel headers are automatically trusted. Else enable only behind a proxy
# that overwrites forwarding headers and prevents direct server access.
TRUST_PROXY_HEADERS=false
''')
write('app/(public)/privacy/page.tsx',r'''
import {pageMetadata} from "@/lib/seo/metadata";
import {PageHeader} from "@/components/ui/PageHeader";
import {Container} from "@/components/ui/Container";
import {site} from "@/lib/site";
export const metadata=pageMetadata({title:"Privacy Policy",description:"Information collected through the Maureen Ella website and your choices.",path:"/privacy"});
export default function PrivacyPage(){return <><PageHeader eyebrow="Privacy" title="Privacy Policy"/><Container size="narrow" className="py-12"><div className="space-y-5 text-cocoa/90">
  <p>Last updated: October 27, 2026.</p><p>This policy describes information submitted through the Maureen Ella website. Contact us at <a className="underline" href={`mailto:${site.contact.email.value}`}>{site.contact.email.value}</a> with questions or requests concerning your information.</p>
  <h2 className="pt-2 text-2xl">Information you provide</h2><p>Inquiries may include your name, contact details, wedding date, venue, service requests, and related preferences. Allergy or sensitivity information is optional; please share only details relevant to the service you request. Education signups include an email address, optional first name, signup source, and your consent choice.</p>
  <h2 className="pt-2 text-2xl">How information is used</h2><p>Inquiry information is used to respond to your request, prepare service options, and communicate about a possible booking. Education signup information is used to provide requested resources and the updates you agreed to receive. Submitting an inquiry does not automatically subscribe you to education marketing.</p>
  <h2 className="pt-2 text-2xl">Service providers and storage</h2><p>The website uses hosting and database providers to operate the site and store submitted information. Email delivery is handled by an email service provider. Inquiry information may also be sent to the customer-management system used to respond to you. These services process the information needed to perform those functions.</p>
  <h2 className="pt-2 text-2xl">Security and analytics</h2><p>Security checks may process technical information to prevent spam and abuse. The website uses short-lived rate-limit records based on hashed connection information. When Google Analytics is enabled, public pages may send usage events and technical information to Google. Private pricing and email-preference pages do not load the analytics component. Information collected by external providers is also subject to their own policies.</p>
  <h2 className="pt-2 text-2xl">Cookies and preferences</h2><p>The owner sign-in uses a secure session cookie. Analytics, when enabled, may use cookies. You can control cookies through your browser settings. Blocking optional scripts may reduce analytics collection; blocking security scripts may prevent form submission, in which case you can contact Maureen directly.</p>
  <h2 className="pt-2 text-2xl">Retention and your choices</h2><p>Contact Maureen to request access to, correction of, or deletion of information you submitted. Some records may need to be retained to handle an active service relationship or applicable recordkeeping requirements. Education emails include an unsubscribe link. Unsubscribing from education emails does not cancel a booking or stop messages needed to respond to an inquiry.</p>
  <h2 className="pt-2 text-2xl">External links and updates</h2><p>Booking, social-media, and other external links lead to services with their own privacy practices. This policy may be updated as the website or its services change; the date above identifies the current version.</p>
</div></Container></>;}
''')
p=root/'app/(public)/terms/page.tsx';s=p.read_text();start=s.index('          {/* TEMPLATE');end=s.index('          <p>\n            By using',start);s=s[:start]+'          <p>Last updated: October 27, 2026.</p>\n'+s[end:];s=s.replace('Photography and content on this site are used with permission where\n            applicable and remain the property of their respective creators.','Photography and other content remain the property of their respective\n            creators. Please obtain permission before reproducing them.');p.write_text(s)
private_docs=['OFFER_LADDER_AND_PRICING.md','BLOG_AND_CONTENT_EXTRACTION_FULL.md','CONTENT_INVENTORY.md','DECISIONS.md','superpowers/plans/2026-08-06-private-pricing-guide.md','superpowers/specs/2026-08-06-private-pricing-guide-design.md']
for rel in private_docs:
 p=root/'docs'/rel
 if p.exists():p.write_text(re.sub(r'\$\d[\d,]*(?:\.\d{2})?', '[private rate]',p.read_text()))
p=root/'seed/services.json';data=json.loads(p.read_text())
for entry in data:
 entry['price']='Available by private inquiry';entry['priceStatus']='private'
 if 'notes' in entry:entry['notes']=[re.sub(r'\$\d[\d,]*(?:\.\d{2})?', '[private rate]',v) for v in entry['notes']]
p.write_text(json.dumps(data,indent=2)+'\n')
p=root/'README.md';s=p.read_text();s=s.replace('- **Pre-launch**, blocked on Maureen\'s confirmations (pricing, NAP, image/review permissions) and production deploy/QA.','- **Release gate:** follow `docs/PRODUCTION_HARDENING.md`. Database migration, runtime secrets, retry-worker setup, owner approval of policy text, and live delivery tests are required before merging the hardening release.');s=s.replace('(all routes static/SSG)','(public pages mostly static/SSG; private pages and delivery routes are dynamic)');p.write_text(s)
write('docs/PRODUCTION_HARDENING.md',r'''
# Production hardening — October 27, 2026

Do not merge into an automatically deployed production branch before the following
infrastructure is ready. These files do not change production secrets, databases,
repository visibility, or branch protection.

## Code changes

Patched framework/image dependencies and pinned vulnerable transitive packages;
controlled forms and shared server validation; transactional lead/subscriber storage;
a durable notification outbox with independent retries and immutable provider bodies;
shared atomic rate limits and server-verified Turnstile; POST owner sign-in with eight-hour
HttpOnly/Secure/SameSite cookies; server-only schema-validated pricing; separate root layouts
that remove analytics from private documents; encrypted unsubscribe links and deliberate POST
confirmation; visible server-rendered hero/main content; unit, browser, SQL and dependency checks.

## Before merging

1. Apply `supabase/migrations/202610270001_website_leads.sql` to a preview Supabase database,
   then to the correct production project after verification. It creates four RLS-enabled tables
   and service-role-only functions. Keep the service-role key server-only and retain backups.
2. Set `.env.example` variables separately for preview and production. Generate each secret
   independently from 32 random bytes. Do not put secrets in commits, issues, screenshots or chat.
   Verify the Resend sender domain and destination mailbox.
3. Set the approved catalog as `PRICING_CATALOG_JSON`, never as a NEXT_PUBLIC variable.
   The preserved catalog is supplied separately, not committed. Missing catalog/signing settings
   degrade acknowledgements to manual follow-up; configure both before launching.
4. Configure Turnstile keys for every deployment hostname and set the exact hostname allowlist.
   Production fails closed without verification. Vercel forwarding headers are automatically
   trusted; other deployments must explicitly configure a proxy that overwrites these headers
   and prevents direct access to the app server.
5. Rotate `PRICING_OWNER_KEY` because it was previously exposed in bookmarkable URLs.
   Configure an independent `OWNER_SESSION_SECRET`. Sign in at `/pricing/new`; never bookmark
   a password URL. Rotating either owner secret revokes sessions. Rotating PRICING_LINK_SECRET
   revokes existing customer links, so do that deliberately, not for routine owner-session rotation.
6. Set repository variable `WEBSITE_BASE_URL` to the deployed HTTPS origin, Actions secret
   `WEBSITE_CRON_SECRET` to the same value as hosting `CRON_SECRET`, and repository variable
   `DELIVERY_WORKER_ENABLED=true` only after the worker endpoint is deployed. The committed
   schedule runs every five minutes from the default branch, on a best-effort basis. An external
   scheduler may instead POST to `/api/jobs/deliver` with the Bearer credential. Next `after`
   accelerates initial delivery, but the database queue and scheduled worker provide recovery.
7. Run `npm run preflight` with production variables loaded. It checks configuration shape
   without printing values. Send a clearly identified test inquiry/signup through preview and
   verify durable records, owner notification, customer email, private link, CRM mapping and opt-out.
   CI never sends a real customer email. API acceptance does not prove inbox delivery.
8. Activate branch protection using `scripts/protect-main.mjs --apply` with an administration
   token in GH_TOKEN, or equivalent GitHub Settings. The available connector cannot apply
   administration settings. A checked-in configuration is not an active protection rule.
9. Decide whether to make this public repository private. Old public commits still contain
   prior pricing. Redacting current source cannot retract history, forks, clones or caches.
   Do not rewrite history without a separate migration plan.
10. Owner/legal review of privacy and terms remains necessary. Confirm actual providers,
    retention, deletion/access procedures and applicable consent requirements. Removing the
    starter banner does not constitute legal approval. Automatic PII deletion is not enabled.

## Delivery and recovery

Forms report success only after a database transaction saves the submission. Notification
failures no longer reject saved leads. Identical retries with the same submission identifier reuse
the record. Subscribers are keyed by email/list with consent text/time. Decoys do not count as
conversions. Every recipient retry uses the same job idempotency key and snapshotted body.

Resend deduplicates within a 24-hour window. Automatic retries stop before 22 hours or after
eight attempts, preserving ambiguous jobs as `needs_review`. Do not reset old email jobs blindly:
reconcile provider acceptance first. Absolute exactly-once delivery is not guaranteed when a
provider accepts a request but its response is lost. The retry worker reports stale/review items
with HTTP 503 so scheduler checks fail visibly.

CRM consumers must deduplicate X-Submission-Id or Idempotency-Key. The new payload has
`source`, `kind` and typed camelCase `fields`; update existing human-label field mappings.
The code intentionally avoids logging response bodies, message content, tokens and raw IPs.
Stored submissions and email bodies contain personal information: restrict staff access and
establish a retention policy. Monitor pending/review jobs, scheduler failures and provider
bounce/complaint reports. This change does not create a provider bounce-webhook subscription.

## Verification

Run `npm ci --ignore-scripts`, `npm run verify`, `npm audit --audit-level=high`,
`npx playwright install chromium`, and `npm run test:e2e`. CI also applies the migration to a
disposable PostgreSQL instance and tests access boundaries, deduplication, leases, retry
isolation/backoff, and unsubscribe. Browser checks intentionally have no production credentials:
they verify graceful failure, not live provider delivery.

Deploy preview, configure dependencies, complete live smoke tests, then merge. The database
migration is additive, so application rollback must not drop saved leads. Continue draining or
reconciling outstanding jobs after a rollback. Next 15 was kept for a targeted patch, not an
untested major upgrade. Review framework support and transitive overrides regularly.
''')
write('scripts/protect-main.mjs',r'''
// Use an administration-scoped token. Never commit the token.
const settings={required_status_checks:{strict:true,contexts:['quality','browser','database']},enforce_admins:true,required_pull_request_reviews:{dismiss_stale_reviews:true,require_code_owner_reviews:false,required_approving_review_count:0,require_last_push_approval:false},restrictions:null,required_conversation_resolution:true,allow_force_pushes:false,allow_deletions:false};
if(!process.argv.includes('--apply')){console.log(JSON.stringify(settings,null,2));console.log('Dry run only. To apply: GH_TOKEN="$(gh auth token)" node scripts/protect-main.mjs --apply');}
else{
  if(!process.env.GH_TOKEN)throw new Error('GH_TOKEN with repository administration access is required.');
  const response=await fetch('https://api.github.com/repos/aethereology/maureenella/branches/main/protection',{method:'PUT',headers:{Authorization:`Bearer ${process.env.GH_TOKEN}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','Content-Type':'application/json'},body:JSON.stringify(settings)});
  if(!response.ok)throw new Error(`Branch protection was NOT changed: GitHub returned ${response.status}.`);
  console.log('Main protection applied. Verify it in repository Settings before merging.');
}
''')
