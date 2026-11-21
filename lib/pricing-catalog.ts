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
