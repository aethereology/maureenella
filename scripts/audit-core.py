from pathlib import Path
root=Path.cwd()
def write(path,text):
 p=root/path;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(text.lstrip('\n'))
write('lib/inquiry-validation.ts',r'''
/** Shared field definitions; all authority remains in the server validator. */
export const SERVICE_OPTIONS = ["Hair", "Makeup", "Both hair and makeup", "Not sure yet"] as const;
export const PREVIEW_OPTIONS = ["Yes", "No", "Not sure"] as const;
export const SOURCE_OPTIONS = ["Google", "Instagram", "Referral", "Venue", "Photographer / planner", "Zola / wedding directory", "Other"] as const;
export const WAITLISTS = ["education-waitlist", "education-starter-checklist"] as const;
export const CONTACT_CONSENT = "I agree to be contacted about my inquiry.";
export const WAITLIST_CONSENT = "I agree to receive the requested resource and occasional Maureen Ella education emails. I can unsubscribe at any time.";
export const INQUIRY_FIELDS = [
  { name: "firstName", label: "First name", group: "Your details", type: "text", max: 80, required: true, autoComplete: "given-name" },
  { name: "lastName", label: "Last name", group: "Your details", type: "text", max: 80, required: true, autoComplete: "family-name" },
  { name: "email", label: "Email", group: "Your details", type: "email", max: 254, required: true, autoComplete: "email" },
  { name: "phone", label: "Phone", group: "Your details", type: "tel", max: 40, required: true, autoComplete: "tel" },
  { name: "instagram", label: "Instagram handle", group: "Your details", type: "text", max: 80 },
  { name: "weddingDate", label: "Wedding date", group: "Wedding details", type: "date", max: 10, required: true },
  { name: "cityState", label: "Wedding city / state", group: "Wedding details", type: "text", max: 160, required: true },
  { name: "venue", label: "Venue", group: "Wedding details", type: "text", max: 160 },
  { name: "gettingReadyLocation", label: "Getting-ready location", group: "Wedding details", type: "text", max: 200, required: true },
  { name: "readyBy", label: "Desired ready-by time", group: "Wedding details", type: "time", max: 5 },
  { name: "interestedIn", label: "Interested in", group: "Services", type: "select", max: 80, required: true, options: SERVICE_OPTIONS },
  { name: "previewInterest", label: "Interested in a bridal preview?", group: "Services", type: "select", max: 80, options: PREVIEW_OPTIONS },
  { name: "hairCount", label: "Estimated hair services", group: "Services", type: "number", max: 3, required: true },
  { name: "makeupCount", label: "Estimated makeup services", group: "Services", type: "number", max: 3, required: true },
  { name: "allergies", label: "Any allergies or sensitivities?", group: "Additional details", type: "text", max: 800 },
  { name: "howFound", label: "How did you find Maureen Ella?", group: "Additional details", type: "select", max: 120, options: SOURCE_OPTIONS },
] as const;
export type InquiryField = (typeof INQUIRY_FIELDS)[number];
export type InquiryFieldName = InquiryField["name"];
export type InquiryValues = Record<InquiryFieldName, string> & { consentContact: string; consentNotReserved: string };
export const EMPTY_INQUIRY = Object.fromEntries([
  ...INQUIRY_FIELDS.map(({ name }) => [name, ""]),
  ["consentContact", ""], ["consentNotReserved", ""],
]) as InquiryValues;
const EMAIL_RE = /^[^\s@<>\x00-\x1f\x7f]+@[^\s@<>\x00-\x1f\x7f]+\.[^\s@<>\x00-\x1f\x7f]+$/;
export function textField(form: FormData, key: string): string {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}
export function validEmail(value: string): boolean {
  return value.length <= 254 && EMAIL_RE.test(value);
}
export function validateInquiry(form: FormData, today = new Date()): { values: InquiryValues; errors: Record<string, string> } {
  const values = { ...EMPTY_INQUIRY };
  const errors: Record<string, string> = {};
  for (const field of INQUIRY_FIELDS) {
    const value = textField(form, field.name);
    values[field.name] = value.slice(0, field.max);
    if (form.getAll(field.name).length > 1 || (form.has(field.name) && typeof form.get(field.name) !== "string")) {
      errors[field.name] = `Please enter one ${field.label.toLowerCase()}.`;
    } else if ("required" in field && field.required && !value) {
      errors[field.name] = `Please enter ${field.label.toLowerCase()}.`;
    } else if (value.length > field.max) {
      errors[field.name] = `${field.label} must be ${field.max} characters or fewer.`;
    } else if (/[\x00-\x1f\x7f]/.test(value)) {
      errors[field.name] = `${field.label} must not contain control characters or line breaks.`;
    } else if ("options" in field && value && !(field.options as readonly string[]).includes(value)) {
      errors[field.name] = "Please choose one of the available options.";
    }
  }
  values.email = values.email.toLowerCase();
  if (values.email && !validEmail(values.email)) errors.email = "Please enter a valid email.";
  const digits = values.phone.replace(/\D/g, "");
  if (values.phone && (!/^[+\d\s().xX-]+$/.test(values.phone) || digits.length < 7 || digits.length > 15)) errors.phone = "Please enter a phone number with 7–15 digits.";
  if (values.weddingDate) {
    const date = new Date(`${values.weddingDate}T00:00:00Z`);
    const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(today);
    const part = (name: string) => parts.find((p) => p.type === name)?.value;
    const earliest = `${part("year")}-${part("month")}-${part("day")}`;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(values.weddingDate) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== values.weddingDate) errors.weddingDate = "Please enter a valid calendar date.";
    else if (values.weddingDate < earliest) errors.weddingDate = "Please choose today or a future wedding date.";
  }
  if (values.readyBy && !/^([01]\d|2[0-3]):[0-5]\d$/.test(values.readyBy)) errors.readyBy = "Please enter a valid time.";
  for (const name of ["hairCount", "makeupCount"] as const) {
    if (values[name] && (!/^\d{1,3}$/.test(values[name]) || Number(values[name]) > 200)) errors[name] = "Enter a whole number from 0 to 200.";
    else if (values[name]) values[name] = String(Number(values[name]));
  }
  if (values.hairCount === "0" && values.makeupCount === "0") errors.hairCount = "Please request at least one hair or makeup service.";
  for (const name of ["consentContact", "consentNotReserved"] as const) {
    values[name] = form.get(name) === "on" && form.getAll(name).length === 1 ? "on" : "";
    if (!values[name]) errors[name] = "Please confirm this acknowledgement.";
  }
  return { values, errors };
}
export type WaitlistValues = { email: string; name: string; list: string; consentContact: string };
export function validateWaitlist(form: FormData): { values: WaitlistValues; errors: Record<string, string> } {
  const email = textField(form, "email").toLowerCase();
  const name = textField(form, "name");
  const list = textField(form, "list");
  const consentContact = form.get("consentContact") === "on" ? "on" : "";
  const errors: Record<string, string> = {};
  if (!validEmail(email)) errors.email = "Please enter a valid email address (254 characters or fewer).";
  if (name.length > 80 || /[\x00-\x1f\x7f]/.test(name)) errors.name = "First name must be 80 characters or fewer, without line breaks.";
  if (!(WAITLISTS as readonly string[]).includes(list)) errors.list = "This signup list is not available.";
  if (!consentContact) errors.consentContact = "Please agree to receive the requested emails.";
  for (const key of ["email", "name", "list", "consentContact"]) {
    if (form.getAll(key).length > 1 || (form.has(key) && typeof form.get(key) !== "string")) errors[key] = "Please submit one value for this field.";
  }
  return { values: { email: email.slice(0, 254), name: name.slice(0, 80), list: list.slice(0, 80), consentContact }, errors };
}
''')
write('lib/form-state.ts',r'''
import type { InquiryValues, WaitlistValues } from "./inquiry-validation.ts";
export type FormState<T> = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
  values?: T;
  accepted?: boolean;
  attempt?: number;
  submissionId?: string;
};
export type InquiryState = FormState<InquiryValues>;
export type WaitlistState = FormState<WaitlistValues>;
''')
write('lib/server/config.ts',r'''
import "server-only";
export function required(name: string, minLength = 1): string {
  const value = process.env[name]?.trim();
  if (!value || value.length < minLength) throw new Error(`CONFIG_${name}`);
  return value;
}
export function httpsUrl(value: string): URL {
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password || url.hash) throw new Error("CONFIG_HTTPS_URL");
  return url;
}
export function sender(): string {
  const email = process.env.RESEND_FROM_EMAIL?.trim() || "inquiries@maureenella.com";
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) throw new Error("CONFIG_RESEND_FROM_EMAIL");
  return `Maureen Ella <${email}>`;
}
export function emailConfigured(): boolean { return Boolean(process.env.RESEND_API_KEY && process.env.FORM_TO_EMAIL); }
export function deliveryChannels(kind: "inquiry" | "waitlist"): string[] {
  const channels: string[] = [];
  if (emailConfigured()) channels.push("owner");
  if (kind === "inquiry" && process.env.CRM_WEBHOOK_URL) {
    httpsUrl(process.env.CRM_WEBHOOK_URL);
    channels.push("crm");
  }
  if (process.env.RESEND_API_KEY) channels.push(kind === "inquiry" ? "autoresponder" : "welcome");
  if (kind === "inquiry" && !channels.some((c) => c === "owner" || c === "crm")) throw new Error("CONFIG_INQUIRY_NOTIFICATION");
  return channels;
}
''')
write('lib/server/database.ts',r'''
import "server-only";
import { required, httpsUrl } from "./config";
/** Service-role key is confined to server modules. Responses never enter logs. */
export async function databaseRpc<T>(name: string, args: Record<string, unknown>): Promise<T> {
  if (!/^website_[a-z_]+$/.test(name)) throw new Error("DATABASE_FUNCTION");
  const base = httpsUrl(process.env.SUPABASE_URL || required("NEXT_PUBLIC_SUPABASE_URL"));
  const key = required("SUPABASE_SERVICE_ROLE_KEY");
  const response = await fetch(new URL(`/rest/v1/rpc/${name}`, base), {
    method: "POST", cache: "no-store", redirect: "error", signal: AbortSignal.timeout(8000),
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(args),
  });
  if (!response.ok) throw new Error(`DATABASE_HTTP_${response.status}`);
  return await response.json() as T;
}
''')
write('lib/owner-session.ts',r'''
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
''')
write('lib/server/owner-auth.ts',r'''
import "server-only";
import { cookies } from "next/headers";
import { verifyOwnerSession } from "../owner-session";
export const ownerCookieName = () => process.env.NODE_ENV === "production" ? "__Host-me-owner" : "me-owner";
export async function isOwner(): Promise<boolean> {
  const token = (await cookies()).get(ownerCookieName())?.value;
  if (!token) return false;
  return verifyOwnerSession(token, process.env.PRICING_OWNER_KEY || "", process.env.OWNER_SESSION_SECRET || "");
}
''')
write('lib/pricing-catalog.ts',r'''
export type Collection = { slug: string; name: string; price: string; positioning: string; includes: string[]; note?: string; featured?: boolean; featuredLabel?: string };
export type ALaCarteItem = { service: string; price: string };
export type PricingCatalog = { collections: Collection[]; aLaCarte: ALaCarteItem[]; pricingIntro: string; goodToKnow: string[] };
function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid pricing object");
  return value as Record<string, unknown>;
}
function text(value: unknown, max = 2000): string {
  if (typeof value !== "string" || !value.trim() || value.length > max) throw new Error("Invalid pricing text");
  return value;
}
function strings(value: unknown): string[] {
  if (!Array.isArray(value) || value.length > 40) throw new Error("Invalid pricing list");
  return value.map((v) => text(v));
}
export function parsePricingCatalog(raw: string): PricingCatalog {
  if (!raw || raw.length > 50000) throw new Error("Pricing catalog is missing or too large");
  const value = object(JSON.parse(raw));
  if (!Array.isArray(value.collections) || !value.collections.length || value.collections.length > 20 || !Array.isArray(value.aLaCarte) || value.aLaCarte.length > 50) throw new Error("Invalid pricing catalog");
  const collections = value.collections.map((entry) => {
    const item = object(entry);
    const slug = text(item.slug, 80);
    if (!/^[a-z0-9-]+$/.test(slug)) throw new Error("Invalid collection identifier");
    if (item.featured !== undefined && typeof item.featured !== "boolean") throw new Error("Invalid featured flag");
    return { slug, name: text(item.name), price: text(item.price, 160), positioning: text(item.positioning), includes: strings(item.includes), ...(item.note ? { note: text(item.note) } : {}), ...(item.featured !== undefined ? { featured: item.featured as boolean } : {}), ...(item.featuredLabel ? { featuredLabel: text(item.featuredLabel) } : {}) };
  });
  if (new Set(collections.map((c) => c.slug)).size !== collections.length) throw new Error("Duplicate pricing collections");
  return { collections, aLaCarte: value.aLaCarte.map((entry) => { const item = object(entry); return { service: text(item.service), price: text(item.price, 160) }; }), pricingIntro: text(value.pricingIntro), goodToKnow: strings(value.goodToKnow) };
}
''')
write('content/pricing.ts',r'''
import "server-only";
import { parsePricingCatalog } from "@/lib/pricing-catalog";
export type { Collection, ALaCarteItem, PricingCatalog } from "@/lib/pricing-catalog";
/** Read only after request authorization. Never commit real prices or use NEXT_PUBLIC_ here. */
export function getPricingCatalog() {
  return parsePricingCatalog(process.env.PRICING_CATALOG_JSON || "");
}
''')
p=root/'components/pricing/CollectionCard.tsx';p.write_text(p.read_text().replace('"@/content/pricing"','"@/lib/pricing-catalog"'))
p=root/'components/pricing/ALaCarteTable.tsx';s=p.read_text();s=s.replace('import { aLaCarte } from "@/content/pricing";', 'import type { ALaCarteItem } from "@/lib/pricing-catalog";');s=s.replace('export function ALaCarteTable() {','export function ALaCarteTable({ items }: { items: ALaCarteItem[] }) {').replace('{aLaCarte.map(', '{items.map(');p.write_text(s)
p=root/'lib/pricing-link.ts';s=p.read_text().replace('if (configured) return configured;','if (configured) {\n    if (configured.length < 32 && process.env.NODE_ENV === "production") throw new Error("PRICING_LINK_SECRET must be at least 32 characters.");\n    return configured;\n  }');s=s.replace('if (typeof token !== "string") return fail;','if (typeof token !== "string" || token.length > 2048) return fail;');p.write_text(s)
p=root/'lib/pricing-link.test.ts';s=p.read_text().replace('process.env.PRICING_LINK_SECRET = original;', 'if (original === undefined) delete process.env.PRICING_LINK_SECRET;\n    else process.env.PRICING_LINK_SECRET = original;');p.write_text(s)
