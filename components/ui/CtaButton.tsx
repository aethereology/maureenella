"use client";

import { ButtonLink } from "@/components/ui/Button";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

/**
 * Primary CTA link that fires an analytics event on click. Defaults to the
 * Request Availability conversion event.
 */
export function CtaButton({
  href,
  children,
  variant = "primary",
  event = "cta_click_request_availability",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  event?: AnalyticsEvent;
  className?: string;
}) {
  return (
    <ButtonLink
      href={href}
      variant={variant}
      className={className}
      onClick={() => trackEvent(event)}
    >
      {children}
    </ButtonLink>
  );
}
