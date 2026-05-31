/** Tiny className joiner — filters falsy values. */
export function clsx(
  ...parts: (string | false | null | undefined)[]
): string {
  return parts.filter(Boolean).join(" ");
}
