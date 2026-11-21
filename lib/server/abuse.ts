import "server-only";
import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import { headers } from "next/headers";
import { site } from "@/lib/site";
import { databaseRpc } from "./database";
import { required } from "./config";
export function privateDigest(scope: string, value: string): string {
  return createHmac("sha256",required("ABUSE_HASH_SECRET",32)).update(`${scope}:${value}`).digest("hex");
}
export async function trustedClientIp(): Promise<string> {
  const h=await headers();
  // Vercel overwrites x-forwarded-for; other proxies require explicit trust.
  const trusted=process.env.VERCEL === "1" || process.env.TRUST_PROXY_HEADERS === "true";
  if (!trusted) return "unknown";
  const ip=(h.get("x-forwarded-for") || "").split(",")[0].trim();
  return isIP(ip) ? ip : "unknown";
}
export async function enforceLimit(scope: string, value: string, limit: number, seconds: number): Promise<void> {
  const allowed=await databaseRpc<boolean>("website_rate_limit",{p_key:privateDigest(scope,value),p_limit:limit,p_window:seconds});
  if (!allowed) throw new Error("RATE_LIMITED");
}
export async function verifyHuman(form: FormData): Promise<void> {
  const secret=process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    if (process.env.NODE_ENV === "production") throw new Error("CONFIG_TURNSTILE_SECRET_KEY");
    return;
  }
  const token=form.get("cf-turnstile-response");
  if (typeof token !== "string" || !token || token.length>2048) throw new Error("BOT_CHALLENGE_REQUIRED");
  const response=await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{
    method:"POST",cache:"no-store",redirect:"error",signal:AbortSignal.timeout(8000),
    headers:{"Content-Type":"application/json"},body:JSON.stringify({secret,response:token}),
  });
  if (!response.ok) throw new Error("BOT_CHALLENGE_UNAVAILABLE");
  const result=await response.json() as {success?:boolean;hostname?:string;action?:string};
  const allowed=(process.env.TURNSTILE_ALLOWED_HOSTNAMES || new URL(site.baseUrl).hostname).split(",").map((v)=>v.trim()).filter(Boolean);
  if (!result.success || result.action !== "lead_capture" || !result.hostname || !allowed.includes(result.hostname)) throw new Error("BOT_CHALLENGE_REQUIRED");
}
export function publicFailure(error: unknown): string {
  const code=error instanceof Error ? error.message : "UNKNOWN";
  if (code === "RATE_LIMITED") return "Too many attempts. Please wait a few minutes before trying again, or contact us directly.";
  if (code.startsWith("BOT_CHALLENGE")) return "Please complete the security check again and retry. Your entered details are still here.";
  return "We couldn't save your details. Please try again or contact us directly. Your entered details are still here.";
}
