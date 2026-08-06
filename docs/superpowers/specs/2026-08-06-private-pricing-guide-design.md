# Private Pricing Guide + Inquiry Auto-Responder — Design

Date: 2026-08-06
Status: Approved by founder, ready for implementation planning
Related decisions: amends D004 and D009; introduces D013

## Problem

Maureen has confirmed a three-tier bridal collection menu plus à la carte pricing
and wants it delivered to brides **after** they inquire — never published on the
public site. Today the site has no pricing anywhere and no email back to the
bride at all: `app/actions/inquiry.ts` notifies Maureen and the bride sees only
an inline success message.

This design adds three things:

1. A private, link-gated pricing page.
2. A branded auto-responder email to the bride carrying that link and a Calendly
   booking link.
3. A way for Maureen to mint a pricing link for brides who phone, DM, or email
   instead of using the form.

## Confirmed inputs

Founder-confirmed on 2026-08-06 and safe to publish behind the private link:

### Collections

| Collection | Price | Includes |
| --- | --- | --- |
| Signature Bride | Starting at $450 | Bridal hair; bridal makeup; luxury lashes; bridal touch-up kit; veil placement; wedding morning timeline assistance |
| Bridal Party (**Most Popular**) | Starting at $1,050 | Bridal hair & makeup; hair for 3 bridal party members; makeup for 3 bridal party members; luxury lashes; bridal touch-up kit; wedding morning timeline; on-location service |
| Luxe Wedding | Starting at $1,850 | Bridal hair & makeup; hair for 6 bridal party members; makeup for 6 bridal party members; luxury lashes; bridal touch-up kit; wedding morning timeline; additional artist(s) as needed; on-location service; touch-ups before ceremony (optional) |

Positioning line for Signature Bride: "Perfect for the bride who wants a
flawless, stress-free wedding morning." Bridal Party: "For the bride and her
closest loved ones." Luxe Wedding: "Our complete luxury beauty experience for
larger wedding parties."

### À la carte

| Service | Price |
| --- | --- |
| Bridal Hair | Starting at $250 |
| Bridal Makeup | Starting at $250 |
| Bridal Hair & Makeup | Starting at $450 |
| Bridal Party Hair | $125 per person |
| Bridal Party Makeup | $125 per person |

### Other confirmed values

- Calendly: `https://calendly.com/maureenella/30min` (30-minute consultation)
- `maureenella.com` is a verified Resend sending domain (SPF/DKIM in place)
- Link lifetime: 90 days
- Badge on the middle tier reads **Most Popular**

### Deliberately excluded

Travel, early-start, touch-up-stay, venue-change fees, retainer amount, and
service minimums remain unconfirmed and stay off the page as **numbers**. The
page carries generic policy language only, matching the D010 FAQ wording.

## Decisions taken

| Decision | Choice | Why |
| --- | --- | --- |
| Access model | Signed, expiring per-bride token | Unguessable, self-revoking, no database |
| Token lifetime | 90 days | Outlives a normal booking decision, dies before prices change |
| Email placement of Calendly | Auto-responder **and** pricing page | Two booking chances; page-bottom catches peak interest |
| Manual links | Forwardable link in owner notification **plus** a generator page | Covers phone/DM/email inquiries |
| Page terms | Generic, no numbers | Consistent with D004/D009/D010 gating |
| Email rendering | React Email | ~9 more emails are planned in `docs/EMAIL_SEQUENCES.md` |
| Emoji in collection names | Removed | ✨💍👑 undercut a $1,850 premium tier; `Most Popular` becomes a styled badge |

## Architecture

### Access model — `lib/pricing-link.ts`

HMAC-SHA256 signed tokens. The signature *is* the authorization; there is no
database and no session.

**Payload:** `{ v: 1, n?: string, x: number }` — schema version, optional first
name for personalization, expiry as epoch seconds.

**Token format:** `base64url(JSON payload) + "." + base64url(HMAC-SHA256(payload, secret))`

**Email is deliberately absent from the payload.** The payload is signed, not
encrypted, so anyone holding the link can decode it. The page does not need the
email to render, and if a bride forwards her link, a third party should not be
able to read her address out of the URL. First name only.

**Exports:**

- `createPricingToken({ firstName?, ttlDays = 90 }): string`
- `verifyPricingToken(token): { ok: true; firstName?: string; expiresAt: Date } | { ok: false }`
- `pricingLinkUrl(token): string` — absolute URL built from `site.baseUrl`

