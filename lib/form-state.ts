import type { InquiryValues, WaitlistValues } from "./inquiry-validation.ts";
export type FormState<T> = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
  values?: T;
  accepted?: boolean;
  attempt?: number;
  submissionId?: string;
};
export type InquiryState = FormState<InquiryValues>;
export type WaitlistState = FormState<WaitlistValues>;
