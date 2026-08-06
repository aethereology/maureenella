"use server";

import { site } from "@/lib/site";
import { hit, clientIp } from "@/lib/rate-limit";
import { createPricingToken, pricingPath } from "@/lib/pricing-link";
import { sendInquiryAutoresponder } from "@/lib/email";
import { pickSuccessMessage, SUCCESS_MESSAGE_NO_AUTORESPONDER } from "@/lib/inquiry-messages";

export type InquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Field-level errors keyed by field name. */
  errors?: Record<string, string>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const IS_PRODUCTION = process.env.NODE_ENV === "production";

function str(form: FormData, key: string): string {
  return (form.get(key) ?? "").toString().trim();
}

function checkMax(
  errors: Record<string, string>,
  key: string,
  label: string,
  value: string,
  max: number,
): void {
  if (value.length > max) {
    errors[key] = `${label} must be ${max} characters or fewer.`;
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Handle a wedding inquiry. Validates server-side, blocks bot submissions via
 * a honeypot + timing check, then emails Maureen via Resend and optionally
 * posts to a CRM webhook. When email/CRM env vars are absent the submission
 * still succeeds (logged) so the form is fully usable in dev/demo.
 */
export async function submitInquiry(
  _prev: InquiryState,
  form: FormData,
): Promise<InquiryState> {
  // --- Rate limiting -------------------------------------------------------
  // Throttle abuse per source IP before doing any work or delivery.
  const ip = await clientIp();
  if (!hit(`inquiry:${ip}`, 5, 10 * 60 * 1000).ok) {
    return {
      status: "error",
      message:
        "We've received several inquiries from your connection. Please wait a few minutes and try again, or reach out via Instagram.",
    };
  }

  // --- Spam protection -----------------------------------------------------
  // Hidden honeypot field; real users never fill it.
  if (str(form, "company")) {
    // Pretend success to the bot. Nothing was ever sent, so the message must
    // not promise an inbox with anything in it.
    return { status: "success", message: SUCCESS_MESSAGE_NO_AUTORESPONDER };
  }
  // Reject submissions faster than a human could plausibly complete.
  const startedAt = Number(str(form, "started_at"));
  if (startedAt && Date.now() - startedAt < 2500) {
    return { status: "success", message: SUCCESS_MESSAGE_NO_AUTORESPONDER };
  }

  // --- Validation ----------------------------------------------------------
  const firstName = str(form, "firstName");
  const lastName = str(form, "lastName");
  const email = str(form, "email");
  const phone = str(form, "phone");
  const weddingDate = str(form, "weddingDate");
  const cityState = str(form, "cityState");
  const interestedIn = str(form, "interestedIn");
  const instagram = str(form, "instagram");
  const venue = str(form, "venue");
  const gettingReadyLocation = str(form, "gettingReadyLocation");
  const readyBy = str(form, "readyBy");
  const hairCount = str(form, "hairCount");
  const makeupCount = str(form, "makeupCount");
  const previewInterest = str(form, "previewInterest");
  const howFound = str(form, "howFound");
  const allergies = str(form, "allergies");
  const consentNotReserved = form.get("consentNotReserved") != null;
  const consentContact = form.get("consentContact") != null;

  const errors: Record<string, string> = {};
  if (!firstName) errors.firstName = "Please enter your first name.";
  if (!lastName) errors.lastName = "Please enter your last name.";
  if (!email) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email.";
  if (!phone) errors.phone = "Please enter a phone number.";
  if (!weddingDate) errors.weddingDate = "Please enter your wedding date.";
  if (!cityState) errors.cityState = "Please enter your wedding city and state.";
  if (!interestedIn) errors.interestedIn = "Please choose a service.";
  if (!gettingReadyLocation)
    errors.gettingReadyLocation = "Please enter your getting-ready location.";
  if (!hairCount) errors.hairCount = "Please enter estimated hair services.";
  if (!makeupCount) errors.makeupCount = "Please enter estimated makeup services.";
  if (!consentNotReserved)
    errors.consentNotReserved =
      "Please acknowledge this inquiry does not reserve your date.";
  if (!consentContact)
    errors.consentContact = "Please agree to be contacted about your inquiry.";

  checkMax(errors, "firstName", "First name", firstName, 80);
  checkMax(errors, "lastName", "Last name", lastName, 80);
  checkMax(errors, "email", "Email", email, 254);
  checkMax(errors, "phone", "Phone", phone, 40);
  checkMax(errors, "weddingDate", "Wedding date", weddingDate, 40);
  checkMax(errors, "cityState", "Wedding city and state", cityState, 160);
  checkMax(errors, "interestedIn", "Interested in", interestedIn, 80);
  checkMax(errors, "instagram", "Instagram handle", instagram, 80);
  checkMax(errors, "venue", "Venue", venue, 160);
  checkMax(
    errors,
    "gettingReadyLocation",
    "Getting-ready location",
    gettingReadyLocation,
    200,
  );
  checkMax(errors, "readyBy", "Ready-by time", readyBy, 40);
  checkMax(errors, "hairCount", "Estimated hair services", hairCount, 20);
  checkMax(errors, "makeupCount", "Estimated makeup services", makeupCount, 20);
  checkMax(errors, "previewInterest", "Preview interest", previewInterest, 80);
  checkMax(errors, "howFound", "How you found us", howFound, 120);
  checkMax(errors, "allergies", "Allergies or sensitivities", allergies, 800);

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      errors,
    };
  }

  // --- Assemble submission -------------------------------------------------
  const fields: Record<string, string> = {
    "First name": firstName,
    "Last name": lastName,
    Email: email,
    Phone: phone,
    Instagram: instagram,
    "Wedding date": weddingDate,
    Venue: venue,
    "Getting-ready location": gettingReadyLocation,
    "City / State": cityState,
    "Ready-by time": readyBy,
    "Interested in": interestedIn,
    "Hair services (est.)": hairCount,
    "Makeup services (est.)": makeupCount,
    "Interested in preview": previewInterest,
    "How they found us": howFound,
    "Allergies / sensitivities": allergies,
  };

  const summaryText = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  // --- Deliver -------------------------------------------------------------
  let autoresponderSent = false;
  try {
    ({ autoresponderSent } = await deliver(fields, summaryText));
  } catch (err) {
    console.error("Inquiry delivery failed:", err);
    return {
      status: "error",
      message:
        "Something went wrong sending your inquiry. Please try again, or reach out via Instagram.",
    };
  }

  return {
    status: "success",
    message: pickSuccessMessage({ autoresponderSent }),
  };
}

