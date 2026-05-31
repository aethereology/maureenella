"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { joinWaitlist, type WaitlistState } from "@/app/actions/waitlist";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

const initial: WaitlistState = { status: "idle" };

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="shrink-0 rounded-none bg-espresso px-6 py-3 text-sm font-medium tracking-wide text-porcelain transition-colors hover:bg-cocoa focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose disabled:opacity-60"
    >
      {pending ? "Joining…" : label}
    </button>
  );
}

/**
 * Inline email capture. `list` tags the source; `event` fires on submit.
 */
export function WaitlistForm({
  list,
  cta = "Join",
  event = "education_waitlist_submit",
  showName = false,
}: {
  list: string;
  cta?: string;
  event?: AnalyticsEvent;
  showName?: boolean;
}) {
  const [state, action] = useActionState(joinWaitlist, initial);

  if (state.status === "success") {
    return (
      <p
        role="status"
        className="rounded-md bg-cream px-4 py-3 text-sm text-cocoa"
      >
        {state.message}
      </p>
    );
  }

  return (
    <form
      action={action}
      onSubmit={() => trackEvent(event, { list })}
      className="w-full"
    >
      <input type="hidden" name="list" value={list} />
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`company-${list}`}>Company</label>
        <input id={`company-${list}`} name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        {showName && (
          <>
            <label htmlFor={`name-${list}`} className="sr-only">
              First name
            </label>
            <input
              id={`name-${list}`}
              name="name"
              placeholder="First name"
              autoComplete="given-name"
              className="w-full rounded-none border border-taupe bg-porcelain px-5 py-3 text-cocoa placeholder:text-taupe focus-visible:border-rose focus-visible:outline-2 focus-visible:outline-rose"
            />
          </>
        )}
        <label htmlFor={`email-${list}`} className="sr-only">
          Email address
        </label>
        <input
          id={`email-${list}`}
          name="email"
          type="email"
          required
          placeholder="you@email.com"
          autoComplete="email"
          className="w-full rounded-none border border-taupe bg-porcelain px-5 py-3 text-cocoa placeholder:text-taupe focus-visible:border-rose focus-visible:outline-2 focus-visible:outline-rose"
        />
        <Submit label={cta} />
      </div>
      {state.status === "error" && (
        <p role="alert" className="mt-2 text-sm text-rose">
          {state.message}
        </p>
      )}
    </form>
  );
}
