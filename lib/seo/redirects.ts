import type { Redirect } from "next/dist/lib/load-custom-routes";
// Relative path (not the @/ alias): this module is imported by next.config.ts,
// whose transpile context does not resolve the tsconfig path alias.
import redirectSeed from "../../seed/redirects.json";

type SeedRedirect = { source: string; destination: string; status: number };

/**
 * Legacy → new 301 redirects. Self-redirects (e.g. /contact → /contact) are
 * filtered out to avoid loops. See docs/REDIRECT_MAP.md for the full map;
 * confirm exact legacy slugs before launch.
 */
export const redirects: Redirect[] = (redirectSeed as SeedRedirect[])
  .filter((r) => r.source !== r.destination)
  .map((r) => ({
    source: r.source,
    destination: r.destination,
    statusCode: redirectStatus(r.status),
  }));

function redirectStatus(status: number): 301 | 302 | 303 | 307 | 308 {
  if (
    status === 301 ||
    status === 302 ||
    status === 303 ||
    status === 307 ||
    status === 308
  ) {
    return status;
  }
  return 301;
}
