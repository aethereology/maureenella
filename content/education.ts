/**
 * Maureen Ella Education content (/education + /education/starter-checklist).
 *
 * Mentorship positioning for bridal hair & makeup professionals. Honest,
 * benefit-led copy — no fabricated stats, credentials, prices, guarantees, or
 * certification claims. Paid products stay "coming soon / waitlist" until
 * Maureen confirms offers and pricing (see docs/CONFIRMATION_NEEDED.md, D004).
 *
 * Mirrors the content/prepGuides.ts pattern: components read these typed
 * structures rather than importing seed JSON directly.
 */
import { educationOffers } from "@/lib/content";

export type FrameworkStep = {
  /** Single-letter mnemonic in "The CONFIDENT Bridal Business Method". */
  letter: string;
  title: string;
  description: string;
};

export type ChecklistSection = {
  heading: string;
  intro?: string;
  items: string[];
};

/** Audience — who Maureen Ella Education is for. */
export const whoFor: string[] = [
  "Newer bridal hair and makeup artists building toward consistent wedding bookings",
  "Salon and suite owners adding bridal services to their menu",
  "Beauty pros moving from occasional weddings to a real bridal business",
  "Artists who feel buried by inquiries, timelines, and day-of logistics",
];

/** Problems the mentorship is built to solve. */
export const problems: string[] = [
  "Unclear pricing and discounting that quietly erodes your income",
  "An inquiry process that loses good brides or attracts the wrong ones",
  "No service minimum or policy strategy to protect your calendar",
  "Chaotic, behind-schedule wedding mornings",
  "A portfolio and social presence that undersells your work",
  "No repeatable content or SEO system to stay visible between referrals",
];

/** The CONFIDENT Bridal Business Method — Maureen's teaching framework. */
export const framework: FrameworkStep[] = [
  {
    letter: "C",
    title: "Clarify your bridal brand",
    description:
      "Define who you serve and the experience you sell so the right brides recognize you.",
  },
  {
    letter: "O",
    title: "Organize your menu and policies",
    description:
      "Build a clear service menu, minimums, and policies that protect your time.",
  },
  {
    letter: "N",
    title: "Nurture inquiries",
    description:
      "Reply with a calm, confident workflow that turns questions into booked dates.",
  },
  {
    letter: "F",
    title: "Fix your wedding-day workflow",
    description:
      "Plan timelines and ready-by times so mornings stay relaxed and on schedule.",
  },
  {
    letter: "I",
    title: "Improve your social proof",
    description:
      "Strengthen your portfolio, reviews, and vendor relationships to earn trust.",
  },
  {
    letter: "D",
    title: "Develop content & SEO systems",
    description:
      "Create a simple, repeatable plan so brides keep finding you between referrals.",
  },
  {
    letter: "E",
    title: "Elevate the client experience",
    description:
      "Add the small, organized touches that make brides refer you without being asked.",
  },
  {
    letter: "N",
    title: "Nail pricing and boundaries",
    description:
      "Price with confidence and hold boundaries that keep the work sustainable.",
  },
  {
    letter: "T",
    title: "Track and refine",
    description:
      "Watch the numbers that matter and adjust so each season is stronger than the last.",
  },
];

/**
 * Mentor positioning. Kept true to the brand as represented across the site:
 * Maureen runs Maureen Ella as an on-location bridal beauty business in
 * Northeast Florida. No invented years/counts/awards.
 */
export const mentor = {
  eyebrow: "Your mentor",
  title: "Learn from a working bridal artist, not a generic course",
  paragraphs: [
    "Maureen Ella is an on-location bridal hair and makeup business serving St. Augustine, Jacksonville, Palm Coast, and Northeast Florida. The systems shared here come from real wedding mornings, not theory.",
    "Maureen Ella Education exists to help other artists build the calm, organized, confidently priced bridal business that referrals are built on — sharing the workflows, templates, and habits that make wedding work sustainable.",
  ],
};

/**
 * The free lead magnet, delivered as a viewable on-page checklist after email
 * capture. Real, useful content drawn from the framework above.
 */
export const starterChecklist = {
  slug: "starter-checklist",
  id: "bridal-business-checklist",
  title: "Bridal Beauty Business Starter Checklist",
  description:
    "A free starter checklist for bridal hair and makeup artists — the foundations of clear pricing, a confident inquiry process, and calm wedding mornings.",
  intro:
    "A short, practical audit of the foundations every bridal beauty business needs. Work through it once to see exactly where your next improvement should go.",
  sections: [
    {
      heading: "Your offer & pricing",
      intro: "Clarity here protects every booking that follows.",
      items: [
        "Write a clear service menu with what is and isn't included.",
        "Set a wedding-day service minimum and know why it exists.",
        "Decide your travel and early-start approach before you're asked.",
        "Choose one consistent place where brides can start an inquiry.",
      ],
    },
    {
      heading: "Your inquiry workflow",
      intro: "A repeatable reply turns more inquiries into booked dates.",
      items: [
        "Draft a warm first-reply template you can personalize quickly.",
        "Collect date, venue, service count, and ready-by time every time.",
        "Explain your booking step (agreement + date reservation) clearly.",
        "Set an expectation for when brides will hear back from you.",
      ],
    },
    {
      heading: "Your wedding morning",
      intro: "Calm mornings come from a plan made in advance.",
      items: [
        "Build a timeline backward from the ready-by time.",
        "Confirm getting-ready location, parking, and power access early.",
        "Plan per-person timing so the schedule is realistic, not hopeful.",
        "Prepare a touch-up plan so the bride feels covered all day.",
      ],
    },
    {
      heading: "Your visibility",
      intro: "Stay findable between referrals.",
      items: [
        "Keep a current portfolio with photographer credits.",
        "Ask for a review after every wedding with a simple link.",
        "Post consistently in one place rather than everywhere occasionally.",
        "Make sure your name and service area are easy to find online.",
      ],
    },
  ] satisfies ChecklistSection[],
};

/** Display labels for the planned offer ladder (no prices until confirmed). */
const LEVEL_LABEL: Record<string, string> = {
  free: "Free",
  "low-ticket": "Template & tools",
  workshop: "Workshop",
  "signature-program": "Signature program",
};

const STATUS_LABEL: Record<string, string> = {
  planned: "In development",
  future: "Coming later",
};

export type EducationProduct = {
  id: string;
  title: string;
  levelLabel: string;
  statusLabel: string;
};

/**
 * The offer ladder shaped for display. The free starter checklist is shipped
 * as a page, so it's excluded here; everything else is shown as upcoming.
 */
export const upcomingProducts: EducationProduct[] = educationOffers
  .filter((o) => o.id !== starterChecklist.id)
  .map((o) => ({
    id: o.id,
    title: o.title,
    levelLabel: LEVEL_LABEL[o.level] ?? o.level,
    statusLabel: STATUS_LABEL[o.status] ?? "Coming soon",
  }));
