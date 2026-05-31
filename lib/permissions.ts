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
   * Default closed for pre-launch: seed content is marked needs-confirmation.
   * Flip to true only after Maureen approves image usage + photographer credits.
   */
  portfolioPublished: false,
  /** Flip to true only after Maureen approves which reviews may be quoted. */
  testimonialsPublished: false,
} as const;

/** "Jamie Stiles" → "Jamie S." — reduces exposure for unconfirmed permissions. */
export function reviewDisplayName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length < 2) return parts[0] ?? "";
  return `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`;
}
