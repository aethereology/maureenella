import { notFound } from "next/navigation";

/**
 * Catch-all for unknown URLs. The app has two root layouts ((public) and
 * (private)) and no top-level layout, so Next can't render a root
 * not-found.tsx for unmatched paths. Routing them here hands every unknown URL
 * to the branded app/(public)/not-found.tsx (D016) with a real 404 status.
 * Every real route is more specific than this segment, so it never shadows one.
 */
export default function MissingPage() {
  notFound();
}
