/**
 * Central site configuration.
 *
 * IMPORTANT (see docs/CONFIRMATION_NEEDED.md + docs/DECISIONS.md D004):
 * Every field marked `confirmed: false` MUST NOT be rendered publicly until
 * Maureen confirms the value. Components read `confirmed` flags and fall back
 * to inquiry-only language. Never hard-code an unconfirmed number into copy.
 */

export const CONFIRM = "__CONFIRM__" as const;

type Confirmable<T> = {
  value: T | null;
  confirmed: boolean;
};

const unconfirmed = <T>(): Confirmable<T> => ({ value: null, confirmed: false });

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
   * Contact + identity — all UNCONFIRMED. Leave null until confirmed.
   * When confirmed, set value and confirmed: true; UI will render automatically.
   */
  contact: {
    phone: unconfirmed<string>(),
    email: unconfirmed<string>(),
    address: unconfirmed<string>(),
    hours: unconfirmed<string>(),
  },

  social: {
    instagram: unconfirmed<string>(),
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
