/**
 * Bridal pricing, delivered privately after inquiry (D013).
 *
 * Collections revised by the founder 2026-08-06 (D014): renamed to the
 * Gold/Diamond/Platinum "Experience" tiers, entry tier raised to $650 with a
 * preview added, and a per-collection travel note. À la carte is unchanged and
 * still awaiting Maureen's review against the new $650 entry tier.
 *
 * These figures MUST NOT reach any public, indexable page — they render only
 * inside /pricing/[token], which is noindex and robots-disallowed. Travel,
 * retainer, service-minimum, touch-up-stay, and venue-change AMOUNTS remain
 * unconfirmed and are deliberately absent (D004/D009): `note` below says a
 * travel fee *may apply* without ever quoting one. Follows the
 * content/education.ts pattern: components read these typed structures rather
 * than importing seed JSON.
 */

export type Collection = {
  slug: string;
  name: string;
  /** Display string like "Starting at [amount]". Never a bare number. */
  price: string;
  positioning: string;
  includes: string[];
  /** Qualifier shown under the inclusions. Policy language only — no amounts. */
  note?: string;
  featured?: boolean;
  featuredLabel?: string;
};

export type ALaCarteItem = { service: string; price: string };

export const collections: Collection[] = [
  {
    slug: "gold-experience",
    name: "The Gold Experience",
    price: "Starting at $650",
    positioning:
      "For the bride who wants a flawless, stress-free wedding morning.",
    includes: [
      "Luxury bridal hairstyle",
      "Luxury bridal makeup (airbrush)",
      "Bridal hair and makeup preview",
      "Custom lashes",
      "Hair touch-up kit",
      "Makeup touch-up kit",
      "Wedding day timeline",
      "On-location services",
    ],
    note: "Travel fee may apply.",
  },
  {
    slug: "diamond-experience",
    name: "The Diamond Experience",
    price: "Starting at $1,050",
    positioning: "For the bride and her closest loved ones.",
    featured: true,
    featuredLabel: "Highly Requested",
    includes: [
      "Bridal hairstyle",
      "Bridal makeup",
      "Hair for 3 bridal party members or guests",
      "Makeup for 3 bridal party members or guests",
      "Custom lashes",
      "Hair and makeup touch-up kit",
      "Wedding morning timeline",
      "On-location services",
    ],
    note: "Travel fee may apply.",
  },
  {
    slug: "platinum-experience",
    name: "The Platinum Experience",
    price: "Starting at $1,850",
    positioning:
      "The complete luxury beauty experience for larger wedding parties.",
    includes: [
      "Bridal hairstyle",
      "Bridal makeup",
      "Hair for 6 bridal party members or guests",
      "Makeup for 6 bridal party members or guests",
      "Custom lashes",
      "Hair and makeup touch-up kit",
      "Wedding morning timeline",
      "Additional artist(s)",
      "On-location services",
      "Touch-ups before the ceremony (optional)",
    ],
    note: "Travel fee may apply.",
  },
];

export const aLaCarte: ALaCarteItem[] = [
  { service: "Bridal Hair", price: "Starting at $250" },
  { service: "Bridal Makeup", price: "Starting at $250" },
  { service: "Bridal Hair and Makeup", price: "Starting at $450" },
  { service: "Bridal Party Hair", price: "$125 per person" },
  { service: "Bridal Party Makeup", price: "$125 per person" },
];

export const pricingIntro =
  "Every wedding morning is different, so every quote is built around your date, your party size, and your timeline. The collections below are starting points — your written proposal will reflect exactly what your day needs.";

/** Policy language only. No amounts: those stay unconfirmed (D004/D009). */
export const goodToKnow: string[] = [
  "Collections are starting points. Your written proposal confirms the final total for your specific services.",
  "Travel, early-start, and touch-up-stay fees are quoted in your proposal, based on your getting-ready location and timeline.",
  "A signed agreement and retainer reserve your date. Until both are received, your date stays open to other couples.",
  "Bridal party services are performed on location at your getting-ready venue.",
];
