/**
 * Minimal, dependency-free in-memory rate limiter for server actions.
 *
 * Scope/limits: this is a per-instance fixed-window counter. On Vercel Fluid
 * Compute, function instances are reused across requests, so this meaningfully
 * throttles abuse from a single source without any external service or config.
 * It is NOT a globally consistent limit — for high-traffic or strict guarantees,
 * swap `hit()` for a shared store (Upstash Redis via the Vercel Marketplace) or
 * front it with Vercel BotID / WAF rate rules. The interface stays the same.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_KEYS = 10_000; // hard cap so a flood of unique IPs can't grow memory unbounded.

export type RateLimitResult = { ok: boolean; retryAfterSeconds: number };

/**
 * Records a hit for `key` and reports whether it is within `limit` hits per
 * `windowMs`. Expired windows reset automatically.
 */
export function hit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();

  // Opportunistic sweep of expired buckets when the map gets large.
  if (buckets.size >= MAX_KEYS) {
    for (const [k, b] of buckets) {
      if (now >= b.resetAt) buckets.delete(k);
    }
    // Still full of live buckets → fail closed for new keys to protect memory.
    if (buckets.size >= MAX_KEYS && !buckets.has(key)) {
      return { ok: false, retryAfterSeconds: Math.ceil(windowMs / 1000) };
    }
  }

  const existing = buckets.get(key);
  if (!existing || now >= existing.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= limit) {
    return { ok: false, retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000) };
  }

  existing.count += 1;
  return { ok: true, retryAfterSeconds: 0 };
}

/**
 * Best-effort client IP from a server action, read from proxy headers.
 * Falls back to a shared bucket ("unknown") when no IP is available.
 */
export async function clientIp(): Promise<string> {
  const { headers } = await import("next/headers");
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return h.get("x-real-ip")?.trim() || "unknown";
}
