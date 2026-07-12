"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitInquiry, type InquiryState } from "@/app/actions/inquiry";
import { trackEvent } from "@/lib/analytics";

const initial: InquiryState = { status: "idle" };

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-cocoa">
      {children}
      {required && <span className="text-rose"> *</span>}
    </label>
  );
}

const fieldClass =
  "mt-1.5 w-full rounded-none border border-taupe bg-porcelain px-3.5 py-3 text-cocoa placeholder:text-taupe/80 focus-visible:border-rose focus-visible:outline-2 focus-visible:outline-rose";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-sm text-rose" role="alert">
      {message}
    </p>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center bg-espresso px-9 py-4 text-[0.72rem] uppercase tracking-[0.18em] text-porcelain transition-colors hover:bg-cocoa focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose disabled:opacity-50"
    >
      {pending ? "Sending…" : "Submit Inquiry"}
    </button>
  );
}

export function InquiryForm() {
  const [state, formAction] = useActionState(submitInquiry, initial);
  const [started, setStarted] = useState(false);
  const startedAt = useRef<number>(0);
  if (startedAt.current === 0) startedAt.current = Date.now();

  useEffect(() => {
    if (state.status === "error" && !state.errors) {
      trackEvent("inquiry_form_error");
    }
  }, [state]);

  function onFirstInteraction() {
    if (!started) {
      setStarted(true);
      trackEvent("inquiry_form_start");
    }
  }

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-card border border-hairline bg-ivory p-8 text-center"
      >
        <h2 className="text-2xl text-espresso">Inquiry received</h2>
        <p className="mx-auto mt-3 max-w-md text-cocoa/80">{state.message}</p>
      </div>
    );
  }

  const err = state.errors ?? {};

  return (
    <form
      action={formAction}
      onFocusCapture={onFirstInteraction}
      onSubmit={() => trackEvent("inquiry_form_submit")}
      noValidate
      className="space-y-8"
    >
      {/* Honeypot + timing (visually hidden, aria-hidden). */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="started_at" value={startedAt.current} />

      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-md bg-rose-soft/40 px-4 py-3 text-sm text-cocoa">
          {state.message}
        </p>
      )}

      {/* Contact */}
      <fieldset className="space-y-4">
        <legend className="font-serif text-xl text-espresso">Your details</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="firstName" required>First name</Label>
            <input id="firstName" name="firstName" className={fieldClass} aria-invalid={!!err.firstName} aria-describedby={err.firstName ? "firstName-error" : undefined} autoComplete="given-name" />
            <FieldError id="firstName-error" message={err.firstName} />
          </div>
          <div>
            <Label htmlFor="lastName" required>Last name</Label>
            <input id="lastName" name="lastName" className={fieldClass} aria-invalid={!!err.lastName} aria-describedby={err.lastName ? "lastName-error" : undefined} autoComplete="family-name" />
            <FieldError id="lastName-error" message={err.lastName} />
          </div>
          <div>
            <Label htmlFor="email" required>Email</Label>
            <input id="email" name="email" type="email" className={fieldClass} aria-invalid={!!err.email} aria-describedby={err.email ? "email-error" : undefined} autoComplete="email" />
            <FieldError id="email-error" message={err.email} />
          </div>
          <div>
            <Label htmlFor="phone" required>Phone</Label>
            <input id="phone" name="phone" type="tel" className={fieldClass} aria-invalid={!!err.phone} aria-describedby={err.phone ? "phone-error" : undefined} autoComplete="tel" />
            <FieldError id="phone-error" message={err.phone} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="instagram">Instagram handle</Label>
            <input id="instagram" name="instagram" className={fieldClass} placeholder="@yourhandle" />
          </div>
        </div>
      </fieldset>

      {/* Wedding details */}
      <fieldset className="space-y-4">
        <legend className="font-serif text-xl text-espresso">Wedding details</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="weddingDate" required>Wedding date</Label>
            <input id="weddingDate" name="weddingDate" type="date" className={fieldClass} aria-invalid={!!err.weddingDate} aria-describedby={err.weddingDate ? "weddingDate-error" : undefined} />
            <FieldError id="weddingDate-error" message={err.weddingDate} />
          </div>
          <div>
            <Label htmlFor="cityState" required>Wedding city / state</Label>
            <input id="cityState" name="cityState" className={fieldClass} placeholder="St. Augustine, FL" aria-invalid={!!err.cityState} aria-describedby={err.cityState ? "cityState-error" : undefined} />
            <FieldError id="cityState-error" message={err.cityState} />
          </div>
          <div>
            <Label htmlFor="venue">Venue</Label>
            <input id="venue" name="venue" className={fieldClass} />
          </div>
          <div>
            <Label htmlFor="gettingReadyLocation">Getting-ready location</Label>
            <input id="gettingReadyLocation" name="gettingReadyLocation" className={fieldClass} />
          </div>
          <div>
            <Label htmlFor="readyBy">Desired ready-by time</Label>
            <input id="readyBy" name="readyBy" type="time" className={fieldClass} />
          </div>
        </div>
      </fieldset>

      {/* Services */}
      <fieldset className="space-y-4">
        <legend className="font-serif text-xl text-espresso">Services</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="interestedIn" required>Interested in</Label>
            <select id="interestedIn" name="interestedIn" className={fieldClass} defaultValue="" aria-invalid={!!err.interestedIn} aria-describedby={err.interestedIn ? "interestedIn-error" : undefined}>
              <option value="" disabled>Select…</option>
              <option>Hair</option>
              <option>Makeup</option>
              <option>Both hair and makeup</option>
              <option>Not sure yet</option>
            </select>
            <FieldError id="interestedIn-error" message={err.interestedIn} />
          </div>
          <div>
            <Label htmlFor="previewInterest">Interested in a bridal preview?</Label>
            <select id="previewInterest" name="previewInterest" className={fieldClass} defaultValue="">
              <option value="">Select…</option>
              <option>Yes</option>
              <option>No</option>
              <option>Not sure</option>
            </select>
          </div>
          <div>
            <Label htmlFor="hairCount">Estimated hair services</Label>
            <input id="hairCount" name="hairCount" type="number" min={0} className={fieldClass} placeholder="e.g. 4" />
          </div>
          <div>
            <Label htmlFor="makeupCount">Estimated makeup services</Label>
            <input id="makeupCount" name="makeupCount" type="number" min={0} className={fieldClass} placeholder="e.g. 4" />
          </div>
        </div>
      </fieldset>

      {/* Vision + attribution */}
      <fieldset className="space-y-4">
        <legend className="font-serif text-xl text-espresso">Your vision</legend>
        <div className="space-y-4">
          <div>
            <Label htmlFor="vision">Describe your bridal beauty vision</Label>
            <textarea id="vision" name="vision" rows={4} className={fieldClass} />
          </div>
          <div>
            <Label htmlFor="allergies">Any allergies or sensitivities?</Label>
            <input id="allergies" name="allergies" className={fieldClass} />
          </div>
          <div>
            <Label htmlFor="howFound">How did you find Maureen Ella?</Label>
            <select id="howFound" name="howFound" className={fieldClass} defaultValue="">
              <option value="">Select…</option>
              <option>Google</option>
              <option>Instagram</option>
              <option>Referral</option>
              <option>Venue</option>
              <option>Photographer / planner</option>
              <option>Zola / wedding directory</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </fieldset>

      {/* Consent */}
      <fieldset className="space-y-3">
        <legend className="sr-only">Consent</legend>
        <label className="flex items-start gap-3 text-sm text-cocoa">
          <input
            type="checkbox"
            name="consentNotReserved"
            className="mt-1"
            aria-invalid={!!err.consentNotReserved}
            aria-describedby={err.consentNotReserved ? "consentNotReserved-error" : undefined}
          />
          <span>I understand this inquiry does not reserve my date.</span>
        </label>
        <FieldError id="consentNotReserved-error" message={err.consentNotReserved} />
        <label className="flex items-start gap-3 text-sm text-cocoa">
          <input
            type="checkbox"
            name="consentContact"
            className="mt-1"
            aria-invalid={!!err.consentContact}
            aria-describedby={err.consentContact ? "consentContact-error" : undefined}
          />
          <span>I agree to be contacted about my inquiry.</span>
        </label>
        <FieldError id="consentContact-error" message={err.consentContact} />
      </fieldset>

      <SubmitButton />
    </form>
  );
}
