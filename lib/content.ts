/**
 * Typed access layer over seed JSON. Phase 1 reads local files; swapping in a
 * CMS later means re-implementing these accessors only. Components never import
 * raw JSON directly.
 */
import servicesSeed from "@/seed/services.json";
import faqsSeed from "@/seed/faqs.json";
import testimonialsSeed from "@/seed/testimonials.json";
import portfolioSeed from "@/seed/portfolio.json";
import blogSeed from "@/seed/blog_posts.json";
import leadMagnetsSeed from "@/seed/lead_magnets.json";
import serviceAreasSeed from "@/seed/service_areas.json";
import educationSeed from "@/seed/education_offers.json";
import { reviewDisplayName } from "@/lib/permissions";

export type Service = {
  id: string;
  title: string;
  category: string;
  price: string;
  priceStatus: string;
  notes?: string[];
};

export type Faq = {
  id: string;
  category: string;
  question: string;
  answer: string;
  status: string;
};

export type Testimonial = {
  id: string;
  name: string;
  displayName: string;
  quote: string;
  proofPoint: string[];
  permissionStatus: string;
};

export type PortfolioItem = {
  id: string;
  brideName: string;
  serviceTypes: string[];
  photographer: string;
  makeupCredit?: string;
  tags: string[];
  permissionStatus: string;
};

export type BlogPostMeta = {
  slug: string;
  title: string;
  category: string;
  legacyTitles?: string[];
  priority: string;
};

export type LeadMagnet = {
  id: string;
  title: string;
  audience: string;
  cta: string;
};

export type ServiceArea = {
  id: string;
  city: string;
  state: string;
  priority: string;
  plannedPage: string;
};

export const services = servicesSeed as Service[];
export const faqs = faqsSeed as Faq[];
export const portfolio = portfolioSeed as PortfolioItem[];
export const blogPosts = blogSeed as BlogPostMeta[];
export const leadMagnets = leadMagnetsSeed as LeadMagnet[];
export const serviceAreas = serviceAreasSeed as ServiceArea[];
export const educationOffers = educationSeed as {
  id: string;
  title: string;
  level: string;
  status: string;
}[];

/** Testimonials with privacy-respecting display names attached. */
export const testimonials: Testimonial[] = (
  testimonialsSeed as Omit<Testimonial, "displayName">[]
).map((t) => ({ ...t, displayName: reviewDisplayName(t.name) }));

export function servicesByCategory(category: Service["category"]): Service[] {
  return services.filter((s) => s.category === category);
}

export function faqsByCategory(category?: string): Faq[] {
  return category ? faqs.filter((f) => f.category === category) : faqs;
}

const CATEGORY_LABELS: Record<string, string> = {
  "bridal-prep": "Bridal Prep",
  "real-weddings": "Real Weddings",
  "beauty-favorites": "Beauty Favorites",
  education: "Education",
  "business-mentorship": "Business Mentorship",
};

export function categoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category;
}
