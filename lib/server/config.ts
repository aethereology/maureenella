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
