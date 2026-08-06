# Private Pricing Guide + Inquiry Auto-Responder Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver Maureen's confirmed bridal pricing to brides through a signed, expiring private link sent in a branded auto-responder email immediately after they submit the contact form.

**Architecture:** Pricing lives on `/pricing/[token]`, a `noindex`, robots-disallowed, force-dynamic route whose access control is an HMAC-SHA256 signature over a small payload — no database, no session. The existing `submitInquiry` server action mints a 90-day token and sends a React Email auto-responder carrying that link plus a Calendly booking link. A key-guarded `/pricing/new` page lets Maureen mint links for brides who phone or DM instead of using the form.

**Tech Stack:** Next.js 15.5.21 App Router, React 19, TypeScript 5.7.3, Tailwind v4 (CSS-first `@theme` in `app/globals.css`), Resend REST API via `fetch`, React Email, Node `crypto`.

**Spec:** `docs/superpowers/specs/2026-08-06-private-pricing-guide-design.md`

## Global Constraints

- **Never publish unconfirmed business facts** (D004/D005). Travel, retainer, service-minimum, touch-up-stay, and venue-change **amounts** are unconfirmed — they must not appear anywhere in this feature. Only the figures in Task 3 are confirmed.
- `site.pricing.published` stays `false`. No price may appear on any public, indexable page. Do not modify `app/bridal/services/page.tsx` or `components/sections/ServiceCards.tsx`.
- Calendly URL is exactly `https://calendly.com/maureenella/30min`.
- Link lifetime is **90 days**.
- The middle collection's badge reads exactly **Most Popular**.
- **No emoji** in collection names (the founder's source text had ✨💍👑; these are deliberately dropped).
- Runtime deps to add: `@react-email/components@^1.0.12`, `@react-email/render@^2.1.0`. Dev dep: `react-email@^6.9.1` (it is the CLI — socket.io, esbuild, chokidar — and must NOT be a runtime dependency).
- `sharp@0.34.5` is already present as a Next transitive dependency. Do not add it to `package.json`.
- `lib/pricing-link.ts` must import **only** `node:crypto` — no `@/` path aliases — because its test runs under bare `node --test`, which does not resolve the alias.
- Every user-visible string follows `.claude/rules/ui-ux.md`: CTA language is "Request Availability" or "Check My Date" on bridal funnels.
- Run `npm run typecheck` and `npm run lint` before every commit.

---

## File Structure

**Create**

| File | Responsibility |
| --- | --- |
| `lib/pricing-link.ts` | Mint + verify signed tokens. Pure; only `node:crypto`. |
| `lib/pricing-link.test.ts` | Security tests for the above. |
| `content/pricing.ts` | Confirmed pricing data + page copy. Typed, no JSX. |
| `components/pricing/CollectionCard.tsx` | One collection tier. |
| `components/pricing/ALaCarteTable.tsx` | À la carte list. |
| `components/pricing/CopyLinkButton.tsx` | Client-side clipboard button (generator page only). |
| `app/pricing/[token]/page.tsx` | The guide + expired-link state. |
| `app/pricing/new/page.tsx` | Owner link generator. |
| `emails/theme.ts` | Brand tokens as email-safe hex + font stacks. |
| `emails/InquiryAutoresponder.tsx` | The bride-facing email template. |
| `lib/email.tsx` | Transport: render a template and POST it to Resend. |
| `scripts/prep-email-badges.mjs` | One-off badge asset generation. |
| `public/images/email/badge-1.png` … `badge-5.png` | Email-optimized badges (committed output). |

**Modify**

| File | Change |
| --- | --- |
| `tsconfig.json` | Add `allowImportingTsExtensions: true`. |
| `package.json` | Deps + `test` and `email` scripts. |
| `lib/site.ts` | Add `booking.calendly`; widen `pricing.mode`. |
| `app/robots.ts` | Disallow `/pricing`. |
| `app/actions/inquiry.ts` | Mint token, send auto-responder, add link to owner email. |
| `.env.example` | Two new secrets + email asset base. |
| `docs/*` | D013 and supporting docs (Task 9). |

`app/sitemap.ts` needs **no change** — it is an explicit allowlist, so `/pricing` can never appear in it. Verify this; do not edit it.

---

### Task 1: Signed pricing links

The security core. Everything else depends on it, so it is built test-first.

**Files:**
- Create: `lib/pricing-link.ts`
- Create: `lib/pricing-link.test.ts`
- Modify: `tsconfig.json`
- Modify: `package.json`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `createPricingToken(options?: { firstName?: string; ttlDays?: number }): string`
  - `verifyPricingToken(token: string): { ok: true; firstName?: string; expiresAt: Date } | { ok: false }`
  - `pricingPath(token: string): string` — returns `/pricing/<token>`
  - `PRICING_TOKEN_TTL_DAYS: number` (= 90)

**Background the implementer needs.** The token is `base64url(JSON payload) + "." + base64url(HMAC-SHA256(payload, secret))`. It is **signed, not encrypted** — anyone holding the link can decode the payload. That is why the payload carries only a first name and an expiry, never the bride's email address: if she forwards her link, a stranger must not be able to read her address out of the URL.

Every rejection path returns the identical `{ ok: false }`. Do not add a reason field, distinct error types, or different HTTP behaviour per failure — the caller must not be able to distinguish "real but expired" from "forged", and neither must an attacker.

- [ ] **Step 1: Enable `.ts`-extension imports so the test can be typechecked**

Without this, `tsc --noEmit` fails with `TS5097: An import path can only end with a '.ts' extension when 'allowImportingTsExtensions' is enabled`. This is verified behaviour, not a precaution. It is legal here because `noEmit` is already `true`.

In `tsconfig.json`, add the option after `"isolatedModules": true,`:

```json
    "isolatedModules": true,
    "allowImportingTsExtensions": true,
```

- [ ] **Step 2: Add the test script**

Node 22.14 runs TypeScript directly via type stripping — no test framework, no transpiler, no new dependency. The two `--disable-warning` flags silence `ExperimentalWarning` and `MODULE_TYPELESS_PACKAGE_JSON`, which are noise (the project has no `"type": "module"`, and adding one would break `postcss.config` / `next.config`).

In `package.json`, add to `scripts`:

```json
    "test": "node --test --experimental-strip-types --disable-warning=ExperimentalWarning --disable-warning=MODULE_TYPELESS_PACKAGE_JSON \"lib/**/*.test.ts\"",
```

- [ ] **Step 3: Write the failing test**

Create `lib/pricing-link.test.ts`:

```ts
import test from "node:test";
import assert from "node:assert/strict";
import {
  createPricingToken,
  verifyPricingToken,
  pricingPath,
  PRICING_TOKEN_TTL_DAYS,
} from "./pricing-link.ts";

test("default lifetime is 90 days", () => {
  assert.equal(PRICING_TOKEN_TTL_DAYS, 90);
});

test("round-trips a first name", () => {
  const result = verifyPricingToken(createPricingToken({ firstName: "Sarah" }));
  assert.equal(result.ok, true);
  assert.equal(result.ok && result.firstName, "Sarah");
});

test("a token minted without a name verifies with no name", () => {
  const result = verifyPricingToken(createPricingToken());
  assert.equal(result.ok, true);
  assert.equal(result.ok && result.firstName, undefined);
});

test("expiry is roughly ttlDays in the future", () => {
  const result = verifyPricingToken(createPricingToken({ ttlDays: 10 }));
  assert.equal(result.ok, true);
  if (!result.ok) return;
  const days = (result.expiresAt.getTime() - Date.now()) / 86_400_000;
  assert.ok(days > 9.9 && days < 10.1, `expected ~10 days, got ${days}`);
});

test("never leaks an email address into the payload", () => {
  const token = createPricingToken({ firstName: "Sarah" });
  const decoded = Buffer.from(token.split(".")[0], "base64url").toString("utf8");
  assert.ok(!decoded.includes("@"), `payload leaked an address: ${decoded}`);
  assert.deepEqual(Object.keys(JSON.parse(decoded)).sort(), ["n", "v", "x"]);
});

test("rejects an expired token", () => {
  assert.deepEqual(verifyPricingToken(createPricingToken({ ttlDays: -1 })), { ok: false });
});

test("rejects a single flipped bit in the signature", () => {
  const token = createPricingToken({ firstName: "Sarah" });
  const [payload, signature] = token.split(".");
  const flipped = (signature[0] === "A" ? "B" : "A") + signature.slice(1);
  assert.deepEqual(verifyPricingToken(`${payload}.${flipped}`), { ok: false });
});

test("rejects a tampered payload", () => {
  const token = createPricingToken({ firstName: "Sarah" });
  const forged = Buffer.from(
    JSON.stringify({ v: 1, n: "Attacker", x: Math.floor(Date.now() / 1000) + 999 }),
  ).toString("base64url");
  assert.deepEqual(verifyPricingToken(`${forged}.${token.split(".")[1]}`), { ok: false });
});

test("rejects an unknown schema version", () => {
  const forged = Buffer.from(
    JSON.stringify({ v: 2, x: Math.floor(Date.now() / 1000) + 999 }),
  ).toString("base64url");
  assert.deepEqual(verifyPricingToken(`${forged}.anything`), { ok: false });
});

test("rejects malformed input without throwing", () => {
  for (const bad of ["", ".", "nodot", "a.b.c", "!!!.!!!", "e30.x"]) {
    assert.deepEqual(verifyPricingToken(bad), { ok: false }, `should reject ${JSON.stringify(bad)}`);
  }
});

test("rejects a token signed with a different secret", () => {
  const original = process.env.PRICING_LINK_SECRET;
  process.env.PRICING_LINK_SECRET = "secret-one";
  const token = createPricingToken({ firstName: "Sarah" });
  process.env.PRICING_LINK_SECRET = "secret-two";
  assert.deepEqual(verifyPricingToken(token), { ok: false });
  process.env.PRICING_LINK_SECRET = original;
});

test("trims and caps an overlong first name", () => {
  const result = verifyPricingToken(createPricingToken({ firstName: "  " + "a".repeat(200) + "  " }));
  assert.equal(result.ok, true);
  assert.equal(result.ok && result.firstName?.length, 40);
});

test("pricingPath builds the route", () => {
  assert.equal(pricingPath("abc.def"), "/pricing/abc.def");
});
```

- [ ] **Step 4: Run the test and confirm it fails for the right reason**

Run: `npm test`

Expected: failure resolving `./pricing-link.ts` — the module does not exist yet. If instead Node reports a module-*system* error (`Unknown file extension ".ts"`, or a CommonJS parse failure), the harness itself is broken — fix that before writing any implementation.

- [ ] **Step 5: Write the implementation**

Create `lib/pricing-link.ts`:

```ts
/**
 * Signed, expiring links for the private bridal pricing guide (D013).
 *
 * The signature IS the authorization — there is no database and no session.
 * The payload is signed, not encrypted: anyone holding a link can decode it.
 * It therefore carries only a first name and an expiry, never the bride's
 * email address, so a forwarded link cannot leak her contact details.
 *
 * This module must import nothing but `node:crypto`. Its test runs under bare
 * `node --test`, which cannot resolve the `@/` path alias.
 */
import crypto from "node:crypto";

export const PRICING_TOKEN_TTL_DAYS = 90;

const SCHEMA_VERSION = 1;
const MAX_NAME_LENGTH = 40;
const DEV_SECRET = "maureen-ella-dev-only-pricing-link-secret";

type Payload = { v: number; n?: string; x: number };

export type PricingTokenResult =
  | { ok: true; firstName?: string; expiresAt: Date }
  | { ok: false };

/** Throws in production when unset, so a missing secret is never silent. */
function secret(): string {
  const configured = process.env.PRICING_LINK_SECRET;
  if (configured) return configured;
  if (process.env.NODE_ENV === "production") {
    throw new Error("PRICING_LINK_SECRET is required in production.");
  }
  return DEV_SECRET;
}

function sign(payloadB64: string, key: string): string {
  return crypto.createHmac("sha256", key).update(payloadB64).digest("base64url");
}

export function createPricingToken(
  options: { firstName?: string; ttlDays?: number } = {},
): string {
  const { firstName, ttlDays = PRICING_TOKEN_TTL_DAYS } = options;
  const payload: Payload = {
    v: SCHEMA_VERSION,
    x: Math.floor(Date.now() / 1000) + Math.round(ttlDays * 86_400),
  };
  const trimmed = firstName?.trim();
  if (trimmed) payload.n = trimmed.slice(0, MAX_NAME_LENGTH);

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${payloadB64}.${sign(payloadB64, secret())}`;
}

