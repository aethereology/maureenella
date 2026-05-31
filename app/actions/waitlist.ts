"use server";

import { site } from "@/lib/site";
import { hit, clientIp } from "@/lib/rate-limit";

export type WaitlistState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIST_RE = /^[a-z0-9-]{1,80}$/;
const IS_PRODUCTION = process.env.NODE_ENV === "production";

function field(form: FormData, key: string): string {
  return (form.get(key) ?? "").toString().trim();
}

/**
 * Generic email capture for the education waitlist and lead magnets. Delivers
 * via Resend when configured; otherwise logs (still succeeds) so the flow works
 * in dev/demo. `list` identifies the source list.
 */
export async function joinWaitlist(
  _prev: WaitlistState,
  form: FormData,
): Promise<WaitlistState> {
  // Rate limit per source IP before any work or delivery.
  const ip = await clientIp();
  if (!hit(`waitlist:${ip}`, 5, 10 * 60 * 1000).ok) {
    return {
      status: "error",
      message: "Too many attempts. Please wait a few minutes and try again.",
    };
  }

  // Honeypot.
  if (field(form, "company")) {
    return { status: "success", message: SUCCESS };
  }

  const email = field(form, "email");
  const name = field(form, "name");
  const rawList = field(form, "list") || "general";
  const list = LIST_RE.test(rawList) ? rawList : "general";

  if (!email || !EMAIL_RE.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }
  if (email.length > 254) {
    return { status: "error", message: "Email must be 254 characters or fewer." };
  }
  if (name.length > 80) {
    return { status: "error", message: "First name must be 80 characters or fewer." };
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.FORM_TO_EMAIL;
    if (apiKey && to) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `${site.brand} <inquiries@${site.domain}>`,
          to: [to],
          subject: `New signup — ${list}`,
          text: `List: ${list}\nName: ${name}\nEmail: ${email}`,
        }),
      });
      if (!res.ok) throw new Error(`Resend ${res.status}`);

      // Best-effort welcome auto-responder for education lists (Email 1 of the
      // education sequence in docs/EMAIL_SEQUENCES.md). A failure here must not
      // fail the signup — the owner has already been notified above.
      if (list.startsWith("education")) {
        await sendEducationWelcome(apiKey, email, name).catch((err) =>
          console.error("Welcome email failed:", err),
        );
      }
    } else if (IS_PRODUCTION) {
      return {
        status: "error",
        message: "Signup delivery is not configured yet. Please try again later.",
      };
    } else {
      console.info(`[waitlist:${list}] ${name || "(no name)"} <${email}>`);
    }
  } catch (err) {
    console.error("Waitlist delivery failed:", err);
    return {
      status: "error",
      message: "Something went wrong. Please try again in a moment.",
    };
  }

  return { status: "success", message: SUCCESS };
}

/**
 * Sends the Education welcome email to a new subscriber. Honest, claim-free
 * copy — no pricing, guarantees, or unconfirmed details.
 */
async function sendEducationWelcome(
  apiKey: string,
  email: string,
  name: string,
): Promise<void> {
  const hi = name ? `Hi ${name},` : "Hi there,";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${site.brand} <inquiries@${site.domain}>`,
      to: [email],
      subject: `Welcome to ${site.brand} Education`,
      text: [
        hi,
        "",
        `Thanks for joining ${site.brand} Education. It's built for bridal hair and makeup artists who want clearer pricing, a calmer inquiry process, and wedding mornings that run on time.`,
        "",
        "Here's what's ahead: practical templates, workshops, and mentorship — shared with this list first as each one is ready.",
        "",
        "To get started, work through the free Bridal Beauty Business Starter Checklist here:",
        `${site.baseUrl}/education/starter-checklist`,
        "",
        "One quick favor — just reply and tell me the single biggest thing you're struggling with in your bridal business right now. It helps me build the right resources.",
        "",
        "Warmly,",
        "Maureen",
      ].join("\n"),
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}`);
}

const SUCCESS = "You're on the list. Watch your inbox for what's next.";