**Verification rules.** Compare signatures with `crypto.timingSafeEqual` on
equal-length buffers. Reject on: malformed input, bad base64, JSON parse
failure, `v !== 1`, signature mismatch, or `x` in the past. **Every failure
returns the same `{ ok: false }`** and renders the same expired-link page — the
caller never learns which check failed, and there is no 404 that distinguishes
"real but expired" from "forged."

**Secret:** `PRICING_LINK_SECRET`. In non-production it falls back to a
dev-only constant so `npm run dev` works with no setup. In production the
fallback is refused.

### Routes

**`app/pricing/[token]/page.tsx`** — the guide.

- `export const dynamic = "force-dynamic"`. Required: without it Next caches
  each token's render and the expiry check freezes at first view.
- `metadata`: `noindex, nofollow` via the existing `noindex` option in
  `lib/seo/metadata.ts`.
- Invalid or expired tokens render an expired-link state in the same layout —
  a short apology, the Calendly button, and Maureen's email and phone. Never a
  404, which would read as a broken site rather than an expired link.

**`app/pricing/new/page.tsx`** — owner link generator.

- Guarded by `?key=<PRICING_OWNER_KEY>`, compared with `timingSafeEqual`.
  Missing or wrong key calls `notFound()`.
- Static segments win over dynamic ones in the Next router, so `/pricing/new`
  does not collide with `/pricing/[token]`.
- Optional first-name field; renders the minted link plus a copy button
  (`components/pricing/CopyLinkButton.tsx`, the only client component here).
- `noindex, nofollow`.

**Accepted risk:** a secret in a query string lands in Vercel logs and browser
history. Accepted rather than building auth, because the worst case of a leak
is that someone sees prices Maureen already emails to strangers. Mitigations:
32-byte random key, and documentation instructing that the bookmark be treated
as a password.

### Hiding the routes

- `app/robots.ts` — add `/pricing` to `disallow` alongside `/thank-you`.
- `noindex, nofollow` on both routes.
- `app/sitemap.ts` needs no change: it is an explicit allowlist, so `/pricing`
  can never appear in it.

This is the site's first non-static route. `docs/BUILD_NOTES.md` currently
records that all routes are static/SSG and must be updated.

### Page content — `content/pricing.ts`

Typed export following the `content/education.ts` pattern; components never
import raw JSON. Holds collections, à la carte rows, terms copy, and intro copy.
No new seed JSON file — this content is founder-authored, not extracted from a
legacy source.

Page sections in order:

1. `Prepared for {firstName}` — falls back to a plain heading when the token
   carries no name.
2. Short intro: every wedding is quoted individually; these are starting points.
3. Three collection cards, `Most Popular` badge on Bridal Party.
4. À la carte table.
5. **Good to know** — travel, early-start, and touch-up fees are quoted in your
   proposal; a signed agreement and retainer reserve your date; services are
   on-location. No numbers.
6. Calendly CTA, with reply-by-email and phone as fallbacks.
7. Footer note: "This pricing is private to you and valid through {date}."

Uses the live site design system directly (Cormorant, Jost, the `@theme`
tokens), so no new visual language is introduced.

### Emails

#### Rendering

React Email. New dependencies: `@react-email/components`, `@react-email/render`.
Rendered server-side inside the existing server action and POSTed to the Resend
REST API with `fetch` — the existing pattern in `inquiry.ts` and `waitlist.ts`.
No Resend SDK is added. `render(<Email />, { plainText: true })` produces the
text alternative, so the two versions cannot drift.

Files: `emails/theme.ts` (brand tokens), `emails/InquiryAutoresponder.tsx`, and
shared primitives under `emails/components/` (layout shell, button, eyebrow,
hairline, badge row) built for reuse by the sequences in
`docs/EMAIL_SEQUENCES.md`.

The exact React Email component API must be confirmed against the
`resend:react-email` skill during implementation rather than assumed.

#### Brand tokens in email

Email requires hex literals inlined per element. Direct mapping from `@theme`,
no invented colors:

| Site token | Hex | Email role |
| --- | --- | --- |
| `--color-ivory` | `#f6efe4` | Outer canvas |
| `--color-porcelain` | `#fbf8f3` | Content card |
| `--color-espresso` | `#251d17` | Headings, primary button fill |
| `--color-cocoa` | `#463830` | Body copy |
| `--color-hairline` | `#d8c9b3` | Section rules |
| `--color-taupe-deep` | `#8a7459` | Eyebrows, meta text |
| `--color-rose` | `#c08579` | Index marks, Most Popular accent |

