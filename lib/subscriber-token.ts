import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
function key(secret: string): Buffer {
  if (secret.length < 32) throw new Error("SUBSCRIBER_TOKEN_SECRET must be at least 32 characters");
  return createHash("sha256").update(secret).digest();
}
/** An opaque authenticated token: no email address appears in its URL. */
export function createSubscriberToken(email: string, secret: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm",key(secret),iv);
  cipher.setAAD(Buffer.from("unsubscribe-v1"));
  const encrypted = Buffer.concat([cipher.update(email.toLowerCase(),"utf8"),cipher.final()]);
  return Buffer.concat([iv,cipher.getAuthTag(),encrypted]).toString("base64url");
}
export function readSubscriberToken(token: string, secret: string): string | null {
  try {
    if (!/^[A-Za-z0-9_-]{40,512}$/.test(token)) return null;
    const bytes=Buffer.from(token,"base64url");
    const decipher=createDecipheriv("aes-256-gcm",key(secret),bytes.subarray(0,12));
    decipher.setAAD(Buffer.from("unsubscribe-v1"));
    decipher.setAuthTag(bytes.subarray(12,28));
    const email=Buffer.concat([decipher.update(bytes.subarray(28)),decipher.final()]).toString("utf8");
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length<=254 ? email : null;
  } catch { return null; }
}
