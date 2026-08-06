# Build Notes — Bridal MVP (Phases 1–3)

Status as of 2026-05-30. This documents the implemented Next.js application that
now lives alongside the planning docs in this repo.

## Private pricing guide (added 2026-08-06)

Bridal pricing is now confirmed, but it stays off the **public** site (D013,
which amends D009). Brides receive it privately after inquiry through a
signed, expiring link.

- `lib/pricing-link.ts` — dependency-free HMAC-SHA256 signed tokens (no
  database, no session; imports only `node:crypto` so its test can run under
  bare `node --test`). 90-day default lifetime.
- `/pricing/[token]` — the guide page (three collections, à la carte table,
  policy notes). Expired, tampered, or malformed tokens all render an
  identical "link expired" page at HTTP 200 — never a 404. `noindex, nofollow`
  and `force-dynamic` (expiry must be evaluated per request, not cached).
- `/pricing/new` — an owner-key-guarded generator (`PRICING_OWNER_KEY`) for
  brides who phone or DM instead of using the form; also `force-dynamic`.
- `emails/InquiryAutoresponder.tsx` — a branded React Email template, sent by
  `lib/email.tsx` from `app/actions/inquiry.ts` on every inquiry, carrying the
  bride's pricing link and a Calendly booking link. Degrades gracefully (link
  omitted, error logged) when `PRICING_LINK_SECRET` is unset.
- Pricing content lives in `content/pricing.ts` — confirmed collection and à
  la carte figures only; travel, retainer, service-minimum, touch-up-stay, and
  venue-change amounts remain unconfirmed and excluded (D004/D009).
- `/pricing/[token]` URLs are bearer credentials, so the token must never be
  transmitted anywhere. `components/Analytics.tsx` is route-aware and never
  loads GA4 on `/pricing/*` (blocks `page_location`); `next.config.ts` sets
  `Referrer-Policy: no-referrer` for `/pricing/:path*` (overriding the
  site-wide `strict-origin-when-cross-origin`) so a same-origin hard
  navigation off a pricing page — e.g. a bride ctrl-clicking a portfolio
  link — never hands the token to a destination page as `document.referrer`
  (blocks `page_referrer`).
- Decision record: D013 in `docs/DECISIONS.md`.

## Premium motion and interaction refresh (2026-07-22)

- Added Motion 12 with a global reduced-motion-aware configuration and lazy
  `domAnimation` feature bundle.
- Rebuilt the persistent header with a shared-layout active indicator, tactile
  CTA/menu controls, staged mobile navigation, and a spring-smoothed scroll
  progress hairline.
- Added restrained route hand-offs, viewport-triggered reveals, real
  `staggerChildren` orchestration, hero parallax, and physics-based buttons.
- Portfolio and review filters now glide between active states; filtered items
  and testimonial changes enter, exit, and reflow through `AnimatePresence`.
- Expanded the editorial hero and page-header systems across Home, Bridal,
  About, Contact, Portfolio, Education, and other shared-template pages.
- Verified desktop and mobile presentation, then passed typecheck, lint, and a
  clean production build of all 56 routes on Next.js 15.5.21.

## Phase 3 — Education launch (added 2026-05-30)

Turned the Education teaser into a real, conversion-ready launch for bridal
beauty professionals — without publishing any gated facts.

- `/education` rebuilt as a full landing page: who it's for, problems solved,
  the CONFIDENT Bridal Business Method, mentor positioning, free-checklist CTA,
  an "in development" product ladder, and the waitlist.
- **Lead magnet:** `/education/starter-checklist` — a free Bridal Beauty
  Business Starter Checklist. `components/forms/ChecklistGate.tsx` captures an
  email (via the shared `joinWaitlist` action, list `education-starter-checklist`)
  and reveals the full checklist inline. Honest web checklist, not a fake PDF.
- **Email sequence:** `joinWaitlist` now sends a best-effort welcome
  auto-responder (Email 1 of `EMAIL_SEQUENCES.md`) to new subscribers on any
  `education*` list when Resend is configured. Owner notification preserved; a
  welcome-send failure never fails the signup. Emails 2–4 still need an ESP drip.
- Content lives in `content/education.ts` (typed, no fabricated stats/prices).
  Offer ladder is shaped from `seed/education_offers.json`; products render as
  "In development / Coming later" — no prices, guarantees, or certification
  language (D004 / D005).
- Analytics: added `lead_magnet_download`. `site.sections.education` flipped
  `teaser → full`; sitemap now includes `/education/starter-checklist`.
- The bride inquiry funnel is untouched (D003) — Education is self-contained.

## Phase 2 — local SEO (added 2026-05-30)