`--radius-card: 0px` carries over — square buttons and cards, which is both
on-brand and the most reliable geometry in email.

**Type is a known compromise.** Cormorant and Jost load through `next/font` and
exist only on the site; email clients outside Apple Mail will not fetch them.
Headings fall back to `Georgia, 'Times New Roman', serif` — the closest widely
installed high-contrast serif to Cormorant. Body uses
`Helvetica Neue, Arial, sans-serif`. The `.eyebrow` treatment (uppercase,
`0.3em` tracking, 11px, taupe-deep) and `.index-mark` (`01 —` in rose)
translate exactly and carry most of the brand signal. The paper-grain SVG is
dropped: data-URI backgrounds fail in Outlook.

**Dark mode is forced off** with `<meta name="color-scheme" content="light">`,
`supported-color-schemes: light`, and explicit `bgcolor` on every cell. Gmail
and Outlook auto-invert light emails, and this warm cream palette inverts into
muddy brown-grey.

**Buttons are bulletproof table buttons with VML fallback for Outlook desktop,
never images.** An image-based button plus Outlook's default image blocking
equals an invisible primary CTA.

#### Auto-responder to the bride (new)

600px table, ivory canvas, porcelain card, hairline rules, 40px padding.

1. Hidden preheader: "Your collections, à la carte pricing, and a link to book a call."
2. `MAUREEN ELLA` letterspaced wordmark
3. `01 —` greeting by first name + receipt confirmation
4. Her submitted details (date, location, services) in a hairline-ruled block —
   reads naturally regardless of what she typed, and doubles as a "here is what
   I received" confirmation
5. **View Your Pricing Guide** — solid espresso button
6. Note that the link is hers and active for 90 days
7. **Book a 30-Minute Call** — outlined button to Calendly
8. "Your inquiry doesn't reserve your date yet — a signed agreement and
   retainer do that." Mirrors the consent checkbox she already ticked, so it
   reads as consistent rather than as a surprise.
9. Portfolio · prep-guides links
10. Sign-off, `maureen@theparlor.info`, `(904) 881-5808`
11. `RECOGNITION` eyebrow + five badges
12. Legal footer

Subject: `Your bridal pricing guide — Maureen Ella`
From: `Maureen Ella <inquiries@maureenella.com>` (verified domain)
Reply-to: `maureen@theparlor.info`, so replies reach Maureen rather than the
sending address.

**Delivery is best-effort**, wrapped in `.catch(console.error)` exactly like
`sendEducationWelcome` in `app/actions/waitlist.ts:79`. A Resend failure on the
bride's email must never fail her form submission — Maureen has already been
notified by that point.

#### Badge assets

The footer badges are 401–1600px RGBA PNGs totalling 930KB, rendered on the
site with `mix-blend-multiply` — a blend mode that does not exist in email.

Generate email-only assets in `public/images/email/`: resized to 220px (2x for
~110px display) and **flattened onto `#f6efe4`** rather than kept transparent.
Flattening is deliberate — it removes all dependence on client alpha handling,
and if any badge turns out to carry a white plate rather than true
transparency, pre-compositing is what prevents it rendering as a white box on
the ivory background. PNG, not WebP: Outlook cannot read WebP. Target ~10KB
each, ~50KB total.

Layout: a five-cell table at 20% width each so they scale proportionally rather
than breaking the 600px shell; roughly 58px per badge on a 320px phone. Each
keeps the alt text already written in `components/layout/SiteFooter.tsx:8-29`,
so with images blocked the row degrades to a readable list of recognitions
instead of five broken icons.

Asset generation is a one-off run (via `npx`, no permanent dependency) whose
output is committed. If a helper script is kept it lives in `scripts/` and is
a convenience only, not a build step.

#### Owner notification (edited)

The existing notification gains one row: **Pricing link (forwardable)**. If a
bride's address bounces or she typo'd it, Maureen can paste the link into a DM
without minting a new one.

### Inquiry action changes — `app/actions/inquiry.ts`

Inside `deliver()`, after the owner notification succeeds:

1. Mint a token with the bride's first name and a 90-day TTL.
2. Send the auto-responder, best-effort.

**Degraded path:** if `PRICING_LINK_SECRET` is missing in production, log a
loud error and send the auto-responder *without* the pricing link — Calendly
and the reply path still work. Better to degrade visibly than to email a dead
URL. This goes on the launch checklist.

