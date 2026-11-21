import { createHmac, randomUUID, timingSafeEqual, createHash } from "node:crypto";
export const OWNER_SESSION_SECONDS = 8 * 60 * 60;
export function secretEqual(a: string, b: string): boolean {
  return timingSafeEqual(createHash("sha256").update(a).digest(), createHash("sha256").update(b).digest());
}
function signingKey(ownerKey: string, sessionSecret: string): Buffer {
  if (ownerKey.length < 32 || sessionSecret.length < 32) throw new Error("Owner secrets must be at least 32 characters.");
  return createHmac("sha256", sessionSecret).update(`owner-session-v1:${ownerKey}`).digest();
}
export function createOwnerSession(ownerKey: string, sessionSecret: string, now = Date.now()): string {
  const payload = Buffer.from(JSON.stringify({ purpose: "owner", v: 1, exp: Math.floor(now / 1000) + OWNER_SESSION_SECONDS, nonce: randomUUID() })).toString("base64url");
  return `${payload}.${createHmac("sha256", signingKey(ownerKey, sessionSecret)).update(payload).digest("base64url")}`;
}
export function verifyOwnerSession(token: string, ownerKey: string, sessionSecret: string, now = Date.now()): boolean {
  try {
    if (token.length > 1024) return false;
    const [payload, signature, extra] = token.split(".");
    if (!payload || !signature || extra !== undefined) return false;
    const expected = createHmac("sha256", signingKey(ownerKey, sessionSecret)).update(payload).digest("base64url");
    if (!secretEqual(signature, expected)) return false;
    const value = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return value?.purpose === "owner" && value.v === 1 && Number.isSafeInteger(value.exp) && value.exp > Math.floor(now / 1000) && value.exp <= Math.floor(now / 1000) + OWNER_SESSION_SECONDS;
  } catch { return false; }
}
