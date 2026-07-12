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

### D007 - theparlor.info redirects to maureenella.com (SEO migration)

Decision: The old domain **will** 301/308-redirect to maureenella.com, preserving
paths. Mechanism: (1) host level — theparlor.info + www.theparlor.info become
redirect domains on the Vercel project; (2) path level — the verified legacy-URL
map in `seed/redirects.json` (via `lib/seo/redirects.ts` → `next.config.ts`)
maps each old path to its new page, with a `/post/:slug` catch-all → `/journal`.
Content freeze on the old site happens at cutover (re-fetch old sitemaps and
re-sync the map as the final pre-cutover step), followed by GSC Change of
Address and the GBP website update.

Verified facts (2026-07-12): full old-site URL inventory fetched from live
sitemaps (17 pages, 24 posts, 4 categories); theparlor.info is registered at
Squarespace Domains (**expires 2026-10-18 — confirm auto-renew now**) with DNS
hosted on Wix nameservers. maureenella.com is registered at Namecheap
(to 2027-05-31) on parking DNS, plus a stale failed Wix connection to remove.
The old domain stays registered and redirecting for 12+ months minimum after
cutover.

DNS mechanics (amended per D008): cutover is **one nameserver change** —
theparlor.info moves from Wix nameservers straight to Vercel DNS
(`ns1/ns2.vercel-dns.com`) at Squarespace, after the zone's non-web records
(Google Workspace MX/SPF, AdSense TXT, any DKIM) are re-created in Vercel DNS
from a snapshot of the Wix zone. Rollback = revert nameservers to Wix (the Wix
zone survives until the premium plan is cancelled).

Rationale: The old site ranks well locally and is linked from the Google
Business Profile; permanent redirects plus GSC Change of Address are the
standard mechanism to carry that authority to the new domain. Ranking legacy
posts are never redirected to bodiless "coming soon" stubs (soft-404 risk) —
they point to the closest live page until the replacement article ships.

### D008 - Wix exit after cutover

Decision: Cancel the Wix premium plan once the D007 cutover is verified and
stable for 2–4 weeks. After cutover, theparlor.info has no website — its content
is rebuilt on maureenella.com and the domain is a Vercel-served redirect shell —
so Wix's only remaining role (DNS hosting) moves to Vercel DNS in the cutover
itself. Sequence before cancelling: archive all old-site media into gitignored
`assets/` (text already captured in docs/BLOG_AND_CONTENT_EXTRACTION_FULL.md),
remove the stale maureenella.com connected domain, confirm nothing else is
billed through the plan, and **unpublish the old Wix site** so it cannot
resurface at `*.wixsite.com` as duplicate content. The free Wix account is kept
as a dormant archive (editor content + the old MaureenElla wixsite, still a
content-migrator source). Full checklist in TASKS.md ("Wix exit").

Verified dependencies (2026-07-12): `maureen@theparlor.info` is Google Workspace
**billed directly by Google** (per founder) — independent of Wix; the DNS zone
also carries an AdSense verification TXT. Both record sets must exist in Vercel
DNS before the nameserver switch, with an email send/receive test immediately
after.

Rationale: Saves ~$200–400/yr with zero capability loss. Guardrails: never
cancel before the nameserver move is verified (the intact Wix zone is the
rollback path), and never let the domain registration lapse.

### D009 - Public contact info confirmed; pricing stays off-site

