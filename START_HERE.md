# Start Here

You are building **maureenella.com** as the new umbrella brand for Maureen Ella.

## Current status (2026-05-30) — read this first

The site is **built through Phase 3** and is **pre-launch**.

- **Phase 1 (Bridal MVP), Phase 2 (Local SEO), Phase 3 (Education launch):** done.
- Live Next.js app in this repo (`app/`, `components/`, `content/`, `lib/`).
- **Source of truth for state:** `docs/BUILD_NOTES.md`. Plan/next: `docs/ROADMAP.md`
  + `docs/TASKS.md`. Decisions: `docs/DECISIONS.md` (D001–D005).
- **Blocked on Maureen's confirmations** (pricing, NAP, image/review permissions)
  before launch — see `docs/CONFIRMATION_NEEDED.md`. Nothing unconfirmed is
  published; values are gated in `lib/site.ts` / `lib/permissions.ts`.

The "First build goal" section below is the original Phase 1 brief, kept for
context. For new work, continue from the next open item in `docs/ROADMAP.md`.

## Mission

Create a premium, conversion-focused brand website that supports:

- Bridal hair and makeup bookings.
- Local SEO for St. Augustine, Jacksonville, Palm Coast, Northeast Florida, and destination weddings.
- A future mentorship/coaching business for bridal beauty professionals.
- A searchable content hub for blog posts, real weddings, prep guides, product recommendations, and affiliate content.
- A portfolio that feels editorial, personal, trustworthy, and high-end.

## First build goal

Launch a strong Phase 1 website that can convert brides now while supporting later education and affiliate growth.

Phase 1 must include:

1. Home
2. Bridal Services
3. Portfolio
4. Reviews
5. About
6. FAQ
7. Prep Guides
8. Journal / Blog
9. Contact / Request Availability
10. Redirects from legacy content
11. LocalBusiness, Organization, Article, FAQ, Breadcrumb, and Service structured data
12. Google Search Console, GA4, conversion tracking, and sitemap

## Suggested first Claude prompt

Paste this into Claude Code:

```text
Read CLAUDE.md, MEMORY.md, docs/BUILD_NOTES.md, docs/ROADMAP.md, docs/TASKS.md, docs/DECISIONS.md, and docs/CONFIRMATION_NEEDED.md. Summarize the current build state and the next open items, then propose a focused plan before coding. Respect the confirmation-gating rule — publish no unconfirmed pricing, NAP, or policy values.
```

## Important source conflict

The legacy assets conflict on pricing and policies. Current-looking materials suggest a $250 date reservation and bridal hair/makeup at $175 each. Older PDFs show a $100 booking fee and lower pricing. The live site said the $250 deposit applies toward wedding-day services. Do not treat any of these as final until confirmed.

## Product principle

The website should feel like a premium bridal beauty experience, not a generic salon website.
