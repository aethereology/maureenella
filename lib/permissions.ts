/**
 * Content permission gates. See docs/CONFIRMATION_NEEDED.md → "Content permissions".
 *
 * These control whether real client-derived content (reviews, portfolio) is
 * shown publicly. They are honest, credited, real content — never fabricated —
 * but Maureen should give final sign-off. Flip a flag to false to instantly
 * pull a content type site-wide if permission is withheld.
 */
export const permissions = {
  /**
   * Approved by the founder 2026-07-12: curated set from assets/portfolio
   * (photographer credits retained in content/gallery.ts).
   */
  portfolioPublished: true,
  /**
   * Approved by the founder 2026-07-12: quotes sourced verbatim from the
   * public Google Business Profile reviews (seed/testimonials.json,
   * permissionStatus "approved-gbp"). Display names stay "First L."
   */
  testimonialsPublished: true,
} as const;

/** "Jamie Stiles" → "Jamie S." — reduces exposure for unconfirmed permissions. */
export function reviewDisplayName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length < 2) return parts[0] ?? "";
  return `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`;
}