/**
 * Every failure returns an identical `{ ok: false }` — a caller must not be
 * able to tell an expired token from a forged one.
 */
export function verifyPricingToken(token: string): PricingTokenResult {
  const fail = { ok: false } as const;
  if (typeof token !== "string") return fail;

  const parts = token.split(".");
  if (parts.length !== 2) return fail;
  const [payloadB64, signature] = parts;
  if (!payloadB64 || !signature) return fail;

  let expected: string;
  try {
    expected = sign(payloadB64, secret());
  } catch {
    return fail; // missing secret in production
  }

  const given = Buffer.from(signature);
  const want = Buffer.from(expected);
  if (given.length !== want.length) return fail;
  if (!crypto.timingSafeEqual(given, want)) return fail;

  let payload: Payload;
  try {
    payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8"));
  } catch {
    return fail;
  }

  if (!payload || typeof payload !== "object") return fail;
  if (payload.v !== SCHEMA_VERSION) return fail;
  if (typeof payload.x !== "number" || !Number.isFinite(payload.x)) return fail;
  if (payload.x * 1000 <= Date.now()) return fail;

  const firstName =
    typeof payload.n === "string" && payload.n.length > 0 ? payload.n : undefined;

  return { ok: true, firstName, expiresAt: new Date(payload.x * 1000) };
}

export function pricingPath(token: string): string {
  return `/pricing/${token}`;
}
```

- [ ] **Step 6: Run the tests and typecheck**

Run: `npm test`
Expected: 13 passing, 0 failing.

Run: `npm run typecheck && npm run lint`
Expected: both clean. If `tsc` reports TS5097, Step 1 was not applied.

- [ ] **Step 7: Commit**

```bash
git add lib/pricing-link.ts lib/pricing-link.test.ts tsconfig.json package.json
git commit -m "feat(pricing): signed expiring tokens for the private pricing guide"
```

---

### Task 2: Config, secrets, and route hiding

**Files:**
- Modify: `lib/site.ts:58-73`
- Modify: `app/robots.ts:9`
- Modify: `.env.example:13-17`

**Interfaces:**
- Consumes: nothing.
- Produces: `site.booking.calendly` as `{ value: string; confirmed: boolean }`; `site.pricing.mode` widened to include `"private-link"`.

- [ ] **Step 1: Add the Calendly link and widen the pricing mode**

In `lib/site.ts`, replace the `pricing` block:

```ts
  /**
   * Pricing is delivered privately after inquiry via a signed expiring link
   * (D013). `published` stays false: no price may appear on any public,
   * indexable page. Consumers of `published` render inquiry-only copy.
   */
  pricing: {
    mode: "private-link" as "inquiry-only" | "private-link" | "exact" | "starting-at",
    published: false,
  },

  /** Consultation booking. Confirmed by the founder 2026-08-06 (D013). */
  booking: {
    calendly: {
      value: "https://calendly.com/maureenella/30min",
      confirmed: true,
    },
  },
```

- [ ] **Step 2: Keep `/pricing` out of crawlers**

In `app/robots.ts`, change the disallow list:

```ts
      disallow: ["/thank-you", "/pricing"],
```

- [ ] **Step 3: Document the new secrets**

In `.env.example`, under the Resend block, add:

```
# Private pricing guide (D013)
# Generate each with:
#   node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
# PRICING_LINK_SECRET signs pricing links. Rotating it invalidates every link
# already sent to a bride — rotate only deliberately.
PRICING_LINK_SECRET=
# Guards /pricing/new. Treat the bookmarked URL like a password.
PRICING_OWNER_KEY=
# Absolute base for email images. Defaults to the production site; set to
# http://localhost:3000 while previewing emails locally with `npm run email`.
EMAIL_ASSET_BASE_URL=
```

- [ ] **Step 4: Verify nothing public changed**

Run: `npm run typecheck && npm run lint`
Expected: clean. `site.pricing.published` is still `false`, so `app/bridal/services/page.tsx:47` and `components/sections/ServiceCards.tsx:54` keep rendering inquiry-only copy.

Run: `npm run dev`, then open `http://localhost:3000/robots.txt`.
Expected: the body contains `Disallow: /thank-you` and `Disallow: /pricing`.