/**
 * Absolute pricing-guide URL for a bride, or `undefined` when link signing is
 * unavailable. Returning undefined degrades the email gracefully rather than
 * shipping a dead link.
 */
function pricingUrlFor(firstName: string): string | undefined {
  try {
    return new URL(pricingPath(createPricingToken({ firstName })), site.baseUrl).toString();
  } catch (err) {
    console.error(
      "Could not mint a pricing link (is PRICING_LINK_SECRET set?):",
      err,
    );
    return undefined;
  }
}

async function deliver(
  fields: Record<string, string>,
  summaryText: string,
): Promise<{ autoresponderSent: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.FORM_TO_EMAIL;
  const crmWebhook = process.env.CRM_WEBHOOK_URL;
  const emailConfigured = Boolean(apiKey && to);
  const crmConfigured = Boolean(crmWebhook);

  if (IS_PRODUCTION && !emailConfigured && !crmConfigured) {
    throw new Error(
      "No production inquiry delivery configured. Set RESEND_API_KEY + FORM_TO_EMAIL or CRM_WEBHOOK_URL.",
    );
  }

  // CRM webhook is non-fatal only when email delivery is also configured.
  if (crmWebhook) {
    try {
      const res = await fetch(crmWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: site.domain, fields }),
      });
      if (!res.ok) {
        throw new Error(`CRM webhook responded ${res.status}: ${await res.text()}`);
      }
    } catch (err) {
      if (!emailConfigured) throw err;
      console.error("CRM webhook failed (non-fatal):", err);
    }
  }

  if (!emailConfigured) {
    // Not configured yet — log so nothing is lost in dev/demo.
    if (!IS_PRODUCTION) {
      console.info(
        `[inquiry] Email not configured (set RESEND_API_KEY + FORM_TO_EMAIL).\n${summaryText}`,
      );
    }
    return { autoresponderSent: false };
  }

  const configuredApiKey = apiKey as string;
  const configuredTo = to as string;

  const pricingUrl = pricingUrlFor(fields["First name"]);

  const pricingRow = pricingUrl
    ? `<p style="margin-top:16px"><strong>Pricing link (forwardable):</strong><br><a href="${escapeHtml(
        pricingUrl,
      )}">${escapeHtml(pricingUrl)}</a></p>`
    : `<p style="margin-top:16px"><strong>Pricing link:</strong> unavailable — PRICING_LINK_SECRET is not set.</p>`;

  const html = `<h2>New wedding inquiry — ${site.brand}</h2><table cellpadding="6">${Object.entries(
    fields,
  )
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="font-weight:600">${escapeHtml(k)}</td><td>${escapeHtml(
          v,
        )}</td></tr>`,
    )
    .join("")}</table>${pricingRow}`;

  const ownerText = pricingUrl
    ? `${summaryText}\n\nPricing link (forwardable): ${pricingUrl}`
    : `${summaryText}\n\nPricing link: unavailable — PRICING_LINK_SECRET is not set.`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${configuredApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${site.brand} <inquiries@${site.domain}>`,
      to: [configuredTo],
      reply_to: fields.Email,
      subject: `New wedding inquiry — ${fields["First name"]} ${fields["Last name"]} (${fields["Wedding date"]})`,
      html,
      text: ownerText,
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
  }

  // Best-effort: the owner has already been notified, so a failure here must
  // never fail the bride's submission — but we still capture the outcome so
  // `submitInquiry` can avoid promising an email that never arrived.
  const autoresponderSent = await sendInquiryAutoresponder({
    apiKey: configuredApiKey,
    to: fields.Email,
    firstName: fields["First name"],
    cityState: fields["City / State"],
    weddingDate: fields["Wedding date"],
    interestedIn: fields["Interested in"],
    pricingUrl,
    calendlyUrl: site.booking.calendly.value,
  })
    .then(() => true)
    .catch((err) => {
      console.error("Inquiry auto-responder failed:", err);
      return false;
    });

  // The send can succeed while carrying no pricing link (PRICING_LINK_SECRET
  // unset) — SUCCESS_MESSAGE promises "check your inbox for your pricing
  // guide", which would be false in that case. Only count it as fully sent
  // when the pricing link actually made it into the email.
  return { autoresponderSent: autoresponderSent && Boolean(pricingUrl) };
}
