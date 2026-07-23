"use client";

import type { ReactNode } from "react";
import { m } from "motion/react";

type RevealTag = "div" | "section" | "li" | "article" | "figure";

const motionTags = {
  div: m.div,
  section: m.section,
  li: m.li,
  article: m.article,
  figure: m.figure,
};

/**
 * Scroll-aware editorial reveal. MotionConfig handles reduced-motion visitors
 * globally, while the noscript rule in the root layout keeps content resilient.
 */
export function Reveal({
  children,
  delay = 0,
  as = "div",
  className,
}: {
  children: ReactNode;
  delay?: number;
  as?: RevealTag;
  className?: string;
}) {
  const MotionTag = motionTags[as] as typeof m.div;

  return (
    <MotionTag
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14, margin: "0px 0px -6% 0px" }}
      transition={{
        duration: 0.72,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
