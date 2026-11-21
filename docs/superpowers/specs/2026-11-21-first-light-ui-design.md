# "First Light" — site-wide creative UI enhancement (D016)

Date: 2026-11-21 · Status: approved by founder ("go with your recommended direction")

## Intent

The site was tasteful but assembled from stock editorial-template parts: decorative
"02 / 03 / 04" section indices, a tracked all-caps label over every heading, arrows
appended to links, the same fade-and-slide on every block. It read as a template,
not as Maureen. This pass gives it a point of view drawn from her world — the
wedding morning — while keeping the client's brief (docs/UI_DIRECTION.md) intact.

## Goals / non-goals

- Goals: one memorable signature moment; quiet, disciplined chrome everywhere else;
  fix real defects (invisible dark-band CTAs, failing label contrast, dead nav
  animation, default 404, 2 MB of fonts); make proof (portfolio, reviews) and the
  Journal easier to browse, especially on a phone.
- Non-goals: rebrand, new fonts, new palette, new npm dependencies, changes to
  content/copy facts, form logic, server actions, schema, analytics events, or
  pricing gating.
- Anti-goals: anything that publishes unconfirmed facts; fake urgency; motion that
  makes the site feel busy.

## Approaches considered

1. **Refine the Atelier** — keep everything, polish. Lowest risk, but stays generic.
2. **First Light (chosen)** — keep palette + type, replace template chrome, and spend
   the boldness on one subject-grounded moment: the wedding-morning timeline.
3. **Full re-art-direction** — new type and layouts. Conflicts with the brief and the
   founder's just-localized fonts.

## Design system

- **Palette** unchanged (porcelain, ivory, cream, oatmeal, taupe, espresso, cocoa, rose,
  champagne). New ink tokens for small text: `taupe-ink #75614a` (5.6:1 porcelain,
  4.7:1 cream) and `rose-deep #9a5e52` (4.8:1 porcelain). Base `taupe-deep` (3.6–4.2:1)
  and `rose` (2.9:1) are no longer used for small text.
- **Type**: Cormorant Garamond + Jost, self-hosted Latin WOFF2 subsets (~142 KB, was ~2 MB).
  Headings `text-wrap: balance` + old-style figures; paragraphs `text-wrap: pretty`.
- **Labels** (`.eyebrow`): Cormorant italic, sentence case, 1.125rem, `taupe-ink`
  (champagne on dark). Use only when it tells the reader something the heading doesn't.
- **Numbers** (`.index-mark`): only for real sequences (the process). Removed from
  section headings, the hero, the service list, the mobile menu and page mastheads.
- **Buttons**: colours resolve through `--btn-*` CSS variables; `Section tone="espresso"`
  sets `data-tone="dark"` which flips them, so CTAs are never espresso-on-espresso.
  No shine sweep, no appended arrows. Ghost links: a hairline underline that draws in
  on hover. Button text stays uppercase Jost (consistent with emails + pricing guide).
- **Mastheads** (`PageHeader`): no "M" watermark, no trailing rose period; a still,
  faint champagne light in the top corner.

## Motion

- **Signature — "first light" timeline** (`components/sections/ProcessSteps.tsx`): as the
  process section scrolls through, a line draws through the five steps and a soft
  champagne light travels along it, lighting each marker. Horizontal ≥ lg, vertical
  below. Reduced motion: fully drawn and lit, static. Plain `<ol>` without JS.
- Reveals are quieter site-wide (8px, 0.55s, delays capped at 160ms).
- Motion that answers an action stays (button press, menu open, lightbox, filters).
- Nav active state is a CSS marker (the old `layoutId` animation never ran under
  `LazyMotion domAnimation`).

## Features

- Branded 404 (`app/not-found.tsx`) with paths back to Bridal, Portfolio, Journal, Contact.
- Portfolio: keyboard-accessible lightbox with credits; reviews collapse on mobile with
  a "Show more reviews" control.
- Journal: category filter on the index (all posts still in the HTML for crawlers),
  calmer reading experience on articles.

## Constraints kept

CTA wording (Request Availability / Check My Date; pricing guide "Book a 30-Minute Call"),
gating flags in `lib/site.ts` + `lib/permissions.ts`, D003 (no Education CTAs in the
bridal funnel), D013 (no prices on public pages), JSON-LD, analytics events, CSP
(self-hosted assets only), static rendering.
