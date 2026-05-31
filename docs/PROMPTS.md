# Prompts

## Claude Code kickoff

```text
Read CLAUDE.md, MEMORY.md, docs/PRODUCT_SPEC.md, docs/ROADMAP.md, docs/TASKS.md, docs/UI_DIRECTION.md, docs/SEO_STRATEGY.md, docs/CONFIRMATION_NEEDED.md, and seed/*.json. Then summarize the project, risks, assumptions, and recommended Phase 1 build sequence. Do not start coding until you produce a plan.
```

## Build first page

```text
Build the Home page from docs/PRODUCT_SPEC.md and docs/UI_DIRECTION.md. Use seed/navigation.json, seed/testimonials.json, and seed/services.json. Keep bridal CTA primary. Do not publish unconfirmed pricing. Add metadata and schema placeholders.
```

## Create schema helpers

```text
Create reusable JSON-LD helpers for Organization, LocalBusiness/BeautySalon, Service, Article, FAQPage, and BreadcrumbList. Use only confirmed business facts. For unconfirmed fields, omit rather than guessing.
```

## Migrate a blog post

```text
Rewrite this legacy blog post into a Maureen Ella Journal article. Preserve useful details, improve structure, add internal links to Bridal Services and Request Availability, create title/meta/slug, and mark any facts needing confirmation.
```

## SEO review

```text
Review this page for SEO. Check title, meta description, H1/H2 structure, internal links, image alt text, local keywords, schema opportunities, canonical URL, and conversion CTA. Return exact fixes.
```

## Content accuracy review

```text
Review this copy for unconfirmed facts, pricing conflicts, unsupported product/skin claims, missing photographer credits, and brand consistency. Flag anything that should be confirmed before publishing.
```

## QA review

```text
Perform a launch-readiness QA on the current implementation. Check functionality, mobile layout, accessibility, SEO, redirects, analytics, forms, and content accuracy. Return blockers first.
```
