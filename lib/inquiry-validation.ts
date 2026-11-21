/** Shared field definitions; all authority remains in the server validator. */
export const SERVICE_OPTIONS = ["Hair", "Makeup", "Both hair and makeup", "Not sure yet"] as const;
export const PREVIEW_OPTIONS = ["Yes", "No", "Not sure"] as const;
export const SOURCE_OPTIONS = ["Google", "Instagram", "Referral", "Venue", "Photographer / planner", "Zola / wedding directory", "Other"] as const;
export const WAITLISTS = ["education-waitlist", "education-starter-checklist"] as const;
export const CONTACT_CONSENT = "I agree to be contacted about my inquiry.";
export const WAITLIST_CONSENT = "I agree to receive the requested resource and occasional Maureen Ella education emails. I can unsubscribe at any time.";
export const INQUIRY_FIELDS = [
  { name: "firstName", label: "First name", group: "Your details", type: "text", max: 80, required: true, autoComplete: "given-name" },
  { name: "lastName", label: "Last name", group: "Your details", type: "text", max: 80, required: true, autoComplete: "family-name" },
  { name: "email", label: "Email", group: "Your details", type: "email", max: 254, required: true, autoComplete: "email" },
  { name: "phone", label: "Phone", group: "Your details", type: "tel", max: 40, required: true, autoComplete: "tel" },
  { name: "instagram", label: "Instagram handle", group: "Your details", type: "text", max: 80 },
  { name: "weddingDate", label: "Wedding date", group: "Wedding details", type: "date", max: 10, required: true },
  { name: "cityState", label: "Wedding city / state", group: "Wedding details", type: "text", max: 160, required: true },
  { name: "venue", label: "Venue", group: "Wedding details", type: "text", max: 160 },
  { name: "gettingReadyLocation", label: "Getting-ready location", group: "Wedding details", type: "text", max: 200, required: true },
  { name: "readyBy", label: "Desired ready-by time", group: "Wedding details", type: "time", max: 5 },
  { name: "interestedIn", label: "Interested in", group: "Services", type: "select", max: 80, required: true, options: SERVICE_OPTIONS },
  { name: "previewInterest", label: "Interested in a bridal preview?", group: "Services", type: "select", max: 80, options: PREVIEW_OPTIONS },
  { name: "hairCount", label: "Estimated hair services", group: "Services", type: "number", max: 3, required: true },
  { name: "makeupCount", label: "Estimated makeup services", group: "Services", type: "number", max: 3, required: true },
  { name: "allergies", label: "Any allergies or sensitivities?", group: "Additional details", type: "text", max: 800 },
  { name: "howFound", label: "How did you find Maureen Ella?", group: "Additional details", type: "select", max: 120, options: SOURCE_OPTIONS },
] as const;
export type InquiryField = (typeof INQUIRY_FIELDS)[number];
export type InquiryFieldName = InquiryField["name"];
export type InquiryValues = Record<InquiryFieldName, string> & { consentContact: string; consentNotReserved: string };
export const EMPTY_INQUIRY = Object.fromEntries([
  ...INQUIRY_FIELDS.map(({ name }) => [name, ""]),
  ["consentContact", ""], ["consentNotReserved", ""],
]) as InquiryValues;
const EMAIL_RE = /^[^\s@<>\x00-\x1f\x7f]+@[^\s@<>\x00-\x1f\x7f]+\.[^\s@<>\x00-\x1f\x7f]+$/;
export function textField(form: FormData, key: string): string {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}
export function validEmail(value: string): boolean {
  return value.length <= 254 && EMAIL_RE.test(value);
}
export function validateInquiry(form: FormData, today = new Date()): { values: InquiryValues; errors: Record<string, string> } {
  const values = { ...EMPTY_INQUIRY };
  const errors: Record<string, string> = {};
  for (const field of INQUIRY_FIELDS) {
    const value = textField(form, field.name);
    values[field.name] = value.slice(0, field.max);
    if (form.getAll(field.name).length > 1 || (form.has(field.name) && typeof form.get(field.name) !== "string")) {
      errors[field.name] = `Please enter one ${field.label.toLowerCase()}.`;
    } else if ("required" in field && field.required && !value) {
      errors[field.name] = `Please enter ${field.label.toLowerCase()}.`;
    } else if (value.length > field.max) {
      errors[field.name] = `${field.label} must be ${field.max} characters or fewer.`;
    } else if (/[\x00-\x1f\x7f]/.test(value)) {
      errors[field.name] = `${field.label} must not contain control characters or line breaks.`;
    } else if ("options" in field && value && !(field.options as readonly string[]).includes(value)) {
      errors[field.name] = "Please choose one of the available options.";
    }
  }
  values.email = values.email.toLowerCase();
  if (values.email && !validEmail(values.email)) errors.email = "Please enter a valid email.";
  const digits = values.phone.replace(/\D/g, "");
  if (values.phone && (!/^[+\d\s().xX-]+$/.test(values.phone) || digits.length < 7 || digits.length > 15)) errors.phone = "Please enter a phone number with 7–15 digits.";
  if (values.weddingDate) {
    const date = new Date(`${values.weddingDate}T00:00:00Z`);
    const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(today);
    const part = (name: string) => parts.find((p) => p.type === name)?.value;
    const earliest = `${part("year")}-${part("month")}-${part("day")}`;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(values.weddingDate) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== values.weddingDate) errors.weddingDate = "Please enter a valid calendar date.";
    else if (values.weddingDate < earliest) errors.weddingDate = "Please choose today or a future wedding date.";
  }
  if (values.readyBy && !/^([01]\d|2[0-3]):[0-5]\d$/.test(values.readyBy)) errors.readyBy = "Please enter a valid time.";
  for (const name of ["hairCount", "makeupCount"] as const) {
    if (values[name] && (!/^\d{1,3}$/.test(values[name]) || Number(values[name]) > 200)) errors[name] = "Enter a whole number from 0 to 200.";
    else if (values[name]) values[name] = String(Number(values[name]));
  }
  if (values.hairCount === "0" && values.makeupCount === "0") errors.hairCount = "Please request at least one hair or makeup service.";
  for (const name of ["consentContact", "consentNotReserved"] as const) {
    values[name] = form.get(name) === "on" && form.getAll(name).length === 1 ? "on" : "";
    if (!values[name]) errors[name] = "Please confirm this acknowledgement.";
  }
  return { values, errors };
}
export type WaitlistValues = { email: string; name: string; list: string; consentContact: string };
export function validateWaitlist(form: FormData): { values: WaitlistValues; errors: Record<string, string> } {
  const email = textField(form, "email").toLowerCase();
  const name = textField(form, "name");
  const list = textField(form, "list");
  const consentContact = form.get("consentContact") === "on" ? "on" : "";
  const errors: Record<string, string> = {};
  if (!validEmail(email)) errors.email = "Please enter a valid email address (254 characters or fewer).";
  if (name.length > 80 || /[\x00-\x1f\x7f]/.test(name)) errors.name = "First name must be 80 characters or fewer, without line breaks.";
  if (!(WAITLISTS as readonly string[]).includes(list)) errors.list = "This signup list is not available.";
  if (!consentContact) errors.consentContact = "Please agree to receive the requested emails.";
  for (const key of ["email", "name", "list", "consentContact"]) {
    if (form.getAll(key).length > 1 || (form.has(key) && typeof form.get(key) !== "string")) errors[key] = "Please submit one value for this field.";
  }
  return { values: { email: email.slice(0, 254), name: name.slice(0, 80), list: list.slice(0, 80), consentContact }, errors };
}
