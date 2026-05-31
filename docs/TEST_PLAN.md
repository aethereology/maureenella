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
