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

### D012 - One restrained motion language across the site

Decision (2026-07-22): Use Motion for React as the site's interaction layer,
with a single global configuration and the lightweight `domAnimation` feature
bundle. Motion is applied to purposeful state changes only: shared active
navigation/filter treatments, spring feedback on controls, scroll progress and
hero image drift, staggered content entrances, filtered-gallery/review changes,
and page hand-offs. Decorative marquee movement remains CSS-based and pauses
for reduced-motion users. `MotionConfig reducedMotion="user"` is the global
policy; custom fallbacks also keep parallax and transforms still when requested.

Rationale: This creates a tactile, app-like experience without turning the
bridal brand into an animation showcase. It preserves the editorial design,
semantic HTML, crawler-visible content, no-JS reveal fallback, and conversion
flow while consolidating previously isolated CSS animation behavior.

### D013 - Pricing delivered privately after inquiry

Decision (founder, 2026-08-06): amends D009. Pricing stays off the **public**
site — `site.pricing.published` remains `false` and no price appears on any
indexable page. Confirmed collection and à la carte pricing is delivered
privately after inquiry through a signed, expiring link (`/pricing/[token]`,
noindex + robots-disallowed, 90-day lifetime, HMAC-SHA256, no database).

Confirmed and published behind that link at the time of this decision:
Signature Bride Collection from $450; Bridal Party Collection from $1,050
(badged "Most Popular"); Luxe Wedding Collection from $1,850; bridal hair $250;
bridal makeup $250; bridal hair and makeup $450; bridal party hair $125/person;
bridal party makeup $125/person. Consultation booking is
https://calendly.com/maureenella/30min.

> **Superseded in part by D014** (same day): the three collections were renamed
> and revised, and the entry tier rose to $650. The à la carte figures, the
> delivery mechanism, and everything else in this decision still stand.

Still unconfirmed and therefore excluded: travel, retainer, service-minimum,
touch-up-stay, and venue-change amounts. The guide carries generic policy
language only, matching D010.

Every inquiry now triggers a branded React Email auto-responder to the bride
carrying her pricing link and the Calendly link; the owner notification carries
a forwardable copy of the same link. `/pricing/new` (guarded by
`PRICING_OWNER_KEY`) mints links for brides who phone or DM instead of using
the form.

Rationale: collections anchor brides toward larger bookings, but publishing
prices invites comparison shopping and dates the site every time they change. A
private post-inquiry link keeps the anchoring benefit while preserving the
inquiry-first funnel.

Accepted risks: the generator key travels in a query string (worst case, a
stranger sees prices already emailed to strangers); the auto-responder makes
the contact form a minor outbound-mail amplifier. The honeypot and timing
check stop naive bots outright. The IP rate limit (`lib/rate-limit.ts`) is a
per-instance, in-memory fixed window, not a globally consistent one — on
Vercel each warm instance keeps its own bucket, and a flood spread across
rotating IPs bypasses it entirely. Treat it as slowing a single-source flood,
nothing more. Escalation: add Cloudflare Turnstile (keys already stubbed in
`.env.example`) the first time this is tested for real — a Resend bounce-rate
warning, or an unexplained spike in daily inquiries, either one is the
trigger, not a calendar date.

### D014 - Collections revised to the Gold/Diamond/Platinum tiers

Decision (founder, 2026-08-06, superseding the collection block of D013): the
three bridal collections are renamed and revised. Delivery is unchanged — still
private, still behind a signed expiring link, still absent from the public site.

- **The Gold Experience — starting at $650** (was Signature Bride, $450).
  Luxury bridal hairstyle; luxury bridal makeup (airbrush); bridal hair and
  makeup preview; custom lashes; hair touch-up kit; makeup touch-up kit; wedding
  day timeline; on-location services.
- **The Diamond Experience — starting at $1,050**, badged **"Highly Requested"**
  (was Bridal Party, badged "Most Popular"). Bridal hairstyle; bridal makeup;
  hair and makeup for 3 bridal party members or guests; custom lashes; hair and
  makeup touch-up kit; wedding morning timeline; on-location services.
- **The Platinum Experience — starting at $1,850** (was Luxe Wedding). As
  Diamond but for 6, plus additional artist(s) and optional touch-ups before the
  ceremony.

Substantive changes beyond naming: the entry tier rose **$200** and now includes
a hair and makeup **preview**; airbrush is stated explicitly; Gold carries two
separate touch-up kits; "luxury lashes" became "custom lashes"; **veil placement
was dropped** from the entry tier; and every collection now carries
"Travel fee may apply."

That travel line is a qualitative policy note with **no figure**, so it is
compatible with the D004/D009 gate — travel, retainer, service-minimum,
touch-up-stay, and venue-change **amounts** remain unconfirmed and absent.

The badge wording moved to Maureen's own phrasing: "Highly Requested" is a claim
she can defend if a bride asks, where "Most Popular" would imply booking data we
do not publish.

**Open item for Maureen:** the à la carte list is deliberately unchanged, so
"Bridal Hair and Makeup — starting at $450" now sits $200 below the Gold
Experience. That is defensible (Gold adds the preview, lashes and kits), but it
was not addressed in her revision and may be unintentional. Do not change it
without her.

## Pending decisions

- Confirm Education product offers + pricing before any are sold (D005).
- Choose an ESP to run Education emails 2–4 as an automated drip.
- Whether to launch Favorites/Affiliate in Phase 1 or Phase 2.
- Which CRM/email tools to integrate.
- Whether to use CMS immediately or local MDX/JSON first.
