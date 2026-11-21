"use server";
import { validateInquiry, textField, CONTACT_CONSENT } from "@/lib/inquiry-validation";
import type { InquiryState } from "@/lib/form-state";
import { saveLead } from "@/lib/server/submit";
import { inquiryNotifications } from "@/lib/server/notifications";
import { publicFailure } from "@/lib/server/abuse";
import { SUCCESS_MESSAGE_NO_AUTORESPONDER } from "@/lib/inquiry-messages";
export type { InquiryState } from "@/lib/form-state";
export async function submitInquiry(previous: InquiryState, form: FormData): Promise<InquiryState> {
  const attempt=(previous.attempt || 0)+1;
  if (textField(form,"company")) return {status:"success",accepted:false,message:SUCCESS_MESSAGE_NO_AUTORESPONDER,attempt};
  const {values,errors}=validateInquiry(form);
  if (Object.keys(errors).length) return {status:"error",values,errors,message:"Please fix the highlighted fields and try again.",attempt};
  try {
    const submissionId=await saveLead("inquiry",{...values,consentText:CONTACT_CONSENT,consentVersion:"2026-10-27"},form,()=>inquiryNotifications(values));
    return {status:"success",accepted:true,submissionId,message:SUCCESS_MESSAGE_NO_AUTORESPONDER,attempt};
  } catch(error) {
    console.warn("INQUIRY_NOT_SAVED");
    return {status:"error",values,message:publicFailure(error),attempt};
  }
}
