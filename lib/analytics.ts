/**
 * Lightweight analytics. Events fire to GA4 via gtag when a measurement ID is
 * configured (NEXT_PUBLIC_GA_MEASUREMENT_ID); otherwise they no-op silently.
 * Event names match docs/TECH_STACK_AND_ARCHITECTURE.md + INQUIRY_FORM_SPEC.md.
 */
export type AnalyticsEvent =
  | "cta_click_request_availability"
  | "request_availability_click"
  | "inquiry_form_start"
  | "inquiry_form_submit"
  | "inquiry_form_error"
  | "prep_guide_download"
  | "lead_magnet_download"
  | "education_cta_click"
  | "education_waitlist_submit"
  | "affiliate_click"
  | "portfolio_filter_use"
  | "phone_click"
  | "email_click";

type Gtag = (
  command: "event",
  eventName: string,
  params?: Record<string, unknown>,
) => void;

export function trackEvent(
  event: AnalyticsEvent,
  params?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") {
    gtag("event", event, params);
  }
}
