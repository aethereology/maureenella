# Redirect Map — theparlor.info → maureenella.com

**Status: VERIFIED and implemented.** Source: live sitemaps fetched from
`theparlor.info/sitemap.xml` on 2026-07-12 (pages-sitemap, blog-posts-sitemap,
blog-categories-sitemap; canonical host `www.theparlor.info`). Implemented in
`seed/redirects.json`, consumed by `lib/seo/redirects.ts` → `next.config.ts`.
Order matters: specific `/post/...` rules precede the `/post/:slug` catch-all.

The old site was still publishing as of 2026-07-11 — **re-fetch the sitemaps and
re-sync this map as the last step before cutover** (see D007 / TASKS.md).

## Host-level redirect (done at cutover, not in code)

`theparlor.info` + `www.theparlor.info` become redirect domains on the Vercel
project → `https://maureenella.com` (path-preserving 308). Path rules below then
map old paths to new pages. Two permanent hops total — fine for Google.

## Pages (17 verified)

| Legacy path | New URL | Notes |
|---|---|---|
| `/` | `/` | host redirect covers it |
| `/bridal-hair-and-makeup` | `/bridal` | main service page |
| `/wedding-makeup-artist` | `/bridal/services` | |
| `/wedding-hair-stylist-near-me` | `/bridal/services` | |
| `/services-4`, `/services-9` | `/bridal/services` | |
| `/features` | `/bridal/portfolio` | |
| `/general-5` | `/bridal/faq` | |
| `/prepguide`, `/weddingdayguide` | `/bridal/prep-guides` | |
| `/salonsuite` | `/about` | |
| `/maureenella` | `/about` | |
| `/courses` | `/education` | |
| `/mrlblog`, `/news` | `/journal` | |
| `/contact` | `/contact` | self — filtered at build, host redirect covers it |
| `/thank-you` | `/thank-you` | self — host redirect covers it |

## Blog posts (24 verified `/post/*` slugs)

| Legacy `/post/` slug | New URL |
|---|---|
| `how-securing-a-parking-space-for-your-hair-and-makeup-vendor-saves-time-on-your-wedding-morning` | `/journal/wedding-morning-parking-hair-makeup-vendor` |
| `lash-extensions-vs-false-lashes-key-differences` | `/journal/lash-extensions-vs-false-lashes-wedding` |
| `wedding-day-elegance-top-lip-colors-to-perfect-your-bridal-look` | `/journal/wedding-day-lip-colors` |
| `captivating-fragrances-for-your-special-day-top-perfumes-to-elevate-your-wedding-aura` | `/journal/wedding-day-fragrance` |
| `luxy-hair-extensions-elevate-your-hair-game-with-quality-and-style` | `/journal/wedding-hair-extensions` |
| `best-hair-extensions` | `/journal/wedding-hair-extensions` |
| `bridal-hair-prep-guide` | `/bridal/prep-guides/hair-prep` |
| `bridal-hair-preparation-guide-to-your-dream-hairstyle` | `/bridal/prep-guides/hair-prep` |
| `bridal-makeup-prep-a-guide-for-brides-on-their-wedding-morning` | `/bridal/prep-guides/makeup-prep` |
| `st-augustine-beach-elopement-mcklevey-and-ryan-s-love-story` | `/bridal/st-augustine` † |
| `keely-s-wedding-day-prep-at-bowing-oaks-a-tale-of-love-laughter-and-vows` | `/bridal/jacksonville` † |
| `they-simply-eloped-angeline-shane-s-intimate-union-in-yulee-florida` | `/bridal/portfolio` † |
| `floridaelopementt` | `/bridal/portfolio` |
| `from-salon-chair-to-my-own-private-salon-suite-a-journey-of-bridal-beauty-and-entrepreneurship` | `/about` |
| `where-is-all-began-maureen-at-the-parlor-bridal-hair-and-makeup` | `/about` |
| `wedding-veil-bringing-tradition-to-modern-elegance` | `/favorites` |
| `discover-beauty-and-honesty-with-the-honest-company-beauty-makeup-products-for-sensitive-skin` | `/favorites` |
| `achieve-bridal-radiance-the-ultimate-guide-to-sunless-tanning-lotion` | `/favorites` |
| `ysl-beauty-elevate-your-elegance-with-personalized-engravings-for-bride` | `/favorites` |
| `unveiling-the-hottest-trends-the-top-10-trending-blow-dryers-you-need-to-know` | `/favorites` |
| `bridal-beauty-essential-color-wow-s-holy-grail-blow-drying-products-for-perfect-hairstyling` | `/favorites` |
| `elevating-your-bridal-look-exploring-bridal-hair-accessories-and-the-sentimental-touch-of-heirloom` | `/favorites` |
| `where-heritage-meets-home-shane-angeline-s-filipino-inspired-wedding` | `/journal` ‡ |
| `template-how-to-write-a-tips-blog-post-2` | `/journal` (junk template page) |

† Real-wedding journal equivalents (`st-augustine-beach-elopement-hair-makeup`,
`bowing-oaks-wedding-hair-makeup`) exist as bodiless stubs — deliberately NOT
redirect targets until bodies ship. When a stub goes live, update its one
redirect line in `seed/redirects.json`.

‡ Published on the old site 2026-07-11 — migrate via `content-migrator` once
real-wedding permissions clear, then retarget.

## Catch-alls (last in order)

| Pattern | New URL |
|---|---|
| `/mrlblog/categories/:category` | `/journal` (4 known categories) |
| `/post/:slug` | `/journal` (safety net for unmapped/future posts) |

## Implementation notes

- All redirects are 301 in the seed; self-redirects are filtered by `lib/seo/redirects.ts`.
- Never redirect ranking legacy posts to bodiless "coming soon" stubs (soft-404 risk).
- Monitor GSC 404s on both properties for 2–4 weeks post-cutover; patch here + seed.
