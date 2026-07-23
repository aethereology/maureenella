# Build Notes — Bridal MVP (Phases 1–3)

Status as of 2026-05-30. This documents the implemented Next.js application that
now lives alongside the planning docs in this repo.

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

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all routes static/SSG)
npm run start    # serve production build
npm run typecheck
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
