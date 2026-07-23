"use client";

import { useMemo, useState } from "react";
import type { Testimonial } from "@/lib/content";
import { clsx } from "@/lib/clsx";
import { AnimatePresence, LayoutGroup, m } from "motion/react";

const filters = [
  { id: "all", label: "All reviews" },
  {
    id: "experience",
    label: "The experience",
    terms: ["organized", "stress-free", "punctual", "communication", "first-timer friendly", "professionalism", "late booking", "last-minute", "on schedule", "honest guidance", "care"],
  },
  {
    id: "artistry",
    label: "The artistry",
    terms: ["hair and makeup", "long-lasting", "updo", "timeless", "hair health", "talented", "compliments", "hairstyling", "bridal makeup", "braids", "thick hair", "veil", "creative", "expertise"],
  },
  {
    id: "confidence",
    label: "The feeling",
    terms: ["confidence", "felt like me", "exceeded expectations", "wedding day", "elopement", "recommended", "five-star rating"],
  },
  {
    id: "occasions",
    label: "Beyond the aisle",
    terms: ["boudoir", "photo shoot", "family", "returning client"],
  },
] as const;

export function ReviewCollection({ items }: { items: Testimonial[] }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const visibleItems = useMemo(() => {
    const filter = filters.find((item) => item.id === activeFilter);
    if (!filter || !("terms" in filter)) return items;
    return items.filter((review) =>
      review.proofPoint.some((point) => filter.terms.includes(point as never)),
    );
  }, [activeFilter, items]);

  return (
    <LayoutGroup id="review-collection">
      <div className="flex flex-col gap-6 border-y border-hairline py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" aria-label="Filter reviews by theme">
          {filters.map((filter) => {
            const active = activeFilter === filter.id;
            return (
              <m.button
                key={filter.id}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveFilter(filter.id)}
                className={clsx(
                  "relative isolate border px-4 py-2 text-[0.67rem] uppercase tracking-[0.16em] transition-colors duration-300",
                  active
                    ? "border-transparent text-porcelain"
                    : "border-hairline bg-transparent text-cocoa hover:border-rose hover:text-espresso",
                )}
                whileTap={{ scale: 0.96 }}
              >
                {active && (
                  <m.span
                    layoutId="review-filter-active"
                    className="absolute inset-0 -z-10 bg-espresso"
                    transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.65 }}
                  />
                )}
                {filter.label}
              </m.button>
            );
          })}
        </div>
        <p className="shrink-0 text-xs uppercase tracking-[0.16em] text-taupe-deep" aria-live="polite">
          {String(visibleItems.length).padStart(2, "0")} love {visibleItems.length === 1 ? "note" : "notes"}
        </p>
      </div>

      <div className="mt-10 columns-1 gap-5 md:columns-2 lg:gap-7">
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleItems.map((review, index) => (
            <m.article
              layout
              key={review.id}
              className={clsx(
                "group mb-5 break-inside-avoid border border-hairline p-6 transition-colors duration-500 hover:border-taupe sm:p-8 lg:mb-7",
                index % 3 === 1 ? "bg-cream" : "bg-porcelain",
              )}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], layout: { type: "spring", stiffness: 250, damping: 30 } }}
            >
            <div className="flex items-start justify-between gap-5">
              <span aria-label={`${review.rating} out of 5 stars`} className="text-[0.72rem] tracking-[0.16em] text-rose">
                {"★".repeat(review.rating)}
              </span>
              <span className="pt-1 text-[0.6rem] uppercase tracking-[0.19em] text-taupe-deep">
                {review.dateLabel ?? "Google review"}
              </span>
            </div>
            {review.quote ? (
              <>
                <span aria-hidden className="mt-5 block font-serif text-5xl leading-none text-rose-soft transition-colors group-hover:text-rose">“</span>
                <blockquote className="-mt-2 font-serif text-[1.45rem] italic leading-[1.35] text-espresso sm:text-[1.6rem]">
                  {review.quote}
                </blockquote>
                {review.excerpt && (
                  <p className="mt-4 text-[0.62rem] uppercase tracking-[0.16em] text-taupe-deep">Excerpt shown · Read the complete review on Google</p>
                )}
              </>
            ) : (
              <p className="mt-7 font-serif text-3xl italic leading-tight text-espresso">A five-star rating, shared without a written note.</p>
            )}
            <footer className="mt-8 border-t border-hairline pt-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <cite className="font-serif text-xl not-italic text-espresso">{review.displayName}</cite>
                {review.priceLevel && <span className="text-[0.62rem] uppercase tracking-[0.16em] text-taupe-deep">{review.priceLevel}</span>}
              </div>
              {review.reviewerMeta && <p className="mt-1 text-xs text-cocoa/55">{review.reviewerMeta} on Google</p>}
              <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1" aria-label="Review highlights">
                {review.proofPoint.slice(0, 3).map((point) => (
                  <li key={point} className="text-[0.65rem] uppercase tracking-[0.14em] text-taupe-deep">
                    {point}
                  </li>
                ))}
              </ul>
              {review.ownerResponse && (
                <details className="mt-5 border-t border-hairline pt-4">
                  <summary className="cursor-pointer list-none text-[0.65rem] uppercase tracking-[0.17em] text-espresso marker:hidden">
                    <span className="inline-flex items-center gap-2">Maureen&apos;s response <span aria-hidden>＋</span></span>
                  </summary>
                  <div className="mt-4 border-l border-rose-soft pl-4">
                    <p className="text-sm leading-relaxed text-cocoa/70">{review.ownerResponse}</p>
                  </div>
                </details>
              )}
            </footer>
            </m.article>
          ))}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}
