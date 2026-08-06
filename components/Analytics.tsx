"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

/**
 * GA4 loader. Renders nothing unless NEXT_PUBLIC_GA_MEASUREMENT_ID is set, so
 * local/dev and unconfigured deploys ship zero analytics overhead. Loaded with
 * afterInteractive to keep it off the critical path (perf requirement).
 *
 * This is called unconditionally from the root layout (`app/layout.tsx`), as
 * a sibling of `{children}` — a nested layout under `/pricing` cannot prune
 * it, since App Router layouts only compose by wrapping `{children}`, never
 * by pruning ancestor siblings. So the route check lives *here*, client-side
 * via `usePathname()`, rather than in a `/pricing`-scoped layout. `/pricing`
 * pages carry an HMAC-signed bride token in the URL; GA4's default
 * `gtag('config', …)` call sends a `page_view` whose `page_location` is the
 * full URL, which would otherwise stream that token to Google on every visit.
 */
export function Analytics() {
  const pathname = usePathname();
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!id) return null;
  if (pathname?.startsWith("/pricing")) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
