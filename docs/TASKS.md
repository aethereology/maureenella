# Tasks

## Setup

- [x] Create repo or confirm existing repo. (git initialized; initial commit 1a720ab)
- [x] Add this package to repo root.
- [x] Configure `.env.example` without secrets.
- [x] Confirm package manager. (npm)
- [x] Confirm deployment target. (Vercel — project `sparkcreativesinc/maureenella`, GitHub-connected to aethereology/maureenella; live at maureenella.vercel.app since 2026-07-12. Custom domain attaches at cutover.)
- [x] Email delivery configured. (Resend: maureenella.com VERIFIED 2026-07-12 — DKIM/SPF records in Cloudflare DNS; sending key in Vercel prod+preview + .env.local; test send from inquiries@maureenella.com succeeded. Prod forms → maureen@theparlor.info, preview → kyle@.)
- [x] Configure git ignore for local Claude/settings/env files. (+ raw media assets/, maureen/ — D006)

## Pre-launch hardening (D006)

- [x] Security headers in `next.config.ts` (CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy) — verified at runtime.
- [x] Per-IP rate limiting on inquiry + waitlist server actions (`lib/rate-limit.ts`).
- [ ] Upgrade rate limiter to a shared store (Upstash via Vercel Marketplace) or Vercel BotID/WAF before high-traffic launch.
- [x] Gate `noindex` + sitemap entries for portfolio/reviews on the permission flags (audit finding #4). (Coming-soon journal posts already 404 + excluded from sitemap.)
- [x] Wire `aria-describedby` on the inquiry consent checkboxes (audit finding #5).
- [x] `public/llms.txt` for AI-search visibility.
- [ ] Optional: CI (`typecheck && lint && build`) + a Playwright smoke test.

## Content confirmation

- [x] Confirm current pricing. (D009: pricing stays OFF the site — inquiry-only is the standing policy; no numbers to publish.)
- [ ] Confirm deposit/date reservation terms.
- [ ] Confirm whether deposit applies to final total.
- [ ] Confirm minimum service policy.
- [ ] Confirm travel fee formula.
- [ ] Confirm venue/location change fee.
- [ ] Confirm touch-up hourly rate.
- [ ] Confirm gratuity policy.
- [ ] Confirm payment methods and deadlines.
- [x] Confirm phone/hours + public email. (D009: (904) 881-5808, daily 6 AM–6 PM, maureen@theparlor.info — wired in lib/site.ts, footer, contact page, LocalBusiness schema.) Street address still unconfirmed.
- [ ] Confirm image permissions and photographer credits. (assets/ verified as local archive of old-site media — NOT publish clearance.)

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
- [ ] Rewrite real weddings as case studies. (incl. new "Shane & Angeline Filipino wedding" post published on old site 2026-07-11 — retarget its redirect after migration)
- [x] Build redirect map. (verified against live theparlor.info sitemaps 2026-07-12 — 17 pages, 24 posts, 4 categories; implemented in `seed/redirects.json`; see docs/REDIRECT_MAP.md + D007)
- [ ] Add internal links.

## SEO

- [x] Add sitemap. (app/sitemap.ts — dynamic)
- [x] Add robots. (app/robots.ts)
- [x] Add canonical URLs. (per-route via pageMetadata)
- [x] Add OG images. (default OG + per-page images)
- [x] Add LocalBusiness schema. (BeautySalon with confirmed phone/email/hours + areaServed; street address omitted until confirmed — D009)
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

## Launch — domain cutover (ordered, per D007/D008: one DNS move, straight to Vercel DNS)

- [ ] **NOW, not blocked:** confirm auto-renew + valid payment for theparlor.info at Squarespace Domains (expires 2026-10-18).
- [ ] Content freeze on theparlor.info; re-fetch old sitemaps and re-sync `seed/redirects.json` + docs/REDIRECT_MAP.md.
- [ ] Point maureenella.com at Vercel via **Cloudflare DNS** (zone moved to Cloudflare, 2026-07-12: randy/ines.ns.cloudflare.com) — A `76.76.21.21` apex + CNAME `cname.vercel-dns.com` www, **DNS-only (grey cloud), not proxied** (Vercel handles TLS/CDN); keep the Resend `send.*` records. Attach domain to the Vercel project. (App already deployed: maureenella.vercel.app.)
- [ ] Test production forms.
- [ ] Snapshot the full Wix DNS zone for theparlor.info (Wix Domain DNS API) → save to docs/LEGACY_DNS_SNAPSHOT.md (rollback map).
- [ ] Add theparlor.info + www as **redirect domains → maureenella.com** on the Vercel project; in Vercel DNS re-create the non-web records from the snapshot: Google MX (`aspmx.l.google.com` set), SPF TXT (`v=spf1 include:_spf.google.com ~all`), AdSense TXT, any DKIM/verification records.
- [ ] GSC: verify maureenella.com (TXT at Namecheap) and theparlor.info (TXT in Vercel DNS); export old-site query/page baseline first.
- [ ] **The one DNS change:** at Squarespace Domains switch theparlor.info nameservers Wix → `ns1/ns2.vercel-dns.com`. (Rollback = switch back to Wix; the Wix zone stays intact until premium is cancelled.)
- [ ] Verify live: redirect chains (`curl -I https://theparlor.info/features` → `/bridal/portfolio`; sample posts, categories, www + apex) **and email send/receive on maureen@theparlor.info** (+ `nslookup -type=MX`).
- [ ] GSC Change of Address: theparlor.info → maureenella.com.
- [ ] Submit https://maureenella.com/sitemap.xml in GSC; request recrawl for key pages.
- [ ] Update Google Business Profile website URL (only after redirects verified).
- [ ] Update social links (Instagram/Pinterest/Facebook bios).
- [ ] Backlink outreach: old GSC Links report + local wedding directories/vendor lists → ask for updated links.
- [ ] Keep theparlor.info registered + redirecting 12+ months minimum.
- [ ] Monitor GSC 404s/coverage on both properties + form submissions for 2–4 weeks; patch redirect map as needed.

## Wix exit (D008 — after cutover verified + 2–4 weeks stable; saves ~$200–400/yr)

- [x] Archive old-site media. (Verified 2026-07-12: already local in gitignored `assets/` — Wix `~mv2` files, old-brand images, IG scrapes, price-sheet PDFs. No download crawl needed.) Optional: PDF/HTML snapshots of the 17 pages before cancellation.
- [ ] Wix housekeeping: remove stale maureenella.com connected-domain entry; disconnect theparlor.info from the Wix site.
- [ ] Safety check on manage.wix.com Billing/subscriptions: confirm nothing else rides on the premium plan (Workspace is Google-direct per founder).
- [ ] **Unpublish the old Wix site** so it can't resurface at `*.wixsite.com` as duplicate content after downgrade.
- [ ] Turn off auto-renew / cancel Wix premium. Keep the free Wix account as dormant archive (The Parlor editor content + old MaureenElla wixsite — still a content-migrator source).
- [ ] One week later: re-verify redirects + email still working; spot-check media archive against the extraction doc.

⚠️ Guardrails: never cancel Wix premium before the nameserver move is verified (the Wix zone is the rollback); never let theparlor.info registration lapse (2026-10-18); email MX/SPF/DKIM must exist in Vercel DNS **before** the nameserver switch.
