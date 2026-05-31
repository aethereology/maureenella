# CLAUDE.md — Maureen Ella project

> **Filename note:** This file is stored lowercase (`claude.md`) but on this
> Windows repo it is what Claude Code loads for `CLAUDE.md`. It is the source of
> truth for project instructions. (`memory.md` ⇄ `MEMORY.md` works the same way.)

## ⚠️ Which business is this?

This folder builds **maureenella.com** — a **premium bridal hair & makeup brand
site for Maureen Ella** (St. Augustine / Jacksonville / Palm Coast / NE Florida
+ destination weddings), with future Education and Favorites/affiliate arms.

The parent file `c:\Users\kylel\Documents\CLAUDE.md` describes a *different*
business (QueryClear / GEO / "AI Search Optimization"). **Ignore that brief for
this folder.** This folder's own docs are the source of truth.

## Stack & commands

- **Next.js 15.5.18** (App Router) + **React 19** + **TypeScript** + **Tailwind v4**
  (CSS-first config in `app/globals.css`). Deploy target: **Vercel**.
- Content is local typed TS/JSON via a CMS-ready loader (`lib/content.ts`,
  `content/*.ts`). Components never import raw seed JSON directly.

```bash
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit  (run before claiming done)
npm run build      # production build — all routes static/SSG
```

## Current status (as of 2026-05-30)

- **Phase 1 — Bridal conversion MVP:** done.
- **Phase 2 — Local SEO:** done (4 service-area pages + advice posts).
- **Phase 3 — Education launch:** done — landing + free Starter Checklist lead
  magnet + waitlist + welcome email. Paid products/workshop still gated (below).
- **Pre-launch:** still blocked on Maureen's confirmations (pricing, NAP, image
  & review permissions) and production deploy/QA.

The detailed, current state lives in **`docs/BUILD_NOTES.md`**. Phase tracking is
in **`docs/ROADMAP.md`** and **`docs/TASKS.md`**. Decisions are in
**`docs/DECISIONS.md`** (D001–D005).

## How to continue (next likely work)

1. **Confirmations** — when Maureen sends real values, set them in `lib/site.ts`
   (`{ value, confirmed: true }`) and `lib/permissions.ts`. UI surfaces them
   automatically.
2. **Phase 3 finish** — first paid product/workshop (blocked on confirmed
   pricing, D005) and Education emails 2–4 (need an ESP drip).
3. **Phase 4 — Favorites/affiliate**, **Phase 5 — optimization** (see ROADMAP).
4. **Content migration** — legacy blog → Journal (`content-migrator` skill).

## Non-negotiable gating rule (D004 / D005)

**Never publish unconfirmed business facts:** pricing, deposit/date-reservation
terms, travel/touch-up/venue-change fees, phone, email, address, suite, hours,
or policies. Everything confirmable lives in `lib/site.ts` as
`{ value: null, confirmed: false }` — only render after `confirmed: true`.
Pricing mode is `inquiry-only`. Education products stay "in development / join
waitlist" — no prices, guarantees, or certification language until confirmed.
No fake reviews/clients/credentials/stats anywhere.

## Working rules

Read `.claude/rules/*` (seo, security, ui-ux, testing, content-strategy,
education) and the project skills in `.claude/skills/` (page-builder,
seo-auditor, qa-review, content-migrator). Inspect → plan → make focused changes
→ run typecheck/build → update `docs/TASKS.md` + `docs/DECISIONS.md` → summarize.
