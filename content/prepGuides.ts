/**
 * Dedicated bridal prep guides (/bridal/prep-guides/[slug]). Educational,
 * checklist-oriented, brand voice. Generic safe advice — no unconfirmed policy.
 */
export type GuideSection = {
  heading: string;
  intro?: string;
  checklist: string[];
};

export type PrepGuide = {
  slug: "hair-prep" | "makeup-prep" | "trial-prep";
  title: string;
  description: string;
  intro: string;
  image: string;
  sections: GuideSection[];
};

export const prepGuides: PrepGuide[] = [
  {
    slug: "hair-prep",
    title: "Wedding Morning Hair Prep Guide",
    description:
      "How to prepare your hair for a calm, beautiful wedding morning — from the weeks before to the day of.",
    intro:
      "Beautiful bridal hair starts before you sit in the chair. A little preparation helps your style go in smoothly, hold all day, and photograph the way you imagined.",
    image: "/images/guides/hair-prep.jpg",
    sections: [
      {
        heading: "In the weeks before",
        checklist: [
          "Book any color or trims early — not in the final week.",
          "Keep your hair healthy with regular conditioning.",
          "Bring inspiration photos and your accessories to your preview.",
          "Avoid trying brand-new treatments close to the wedding.",
        ],
      },
      {
        heading: "The day before",
        checklist: [
          "Wash and fully dry your hair unless told otherwise.",
          "Skip heavy oils and leave-in products on styling day.",
          "Lay out your veil, clips, and any extensions, clean and ready.",
        ],
      },
      {
        heading: "Wedding morning",
        intro: "Set yourself up for a relaxed start.",
        checklist: [
          "Arrive with dry, brushed-out hair.",
          "Wear a button-up or robe so nothing pulls over your finished style.",
          "Have water and a light snack nearby.",
        ],
      },
    ],
  },
  {
    slug: "makeup-prep",
    title: "Wedding Morning Makeup Prep Guide",
    description:
      "Skin prep and day-of tips for glowing, photo-ready bridal makeup that lasts.",
    intro:
      "Great bridal makeup sits on well-prepped skin. The steps below help your makeup look fresh, even, and photo-ready from the first look to the last dance.",
    image: "/images/guides/makeup-prep.jpg",
    sections: [
      {
        heading: "In the weeks before",
        checklist: [
          "Stay consistent with a gentle skincare routine.",
          "Hydrate well and protect your skin from sunburn.",
          "Avoid new actives or facials right before the wedding.",
          "Share any allergies or sensitivities at your preview.",
        ],
      },
      {
        heading: "The day before",
        checklist: [
          "Exfoliate gently and moisturize.",
          "Avoid self-tanner unless tested and approved in advance.",
          "Get a good night of rest and drink plenty of water.",
        ],
      },
      {
        heading: "Wedding morning",
        checklist: [
          "Arrive with clean, moisturized, product-free skin.",
          "Bring your touch-up lip color for later in the day.",
          "Let us know your timeline so we can plan a calm finish.",
        ],
      },
    ],
  },
  {
    slug: "trial-prep",
    title: "Bridal Preview Prep Guide",
    description:
      "How to get the most out of your bridal hair and makeup preview.",
    intro:
      "Your preview is where we plan your wedding-day look together. Arriving prepared makes the appointment relaxed and productive.",
    image: "/images/guides/trial-prep.jpg",
    sections: [
      {
        heading: "What to bring",
        checklist: [
          "Inspiration photos of hair and makeup you love.",
          "Your veil, hair accessories, and any clip-in extensions.",
          "A top in a similar neckline or color to your dress, if possible.",
          "Notes on your venue, timeline, and overall wedding vision.",
        ],
      },
      {
        heading: "How to arrive",
        checklist: [
          "Clean, dry, brushed-out hair.",
          "Moisturized, product-free skin.",
          "An idea of your dress style and overall palette.",
        ],
      },
      {
        heading: "What we'll cover",
        intro: "By the end of your preview you'll have a clear plan.",
        checklist: [
          "Your refined hair and makeup look.",
          "Lashes, lip color, and any add-ons you want.",
          "An outline for a smooth wedding-morning timeline.",
        ],
      },
    ],
  },
];

export function getPrepGuide(slug: string): PrepGuide | undefined {
  return prepGuides.find((g) => g.slug === slug);
}
