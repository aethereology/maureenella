import { render } from "@react-email/render";
import { site } from "@/lib/site";
import {
  InquiryAutoresponder,
  type InquiryAutoresponderProps,
} from "@/emails/InquiryAutoresponder";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/**
 * Sends the bride-facing inquiry auto-responder. Callers MUST treat failures as
 * non-fatal — the owner notification has already gone out by this point.
 */
export async function sendInquiryAutoresponder({
  apiKey,
  to,
  ...props
}: InquiryAutoresponderProps & { apiKey: string; to: string }): Promise<void> {
  const element = <InquiryAutoresponder {...props} />;
  const [html, text] = await Promise.all([
    render(element),
    render(element, { plainText: true }),
  ]);

  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${site.brand} <inquiries@${site.domain}>`,
      to: [to],
      // Replies must reach Maureen's real inbox, not the sending address.
      reply_to: site.contact.email.value,
      subject: `Your bridal pricing guide — ${site.brand}`,
      html,
      text,
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
  }
}