`SUCCESS_MESSAGE` is updated to tell her the pricing guide is on its way to her
inbox, so she knows to look for it.

**New abuse surface.** Until now the form only ever mailed Maureen; it now mails
an attacker-supplied address, which makes it a small outbound-mail amplifier —
someone could send branded email to a victim by submitting the form with their
address. Mitigations already in place: the honeypot and timing check return
success *without* sending, and `hit()` caps submissions at 5 per 10 minutes per
IP. Accepted as low risk given that cap, but it must not be loosened without
revisiting this. The Turnstile keys already stubbed in `.env.example` are the
escalation path if abuse appears.

**Injection.** Free-text fields (venue, city, allergies) are interpolated into
the bride's email. React Email escapes JSX children by default, so no
`escapeHtml` call is needed there — but no field may be passed through
`dangerouslySetInnerHTML`, and the existing hand-built owner email keeps its
`escapeHtml` calls.

### Config — `lib/site.ts`

- Add `booking.calendly: { value: "https://calendly.com/maureenella/30min", confirmed: true }`
- Widen `pricing.mode` to include `"private-link"` and set it.
- `pricing.published` stays `false`. Its only two consumers —
  `app/bridal/services/page.tsx:47` and
  `components/sections/ServiceCards.tsx:54` — keep rendering the existing
  inquiry-only language, so the public site is unchanged.

### Environment

| Variable | Purpose | Required in production |
| --- | --- | --- |
| `PRICING_LINK_SECRET` | HMAC signing key, 32 bytes random | Yes — links degrade without it |
| `PRICING_OWNER_KEY` | Generator page guard, 32 bytes random | Yes — page 404s without it |

Added to `.env.example` and `docs/ENVIRONMENT.md`.

## Testing

The repo has no test framework and this design does not add one. The signature
verification is the single place where a bug is a real security hole, so it
gets a genuine test run through `node --test --experimental-strip-types`,
supported by the local Node v22.14.0 with **zero new dependencies**.

`lib/pricing-link.test.ts` covers:

- valid round-trip preserves the first name
- a token past its expiry is rejected
- a single flipped bit in the signature is rejected
- `v !== 1` is rejected
- malformed input (empty string, no dot, invalid base64, non-JSON payload) is
  rejected rather than thrown
- a token signed with a different secret is rejected

`package.json` gains `"test": "node --test --experimental-strip-types lib/*.test.ts"`.

Then `npm run typecheck`, `npm run lint`, `npm run build`, plus a manual pass
recorded in `docs/TEST_PLAN.md`: submit the form in dev, confirm both emails
land, open the link, confirm mobile layout, confirm the expired-link state by
minting a token with a negative TTL, and confirm `/pricing/new` 404s without
the key.

Email rendering is verified by inspection in React Email's preview plus a live
send to a real inbox. Cross-client screenshot testing (Litmus/Email on Acid) is
out of scope; the design leans on conservative table HTML and blocked-image
tolerance to reduce the need for it.

## Files

**New**

- `lib/pricing-link.ts`, `lib/pricing-link.test.ts`
- `content/pricing.ts`
- `app/pricing/[token]/page.tsx`, `app/pricing/new/page.tsx`
- `components/pricing/CollectionCard.tsx`, `ALaCarteTable.tsx`, `CopyLinkButton.tsx`
- `emails/theme.ts`, `emails/InquiryAutoresponder.tsx`, `emails/components/*`
- `public/images/email/badge-1.png` … `badge-5.png`

**Edited**

- `app/actions/inquiry.ts`, `lib/site.ts`, `app/robots.ts`
- `.env.example`, `package.json`
- `docs/DECISIONS.md` (D013), `EMAIL_SEQUENCES.md`, `ENVIRONMENT.md`,
  `TASKS.md`, `TEST_PLAN.md`, `LAUNCH_CHECKLIST.md`, `BUILD_NOTES.md`

## D013 (to be recorded)

Amends D009. Pricing stays off the **public** site — `pricing.published`
remains `false` and no price appears on any indexable page. Confirmed
collection and à la carte pricing is delivered privately, after inquiry, via a
signed expiring link. Founder confirmed the figures on 2026-08-06; travel,
retainer, minimum, and venue-change amounts remain unconfirmed and are excluded.

## Out of scope

- Bridal nurture emails 1–3 and the remaining education sequence (need an ESP drip)
- Any public pricing page
- Analytics on pricing-page views
- A database of issued links, view tracking, or per-link revocation
- Deposit collection or online booking beyond the Calendly handoff
