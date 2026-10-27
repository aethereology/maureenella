import "server-only";
import { render } from "@react-email/render";
import { InquiryAutoresponder } from "@/emails/InquiryAutoresponder";
import { site } from "@/lib/site";
import { createPricingToken, pricingPath } from "@/lib/pricing-link";
import { INQUIRY_FIELDS, type InquiryValues, type WaitlistValues } from "@/lib/inquiry-validation";
import { inquiryCrmFields } from "@/lib/crm-payload";
import { getPricingCatalog } from "@/content/pricing";
import { createSubscriberToken } from "@/lib/subscriber-token";
import { deliveryChannels, required, sender } from "./config";
export type DeliveryJobInput = { channel: string; body: Record<string, unknown> };
/** Snapshot complete provider bodies once, including signed links. */
export async function inquiryNotifications(values: InquiryValues): Promise<DeliveryJobInput[]> {
  const channels=deliveryChannels("inquiry");
  let pricingUrl: string | undefined;
  try {
    getPricingCatalog();
    pricingUrl=new URL(pricingPath(createPricingToken({firstName:values.firstName})),site.baseUrl).toString();
  } catch { console.warn("PRICING_LINK_UNAVAILABLE"); }
  const summary=INQUIRY_FIELDS.filter((f)=>values[f.name]).map((f)=>`${f.label}: ${values[f.name]}`).join("\n");
  const jobs: DeliveryJobInput[]=[];
  if (channels.includes("owner")) jobs.push({channel:"owner",body:{
    from:sender(),to:[required("FORM_TO_EMAIL")],reply_to:values.email,
    subject:`New wedding inquiry — ${values.firstName} ${values.lastName} (${values.weddingDate})`,
    text:`${summary}\n\nPricing link: ${pricingUrl || "Unavailable; follow up manually."}`,
  }});
  if (channels.includes("crm")) jobs.push({channel:"crm",body:{source:site.domain,fields:inquiryCrmFields(values)}});
  if (channels.includes("autoresponder")) {
    const element=<InquiryAutoresponder firstName={values.firstName} cityState={values.cityState} weddingDate={values.weddingDate} interestedIn={values.interestedIn} pricingUrl={pricingUrl} calendlyUrl={site.booking.calendly.value} />;
    const [html,text]=await Promise.all([render(element),render(element,{plainText:true})]);
    jobs.push({channel:"autoresponder",body:{from:sender(),to:[values.email],reply_to:site.contact.email.value,subject:pricingUrl ? `Your bridal pricing guide — ${site.brand}` : `Your inquiry — ${site.brand}`,html,text}});
  }
  return jobs;
}
export async function waitlistNotifications(values: WaitlistValues): Promise<DeliveryJobInput[]> {
  const channels=deliveryChannels("waitlist");
  const jobs: DeliveryJobInput[]=[];
  if (channels.includes("owner")) jobs.push({channel:"owner",body:{from:sender(),to:[required("FORM_TO_EMAIL")],subject:`New signup — ${values.list}`,text:`List: ${values.list}\nName: ${values.name}\nEmail: ${values.email}`}});
  if (channels.includes("welcome")) {
    const token=createSubscriberToken(values.email,required("SUBSCRIBER_TOKEN_SECRET",32));
    const unsubscribe=new URL(`/unsubscribe/${token}`,site.baseUrl).toString();
    jobs.push({channel:"welcome",body:{from:sender(),to:[values.email],reply_to:site.contact.email.value,subject:`Welcome to ${site.brand} Education`,text:[
      values.name ? `Hi ${values.name},` : "Hi there,", "", "Thanks for joining Maureen Ella Education.",
      "Your Bridal Beauty Business Starter Checklist is here:",`${site.baseUrl}/education/starter-checklist`,"",
      "We'll share occasional bridal-business resources and updates. Reply with a topic you would find helpful.","","Warmly,","Maureen","",`Unsubscribe from education emails: ${unsubscribe}`,
    ].join("\n")}});
  }
  return jobs;
}
