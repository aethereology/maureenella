import type { Faq } from "@/lib/content";

/**
 * Accessible FAQ accordion built on native <details>/<summary> — keyboard
 * operable, works without JS. Visible answers must match the FAQPage schema.
 */
export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="border-t border-hairline">
      {faqs.map((faq, i) => (
        <details key={faq.id} className="group border-b border-hairline">
          <summary className="flex cursor-pointer list-none items-baseline gap-5 py-6 text-left marker:hidden [&::-webkit-details-marker]:hidden">
            <span className="index-mark pt-1.5">{String(i + 1).padStart(2, "0")}</span>
            <span className="flex-1 font-serif text-2xl leading-snug text-espresso">
              {faq.question}
            </span>
            <span
              aria-hidden
              className="shrink-0 pt-1 text-2xl font-light text-taupe-deep transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-2xl pb-7 pl-[3.25rem] text-cocoa/80">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
