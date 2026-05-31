# MEMORY.md — Maureen Ella durable project memory

> Stored lowercase (`memory.md`); on this Windows repo it is what loads for
> `MEMORY.md`. Read this and `CLAUDE.md` first each session.

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

## Build status (2026-05-30)

- **Phase 1 (Bridal MVP):** done. **Phase 2 (Local SEO):** done.
  **Phase 3 (Education launch):** done (landing + free checklist + waitlist +
  welcome email; paid products gated).
- App: Next.js 15 App Router + React 19 + TS + Tailwind v4, ~35 static routes.
- Source of truth for detail: `docs/BUILD_NOTES.md`, `docs/ROADMAP.md`,
  `docs/TASKS.md`, `docs/DECISIONS.md`.

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
