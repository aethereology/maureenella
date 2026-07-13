/**
 * Central site configuration.
 *
 * IMPORTANT (see docs/CONFIRMATION_NEEDED.md + docs/DECISIONS.md D004):
 * Every field marked `confirmed: false` MUST NOT be rendered publicly until
 * Maureen confirms the value. Components read `confirmed` flags and fall back
 * to inquiry-only language. Never hard-code an unconfirmed number into copy.
 */

export const CONFIRM = "__CONFIRM__" as const;

export const site = {
  brand: "Maureen Ella",
  brandLong: "Maureen Ella Bridal",
  domain: "maureenella.com",
  baseUrl: "https://maureenella.com",
  tagline:
    "Romantic bridal hair and makeup for brides who want to feel calm, confident, and beautifully prepared.",
  description:
    "Premium on-location bridal hair and makeup for weddings in St. Augustine, Jacksonville, Palm Coast, Northeast Florida, and destinations. Calm, organized, photo-ready bridal beauty.",
  serviceAreas: [
    "St. Augustine",
    "Jacksonville",
    "Palm Coast",
    "Northeast Florida",
    "Destination weddings",
  ],

  /**
   * Contact + identity. Confirmed by the founder (D009, updated 2026-07-12):
   * email, phone, hours, and street address.
   */
  contact: {
    phone: { value: "(904) 881-5808", confirmed: true },
    email: { value: "maureen@theparlor.info", confirmed: true },
    address: { value: "206 Ashourian Ave, St. Augustine, FL 32092", confirmed: true },
    hours: { value: "Daily, 6:00 AM–6:00 PM", confirmed: true },
  },

  social: {
    instagram: {
      value: "https://www.instagram.com/maureenattheparlor/",
      confirmed: true,
    },
  },

  reviews: {
    google: {
      value: "https://g.page/r/CTv0fdbbAi-FEAI/review",
      confirmed: true,
    },
  },

  /**
   * Pricing policy for the MVP: inquiry-only. Do not surface numbers even
   * if seed/services.json contains extracted (unconfirmed) values.
   */
  pricing: {
    mode: "inquiry-only" as "inquiry-only" | "exact" | "starting-at",
    published: false,
  },

  /** Section visibility. Education launched (Phase 3) as a full offer. */
  sections: {
    education: "full" as "teaser" | "full" | "hidden",
    favorites: "teaser" as "teaser" | "full" | "hidden",
  },

  /** Primary conversion CTA used everywhere. */
  cta: {
    primary: { label: "Request Availability", href: "/contact" },
    secondary: { label: "View Portfolio", href: "/bridal/portfolio" },
  },
} as const;

export type Site = typeof site;

/**
 * tel: href derived from the confirmed display phone — strips formatting so
 * the link and the visible number can never drift apart.
 */
export const phoneHref = site.contact.phone.value
  ? `tel:+1${site.contact.phone.value.replace(/\D/g, "")}`
  : "";
