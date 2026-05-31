"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

/**
 * Sticky bottom CTA shown on mobile bridal pages (UI_DIRECTION). Hidden on lg+.
 * Keeps the primary conversion always one tap away.
 */
export function StickyMobileCta({
  label = "Request Availability",
  href = "/contact",
}: {
  label?: string;
  href?: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-hairline bg-porcelain/95 p-3 backdrop-blur lg:hidden">
      <Link
        href={href}
        onClick={() => trackEvent("cta_click_request_availability")}
        className="flex w-full items-center justify-center bg-espresso px-6 py-3.5 text-[0.72rem] uppercase tracking-[0.18em] text-porcelain"
      >
        {label}
      </Link>
    </div>
  );
}