Open `http://localhost:3000/sitemap.xml` and search for `pricing`.
Expected: **no match.** `app/sitemap.ts` is an explicit allowlist. Do not edit it.

- [ ] **Step 5: Commit**

```bash
git add lib/site.ts app/robots.ts .env.example
git commit -m "feat(pricing): add Calendly config, private-link mode, and crawler exclusion"
```

---

### Task 3: Pricing content

**Files:**
- Create: `content/pricing.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `type Collection = { slug: string; name: string; price: string; positioning: string; includes: string[]; featured?: boolean; featuredLabel?: string }`
  - `type ALaCarteItem = { service: string; price: string }`
  - `collections: Collection[]`, `aLaCarte: ALaCarteItem[]`
  - `pricingIntro: string`, `goodToKnow: string[]`

Every figure below is founder-confirmed. Transcribe exactly — do not round, reword a price, or add a number that is not here.

- [ ] **Step 1: Create the content module**

```ts
/**
 * Bridal pricing, delivered privately after inquiry (D013).
 *
 * Founder-confirmed 2026-08-06. These figures MUST NOT reach any public,
 * indexable page — they render only inside /pricing/[token], which is noindex
 * and robots-disallowed. Travel, retainer, service-minimum, touch-up-stay, and
 * venue-change AMOUNTS remain unconfirmed and are deliberately absent
 * (D004/D009). Follows the content/education.ts pattern: components read these
 * typed structures rather than importing seed JSON.
 */

export type Collection = {
  slug: string;
  name: string;
  /** Display string, e.g. "Starting at $450". Never a bare number. */
  price: string;
  positioning: string;
  includes: string[];
  featured?: boolean;
  featuredLabel?: string;
};

export type ALaCarteItem = { service: string; price: string };

export const collections: Collection[] = [
  {
    slug: "signature-bride",
    name: "Signature Bride Collection",
    price: "Starting at $450",
    positioning:
      "For the bride who wants a flawless, stress-free wedding morning.",
    includes: [
      "Bridal hair",
      "Bridal makeup",
      "Luxury lashes",
      "Bridal touch-up kit",
      "Veil placement",
      "Wedding morning timeline assistance",
    ],
  },
  {
    slug: "bridal-party",
    name: "Bridal Party Collection",
    price: "Starting at $1,050",
    positioning: "For the bride and her closest loved ones.",
    featured: true,
    featuredLabel: "Most Popular",
    includes: [
      "Bridal hair and makeup",
      "Hair for 3 bridal party members",
      "Makeup for 3 bridal party members",
      "Luxury lashes",
      "Bridal touch-up kit",
      "Wedding morning timeline",
      "On-location service",
    ],
  },
  {
    slug: "luxe-wedding",
    name: "Luxe Wedding Collection",
    price: "Starting at $1,850",
    positioning:
      "The complete luxury beauty experience for larger wedding parties.",
    includes: [
      "Bridal hair and makeup",
      "Hair for 6 bridal party members",
      "Makeup for 6 bridal party members",
      "Luxury lashes",
      "Bridal touch-up kit",
      "Wedding morning timeline",
      "Additional artist(s) as needed",
      "On-location service",
      "Touch-ups before the ceremony (optional)",
    ],
  },
];

export const aLaCarte: ALaCarteItem[] = [
  { service: "Bridal Hair", price: "Starting at $250" },
  { service: "Bridal Makeup", price: "Starting at $250" },
  { service: "Bridal Hair and Makeup", price: "Starting at $450" },
  { service: "Bridal Party Hair", price: "$125 per person" },
  { service: "Bridal Party Makeup", price: "$125 per person" },
];

export const pricingIntro =
  "Every wedding morning is different, so every quote is built around your date, your party size, and your timeline. The collections below are starting points — your written proposal will reflect exactly what your day needs.";

/** Policy language only. No amounts: those stay unconfirmed (D004/D009). */
export const goodToKnow: string[] = [
  "Collections are starting points. Your written proposal confirms the final total for your specific services.",
  "Travel, early-start, and touch-up-stay fees are quoted in your proposal, based on your getting-ready location and timeline.",
  "A signed agreement and retainer reserve your date. Until both are received, your date stays open to other couples.",
  "Bridal party services are performed on location at your getting-ready venue.",
];
```

- [ ] **Step 2: Verify no unconfirmed amount slipped in**

Run: `npm run typecheck`
Expected: clean.

Run: `grep -nE '\$[0-9]' content/pricing.ts`
Expected: exactly 8 lines — three collection prices and five à la carte prices. Any ninth match means an unconfirmed amount was introduced; remove it.

- [ ] **Step 3: Commit**

```bash
git add content/pricing.ts
git commit -m "feat(pricing): add founder-confirmed collections and a la carte content"
```

---

### Task 4: The pricing page

**Files:**
- Create: `components/pricing/CollectionCard.tsx`
- Create: `components/pricing/ALaCarteTable.tsx`
- Create: `app/pricing/[token]/page.tsx`

**Interfaces:**
- Consumes: `verifyPricingToken` (Task 1); `collections`, `aLaCarte`, `pricingIntro`, `goodToKnow`, `type Collection` (Task 3); `site.booking.calendly` (Task 2).
- Produces: the route `/pricing/<token>`.

**Existing components to reuse** (do not rewrite them): `Section` and `SectionHeading` from `@/components/ui/Section`, `ButtonLink` from `@/components/ui/Button` (variants `primary` | `secondary` | `ghost`), `clsx` from `@/lib/clsx`. Utility classes `.eyebrow` and `.index-mark` are defined in `app/globals.css`.

- [ ] **Step 1: Build the collection card**

Create `components/pricing/CollectionCard.tsx`:

```tsx
import { clsx } from "@/lib/clsx";
import type { Collection } from "@/content/pricing";

