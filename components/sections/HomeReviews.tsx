import { testimonials } from "@/lib/content";
import { permissions } from "@/lib/permissions";
import { ReviewsShowcase } from "@/components/sections/ReviewsShowcase";

const homepageReviewOrder = [
  "elaine-w",
  "samantha-t",
  "stephanie-s",
  "alex-t",
  "erika-m",
];

/** Curated homepage testimonial carousel using the site's editorial system. */
export function HomeReviews() {
  if (!permissions.testimonialsPublished) return null;

  const order = new Map(homepageReviewOrder.map((id, index) => [id, index]));
  const items = testimonials
    .filter(({ id }) => order.has(id))
    .sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0))
    .map(({ id, quote, displayName }) => ({ id, quote, displayName }));

  if (items.length === 0) return null;

  return <ReviewsShowcase items={items} />;
}
