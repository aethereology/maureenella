"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Testimonial } from "@/lib/content";
import { clsx } from "@/lib/clsx";
import { Button } from "@/components/ui/Button";
import { m } from "motion/react";

/** Reviews shown before "Show more reviews". The rest stay in the HTML. */
const INITIAL_COUNT = 6;
const LIST_ID = "review-collection-list";

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
  const [expanded, setExpanded] = useState(false);
  const [filtered, setFiltered] = useState(false);
  const listRef = useRef<HTMLOListElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pendingFocus = useRef<"first-new" | "toggle" | null>(null);

  const visibleItems = useMemo(() => {
    const filter = filters.find((item) => item.id === activeFilter);
    if (!filter || !("terms" in filter)) return items;
    return items.filter((review) =>
      review.proofPoint.some((point) => filter.terms.includes(point as never)),
    );
  }, [activeFilter, items]);

  const collapsible = visibleItems.length > INITIAL_COUNT;
  const hiddenCount = collapsible ? visibleItems.length - INITIAL_COUNT : 0;

  // After expanding, move focus to the first newly revealed review so keyboard
  // and screen-reader users continue reading where the list grew. After
  // collapsing, keep the toggle in view.
  useEffect(() => {
    const target = pendingFocus.current;
    pendingFocus.current = null;
    if (target === "first-new") {
      const first = listRef.current?.querySelector<HTMLElement>(
        `[data-review-index="${INITIAL_COUNT}"]`,
      );
      first?.focus({ preventScroll: true });
      first?.scrollIntoView({ block: "start" });
    } else if (target === "toggle") {
      toggleRef.current?.scrollIntoView({ block: "center" });
    }
  }, [expanded]);

  return (
    <div>
      <div className="flex flex-col gap-5 border-t border-hairline pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-x-1 gap-y-2" role="group" aria-label="Filter reviews by theme">
          {filters.map((filter) => {
            const active = activeFilter === filter.id;
            return (
              <m.button
                key={filter.id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setActiveFilter(filter.id);
                  setFiltered(true);
                  setExpanded(false);
                }}
                className={clsx(
                  "border px-3 py-2 text-sm transition-colors duration-300 sm:px-4 sm:py-2.5",
                  active
                    ? "border-espresso bg-espresso text-porcelain"
                    : "border-transparent text-cocoa/75 hover:text-espresso",
                )}
                whileTap={{ scale: 0.97 }}
              >
                {filter.label}
              </m.button>
            );
          })}
        </div>
        <p className="shrink-0 font-serif text-lg italic text-taupe-ink" aria-live="polite">
          {visibleItems.length} {visibleItems.length === 1 ? "review" : "reviews"}
        </p>
      </div>

      <m.ol
        key={activeFilter}
        id={LIST_ID}
        ref={listRef}
        role="list"
        className="mt-6 grid gap-x-14 gap-y-14 md:grid-cols-2"
        initial={filtered ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {visibleItems.map((review, index) => (
          <li
            key={review.id}
            // Collapsed reviews stay in the server HTML for crawlers.
            hidden={collapsible && !expanded && index >= INITIAL_COUNT}
          >
            <ReviewCard review={review} index={index} />
          </li>
        ))}
      </m.ol>

      {collapsible && (
        <div className="mt-14 flex flex-col items-center gap-3 border-t border-hairline pt-10 text-center">
          {!expanded && (
            <p className="text-sm text-cocoa/70">
              Showing {INITIAL_COUNT} of {visibleItems.length}
            </p>
          )}
          <Button
            ref={toggleRef}
            type="button"
            variant="secondary"
            aria-expanded={expanded}
            aria-controls={LIST_ID}
            onClick={() => {
              pendingFocus.current = expanded ? "toggle" : "first-new";
              setExpanded((value) => !value);
            }}
          >
            {expanded ? "Show fewer reviews" : `Show more reviews (${hiddenCount})`}
          </Button>
        </div>
      )}
    </div>
  );
}

function ReviewCard({ review, index }: { review: Testimonial; index: number }) {
  return (
    <article
      data-review-index={index}
      tabIndex={-1}
      aria-label={`Review by ${review.displayName}`}
      className="flex h-full scroll-mt-28 flex-col border-t border-hairline pt-7 focus-visible:outline-offset-8"
    >
      <div className="flex items-center justify-between gap-5 text-sm">
        <span aria-label={`${review.rating} out of 5 stars`} className="tracking-[0.12em] text-rose-deep">
          {"★".repeat(review.rating)}
        </span>
        <span className="text-taupe-ink">{review.dateLabel ?? "Google review"}</span>
      </div>

      {review.quote ? (
        <>
          <blockquote className="mt-5 font-serif text-[1.4rem] italic leading-[1.4] text-espresso sm:text-[1.5rem]">
            &ldquo;{review.quote}&rdquo;
          </blockquote>
          {review.excerpt && (
            <p className="mt-3 text-sm text-taupe-ink">
              Excerpt. The complete review is on Google.
            </p>
          )}
        </>
      ) : (
        <p className="mt-5 font-serif text-[1.4rem] italic leading-snug text-espresso/80">
          A five-star rating, shared without a written note.
        </p>
      )}

      <footer className="mt-6">
        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <cite className="font-serif text-xl not-italic text-espresso">{review.displayName}</cite>
          {review.reviewerMeta && (
            <span className="text-sm text-cocoa/65">{review.reviewerMeta} on Google</span>
          )}
          {review.priceLevel && (
            <span className="text-sm text-taupe-ink">{review.priceLevel}</span>
          )}
        </p>
        {review.proofPoint.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-x-2 text-sm text-taupe-ink" aria-label="Review highlights">
            {review.proofPoint.slice(0, 3).map((point, i) => (
              <li key={point}>
                {i > 0 && <span aria-hidden className="mr-2">·</span>}
                {point}
              </li>
            ))}
          </ul>
        )}
        {review.ownerResponse && (
          <details className="group/resp mt-5">
            <summary className="inline-flex cursor-pointer list-none items-center gap-2 text-sm text-espresso underline decoration-hairline underline-offset-4 hover:decoration-espresso [&::-webkit-details-marker]:hidden">
              Maureen&apos;s response
              <span aria-hidden className="transition-transform duration-300 group-open/resp:rotate-45">+</span>
            </summary>
            <p className="mt-3 border-l border-rose-soft pl-4 text-sm leading-relaxed text-cocoa/75">
              {review.ownerResponse}
            </p>
          </details>
        )}
      </footer>
    </article>
  );
}