Decision (founder, 2026-07-12): Public contact is **maureen@theparlor.info**,
**(904) 881-5808**, hours **daily 6:00 AM–6:00 PM** — set as confirmed in
`lib/site.ts` and rendered in the footer, the contact page, and a new
`BeautySalon` LocalBusiness schema (`components/seo/JsonLd.tsx`), which the
confirmed values unlock. Street address remains UNCONFIRMED — omitted from UI
and schema (valid service-area-business markup) until Maureen confirms.
**Pricing will not be shown on the site** — inquiry-only is now the standing
policy (resolves the D004 pending question), consistent with industry practice
for premium bridal beauty. Production form deliveries go to
maureen@theparlor.info (preview/test deploys to the operator's inbox).

Rationale: Confirmed NAP-minus-address enables LocalBusiness schema and gives
brides direct contact paths without violating the D004 gating rule on the
still-unconfirmed address and pricing details.

### D010 - Content publish approvals + full NAP (launch content complete)

Decision (founder, 2026-07-12): (1) **Street address confirmed** — 206 Ashourian
Ave, St. Augustine, FL 32092 — added to `lib/site.ts`, the contact page, and the
LocalBusiness schema (full NAP now live, matching the GBP). (2) **Reviews
approved** — quotes sourced verbatim from the public Google Business Profile
(29 reviews, 5.0★); nine wedding-relevant reviews imported to
`seed/testimonials.json` with real reviewer names (displayed as "First L."),
`permissionStatus: "approved-gbp"`; `testimonialsPublished: true`.
(3) **Portfolio approved** — founder-curated set (`assets/portfolio`, 87 files);
the 16 pre-curated, credited gallery images in `public/images/portfolio` were
optimized (86MB → 4MB, max 2000px q82) and published; `portfolioPublished: true`.
Sitemap/noindex gates flipped open automatically. (4) **Booking policies** —
generic industry-standard FAQ answers added (retainer + signed agreement,
balance-before-wedding, non-refundable retainer language, travel-fee-in-proposal)
with **no specific amounts** — numbers stay inquiry-only per D004/D009; copy is
editable as Maureen refines policy.

Note: the placeholder testimonial names in the old seed (e.g. "Jamie Stiles")
were incorrect — real GBP names verified (e.g. Jaimie Harris). GBP hours show
"Opens 9 AM Mon" vs confirmed 6 AM–6 PM daily — Maureen should align GBP hours.

### D011 - Full content migration + full portfolio publish

Decision (founder, 2026-07-12, on Maureen's request): migrate **all blog content
from both Wix sites** into the Journal and publish **all approved portfolio
photos**. Executed:
- **Journal 6 → 24 published articles.** Filled the 4 stubs and added 14 new
  articles across real-weddings (Mcklevey & Ryan at Ocean Hammock Park; Keely at
  Bowing Oaks — Maureen credited for hair only, per source; Angeline & Shane's
  Yulee courthouse elopement; their Filipino-American wedding at Old Spanish
  Quarter), bridal-prep, beauty-favorites, and business-mentorship (6 posts from
  the old maureenlamban.wixsite.com blog incl. the Lola origin story). All
  rewritten (never verbatim) per the content-migrator skill; vendor credits only
  as named in sources; merged duplicates (veil+heirloom; both hair-prep posts;
  floridaelopementt interview folded into the Yulee article; "navigating
  entrepreneurship" folded into the origin story); skipped junk template post
  and stale 2023 Sephora-sale variants. The Wix-promoting website post was
  rewritten platform-neutral.
- **Portfolio 16 → 91 images.** All 87 approved assets optimized (490MB source →
  26MB served); perceptual-hash dedupe removed 12 exact duplicates of
  already-published images; 75 unique new gallery entries with alt text, tags
  (new filters: Bridal Party, Getting Ready), and credits. Credit correction:
  the Mcklevey & Ryan beach images were previously credited "Kristinaclicks" —
  the source post names **My Nguyen Photography**; fixed on all three affected
  entries.
- **Redirects:** 17 legacy `/post/*` URLs retargeted from interim destinations
  to their 1:1 articles; catch-alls unchanged.

## Pending decisions

- Confirm Education product offers + pricing before any are sold (D005).
- Choose an ESP to run Education emails 2–4 as an automated drip.
- Whether to launch Favorites/Affiliate in Phase 1 or Phase 2.
- Which CRM/email tools to integrate.
- Whether to use CMS immediately or local MDX/JSON first.
