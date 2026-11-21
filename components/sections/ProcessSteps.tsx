"use client";

import { useRef, useState } from "react";
import {
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { clsx } from "@/lib/clsx";

type Step = { title: string; description: string };

/** Wedding-day process. Copy from docs/PAGE_COPY_DRAFTS.md. */
const STEPS: Step[] = [
  { title: "Inquire for your date", description: "Share your wedding date, venue, getting-ready location, service count, and beauty vision." },
  { title: "Secure your wedding date", description: "Once availability is confirmed, your signed agreement and date reservation hold your date." },
  { title: "Plan your preview", description: "Your bridal preview refines your hair and makeup vision before the wedding day." },
  { title: "Confirm your timeline", description: "We use your photographer or planner timeline, service count, and location to plan a smooth schedule." },
  { title: "Enjoy the morning", description: "On the wedding day: calm energy, beautiful artistry, and everyone ready on time." },
];

const LAST = STEPS.length - 1;

/**
 * "First light" — the site's one orchestrated motion moment (D016).
 *
 * The process is a real sequence, so it reads as a wedding-morning timeline:
 * as the section scrolls through the viewport a line draws from the first
 * step to the last and a soft champagne light travels along it, filling each
 * step's marker as it arrives. Horizontal from lg up, vertical below.
 * Reduced motion: the line is fully drawn and every step is lit, statically.
 * The markup is a plain ordered list, so it reads correctly without JS.
 */
export function ProcessSteps() {
  const ref = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.55"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });
  const [lit, setLit] = useState(0);

  useMotionValueEvent(progress, "change", (value) => {
    // A step lights when the line reaches its marker.
    const next = Math.max(0, Math.min(LAST, Math.floor(value * LAST + 0.04)));
    setLit((current) => (current === next ? current : next));
  });

  const drawn = useTransform(progress, [0, 1], [0, 1]);
  const lightAlong = useTransform(progress, (value) => `${Math.min(1, Math.max(0, value)) * 100}%`);

  const litIndex = reduceMotion ? LAST : lit;

  return (
    <div className="relative">
      <ol
        ref={ref}
        className="relative grid gap-y-12 pl-10 lg:grid-cols-5 lg:gap-x-8 lg:gap-y-0 lg:pl-0 lg:pt-14"
      >
        {/* Track (hairline) + drawn line + travelling light. Decorative only. */}
        <span
          aria-hidden
          className="absolute bottom-2 left-[0.6875rem] top-2 w-px bg-hairline lg:bottom-auto lg:left-[0.6875rem] lg:right-[calc(20%-2.2875rem)] lg:top-[0.6875rem] lg:h-px lg:w-auto"
        />
        <m.span
          aria-hidden
          className="absolute bottom-2 left-[0.6875rem] top-2 hidden w-px origin-top bg-gradient-to-b from-champagne via-rose to-rose-deep max-lg:block"
          style={{ scaleY: reduceMotion ? 1 : drawn }}
        />
        <m.span
          aria-hidden
          className="absolute left-[0.6875rem] right-[calc(20%-2.2875rem)] top-[0.6875rem] hidden h-px origin-left bg-gradient-to-r from-champagne via-rose to-rose-deep lg:block"
          style={{ scaleX: reduceMotion ? 1 : drawn }}
        />
        {!reduceMotion && (
          <>
            <m.span
              aria-hidden
              className="pointer-events-none absolute left-[0.6875rem] hidden h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(216,191,156,0.75),rgba(216,191,156,0)_65%)] max-lg:block"
              style={{ top: lightAlong }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute left-[0.6875rem] right-[calc(20%-2.2875rem)] top-[0.6875rem] hidden lg:block"
            >
              <m.span
                className="absolute top-0 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(216,191,156,0.75),rgba(216,191,156,0)_65%)]"
                style={{ left: lightAlong }}
              />
            </span>
          </>
        )}

        {STEPS.map((step, i) => {
          const on = i <= litIndex;
          return (
            <li key={step.title} className="relative lg:pr-2">
              <span
                aria-hidden
                className={clsx(
                  "absolute -left-10 top-0.5 flex h-[1.375rem] w-[1.375rem] items-center justify-center rounded-full border transition-[background-color,border-color,box-shadow] duration-700 lg:-top-14 lg:left-0",
                  on
                    ? "border-rose-deep bg-rose-deep shadow-[0_0_0_5px_rgba(216,191,156,0.35)]"
                    : "border-taupe bg-porcelain",
                )}
              >
                <span
                  className={clsx(
                    "h-1.5 w-1.5 rounded-full transition-colors duration-700",
                    on ? "bg-porcelain" : "bg-taupe/60",
                  )}
                />
              </span>
              <span className="index-mark">{i + 1}</span>
              <h3 className="mt-1 font-serif text-[1.6rem] leading-tight text-espresso">
                {step.title}
              </h3>
              <p className="mt-2.5 max-w-xs text-[0.95rem] leading-relaxed text-cocoa/85">
                {step.description}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
