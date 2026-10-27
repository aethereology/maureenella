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
