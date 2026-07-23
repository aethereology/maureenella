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
- [x] Gate `noindex` + sitemap entries for portfolio/reviews on the permission flags (audit finding #4). (Coming-soon journal posts already 404 + excluded from sitemap.) Flags flipped TRUE 2026-07-12 (D010) — both pages now indexed + in sitemap.
- [x] Wire `aria-describedby` on the inquiry consent checkboxes (audit finding #5).
- [x] `public/llms.txt` for AI-search visibility.
- [ ] Optional: CI (`typecheck && lint && build`) + a Playwright smoke test.

## Content confirmation

- [x] Confirm current pricing. (D009: pricing stays OFF the site — inquiry-only is the standing policy; no numbers to publish.)
- [x] Confirm deposit/date reservation terms. (D010: generic industry-standard FAQ copy — retainer + signed agreement, no amounts; refine anytime.)
- [x] Confirm whether deposit applies to final total. (D010: "outlined in your proposal" language; specifics stay inquiry-only.)
- [ ] Confirm minimum service policy. (covered generically in FAQ; exact minimum stays inquiry-only)
- [x] Confirm travel fee formula. (D010: "itemized in your proposal" — no formula published.)
- [ ] Confirm venue/location change fee. (agreement-level detail; not published)
- [ ] Confirm touch-up hourly rate. (inquiry-only)
- [ ] Confirm gratuity policy. (agreement-level detail; not published)
- [x] Confirm payment methods and deadlines. (D010: balance-before-wedding language; specifics in proposal.)
- [x] Confirm phone/hours + public email + street address. (D009/D010: (904) 881-5808, daily 6 AM–6 PM, maureen@theparlor.info, 206 Ashourian Ave St. Augustine FL 32092 — wired in lib/site.ts, footer, contact page, LocalBusiness schema with full NAP.)
- [x] Confirm image permissions and photographer credits. (D010: founder approved assets/portfolio; 16 credited gallery images published, optimized 86MB→4MB.)

## Build foundation

- [x] Create route structure.
- [x] Create design tokens. (app/globals.css, Tailwind v4 @theme)
- [x] Create layout components.
- [x] Add the premium motion system. (2026-07-22 — Motion 12, shared-layout
  navigation/filter indicators, spring interactions, scroll progress + hero
  parallax, in-view/staggered reveals, gallery/review presence transitions,
  route transitions, reduced-motion support, and desktop/mobile visual QA.)
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

- [x] Migrate current theparlor.info blog posts. (D011 — all 24 accounted for: rewritten, merged, or skipped-with-rationale)
- [x] Migrate old Wix blog posts. (D011 — 6 business-mentorship articles incl. Lola origin story; dupes skipped)
- [x] Merge duplicate fragrance and lip posts. (covered by existing articles; Sephora-sale variants folded in)
- [x] Merge curly hair posts. (covered by curly-bridal-hair-prep)
- [x] Merge hair extension posts. (covered by wedding-hair-extensions)
- [x] Rewrite real weddings as case studies. (D011 — 4 published incl. Shane & Angeline Filipino wedding; redirects retargeted)
- [x] Build redirect map. (verified against live theparlor.info sitemaps 2026-07-12 — 17 pages, 24 posts, 4 categories; implemented in `seed/redirects.json`; see docs/REDIRECT_MAP.md + D007. Retargeted to 1:1 articles in D011.)
- [ ] Add internal links. (body block model has no inline links — future enhancement)
- [x] Add 3 new original (non-migration) bridal-prep posts (2026-07-22): wedding
  hair/makeup timeline, bridal preview what-to-expect, choosing a bridal
  hairstylist. Journal now 27 published articles.

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
- [x] Point maureenella.com at Vercel via Cloudflare DNS. (**LIVE 2026-07-12**: A `76.76.21.21` + www CNAME `cname.vercel-dns.com` DNS-only; stale Namecheap parking A + www records removed; apex + www attached to the Vercel project; https://maureenella.com serving with all content, schema, redirects, headers verified. www TLS cert was still issuing at check time.)
- [x] Test production forms. (E2E via headless browser 2026-07-12: inquiry form success + Resend 'delivered' to maureen@theparlor.info. Note: submissions from tabs opened before a redeploy 404 — global error boundary added with refresh guidance.)
- [ ] Snapshot the full Wix DNS zone for theparlor.info (Wix Domain DNS API) → save to docs/LEGACY_DNS_SNAPSHOT.md (rollback map).
- [x] theparlor.info + www added to the Vercel project as redirect domains; email DNS records created by operator (2026-07-12).
- [ ] GSC: verify maureenella.com (TXT at Namecheap) and theparlor.info (TXT in Vercel DNS); export old-site query/page baseline first.
- [x] Snapshot Wix DNS zone → docs/LEGACY_DNS_SNAPSHOT.md (done 2026-07-12; keep-list = Google MX/SPF/AdSense TXT; Ascend DKIM CNAMEs die with Wix).
- [x] **DNSSEC disabled + nameservers switched** at Squarespace (2026-07-12). Verified on 1.1.1.1/8.8.8.8: NS = ns1/ns2.vercel-dns.com, DS record gone, MX = aspmx.l.google.com, SPF + AdSense TXT present.
- [x] Verify redirects at Vercel edge (2026-07-12): theparlor.info → 308 www.maureenella.com; www.theparlor.info → 308 maureenella.com; paths preserved (`/features` chain → `/bridal/portfolio`). Residual Wix responses during TTL expiry window are expected (~1h; Wix zone intact as rollback).
- [x] Redirect targets normalized via Vercel API (2026-07-12): theparlor.info, www.theparlor.info, and www.maureenella.com all 308 → maureenella.com (apex). Old-domain deep paths reach final articles in 2 hops.
- [x] **Email inbound test:** PASSED 2026-07-12 — live inquiry-form test delivered to maureen@theparlor.info through the new DNS (Resend status: delivered).
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
