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
