# MEMORY.md — Maureen Ella durable project memory

> Stored lowercase (`memory.md`); on this Windows repo it is what loads for
> `MEMORY.md`. Read this and `CLAUDE.md` first each session.

This file is updated at the end of every Claude Code session so future sessions can resume intelligently.

A running snapshot for humans. Complements (does not replace) the agent memory
in `~/.claude/.../memory/` which Aethera reads automatically each session.
Update the "Current state" line whenever it changes.

## What this is

**maureenella.com** — premium bridal hair & makeup brand for **Maureen Ella**
(St. Augustine / Jacksonville / Palm Coast / Northeast Florida + destination
weddings). Umbrella brand with four arms: **Bridal** (revenue engine, primary),
**Education** (mentorship for bridal pros), **Journal** (SEO blog), **Favorites**
(affiliate). Not the QueryClear/GEO business in the parent `Documents/CLAUDE.md`.

## Brand facts (stable)

- Umbrella brand name: **Maureen Ella** (legal display name unconfirmed).
- Domain: maureenella.com. Base URL config in `lib/site.ts`.
- Primary CTA language: **Request Availability** / **Check My Date**.
- Voice: warm, editorial, calm, premium — not salon-generic, not hypey.
- Service areas: St. Augustine, Jacksonville, Palm Coast, NE Florida, destination.

## Build status (2026-07-22)

- **Phase 1 (Bridal MVP):** done. **Phase 2 (Local SEO):** done.
  **Phase 3 (Education launch):** done (landing + free checklist + waitlist +
  welcome email; paid products gated).
- App: Next.js 15 App Router + React 19 + TS + Tailwind v4, ~35 static routes.
- Source of truth for detail: `docs/BUILD_NOTES.md`, `docs/ROADMAP.md`,
  `docs/TASKS.md`, `docs/DECISIONS.md`.
- Live at maureenella.com (Vercel, GitHub-connected — push to `main` auto-deploys
  to production).

## Last session (2026-07-22)

- **Premium motion refresh:** added Motion 12 and a site-wide interaction
  system (shared-layout navigation and filters, spring buttons, scroll progress,
  hero parallax, viewport reveals, staggered groups, gallery/review presence
  transitions, route hand-offs, and reduced-motion handling). Reworked the
  global hero/page-header treatment and unified Home, Bridal, and About around
  the stronger editorial composition. Desktop/mobile visual QA passed.
- Updated Next.js 15.5.18 → 15.5.21 while verifying dependencies. Final checks:
  `npm run typecheck`, `npm run lint`, and `npm run build` (56 routes) all pass.

- **Journal: 24 → 27 published articles.** Added 3 new original (non-migration)
  bridal-prep posts, authored fresh (not sourced from theparlor.info/Wix):
  `wedding-hair-makeup-timeline-st-augustine`, `bridal-hair-makeup-preview-what-to-expect`,
  `how-to-choose-a-bridal-hairstylist`. Entries in `seed/blog_posts.json`, bodies
  in `content/journal.ts`, hero images copied into `public/images/journal/` from
  `assets/portfolio/blog25.jpg` and `assets/maureen/*.jpg`. Sitemap/metadata/schema
  picked these up automatically (no template changes needed).
- Also shipped in this push (pre-existing uncommitted work, verified and folded
  in): a homepage/reviews-page **awards recognition marquee**
  (`components/sections/RecognitionMarquee.tsx`, real badge images in
  `public/images/badges/`) and an **`icon.png` → `icon.svg`** favicon swap.
- Verified with `npm run typecheck` + `npm run build` (56 routes, all static/SSG
  where expected) before commit. No unconfirmed facts introduced — still
  inquiry-only pricing, still gated per D004/D005.

## Hard rule — confirmation gating (D004 / D005)

Do **not** publish unconfirmed pricing, deposit/date-reservation terms, travel /
touch-up / venue-change fees, phone, email, address, suite, hours, or policies.
Legacy sources conflict ($250 vs $100 deposit; $175 vs older service pricing).
All confirmable values live in `lib/site.ts` as `{ value: null, confirmed:false }`.
Pricing mode is `inquiry-only`. Education products = "in development / waitlist"
(no prices, guarantees, certification language). No fake reviews/clients/stats.
Content permissions (portfolio, reviews) gate via `lib/permissions.ts`; reviews
render first-name + last-initial. Get Maureen's sign-off before launch.

## Unresolved decisions (need Maureen)

- Confirm pricing, deposit terms, whether deposit applies to total, service
  minimum, travel-fee formula, venue-change fee, touch-up rate, gratuity,
  payment methods/deadlines.
- Confirm public phone / email / address / hours (NAP) → unlocks LocalBusiness
  schema, currently blocked.
- Confirm image permissions + photographer credits; confirm review permissions.
- Confirm Education product offers + pricing before selling any (D005).
- Choose CRM/ESP (for inquiry routing + Education emails 2–4 drip).
- Whether old theparlor.info redirects to maureenella.com; verify legacy URLs.
- Replace template Privacy/Terms with reviewed copy.
