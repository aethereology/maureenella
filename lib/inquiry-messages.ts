/**
 * The two bride-facing success messages for the inquiry form, and the single
 * decision of which one to show.
 *
 * This has been the site of three separate defects: showing the "check your
 * inbox" message when nothing was ever sent (honeypot/timing decoys), when
 * delivery failed, and when the pricing link couldn't be minted. Centralizing
 * the choice in one pure, tested function means there is exactly one place
 * that decision can go wrong.
 *
 * Plain module — deliberately not `"use server"`, which would force every
 * export (including the message constants) to be async.
 */

// Shown when the bride's auto-responder is confirmed sent (see `deliver`'s
// `autoresponderSent` flag). Never shown unless the send actually succeeded —
// a promise to "check your inbox" must not go out unless something is in it.
export const SUCCESS_MESSAGE =
  "Thank you for your inquiry. Your details have been received — check your inbox for your pricing guide and a link to book a call. We'll review your date, service count, location, and timeline needs before sending next steps.";

// Shown for the honeypot/timing decoy paths (no delivery attempted at all)
// and whenever the bride's auto-responder wasn't confirmed sent — email not
// configured, or the best-effort send failed. Reads exactly like a normal
// successful inquiry; it must not hint that anything went wrong, because
// from the bride's side nothing did.
export const SUCCESS_MESSAGE_NO_AUTORESPONDER =
  "Thank you for your inquiry. Your details have been received, and we will review your date, service count, location, and timeline needs before sending next steps.";

/**
 * Picks the bride-facing success message for a delivery outcome. Only
 * `autoresponderSent: true` may reference the inbox or the pricing guide —
 * every other case must degrade to the generic message.
 */
export function pickSuccessMessage(outcome: { autoresponderSent: boolean }): string {
  return outcome.autoresponderSent ? SUCCESS_MESSAGE : SUCCESS_MESSAGE_NO_AUTORESPONDER;
}
