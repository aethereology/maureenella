# Test Plan

## Functional tests

### Navigation

- All nav links work on desktop and mobile.
- CTA buttons go to the correct page/section.
- Breadcrumbs work on nested pages.

### Inquiry form

- Required fields validate.
- Invalid email shows error.
- Form submission succeeds.
- Success message appears.
- Error state appears when service fails.
- Submission reaches intended destination.
- Spam protection does not block normal users.

### Content

- Services display correct confirmed values or safe placeholders.
- Portfolio filters work.
- Blog article pages render.
- FAQ accordion works.
- Lead magnet forms work.

## SEO tests

- Unique title on every page.
- Unique meta description on every page.
- Canonical URL on every indexable page.
- Sitemap returns 200.
- Robots.txt returns 200.
- No accidental noindex on public pages.
- Structured data validates.
- Redirects resolve correctly.

## Accessibility tests

- Keyboard navigation.
- Visible focus states.
- Form labels.
- Error messages linked to inputs.
- Alt text on important images.
- Decorative images hidden from screen readers.
- Color contrast.
- No heading level skipping that harms structure.

## Performance tests

- Lighthouse mobile pass target.
- Optimized image sizes.
- Lazy-loaded gallery images.
- No unnecessary large JS libraries.
- Third-party scripts minimized.

## Content accuracy tests

- Confirmed pricing only.
- Confirmed contact details only.
- Photographer credits present.
- No unsupported product claims.
- Affiliate disclosure present where applicable.
- Old brand names only used intentionally in legacy context.

## Launch tests

- Production URL loads.
- SSL works.
- Forms work in production.
- Analytics fires.
- Search Console verified.
- Sitemap submitted.
- 404 page works.
- Redirect map tested.

## Private pricing guide (D013)

- `npm test` — 13 pricing-link tests pass.
- Valid link renders "Prepared for <name>", three collections (Gold / Diamond / Platinum, D014), "Highly Requested" on Diamond, "Travel fee may apply." on all three, five à la carte rows.
- Expired link (`ttlDays: -1`), tampered signature, and `/pricing/nonsense` all render the expired page at HTTP 200 — never a 404.
- Page source contains `noindex, nofollow`; `/robots.txt` disallows `/pricing`; `/sitemap.xml` contains no `pricing`.
- 375px viewport: cards stack, no horizontal scroll, badge does not clip.
- `/pricing/new` 404s with no key and with a wrong key; renders and copies with the right key.
- Form submission (take >3s) delivers both emails.
- Bride's email: badges render, both buttons work, Reply goes to maureen@theparlor.info.
- Bride's email in Gmail web + phone: no dark-mode inversion, no horizontal scroll.
- Degraded path: with `PRICING_LINK_SECRET` unset the submission still succeeds and the email sends without the pricing block. **Test this against a production build (`npm run build && npm run start`) — not `npm run dev`.** `lib/pricing-link.ts` only throws on a missing secret when `NODE_ENV === "production"`; under `npm run dev`, `NODE_ENV` is `development`, so it silently falls back to a dev-only constant, the pricing link still renders, and the tester gets a false pass.
- No unconfirmed amount (travel, retainer, minimum, venue change) appears anywhere.
