/**
 * Service-area landing pages (Phase 2 local SEO). Copy is honest and general —
 * it describes serving each area and wedding-morning logistics without
 * fabricating specific venues, claims, or business facts. Real venue names and
 * local case studies can be added later from approved real weddings.
 *
 * Each area filters the portfolio by `portfolioTag` (a key in gallery tags) and
 * cross-links to sibling areas for internal linking.
 */
export type Location = {
  slug: "st-augustine" | "jacksonville" | "palm-coast" | "destination-weddings";
  city: string;
  /** H1 on the page. */
  heading: string;
  metaTitle: string;
  metaDescription: string;
  /** Hero image under /public/images. */
  image: string;
  imageAlt: string;
  /** Lead paragraph under the H1. */
  intro: string;
  /** Body paragraphs. */
  body: string[];
  /** Short "what we serve" bullets specific to the area. */
  highlights: string[];
  /** Gallery filter key; null shows the featured set. */
  portfolioTag: string | null;
};

export const locations: Location[] = [
  {
    slug: "st-augustine",
    city: "St. Augustine",
    heading: "St. Augustine Bridal Hair & Makeup",
    metaTitle: "St. Augustine Bridal Hair & Makeup Artist",
    metaDescription:
      "On-location bridal hair and makeup for St. Augustine weddings and elopements. Romantic, long-lasting, photo-ready beauty with a calm wedding-morning experience.",
    image: "/images/portfolio/april.jpg",
    imageAlt:
      "St. Augustine bride with polished bridal hair and natural glowing makeup",
    intro:
      "Getting married in St. Augustine? Maureen Ella provides on-location bridal hair and makeup for weddings and elopements across the nation's oldest city — from historic downtown venues to the beach.",
    body: [
      "St. Augustine is one of Florida's most beloved wedding destinations, with coastal light, historic backdrops, and humidity that bridal beauty has to stand up to. Maureen Ella creates romantic, long-lasting hair and makeup designed to hold through the heat, the breeze, and a full day of photos.",
      "Whether you're getting ready in a downtown suite, a bayfront rental, or steps from the water, the experience is built around a calm, organized wedding morning — clear timelines, on-location service, and a look that feels like you.",
    ],
    highlights: [
      "On-location service across St. Augustine and St. Johns County",
      "Beach- and humidity-ready styles built to last",
      "Bridal hair, makeup, previews, and bridal party services",
      "Calm, timeline-aware wedding mornings",
    ],
    portfolioTag: "st-augustine",
  },
  {
    slug: "jacksonville",
    city: "Jacksonville",
    heading: "Jacksonville Wedding Hair & Makeup",
    metaTitle: "Jacksonville Wedding Hair & Makeup Artist",
    metaDescription:
      "On-location bridal hair and makeup for Jacksonville weddings. Soft, romantic, photo-ready bridal beauty with an organized, calm wedding-morning experience.",
    image: "/images/portfolio/bridal-03.jpg",
    imageAlt:
      "Jacksonville bride with a polished updo and glowing bridal makeup",
    intro:
      "For Jacksonville weddings, Maureen Ella brings on-location bridal hair and makeup to your getting-ready suite, venue, or home — with the timeline awareness a larger wedding morning needs.",
    body: [
      "Jacksonville couples marry everywhere from riverfront venues to garden estates and downtown spaces. Across all of them, the goal is the same: soft, romantic, photo-ready bridal beauty and a morning that runs on schedule.",
      "Maureen Ella plans your beauty timeline around your photographer and planner, so your bridal party is ready on time and you get to enjoy the morning instead of managing it.",
    ],
    highlights: [
      "On-location service throughout the Jacksonville area",
      "Built for larger bridal parties and tighter timelines",
      "Add-on artist available by request for bigger groups",
      "Bridal hair, makeup, previews, and guest services",
    ],
    portfolioTag: "jacksonville",
  },
  {
    slug: "palm-coast",
    city: "Palm Coast",
    heading: "Palm Coast Bridal Hair & Makeup",
    metaTitle: "Palm Coast Bridal Hair & Makeup Artist",
    metaDescription:
      "On-location bridal hair and makeup for Palm Coast weddings and resort celebrations. Romantic, long-lasting, photo-ready beauty for your wedding morning.",
    image: "/images/portfolio/taylor.jpg",
    imageAlt: "Palm Coast bride with romantic bridal hair and makeup",
    intro:
      "Planning a Palm Coast wedding? Maureen Ella offers on-location bridal hair and makeup for resort, coastal, and private-venue celebrations between St. Augustine and Daytona.",
    body: [
      "Palm Coast and Flagler County weddings often mean resorts, golf clubs, and waterfront settings — beautiful, but warm and breezy. Maureen Ella creates styles designed to stay soft and polished from your first look through the last dance.",
      "Service is on-location and timeline-aware, so your wedding morning feels calm whether you're at a resort suite or a private rental.",
    ],
    highlights: [
      "On-location service across Palm Coast and Flagler County",
      "Resort, coastal, and private-venue weddings",
      "Long-wearing styles for warm, breezy settings",
      "Bridal hair, makeup, previews, and bridal party services",
    ],
    portfolioTag: null,
  },
  {
    slug: "destination-weddings",
    city: "Destination & Northeast Florida",
    heading: "Destination & Northeast Florida Wedding Hair & Makeup",
    metaTitle: "Florida Destination Wedding Hair & Makeup Artist",
    metaDescription:
      "On-location bridal hair and makeup for destination weddings and elopements across Northeast Florida. Calm, organized, photo-ready bridal beauty wherever you marry.",
    image: "/images/portfolio/pf-15.jpg",
    imageAlt:
      "Bride wearing a braided updo and veil embracing the groom at an outdoor wedding",
    intro:
      "Marrying away from home? Maureen Ella serves destination weddings and elopements across Northeast Florida — bringing a calm, organized bridal beauty experience to wherever your day takes place.",
    body: [
      "Destination and elopement mornings have their own rhythm: unfamiliar getting-ready spaces, travel logistics, and a timeline that has to flex. Maureen Ella plans ahead with you so the beauty part is the easy part.",
      "From intimate beach elopements to full destination weekends across Northeast Florida, the focus stays the same — romantic, long-lasting hair and makeup and a wedding morning that feels relaxed and on schedule. Travel beyond the core service area may be available; share your details and we'll let you know.",
    ],
    highlights: [
      "Destination weddings and elopements across Northeast Florida",
      "Beach- and travel-ready styles built to last",
      "Flexible, timeline-aware planning for unfamiliar venues",
      "Possible travel beyond the core area on request",
    ],
    portfolioTag: "beach",
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

/** Sibling areas for cross-linking (everything except the current one). */
export function otherLocations(slug: string): Location[] {
  return locations.filter((l) => l.slug !== slug);
}
