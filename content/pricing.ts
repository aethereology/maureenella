import "server-only";
import { parsePricingCatalog } from "@/lib/pricing-catalog";
export type { Collection, ALaCarteItem, PricingCatalog } from "@/lib/pricing-catalog";
/** Read only after request authorization. Never commit real prices or use NEXT_PUBLIC_ here. */
export function getPricingCatalog() {
  return parsePricingCatalog(process.env.PRICING_CATALOG_JSON || "");
}
