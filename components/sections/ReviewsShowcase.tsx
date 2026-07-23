"use client";

import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { clsx } from "@/lib/clsx";

type ReviewItem = {
  id: string;
  quote: string;
  displayName: string;
};

export function ReviewsShowcase({ items }: { items: ReviewItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const activeReview = items[activeIndex];

  function move(delta: number) {
    setDirection(delta);
    setActiveIndex((current) => (current + delta + items.length) % items.length);
  }

  return (
    <section
      aria-labelledby="home-reviews-title"
      className="border-y border-hairline bg-ivory py-16 sm:py-20"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <div className="border-t border-hairline pt-4">
              <span className="eyebrow">Kind words</span>
            </div>
            <h2 id="home-reviews-title" className="mt-5 max-w-xs text-3xl sm:text-4xl">
              Notes from our brides
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cocoa/65">
              Real wedding mornings, remembered in their own words.
            </p>
          </Reveal>

          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Bride review carousel"
            className="min-w-0"
          >
            <Reveal delay={100}>
              <div className="border-y border-hairline">
                <article className="flex min-h-[23rem] flex-col justify-between py-7 sm:min-h-[20rem] sm:py-9">
                  <div className="relative min-h-52 overflow-hidden sm:min-h-48" aria-live="polite" aria-atomic="true">
                    <AnimatePresence mode="wait" initial={false} custom={direction}>
                      <m.div
                        key={activeReview.id}
                        custom={direction}
                        initial={{ opacity: 0, x: direction * 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction * -12 }}
                        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <blockquote className="pullquote max-w-3xl text-[1.45rem] leading-[1.35] text-espresso sm:text-[1.8rem] lg:text-[2rem]">
                          &ldquo;{activeReview.quote}&rdquo;
                        </blockquote>
                        <span className="sr-only">Review by {activeReview.displayName}.</span>
                      </m.div>
                    </AnimatePresence>
                  </div>

                  <footer className="mt-10 flex flex-wrap items-end justify-between gap-5 border-t border-hairline pt-5">
                    <AnimatePresence mode="wait" initial={false}>
                      <m.cite
                        key={activeReview.id}
                        className="not-italic"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="block font-serif text-xl text-espresso">
                          {activeReview.displayName}
                        </span>
                        <span className="eyebrow mt-1 block">Maureen Ella bride</span>
                      </m.cite>
                    </AnimatePresence>

                    <div className="flex items-center gap-4">
                      <span className="text-xs tabular-nums text-taupe-deep">
                        {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                      </span>
                      {items.length > 1 && (
                        <span className="flex gap-2">
                          <ArrowButton direction="previous" onClick={() => move(-1)} />
                          <ArrowButton direction="next" onClick={() => move(1)} />
                        </span>
                      )}
                    </div>
                  </footer>
                </article>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "previous" | "next";
  onClick: () => void;
}) {
  const isPrevious = direction === "previous";

  return (
    <m.button
      type="button"
      aria-label={`${isPrevious ? "Previous" : "Next"} bride review`}
      onClick={onClick}
      className="group grid h-11 w-11 place-items-center border border-hairline bg-transparent text-espresso transition-colors duration-300 hover:border-rose hover:text-rose"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 480, damping: 28 }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className={clsx(
          "h-4 w-4 transition-transform duration-300",
          isPrevious ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5",
        )}
      >
        <path
          d={isPrevious ? "M19 12H5m0 0 5-5m-5 5 5 5" : "M5 12h14m0 0-5-5m5 5-5 5"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </m.button>
  );
}
