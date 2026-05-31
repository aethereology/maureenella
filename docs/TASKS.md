# Tasks

## Setup

- [x] Create repo or confirm existing repo. (git initialized; initial commit 1a720ab)
- [x] Add this package to repo root.
- [x] Configure `.env.example` without secrets.
- [ ] Confirm package manager.
- [ ] Confirm deployment target.
- [x] Configure git ignore for local Claude/settings/env files. (+ raw media assets/, maureen/ — D006)

## Pre-launch hardening (D006)

- [x] Security headers in `next.config.ts` (CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy) — verified at runtime.
- [x] Per-IP rate limiting on inquiry + waitlist server actions (`lib/rate-limit.ts`).
- [ ] Upgrade rate limiter to a shared store (Upstash via Vercel Marketplace) or Vercel BotID/WAF before high-traffic launch.
- [ ] Gate `noindex` + sitemap entries for portfolio/reviews/coming-soon journal on the permission flags (audit finding #4).
- [ ] Wire `aria-describedby` on the inquiry consent checkboxes (audit finding #5).
- [ ] Optional: CI (`typecheck && lint && build`) + a Playwright smoke test; `public/llms.txt` for AI-search visibility.

## Content confirmation

- [ ] Confirm current pricing.
- [ ] Confirm deposit/date reservation terms.
- [ ] Confirm whether deposit applies to final total.
- [ ] Confirm minimum service policy.
- [ ] Confirm travel fee formula.
- [ ] Confirm venue/location change fee.
- [ ] Confirm touch-up hourly rate.
- [ ] Confirm gratuity policy.
- [ ] Confirm payment methods and deadlines.
- [ ] Confirm phone/address/hours.
- [ ] Confirm image permissions and photographer credits.

## Build foundation

- [x] Create route structure.
- [x] Create design tokens. (app/globals.css, Tailwind v4 @theme)
- [x] Create layout components.
- [x] Create navigation and footer.
- [x] Add SEO metadata helpers. (lib/seo/metadata.ts)
- [x] Add schema helpers. (components/seo/JsonLd.tsx)
- [x] Add image component wrapper. (next/image used throughout)
- [x] Add CTA component.
- [x] Add form component.
- [x] Add content data loaders. (lib/content.ts — CMS-ready)

## Pages

- [x] Home.
- [x] Bridal landing.
- [x] Services.
- [x] Portfolio. (filterable)
- [x] Reviews.
- [x] FAQ.
- [x] Prep guides index.
- [x] Individual prep guide pages. (hair / makeup / trial)
- [x] Journal index.
- [x] Journal article template.
- [x] Education landing. (Phase 3 — full offer + lead magnet + waitlist)
- [x] Education starter checklist lead magnet. (`/education/starter-checklist`)
- [x] Favorites landing. (teaser + disclosure)
- [x] About.
- [x] Contact / Request Availability.

## Content migration

- [ ] Migrate current theparlor.info blog posts.
- [ ] Migrate old Wix blog posts.
- [ ] Merge duplicate fragrance and lip posts.
- [ ] Merge curly hair posts.
- [ ] Merge hair extension posts.
- [ ] Rewrite real weddings as case studies.
- [ ] Build redirect map.
- [ ] Add internal links.

## SEO

- [x] Add sitemap. (app/sitemap.ts — dynamic)
- [x] Add robots. (app/robots.ts)
- [x] Add canonical URLs. (per-route via pageMetadata)
- [x] Add OG images. (default OG + per-page images)
- [ ] Add LocalBusiness schema. (BLOCKED — needs confirmed NAP)
- [x] Add Article schema.
- [x] Add Breadcrumb schema.
- [x] Add FAQ schema where eligible.
- [ ] Validate structured data. (run Rich Results Test post-deploy)
- [ ] Submit sitemap in Search Console. (post-launch)

## Forms and analytics

- [x] Build inquiry form.
- [x] Add spam protection. (honeypot + timing check)
- [x] Add success and error states.
- [x] Connect to email/CRM. (Resend + optional webhook; needs env keys)
- [x] Track form starts.
- [x] Track form submissions.
- [x] Track CTA clicks.
- [ ] Track affiliate clicks if Favorites launches. (event wired; activates with products)

## QA

- [ ] Mobile QA.
- [ ] Accessibility QA.
- [ ] SEO QA.
- [ ] Performance QA.
- [ ] Redirect QA.
- [ ] Form QA.
- [ ] Cross-browser QA.
- [ ] Content accuracy QA.

## Launch

- [ ] Confirm DNS.
- [ ] Deploy production.
- [ ] Test production forms.
- [ ] Submit sitemap.
- [ ] Request Google recrawl for key pages.
- [ ] Update Google Business Profile website URL if needed.
- [ ] Update social links.
- [ ] Monitor 404s and form submissions for 2 weeks.
