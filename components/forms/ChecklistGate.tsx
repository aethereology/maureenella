"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { joinWaitlist, type WaitlistState } from "@/app/actions/waitlist";
import { trackEvent } from "@/lib/analytics";
import type { ChecklistSection } from "@/content/education";

const initial: WaitlistState = { status: "idle" };

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="shrink-0 rounded-none bg-espresso px-6 py-3 text-sm font-medium tracking-wide text-porcelain transition-colors hover:bg-cocoa focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose disabled:opacity-60"
    >
      {pending ? "Sending…" : label}
    </button>
  );
}

/**
 * Email-gated lead magnet. Captures an email via the shared waitlist action
 * (tagged `education-starter-checklist`), then reveals the full checklist
 * inline — an honest, immediately usable web checklist, not a fake file.
 */
export function ChecklistGate({
  sections,
  cta = "Get the checklist",
}: {
  sections: ChecklistSection[];
  cta?: string;
}) {
  const [state, action] = useActionState(joinWaitlist, initial);

  if (state.status === "success") {
    return (
      <div>
        <p
          role="status"
          className="rounded-md bg-cream px-4 py-3 text-sm text-cocoa"
        >
          You&rsquo;re in — here&rsquo;s your starter checklist. We&rsquo;ll also
          email you a copy and the occasional bridal-business tip.
        </p>
        <div className="mt-10 space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl text-espresso">{section.heading}</h2>
              {section.intro && (
                <p className="mt-2 text-cocoa/80">{section.intro}</p>
              )}
              <ul className="mt-4 space-y-2">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3 text-cocoa/90">
                    <span aria-hidden className="mt-1 text-rose">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    );
  }

  return (
    <form
      action={action}
      onSubmit={() =>
        trackEvent("lead_magnet_download", { list: "education-starter-checklist" })
      }
      className="w-full"
    >
      <input type="hidden" name="list" value="education-starter-checklist" />
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company-checklist">Company</label>
        <input id="company-checklist" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="name-checklist" className="sr-only">
          First name
        </label>
        <input
          id="name-checklist"
          name="name"
          placeholder="First name"
          autoComplete="given-name"
          className="w-full rounded-none border border-taupe bg-porcelain px-5 py-3 text-cocoa placeholder:text-taupe focus-visible:border-rose focus-visible:outline-2 focus-visible:outline-rose"
        />
        <label htmlFor="email-checklist" className="sr-only">
          Email address
        </label>
        <input
          id="email-checklist"
          name="email"
          type="email"
          required
          placeholder="you@email.com"
          autoComplete="email"
          className="w-full rounded-none border border-taupe bg-porcelain px-5 py-3 text-cocoa placeholder:text-taupe focus-visible:border-rose focus-visible:outline-2 focus-visible:outline-rose"
        />
        <Submit label={cta} />
      </div>
      <p className="mt-3 text-xs text-cocoa/60">
        Enter your email to unlock the full checklist on this page. No spam — just
        the resource and occasional tips. Unsubscribe anytime.
      </p>
      {state.status === "error" && (
        <p role="alert" className="mt-2 text-sm text-rose">
          {state.message}
        </p>
      )}
    </form>
  );
}
