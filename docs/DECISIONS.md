# Decisions Log

Use this file to record product and business decisions as they are made.

## Confirmed decisions

### D001 - Umbrella brand

Decision: Use **Maureen Ella** as the umbrella brand.

Rationale: The user specified Maureen Ella as the rebrand name and maureenella.com as the new website.

### D002 - Bridal first

Decision: Bridal services are the primary Phase 1 conversion path.

Rationale: Bridal services are the current revenue engine and most of the extracted website content supports bridal bookings.

### D003 - Education separate from bridal path

Decision: Education/coaching content should have its own section and not interrupt the bride inquiry funnel.

Rationale: Brides and beauty professionals have different needs; mixing them too early can reduce conversion.

### D004 - Pricing requires confirmation

Decision: Do not publish final pricing until Maureen confirms current values.

Rationale: Current site, newer image, and older PDFs conflict.

### D005 - Education launches as free lead magnet + waitlist

Decision: Phase 3 launches Education with a full landing page, a free
Bridal Beauty Business Starter Checklist (email-gated lead magnet), and a
waitlist. Paid products and the workshop are presented as "in development"
with no prices, guarantees, or certification language until Maureen confirms
the offers and pricing.

Rationale: Resolves the pending "waitlist-only vs active offer" question —
ship the trust-building free entry point and capture demand now, while keeping
all monetizable offers gated per D004. Education stays in its own section so it
never interrupts the bride inquiry funnel (D003).

### D006 - Pre-launch security hardening + version control

Decision: Added baseline security hardening ahead of launch — (1) HTTP security
headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy,
Permissions-Policy) in `next.config.ts`; (2) per-IP rate limiting on the inquiry
and waitlist server actions via a dependency-free in-memory limiter
(`lib/rate-limit.ts`); (3) initialized git and made the first commit. Raw source
media (`assets/`, `maureen/` — 500+ full-res client photos/videos) is gitignored
and kept out of history until image permissions are confirmed.

Rationale: The inquiry form collects PII (including health-adjacent allergy
notes), so throttling and transport hardening are warranted before exposing it
publicly. CSP uses `'unsafe-inline'` for scripts because the site is fully static
(no per-request nonce) and renders inline JSON-LD + the GA4 init snippet; the
remaining directives still harden meaningfully. The in-memory limiter is
per-instance — documented upgrade path is a shared store (Upstash via Vercel
Marketplace) or Vercel BotID/WAF if stricter global limits are needed. Excluding
unconfirmed client media from git history avoids an irreversible privacy exposure
and keeps the repo light (consistent with D004 and the permissions gating).

## Pending decisions

- Preferred public phone number.
- Preferred public email address.
- Whether to show exact pricing publicly.
- Confirm Education product offers + pricing before any are sold (D005).
- Choose an ESP to run Education emails 2–4 as an automated drip.
- Whether to launch Favorites/Affiliate in Phase 1 or Phase 2.
- Which CRM/email tools to integrate.
- Whether to use CMS immediately or local MDX/JSON first.
- Whether old theparlor.info will redirect to maureenella.com.
