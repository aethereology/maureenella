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
