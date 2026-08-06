# Launch Checklist

## Pre-launch content

- [ ] Confirm pricing and policies.
- [ ] Confirm contact/NAP details.
- [ ] Confirm image permissions and credits.
- [ ] Proofread all pages.
- [ ] Add all metadata.
- [ ] Add all structured data.
- [ ] Add redirects.

## Technical

- [ ] Production build passes.
- [ ] Type checks pass.
- [ ] Lint passes.
- [ ] Sitemap works.
- [ ] Robots.txt works.
- [ ] 404 page works.
- [ ] Forms work.
- [ ] Analytics works.
- [ ] No secrets committed.

## SEO

- [ ] Search Console verified.
- [ ] Sitemap submitted.
- [ ] Canonicals correct.
- [ ] No duplicate title/meta on core pages.
- [ ] Legacy URLs redirect.
- [ ] LocalBusiness schema validated.

## Private pricing guide (D013)

- [ ] Confirm `https://maureenella.com` (`site.baseUrl`, hardcoded) actually
      resolves to this deployment *before* the contact form can fire in
      production. Every emailed pricing link is built from that base URL — if
      production is live on a `*.vercel.app` host during DNS cutover, every
      link mailed in the interim 404s, and the bride has no way to tell that
      apart from a normally expired link.
- [ ] `PRICING_LINK_SECRET` set in Vercel production **and** preview
- [ ] `PRICING_OWNER_KEY` set in Vercel production
- [ ] `EMAIL_ASSET_BASE_URL` left unset in production (it defaults to the live site)
- [x] maureenella.com verified in Resend with SPF + DKIM — confirmed 2026-08-06
- [x] Live end-to-end send verified through Resend — 4 emails covering both the happy path (pricing link present) and the degraded path (`PRICING_LINK_SECRET` unset) — 2026-08-06
- [ ] Post-deploy smoke test: send one live test inquiry against production and confirm the bride's email lands in the inbox, not spam (check Gmail, Outlook, and iCloud if possible)
- [ ] Give Maureen the `/pricing/new?key=…` URL to bookmark, and tell her to treat it as a password
- [ ] Confirm https://maureenella.com/robots.txt disallows /pricing

## Post-launch

- [ ] Test inquiry form daily for first week.
- [ ] Monitor 404s.
- [ ] Monitor Search Console indexing.
- [ ] Update Google Business Profile website link.
- [ ] Update Instagram/Facebook/Pinterest links.
- [ ] Ask past clients for Google reviews.
- [ ] Add more real weddings monthly.