Four data-driven service-area landing pages targeting the local keyword
clusters in `SEO_STRATEGY.md`:

- `/bridal/st-augustine`, `/bridal/jacksonville`, `/bridal/palm-coast`,
  `/bridal/destination-weddings`

Built as a single dynamic template `app/bridal/[area]/page.tsx` driven by
`content/locations.ts` (honest, non-fabricated local copy — no invented
venues/claims). Each page has area-specific metadata, Service + FAQPage +
Breadcrumb schema, an area-filtered portfolio (`galleryByTag`), local FAQs, and
cross-links to sibling areas. Internal links added: an "Areas we serve" section
on `/bridal`, sibling links on each area page, and a "Service areas" footer
column. Sitemap updated. Static `/bridal/*` routes take priority over the
dynamic segment; unknown areas 404. LocalBusiness schema still gated on
confirmed NAP.

## Stack

- **Next.js 15.5.18** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first config in `app/globals.css`)
- Local JSON/TS content (CMS-ready data access layer in `lib/content.ts`)
- Deploy target: **Vercel**
- **Email:** `@react-email/components` + `@react-email/render` (runtime
  dependencies, used by `emails/InquiryAutoresponder.tsx` and `lib/email.tsx`).
  `react-email` (the CLI/preview server, `npm run email`) is a devDependency;
  `@react-email/ui` is also a devDependency, required only because
  `react-email@6.9.1`'s preview server hard-requires a matching-version copy
  of it with no non-interactive skip.
- **Tests:** `npm test` runs `node --test --experimental-strip-types` directly
  against `lib/**/*.test.ts` — no test framework, no new dependency. Requires
  `allowImportingTsExtensions: true` in `tsconfig.json`; without it, `tsc`
  fails with TS5097.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (mostly static/SSG; /pricing/[token] and
                 # /pricing/new are force-dynamic per D013)
npm run start    # serve production build
npm run typecheck
npm test         # node --test against lib/**/*.test.ts
```

## What's built (Phase 1)

Pages: Home, `/bridal`, `/bridal/services`, `/bridal/portfolio`,
`/bridal/reviews`, `/bridal/faq`, `/bridal/prep-guides` (+ 3 guides),
`/journal` (+ article template, 6 authored advice posts),
`/about`, `/education` (waitlist), `/favorites` (teaser), `/contact` (inquiry
form), `/thank-you`, `/privacy`, `/terms`. Plus `sitemap.xml`, `robots.txt`,
legacy 301 redirects, and brand favicon.

Features: filterable portfolio, accessible FAQ accordion, sticky mobile CTA,
inquiry form (server action + validation + honeypot/timing spam protection +
Resend delivery + optional CRM webhook), education/lead waitlist capture, GA4
event tracking, full JSON-LD (Organization, WebSite, Service, FAQPage,
BreadcrumbList, Article), per-route metadata + Open Graph.

## CONFIRM gating (do not skip)

Per `CONFIRMATION_NEEDED.md` + `DECISIONS.md` D004, **no pricing, deposit,
phone, email, address, hours, or policy values are published.**

- `lib/site.ts` holds all confirmable fields as `{ value: null, confirmed: false }`.
  When Maureen confirms a value, set `value` and `confirmed: true` and the UI
  surfaces it automatically. Pricing mode is `inquiry-only`.
- `lib/permissions.ts` gates client-derived content. `portfolioPublished` and
  `testimonialsPublished` default `true` (real, photographer-credited work;
  reviews shown as first-name + last-initial). Flip either to `false` to pull
  that content instantly if permission is withheld. **Get Maureen's final
  sign-off on portfolio + review permissions before launch.**

## Environment variables

See `.env.example`. The form works without these (logs submissions); set them
to enable email/analytics:

- `RESEND_API_KEY`, `FORM_TO_EMAIL` — inquiry + waitlist email delivery
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — GA4
- `CRM_WEBHOOK_URL` — optional CRM lead POST

## Images

Curated real assets copied to `public/images/` (hero, portfolio, journal,
guides, about). Source `assets/` originals are large; `next/image` optimizes on
serve. Consider pre-compressing the largest originals before heavy traffic.

## Known follow-ups (Phase 2+)

- Confirm + populate `lib/site.ts` values; decide exact vs inquiry-only pricing.
- Real-wedding journal posts are "coming soon" (need Maureen's approved details).
- Service-area landing pages (St. Augustine / Jacksonville / Palm Coast).
- Favorites affiliate products; Education program build-out.
- Replace template Privacy/Terms with reviewed copy.
- Verify real legacy URLs before relying on the redirect map.
