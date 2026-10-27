"use server";
import { validateWaitlist, textField, WAITLIST_CONSENT } from "@/lib/inquiry-validation";
import type { WaitlistState } from "@/lib/form-state";
import { saveLead } from "@/lib/server/submit";
import { waitlistNotifications } from "@/lib/server/notifications";
import { publicFailure } from "@/lib/server/abuse";
export type { WaitlistState } from "@/lib/form-state";
export async function joinWaitlist(previous: WaitlistState, form: FormData): Promise<WaitlistState> {
  const attempt=(previous.attempt || 0)+1;
  if (textField(form,"company")) return {status:"success",accepted:false,message:"Thank you for your interest.",attempt};
  const {values,errors}=validateWaitlist(form);
  if (Object.keys(errors).length) return {status:"error",values,errors,message:"Please check the highlighted fields.",attempt};
  try {
    const submissionId=await saveLead("waitlist",{...values,consentText:WAITLIST_CONSENT,consentVersion:"2026-10-27"},form,()=>waitlistNotifications(values));
    return {status:"success",accepted:true,submissionId,message:"Your signup has been saved. Thank you for joining the list.",attempt};
  } catch(error) {
    console.warn("WAITLIST_NOT_SAVED");
    return {status:"error",values,message:publicFailure(error),attempt};
  }
}
