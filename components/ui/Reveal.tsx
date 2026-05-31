"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveals children on scroll into view (one orchestrated rise). Respects
 * prefers-reduced-motion via the CSS in globals.css ([data-reveal]).
 * `delay` staggers sibling reveals.
 *
 * Robustness: reveals immediately if already in view on mount, and has a
 * failsafe timer so content NEVER stays permanently hidden if the observer
 * misbehaves or IntersectionObserver is unavailable.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "figure";
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );
    io.observe(el);

    // Failsafe: never leave content hidden.
    const t = setTimeout(() => setShown(true), 1500);

    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, [shown]);

  return (
    <Tag
      // @ts-expect-error polymorphic ref across element tags
      ref={ref}
      data-reveal=""
      className={`${shown ? "is-in" : ""}${className ? ` ${className}` : ""}`}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
