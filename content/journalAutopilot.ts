/**
 * Journal posts written by the scheduled Journal Autopilot (cloud routine that
 * runs Mon/Wed/Fri). See journal-autopilot/RUNBOOK.md for the full process.
 *
 * Same guardrails as content/journalBrideQuestions.ts:
 * - Never state Maureen Ella's own prices, collection names, or travel /
 *   retainer / touch-up amounts (D004/D009/D013/D014). Third-party figures are
 *   allowed only when named, dated, and listed under a "Sources" heading (D015).
 * - One unique hero per post: /images/journal/<slug>.jpg, taken from the
 *   journal-autopilot/photos pool and never reused.
 * - No invented reviews, clients, credentials, awards, or statistics.
 *
 * New posts are appended at the END of this object. Each must also have a
 * matching entry in seed/blog_posts.json. `npm run validate:journal` checks all
 * of the above before anything is pushed.
 */
import type { AuthoredArticle } from "@/content/journal";

export const AUTOPILOT_BODIES: Record<string, AuthoredArticle> = {
};
