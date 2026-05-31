# Maureen Ella Claude Code Package

Generated: 2026-05-30 · Last updated: 2026-05-30

This repository is a strategy, product, content, SEO, operations, and Claude Code execution package for rebuilding **Maureen Ella** at **maureenella.com**. It now also contains the **live Next.js application** built from that plan.

## Current status

- **Phase 1 (Bridal MVP):** built · **Phase 2 (Local SEO):** built · **Phase 3 (Education launch):** built (landing + free Starter Checklist lead magnet + waitlist + welcome email; paid products gated).
- **Pre-launch**, blocked on Maureen's confirmations (pricing, NAP, image/review permissions) and production deploy/QA.
- Read `docs/BUILD_NOTES.md` for the current implemented state, `docs/ROADMAP.md` + `docs/TASKS.md` for what's next, `docs/DECISIONS.md` for decisions D001–D005.
- Run: `npm run dev` · `npm run typecheck` · `npm run build` (all routes static/SSG).

## Brand direction

Maureen Ella is the umbrella brand. Everything lives under this name:

1. **Maureen Ella Bridal** - bridal hair and makeup services for St. Augustine, Jacksonville, Palm Coast, Northeast Florida, and destination weddings.
2. **Maureen Ella Education** - business mentorship, coaching, digital products, and resources for bridal beauty professionals.
3. **Maureen Ella Journal** - SEO blog, real weddings, prep guides, founder story, and evergreen content.
4. **Maureen Ella Favorites** - affiliate/product recommendations for bridal prep, hair, makeup, fragrance, accessories, and business tools.

## How to use this package

1. Read `START_HERE.md` first.
2. Start Claude Code from this root folder.
3. Have Claude read `CLAUDE.md` and `MEMORY.md` (real content lives in the
   lowercase `claude.md` / `memory.md` on Windows), then `docs/BUILD_NOTES.md`,
   `docs/ROADMAP.md`, `docs/TASKS.md`, and `docs/DECISIONS.md` before coding.
4. Continue from the next open item in `docs/ROADMAP.md` (Phases 1–3 are built).

## Package structure

- `CLAUDE.md` - main Claude Code project instructions.
- `MEMORY.md` - durable project memory, brand facts, and unresolved decisions.
- `.claude/` - Claude Code settings, rules, and reusable project skills.
- `docs/` - business plan, product spec, brand architecture, content inventory, SEO, UI, operations, testing, and launch plan.
- `seed/` - initial JSON/YAML-style seed data for services, FAQs, blog posts, testimonials, offers, redirects, and navigation.
- `prompts/` - reusable prompts for Claude Code, content migration, SEO review, QA, and page generation.
- `blueprint/` - app route map, component map, CMS schema, data model, integrations, and analytics plan.

## Non-negotiable rule

Do not publish final pricing, travel fees, deposit rules, touch-up rates, venue-change rates, hours, phone number, or payment policies until Maureen confirms the values listed in `docs/CONFIRMATION_NEEDED.md`.
