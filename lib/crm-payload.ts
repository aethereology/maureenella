import type { InquiryValues } from "./inquiry-validation.ts";

/** Preserve the existing webhook contract; storage uses typed internal names. */
export function inquiryCrmFields(values: InquiryValues): Record<string, string> {
  return {
    "First name": values.firstName,
    "Last name": values.lastName,
    Email: values.email,
    Phone: values.phone,
    Instagram: values.instagram,
    "Wedding date": values.weddingDate,
    Venue: values.venue,
    "Getting-ready location": values.gettingReadyLocation,
    "City / State": values.cityState,
    "Ready-by time": values.readyBy,
    "Interested in": values.interestedIn,
    "Hair services (est.)": values.hairCount,
    "Makeup services (est.)": values.makeupCount,
    "Interested in preview": values.previewInterest,
    "How they found us": values.howFound,
    "Allergies / sensitivities": values.allergies,
  };
}