export function CollectionCard({
  collection,
  index,
}: {
  collection: Collection;
  index: number;
}) {
  const { name, price, positioning, includes, featured, featuredLabel } = collection;

  return (
    <article
      className={clsx(
        "relative flex h-full flex-col border p-8 sm:p-10",
        featured ? "border-espresso bg-porcelain" : "border-hairline",
      )}
    >
      {featured && featuredLabel && (
        <span className="absolute -top-3 left-8 bg-espresso px-3 py-1 font-sans text-[0.6rem] uppercase tracking-[0.25em] text-porcelain">
          {featuredLabel}
        </span>
      )}
      <span className="index-mark">{String(index + 1).padStart(2, "0")}</span>
      <h3 className="mt-4 font-serif text-3xl leading-tight text-espresso sm:text-4xl">
        {name}
      </h3>
      <p className="mt-3 font-serif text-2xl text-rose">{price}</p>
      <p className="mt-4 text-cocoa/80">{positioning}</p>
      <ul className="mt-7 space-y-2.5 border-t border-hairline pt-6">
        {includes.map((item) => (
          <li key={item} className="flex gap-3 text-sm text-cocoa/85">
            <span aria-hidden className="mt-[0.6em] h-px w-4 shrink-0 bg-taupe" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
```

- [ ] **Step 2: Build the à la carte list**

Create `components/pricing/ALaCarteTable.tsx`. A description list, not a `<table>` — it stays readable when it wraps on a phone.

```tsx
import { aLaCarte } from "@/content/pricing";

export function ALaCarteTable() {
  return (
    <dl className="border-t border-hairline">
      {aLaCarte.map((item) => (
        <div
          key={item.service}
          className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-hairline py-5"
        >
          <dt className="font-serif text-xl text-espresso sm:text-2xl">{item.service}</dt>
          <dd className="font-sans text-sm uppercase tracking-[0.15em] text-taupe-deep">
            {item.price}
          </dd>
        </div>
      ))}
    </dl>
  );
}
```

- [ ] **Step 3: Build the page**

Create `app/pricing/[token]/page.tsx`.

`export const dynamic = "force-dynamic"` is **required**: without it Next caches each token's render and the expiry check freezes at first view, so an expired link would keep showing prices forever.

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo/metadata";
import { site, phoneHref } from "@/lib/site";
import { verifyPricingToken } from "@/lib/pricing-link";
import { collections, pricingIntro, goodToKnow } from "@/content/pricing";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CollectionCard } from "@/components/pricing/CollectionCard";
import { ALaCarteTable } from "@/components/pricing/ALaCarteTable";

/** Expiry must be evaluated per request, never cached. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Your Bridal Pricing Guide",
  description: "A private bridal pricing guide prepared for you.",
  path: "/pricing",
  noindex: true,
});

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "America/New_York",
});

export default async function PricingGuidePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const result = verifyPricingToken(token);

  if (!result.ok) return <ExpiredLink />;

  const { firstName, expiresAt } = result;

  return (
    <>
      <Section tone="ivory" size="narrow" className="pb-12 sm:pb-16">
        <p className="eyebrow">Private pricing guide</p>
        <h1 className="mt-5 font-serif text-[clamp(2.6rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.03em] text-espresso">
          {firstName ? `Prepared for ${firstName}` : "Bridal Collections"}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-cocoa/80">{pricingIntro}</p>
      </Section>

      <Section size="wide" className="pt-0">
        <SectionHeading index="01" eyebrow="Collections" title="Bridal glam collections" />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {collections.map((collection, i) => (
            <CollectionCard key={collection.slug} collection={collection} index={i} />
          ))}
        </div>
      </Section>

      <Section tone="ivory" size="narrow">
        <SectionHeading index="02" eyebrow="Individual services" title="À la carte" />
        <div className="mt-12">
          <ALaCarteTable />
        </div>
      </Section>

      <Section size="narrow">
        <SectionHeading index="03" eyebrow="Details" title="Good to know" />
        <ul className="mt-12 space-y-5 border-t border-hairline pt-8">
          {goodToKnow.map((note) => (
            <li key={note} className="flex gap-4 text-cocoa/85">
              <span aria-hidden className="mt-[0.7em] h-px w-5 shrink-0 bg-taupe" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="espresso" size="narrow">
        <SectionHeading
          index="04"
          eyebrow="Next step"
          title="Let's talk through your day"
          intro="Book a 30-minute consultation and we'll walk through your timeline, your party, and the collection that fits."
          invert
        />
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href={site.booking.calendly.value}>Book a 30-Minute Call</ButtonLink>
          <ButtonLink href={`mailto:${site.contact.email.value}`} variant="ghost">
            Or reply by email
          </ButtonLink>
        </div>
        <p className="mt-10 border-t border-porcelain/25 pt-6 text-sm text-porcelain/70">
          This pricing was prepared for you and is valid through{" "}
          {dateFormat.format(expiresAt)}. Please keep the link private.
        </p>
      </Section>
    </>
  );
}

/** Shown for expired, tampered, and malformed links alike — never a 404. */
function ExpiredLink() {
  return (
    <Section tone="ivory" size="narrow" className="min-h-[70vh]">
      <p className="eyebrow">Pricing guide</p>
      <h1 className="mt-5 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1] tracking-[-0.03em] text-espresso">
        This pricing link has expired
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-cocoa/80">
        Pricing links stay active for 90 days. Book a call and Maureen will send you a
        current guide, or reach out directly and she&apos;ll get a fresh link over to you.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <ButtonLink href={site.booking.calendly.value}>Book a 30-Minute Call</ButtonLink>
        <ButtonLink href="/contact" variant="secondary">
          Request Availability
        </ButtonLink>
      </div>
      <p className="mt-10 border-t border-hairline pt-6 text-sm text-cocoa/70">
        <Link href={`mailto:${site.contact.email.value}`} className="hover:text-espresso">
          {site.contact.email.value}
        </Link>
        {" · "}
        <Link href={phoneHref} className="hover:text-espresso">
          {site.contact.phone.value}
        </Link>
      </p>
    </Section>
  );
}
```

- [ ] **Step 4: Verify both states in the browser**

Run: `npm run dev`

Mint a valid token — run this in a second terminal:

```bash
node --experimental-strip-types --disable-warning=ExperimentalWarning -e "import('./lib/pricing-link.ts').then(m=>console.log('http://localhost:3000'+m.pricingPath(m.createPricingToken({firstName:'Sarah'}))))"
```

Open the printed URL. Expected: heading reads "Prepared for Sarah"; three collections with **Most Popular** on Bridal Party; five à la carte rows; four good-to-know notes with no dollar amounts; Calendly button; a valid-through date about 90 days out.

Now the failure states. Expected for all three: the "This pricing link has expired" page, HTTP 200, never a 404.
- Expired: swap `firstName:'Sarah'` for `ttlDays:-1` in the command above.
- Tampered: change one character of the signature (after the dot) in a valid URL.
- Garbage: `http://localhost:3000/pricing/nonsense`.

Check at a 375px viewport: cards stack, nothing overflows horizontally, the badge does not clip.

Confirm the page is not indexable: view source and expect `<meta name="robots" content="noindex, nofollow">`.

- [ ] **Step 5: Typecheck, lint, build**

Run: `npm run typecheck && npm run lint && npm run build`
Expected: clean. In the build output `/pricing/[token]` is listed as a dynamic (ƒ) route — that is correct and expected; every other route stays static.

- [ ] **Step 6: Commit**

```bash
git add components/pricing app/pricing
git commit -m "feat(pricing): private pricing guide page with expired-link state"
```

---

### Task 5: Owner link generator

**Files:**
- Create: `components/pricing/CopyLinkButton.tsx`
- Create: `app/pricing/new/page.tsx`

**Interfaces:**
- Consumes: `createPricingToken`, `pricingPath` (Task 1); `site.baseUrl` (Task 2).
- Produces: the route `/pricing/new`.

Static route segments beat dynamic ones in the Next router, so `/pricing/new` will not be captured by `/pricing/[token]`.

**Accepted risk, already signed off in the spec:** the key travels in a query string, so it lands in Vercel logs and browser history. Accepted rather than building auth, because the worst case of a leak is that someone sees prices Maureen already emails to strangers. Do not "improve" this into a login without a new decision.

- [ ] **Step 1: Build the copy button**

Create `components/pricing/CopyLinkButton.tsx`:

```tsx
"use client";

import { useState } from "react";

export function CopyLinkButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          setCopied(false);
        }
      }}
      className="border border-espresso px-6 py-3 font-sans text-[0.68rem] uppercase tracking-[0.2em] text-espresso transition-colors hover:bg-espresso hover:text-porcelain focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
    >
      {copied ? "Copied" : "Copy link"}
    </button>
  );
}
```

- [ ] **Step 2: Build the generator page**

Create `app/pricing/new/page.tsx`:

```tsx
import type { Metadata } from "next";
import crypto from "node:crypto";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/site";
import { createPricingToken, pricingPath, PRICING_TOKEN_TTL_DAYS } from "@/lib/pricing-link";
import { Section } from "@/components/ui/Section";
import { CopyLinkButton } from "@/components/pricing/CopyLinkButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "New Pricing Link",
  description: "Internal tool.",
  path: "/pricing/new",
  noindex: true,
});

function keyMatches(provided: string | undefined): boolean {
  const expected = process.env.PRICING_OWNER_KEY;
  if (!expected || !provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export default async function NewPricingLinkPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string; name?: string }>;
}) {
  const { key, name } = await searchParams;
  if (!keyMatches(key)) notFound();

  const firstName = name?.trim() ?? "";
  const url = new URL(
    pricingPath(createPricingToken({ firstName })),
    site.baseUrl,
  ).toString();

  return (
    <Section tone="ivory" size="narrow" className="min-h-[80vh]">
      <p className="eyebrow">Internal</p>
      <h1 className="mt-5 font-serif text-4xl text-espresso">New pricing link</h1>
      <p className="mt-4 text-cocoa/80">
        Valid for {PRICING_TOKEN_TTL_DAYS} days. Reload this page for a fresh link.
      </p>

      <form method="get" className="mt-10 flex flex-wrap items-end gap-4 border-t border-hairline pt-8">
        <input type="hidden" name="key" value={key} />
        <div className="flex-1">
          <label htmlFor="name" className="eyebrow block">
            Bride&apos;s first name (optional)
          </label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={firstName}
            maxLength={40}
            autoComplete="off"
            className="mt-3 w-full border border-hairline bg-porcelain px-4 py-3 text-cocoa focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
          />
        </div>
        <button
          type="submit"
          className="bg-espresso px-7 py-4 font-sans text-[0.68rem] uppercase tracking-[0.2em] text-porcelain transition-colors hover:bg-cocoa focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
        >
          Generate
        </button>
      </form>

      <div className="mt-10 border border-hairline bg-porcelain p-6">
        <p className="eyebrow">Link</p>
        <p className="mt-3 break-all font-mono text-sm text-cocoa">{url}</p>
        <div className="mt-6">
          <CopyLinkButton value={url} />
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 3: Verify the guard and the happy path**

Add a temporary key to `.env.local`:

```
PRICING_OWNER_KEY=local-dev-owner-key
```

Restart `npm run dev` (env changes are not hot-reloaded).

- `http://localhost:3000/pricing/new` → 404
- `http://localhost:3000/pricing/new?key=wrong` → 404
- `http://localhost:3000/pricing/new?key=local-dev-owner-key` → the tool renders
- Type `Sarah`, press Generate → the URL updates and still contains `key=`
- Press Copy link → label flips to "Copied"; paste the URL into a new tab and confirm it renders "Prepared for Sarah"

- [ ] **Step 4: Typecheck, lint, build**

Run: `npm run typecheck && npm run lint && npm run build`
Expected: clean.

- [ ] **Step 5: Commit**

```bash
git add components/pricing/CopyLinkButton.tsx app/pricing/new
git commit -m "feat(pricing): key-guarded pricing link generator for manual inquiries"
```

---

### Task 6: Email badge assets

**Files:**
- Create: `scripts/prep-email-badges.mjs`
- Create: `public/images/email/badge-1.png` … `badge-5.png` (generated, committed)

**Interfaces:**
- Consumes: `public/images/badges/maureenbadge1-5.png`.
- Produces: five ~220px PNGs at `public/images/email/badge-N.png`.

**Why this task exists.** The site badges are 401–1600px RGBA PNGs totalling **930KB** and are rendered with `mix-blend-multiply` — a blend mode that does not exist in email. They are flattened onto `#f6efe4` (the `--color-ivory` canvas) rather than left transparent, so the result cannot depend on client alpha handling: if a badge carries a white plate rather than true transparency, pre-compositing is what stops it rendering as a white box. PNG, not WebP — Outlook cannot read WebP.

`sharp@0.34.5` is already installed as a Next transitive dependency. Do **not** add it to `package.json`.

- [ ] **Step 1: Write the script**

Create `scripts/prep-email-badges.mjs`:

```js
/**
 * One-off: build email-safe copies of the recognition badges.
 *
 * Output is committed, so this only needs re-running when a badge changes.
 * Uses sharp, already present as a Next transitive dependency.
 *
 * Run: node scripts/prep-email-badges.mjs
 */
import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";

const SOURCE_DIR = "public/images/badges";
const OUT_DIR = "public/images/email";
const SIZE = 220; // 2x a ~110px display width
const IVORY = { r: 0xf6, g: 0xef, b: 0xe4, alpha: 1 }; // --color-ivory

await mkdir(OUT_DIR, { recursive: true });

for (let i = 1; i <= 5; i += 1) {
  const from = `${SOURCE_DIR}/maureenbadge${i}.png`;
  const to = `${OUT_DIR}/badge-${i}.png`;

  await sharp(from)
    .resize({
      width: SIZE,
      height: SIZE,
      fit: "contain",
      background: { ...IVORY, alpha: 0 },
    })
    .flatten({ background: IVORY })
    .png({ compressionLevel: 9 })
    .toFile(to);

  const { size } = await stat(to);
  console.log(`${to}  ${(size / 1024).toFixed(1)}KB`);
}
```

- [ ] **Step 2: Run it**

Run: `node scripts/prep-email-badges.mjs`

Expected: five lines, each well under 25KB. If any file exceeds 25KB, add `.png({ compressionLevel: 9, palette: true, quality: 90 })` and re-run — total payload across all five must stay under ~60KB.

- [ ] **Step 3: Check them visually**

Open the five files in `public/images/email/`. Each must show the badge artwork on a **solid warm cream** background — no white box, no grey checkerboard, no hard edge where a white plate meets the cream. If a white rectangle is visible, the source has an opaque plate: crop it in the source before re-running rather than working around it in the email.

- [ ] **Step 4: Commit**

```bash
git add scripts/prep-email-badges.mjs public/images/email
git commit -m "feat(email): add email-optimized recognition badge assets"
```

---

### Task 7: Branded auto-responder template

**Files:**
- Create: `emails/theme.ts`
- Create: `emails/InquiryAutoresponder.tsx`
- Modify: `package.json`

**Interfaces:**
- Consumes: `site` (Task 2); badge assets (Task 6).
- Produces:
  - `brand`, `fonts`, `emailAssetUrl(path: string): string` from `emails/theme.ts`
  - `InquiryAutoresponder` (default and named export) taking `InquiryAutoresponderProps`:
    `{ firstName?: string; cityState?: string; weddingDate?: string; interestedIn?: string; pricingUrl?: string; calendlyUrl: string }`

**React Email rules that matter here** (from the `resend:react-email` skill):
- Import components from `@react-email/components`, not from `react-email` — `react-email` is the CLI and must stay a devDependency.
- `<Preview>` is the first element inside `<Body>`.
- `<Container>` has a built-in `max-width: 37.5em`; use it once. Use `<Section>` for interior blocks.
- **No flexbox, no grid, no media queries, no `dark:` variants.** Use `<Row>`/`<Column>`.
- `<Button>` already emits the Outlook-safe padding hack — never build an image button.
- Every border needs an explicit style (`solid`); email clients do not inherit border-style.
- Images need absolute URLs and real `alt` text.

`pricingUrl` is optional on purpose: when `PRICING_LINK_SECRET` is missing in production the email still sends, with the Calendly path intact and the pricing block omitted. See Task 8.

- [ ] **Step 1: Install the packages**

```bash
npm install @react-email/components@^1.0.12 @react-email/render@^2.1.0
npm install --save-dev react-email@^6.9.1
```

Then add the preview script to `package.json` (port 3001, so it does not collide with `next dev` on 3000):

```json
    "email": "email dev --dir emails --port 3001",
```

- [ ] **Step 2: Write the theme**

Create `emails/theme.ts`:

```ts
/**
 * Brand tokens for email.
 *
 * Mirrors the @theme block in app/globals.css. Email clients cannot read CSS
 * custom properties, so the values are duplicated here as hex literals — if a
 * token changes in globals.css, change it here too.
 */
import { site } from "@/lib/site";

export const brand = {
  ivory: "#f6efe4",
  porcelain: "#fbf8f3",
  cream: "#efe5d6",
  espresso: "#251d17",
  cocoa: "#463830",
  hairline: "#d8c9b3",
  taupeDeep: "#8a7459",
  rose: "#c08579",
} as const;

/**
 * Cormorant and Jost load through next/font and exist only on the site — no
 * email client outside Apple Mail will fetch them. Georgia is the closest
 * widely installed high-contrast serif to Cormorant.
 */
export const fonts = {
  serif: "Georgia, 'Times New Roman', Times, serif",
  sans: "'Helvetica Neue', Helvetica, Arial, sans-serif",
} as const;

/** Absolute URL for an email image. Set EMAIL_ASSET_BASE_URL to preview locally. */
export function emailAssetUrl(path: string): string {
  const base = process.env.EMAIL_ASSET_BASE_URL || site.baseUrl;
  return new URL(path, base).toString();
}

export const badges = [
  { src: "/images/email/badge-1.png", alt: "Premier Bride Top 3 Best Wedding Pro" },
  { src: "/images/email/badge-2.png", alt: "Southern Bride recognition" },
  { src: "/images/email/badge-3.png", alt: "Styled Challenge Trendsetter Award" },
  { src: "/images/email/badge-4.png", alt: "Styled Challenge Best Design Award" },
  { src: "/images/email/badge-5.png", alt: "Simply Eloped Top Vendor" },
] as const;
```

- [ ] **Step 3: Write the template**

Create `emails/InquiryAutoresponder.tsx`:

```tsx
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { site, phoneHref } from "@/lib/site";
import { brand, fonts, badges, emailAssetUrl } from "./theme";

export type InquiryAutoresponderProps = {
  firstName?: string;
  cityState?: string;
  weddingDate?: string;
  interestedIn?: string;
  /** Omitted when link signing is unavailable — the email still sends. */
  pricingUrl?: string;
  calendlyUrl: string;
};

const eyebrow = {
  fontFamily: fonts.sans,
  fontSize: "11px",
  letterSpacing: "0.3em",
  textTransform: "uppercase" as const,
  color: brand.taupeDeep,
  margin: "0",
};

const body = {
  fontFamily: fonts.sans,
  fontSize: "15px",
  lineHeight: "1.7",
  color: brand.cocoa,
  margin: "0 0 16px",
};

const rule = { borderColor: brand.hairline, borderStyle: "solid", margin: "32px 0" };

export function InquiryAutoresponder({
  firstName,
  cityState,
  weddingDate,
  interestedIn,
  pricingUrl,
  calendlyUrl,
}: InquiryAutoresponderProps) {
  const greeting = firstName ? `Hi ${firstName},` : "Hi there,";
  const details = [
    ["Wedding date", weddingDate],
    ["Location", cityState],
    ["Interested in", interestedIn],
  ].filter(([, value]) => Boolean(value)) as [string, string][];

  return (
    <Html lang="en">
      <Head>
        {/* Gmail and Outlook auto-invert light emails; this warm palette
            inverts into muddy brown-grey, so opt out of dark mode. */}
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
      </Head>
      <Body style={{ backgroundColor: brand.ivory, margin: 0, padding: "24px 0" }}>
        <Preview>Your collections, à la carte pricing, and a link to book a call.</Preview>

        <Container
          style={{
            backgroundColor: brand.porcelain,
            border: `1px solid ${brand.hairline}`,
            borderStyle: "solid",
            padding: "40px",
          }}
        >
          <Text
            style={{
              ...eyebrow,
              textAlign: "center",
              fontSize: "13px",
              letterSpacing: "0.35em",
              color: brand.espresso,
            }}
          >
            MAUREEN ELLA
          </Text>

          <Hr style={rule} />

          <Text style={{ ...eyebrow, color: brand.rose }}>01 — Your inquiry</Text>
          <Heading
            as="h1"
            style={{
              fontFamily: fonts.serif,
              fontSize: "32px",
              lineHeight: "1.15",
              color: brand.espresso,
              margin: "12px 0 20px",
              fontWeight: 500,
            }}
          >
            {greeting}
          </Heading>

          <Text style={body}>
            Thank you for reaching out about your wedding. I&apos;ve received your
            details and I&apos;m reviewing your date, service count, and timeline now.
          </Text>

          {details.length > 0 && (
            <Section
              style={{
                borderTop: `1px solid ${brand.hairline}`,
                borderBottom: `1px solid ${brand.hairline}`,
                borderLeft: "none",
                borderRight: "none",
                borderStyle: "solid",
                padding: "18px 0",
                margin: "0 0 24px",
              }}
            >
              {details.map(([label, value]) => (
                <Row key={label}>
                  <Column style={{ width: "45%", verticalAlign: "top" }}>
                    <Text style={{ ...eyebrow, margin: "4px 0" }}>{label}</Text>
                  </Column>
                  <Column>
                    <Text
                      style={{
                        ...body,
                        margin: "4px 0",
                        fontFamily: fonts.serif,
                        fontSize: "16px",
                        color: brand.espresso,
                      }}
                    >
                      {value}
                    </Text>
                  </Column>
                </Row>
              ))}
            </Section>
          )}

          {pricingUrl && (
            <>
              <Button
                href={pricingUrl}
                style={{
                  backgroundColor: brand.espresso,
                  color: brand.porcelain,
                  fontFamily: fonts.sans,
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  padding: "16px 28px",
                  display: "block",
                  textAlign: "center",
                  boxSizing: "border-box",
                }}
              >
                View Your Pricing Guide
              </Button>
              <Text
                style={{
                  ...body,
                  fontSize: "13px",
                  color: brand.taupeDeep,
                  margin: "12px 0 24px",
                  textAlign: "center",
                }}
              >
                This link is just for you and stays active for 90 days.
              </Text>
            </>
          )}

          <Button
            href={calendlyUrl}
            style={{
              border: `1px solid ${brand.espresso}`,
              borderStyle: "solid",
              color: brand.espresso,
              fontFamily: fonts.sans,
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
              padding: "15px 28px",
              display: "block",
              textAlign: "center",
              boxSizing: "border-box",
            }}
          >
            Book a 30-Minute Call
          </Button>

          <Hr style={rule} />

          <Text style={{ ...body, fontSize: "14px" }}>
            One quick note: your inquiry doesn&apos;t reserve your date yet. A signed
            agreement and retainer do that, and I&apos;ll send both over if we&apos;re
            a good fit.
          </Text>

          <Text style={{ ...body, fontSize: "14px" }}>
            In the meantime, have a look at the{" "}
            <Link href={`${site.baseUrl}/bridal/portfolio`} style={{ color: brand.rose }}>
              portfolio
            </Link>{" "}
            and the{" "}
            <Link href={`${site.baseUrl}/bridal/prep-guides`} style={{ color: brand.rose }}>
              bridal prep guides
            </Link>
            .
          </Text>

          <Text style={{ ...body, marginTop: "28px", marginBottom: "4px" }}>Warmly,</Text>
          <Text
            style={{
              fontFamily: fonts.serif,
              fontSize: "22px",
              color: brand.espresso,
              margin: "0 0 8px",
            }}
          >
            Maureen
          </Text>
          <Text style={{ ...body, fontSize: "13px", color: brand.taupeDeep }}>
            <Link href={`mailto:${site.contact.email.value}`} style={{ color: brand.taupeDeep }}>
              {site.contact.email.value}
            </Link>
            {" · "}
            <Link href={phoneHref} style={{ color: brand.taupeDeep }}>
              {site.contact.phone.value}
            </Link>
          </Text>

          <Hr style={rule} />

          <Text style={{ ...eyebrow, textAlign: "center", marginBottom: "16px" }}>
            Recognition
          </Text>
          <Row>
            {badges.map((badge) => (
              <Column key={badge.src} style={{ width: "20%", textAlign: "center" }}>
                <Img
                  src={emailAssetUrl(badge.src)}
                  alt={badge.alt}
                  width="96"
                  style={{ maxWidth: "96px", width: "100%", height: "auto", margin: "0 auto" }}
                />
              </Column>
            ))}
          </Row>

          <Text
            style={{
              ...body,
              fontSize: "11px",
              color: brand.taupeDeep,
              textAlign: "center",
              margin: "28px 0 0",
            }}
          >
            {site.brandLong} · {site.contact.address.value}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

InquiryAutoresponder.PreviewProps = {
  firstName: "Sarah",
  cityState: "St. Augustine, FL",
  weddingDate: "2027-04-17",
  interestedIn: "Bridal hair and makeup",
  pricingUrl: "https://maureenella.com/pricing/preview-token",
  calendlyUrl: "https://calendly.com/maureenella/30min",
} satisfies InquiryAutoresponderProps;

export default InquiryAutoresponder;
```

- [ ] **Step 4: Preview it**

In one terminal run `npm run dev` (serves the badge images on port 3000). In another:

```bash
EMAIL_ASSET_BASE_URL=http://localhost:3000 npm run email
```

Open `http://localhost:3001` and select the template. Check:
- Badges render on cream with no white boxes
- Both buttons are full-width, square-cornered, and legible
- Nothing overflows at the mobile preview width
- Toggle React Email's plain-text view: the copy reads sensibly and both URLs appear

Then set `pricingUrl` to `undefined` in `PreviewProps` and confirm the pricing block disappears while the Calendly button survives. Restore it afterwards.

- [ ] **Step 5: Typecheck and lint**

Run: `npm run typecheck && npm run lint`
Expected: clean.

- [ ] **Step 6: Commit**

```bash
git add emails package.json package-lock.json
git commit -m "feat(email): branded inquiry auto-responder template"
```

---

### Task 8: Wire the auto-responder into the inquiry flow

**Files:**
- Create: `lib/email.tsx`
- Modify: `app/actions/inquiry.ts:167-262`
- Modify: `app/actions/inquiry.ts:182-183` (`SUCCESS_MESSAGE`)

**Interfaces:**
- Consumes: `createPricingToken`, `pricingPath` (Task 1); `InquiryAutoresponder` (Task 7); `site.booking.calendly` (Task 2).
- Produces: `sendInquiryAutoresponder(args): Promise<void>` from `lib/email.tsx`.

**Three rules that must not be broken:**

1. **The bride's email is best-effort.** Wrap the call in `.catch(console.error)` exactly like `sendEducationWelcome` at `app/actions/waitlist.ts:79`. Maureen has already been notified by that point; a Resend hiccup must never turn her successful submission into an error.
2. **Degrade, don't die.** If `PRICING_LINK_SECRET` is missing in production, `createPricingToken` throws. Catch it, log loudly, and send the email *without* `pricingUrl` — Calendly and the reply path still work. Never email a dead link.
3. **No `dangerouslySetInnerHTML` anywhere.** React Email escapes JSX children, which is what makes it safe to interpolate the bride's free text. The existing hand-built owner email keeps its `escapeHtml` calls — do not remove them.

**New abuse surface to be aware of:** this action now emails an attacker-supplied address, making it a small outbound-mail amplifier. The honeypot and timing checks (which return success *without* sending) and the 5-per-10-minutes IP rate limit are the mitigations. Do not loosen `hit(...)`.

- [ ] **Step 1: Build the transport module**

Create `lib/email.tsx`. It is `.tsx` because it renders JSX; `app/actions/inquiry.ts` stays `.ts`.

```tsx
import { render } from "@react-email/render";
import { site } from "@/lib/site";
import {
  InquiryAutoresponder,
  type InquiryAutoresponderProps,
} from "@/emails/InquiryAutoresponder";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/**
 * Sends the bride-facing inquiry auto-responder. Callers MUST treat failures as
 * non-fatal — the owner notification has already gone out by this point.
 */
export async function sendInquiryAutoresponder({
  apiKey,
  to,
  ...props
}: InquiryAutoresponderProps & { apiKey: string; to: string }): Promise<void> {
  const element = <InquiryAutoresponder {...props} />;
  const [html, text] = await Promise.all([
    render(element),
    render(element, { plainText: true }),
  ]);

  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${site.brand} <inquiries@${site.domain}>`,
      to: [to],
      // Replies must reach Maureen's real inbox, not the sending address.
      reply_to: site.contact.email.value,
      subject: `Your bridal pricing guide — ${site.brand}`,
      html,
      text,
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
  }
}
```

- [ ] **Step 2: Mint the link inside the inquiry action**

In `app/actions/inquiry.ts`, add these imports below the existing ones:

```ts
import { createPricingToken, pricingPath } from "@/lib/pricing-link";
import { sendInquiryAutoresponder } from "@/lib/email";
```

Then add this helper above `deliver`:

```ts
/**
 * Absolute pricing-guide URL for a bride, or `undefined` when link signing is
 * unavailable. Returning undefined degrades the email gracefully rather than
 * shipping a dead link.
 */
function pricingUrlFor(firstName: string): string | undefined {
  try {
    return new URL(pricingPath(createPricingToken({ firstName })), site.baseUrl).toString();
  } catch (err) {
    console.error(
      "Could not mint a pricing link (is PRICING_LINK_SECRET set?):",
      err,
    );
    return undefined;
  }
}
```

- [ ] **Step 3: Give the owner email a forwardable link and send the bride's email**

In `deliver`, after the `const configuredTo = to as string;` line, add:

```ts
  const pricingUrl = pricingUrlFor(fields["First name"]);
```

Add the link to the owner email by changing the `html` template literal so the table is followed by the link, and appending it to the text body:

```ts
  const pricingRow = pricingUrl
    ? `<p style="margin-top:16px"><strong>Pricing link (forwardable):</strong><br><a href="${pricingUrl}">${pricingUrl}</a></p>`
    : `<p style="margin-top:16px"><strong>Pricing link:</strong> unavailable — PRICING_LINK_SECRET is not set.</p>`;
```

and use `${pricingRow}` immediately after `</table>` in the `html` string, plus:

```ts
  const ownerText = pricingUrl
    ? `${summaryText}\n\nPricing link (forwardable): ${pricingUrl}`
    : `${summaryText}\n\nPricing link: unavailable — PRICING_LINK_SECRET is not set.`;
```

using `ownerText` in place of `summaryText` in the owner email's `text` field.

Then, after the owner email's `if (!res.ok) throw ...` check, add the bride's email:

```ts
  // Best-effort: the owner has already been notified, so a failure here must
  // never fail the bride's submission.
  await sendInquiryAutoresponder({
    apiKey: configuredApiKey,
    to: fields.Email,
    firstName: fields["First name"],
    cityState: fields["City / State"],
    weddingDate: fields["Wedding date"],
    interestedIn: fields["Interested in"],
    pricingUrl,
    calendlyUrl: site.booking.calendly.value,
  }).catch((err) => console.error("Inquiry auto-responder failed:", err));
```

- [ ] **Step 4: Tell her to check her inbox**

Replace `SUCCESS_MESSAGE`:

```ts
const SUCCESS_MESSAGE =
  "Thank you for your inquiry. Your details have been received — check your inbox for your pricing guide and a link to book a call. We'll review your date, service count, location, and timeline needs before sending next steps.";
```

- [ ] **Step 5: Verify end to end against a real inbox**

In `.env.local` set `RESEND_API_KEY`, `FORM_TO_EMAIL` (your own address), and `PRICING_LINK_SECRET`. Restart `npm run dev`.

Submit the form at `http://localhost:3000/contact` using a real address you control. Take at least 3 seconds to fill it in — submitting faster than 2.5s trips the bot-timing check at `app/actions/inquiry.ts:68` and silently fakes success.

Expected:
- The success message mentions checking her inbox
- **Owner email** arrives with all fields plus a working "Pricing link (forwardable)"
- **Bride email** arrives, branded, with badges rendering, and `reply_to` set to `maureen@theparlor.info` — hit Reply and confirm the To: address
- Both buttons work; the pricing link opens "Prepared for <name>"
- Open it on a phone and in Gmail's web client; confirm no dark-mode inversion and no horizontal scroll

Then the degraded path: comment out `PRICING_LINK_SECRET` in `.env.local`, restart, and submit again. Expected: submission still succeeds, both emails still arrive, the bride's email shows the Calendly button with **no** pricing block, and the server log carries the "Could not mint a pricing link" error. Restore the variable afterwards.

- [ ] **Step 6: Typecheck, lint, test, build**

Run: `npm run typecheck && npm run lint && npm test && npm run build`
Expected: all clean.

- [ ] **Step 7: Commit**

```bash
git add lib/email.tsx app/actions/inquiry.ts
git commit -m "feat(inquiry): send branded auto-responder with private pricing link"
```

---

### Task 9: Documentation and launch readiness

**Files:**
- Modify: `docs/DECISIONS.md` (append D013 after D012)
- Modify: `docs/EMAIL_SEQUENCES.md:3-18`
- Modify: `docs/ENVIRONMENT.md`
- Modify: `docs/TEST_PLAN.md`
- Modify: `docs/LAUNCH_CHECKLIST.md`
- Modify: `docs/TASKS.md`
- Modify: `docs/BUILD_NOTES.md`

- [ ] **Step 1: Record D013**

Append to the confirmed-decisions section of `docs/DECISIONS.md`:

```markdown
### D013 - Pricing delivered privately after inquiry

Decision (founder, 2026-08-06): amends D009. Pricing stays off the **public**
site — `site.pricing.published` remains `false` and no price appears on any
indexable page. Confirmed collection and à la carte pricing is delivered
privately after inquiry through a signed, expiring link (`/pricing/[token]`,
noindex + robots-disallowed, 90-day lifetime, HMAC-SHA256, no database).

Confirmed and now published behind that link: Signature Bride Collection from
$450; Bridal Party Collection from $1,050 (badged "Most Popular"); Luxe Wedding
Collection from $1,850; bridal hair $250; bridal makeup $250; bridal hair and
makeup $450; bridal party hair $125/person; bridal party makeup $125/person.
Consultation booking is https://calendly.com/maureenella/30min.

Still unconfirmed and therefore excluded: travel, retainer, service-minimum,
touch-up-stay, and venue-change amounts. The guide carries generic policy
language only, matching D010.

Every inquiry now triggers a branded React Email auto-responder to the bride
carrying her pricing link and the Calendly link; the owner notification carries
a forwardable copy of the same link. `/pricing/new` (guarded by
`PRICING_OWNER_KEY`) mints links for brides who phone or DM instead of using
the form.

Rationale: collections anchor brides toward larger bookings, but publishing
prices invites comparison shopping and dates the site every time they change. A
private post-inquiry link keeps the anchoring benefit while preserving the
inquiry-first funnel.

Accepted risks: the generator key travels in a query string (worst case, a
stranger sees prices already emailed to strangers); the auto-responder makes
the contact form a minor outbound-mail amplifier, mitigated by the honeypot,
the timing check, and the 5-per-10-minutes IP rate limit — do not loosen it.
```

- [ ] **Step 2: Replace the bridal auto-responder section of `docs/EMAIL_SEQUENCES.md`**

Replace lines 3-18 (the `## Bridal inquiry autoresponder` block) with:

```markdown
## Bridal inquiry autoresponder

**Implemented** (D013) — `emails/InquiryAutoresponder.tsx`, sent by
`lib/email.tsx` from `app/actions/inquiry.ts`. Not a draft; edit the component.

Subject: Your bridal pricing guide — Maureen Ella
From: Maureen Ella <inquiries@maureenella.com> · Reply-to: maureen@theparlor.info

Contents: greeting by first name; confirmation of what she submitted (date,
location, services); a private pricing-guide link valid 90 days; a Calendly
booking button; a note that the inquiry does not reserve her date; portfolio and
prep-guide links; contact details; the recognition badges.

Degraded mode: when `PRICING_LINK_SECRET` is unset the pricing block is omitted
and the Calendly button still sends.
```

- [ ] **Step 3: Document the environment variables**

Add to `docs/ENVIRONMENT.md`, matching the file's existing format:

```markdown
| `PRICING_LINK_SECRET` | Signs private pricing links (D013). 32 random bytes. Rotating it invalidates every link already sent. Falls back to a dev constant outside production; **required in production** or pricing links are omitted from the auto-responder. |
| `PRICING_OWNER_KEY` | Guards `/pricing/new`. 32 random bytes. Treat the bookmarked URL as a password. Without it the page 404s. |
| `EMAIL_ASSET_BASE_URL` | Absolute base for email images. Defaults to `site.baseUrl`; set to `http://localhost:3000` when running `npm run email`. |

Generate both secrets with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```
```

- [ ] **Step 4: Add the manual test pass to `docs/TEST_PLAN.md`**

```markdown
## Private pricing guide (D013)

- [ ] `npm test` — 13 pricing-link tests pass
- [ ] Valid link renders "Prepared for <name>", three collections, "Most Popular" on Bridal Party, five à la carte rows
- [ ] Expired link (`ttlDays: -1`), tampered signature, and `/pricing/nonsense` all render the expired page at HTTP 200 — never a 404
- [ ] Page source contains `noindex, nofollow`; `/robots.txt` disallows `/pricing`; `/sitemap.xml` contains no `pricing`
- [ ] 375px viewport: cards stack, no horizontal scroll, badge does not clip
- [ ] `/pricing/new` 404s with no key and with a wrong key; renders and copies with the right key
- [ ] Form submission (take >3s) delivers both emails
- [ ] Bride's email: badges render, both buttons work, Reply goes to maureen@theparlor.info
- [ ] Bride's email in Gmail web + phone: no dark-mode inversion, no horizontal scroll
- [ ] Degraded path: with `PRICING_LINK_SECRET` unset the submission still succeeds and the email sends without the pricing block
- [ ] No unconfirmed amount (travel, retainer, minimum, venue change) appears anywhere
```

- [ ] **Step 5: Add production blockers to `docs/LAUNCH_CHECKLIST.md`**

```markdown
## Private pricing guide (D013)

- [ ] `PRICING_LINK_SECRET` set in Vercel production **and** preview
- [ ] `PRICING_OWNER_KEY` set in Vercel production
- [ ] `EMAIL_ASSET_BASE_URL` left unset in production (it defaults to the live site)
- [ ] maureenella.com verified in Resend with SPF + DKIM — confirmed 2026-08-06
- [ ] Send one live test inquiry against production and confirm the bride's email lands in the inbox, not spam (check Gmail, Outlook, and iCloud if possible)
- [ ] Give Maureen the `/pricing/new?key=…` URL to bookmark, and tell her to treat it as a password
- [ ] Confirm https://maureenella.com/robots.txt disallows /pricing
```

- [ ] **Step 6: Update `docs/TASKS.md` and `docs/BUILD_NOTES.md`**

In `TASKS.md`, mark the pricing work done and note the two secrets as the remaining production step.

In `BUILD_NOTES.md`, correct the "all routes static/SSG" statement: `/pricing/[token]` and `/pricing/new` are `force-dynamic`, because the token expiry and the owner key must be evaluated per request. Also record the new dependencies (`@react-email/components`, `@react-email/render`, and `react-email` as a devDependency) and the `npm test` harness (`node --test --experimental-strip-types`, no test framework, requires `allowImportingTsExtensions` in `tsconfig.json`).

- [ ] **Step 7: Final verification**

Run: `npm run typecheck && npm run lint && npm test && npm run build`
Expected: all clean. Build output shows `/pricing/[token]` and `/pricing/new` as dynamic (ƒ); every other route static.

Run: `grep -rnE '\$[0-9]' app components content --include=*.tsx --include=*.ts | grep -v 'content/pricing.ts'`
Expected: no output. Any hit means a price escaped into a public page — that violates D004/D009 and must be removed before merging.

- [ ] **Step 8: Commit**

```bash
git add docs
git commit -m "docs: record D013 and private pricing guide launch requirements"
```

---

## Self-Review

**Spec coverage.** Every spec section maps to a task: access model → 1; routes and hiding → 2, 4, 5; page content → 3, 4; emails → 6, 7, 8; badge assets → 6; owner generator → 5; config and env → 2; testing → 1 and 9; docs and D013 → 9; the abuse-surface and injection notes → Task 8 preamble. `app/sitemap.ts` is explicitly verified-not-edited in Task 2.

**Type consistency.** `createPricingToken`, `verifyPricingToken`, `pricingPath`, and `PRICING_TOKEN_TTL_DAYS` keep identical signatures across Tasks 1, 4, 5, and 8. `Collection` and `ALaCarteItem` are defined once in Task 3 and consumed unchanged in Task 4. `InquiryAutoresponderProps` is defined in Task 7 and spread in Task 8 with `apiKey` and `to` added.

**Known deviation from the spec.** The spec said the buttons would need hand-written VML; `@react-email/components`' `<Button>` already emits the Outlook-safe markup, so the plan uses it directly. The spec also named `@react-email/components` + `@react-email/render` as the dependencies, which is correct — `react-email` itself is the CLI and is added as a devDependency only.

**Verified before writing, not assumed:** the `node --test --experimental-strip-types` harness runs on this machine's Node 22.14; `TS5097` genuinely fires without `allowImportingTsExtensions`; `sharp@0.34.5` is already installed; `@react-email/components@1.0.12` and `@react-email/render@2.1.0` are peer-compatible with React 19.
