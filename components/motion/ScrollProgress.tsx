"use client";

import { m, useScroll, useSpring } from "motion/react";

/** A nearly weightless reading-position cue along the header hairline. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 28,
    mass: 0.22,
    skipInitialAnimation: true,
  });

  return (
    <m.span
      aria-hidden
      className="pointer-events-none absolute -bottom-px left-0 h-px w-full origin-left bg-rose"
      style={{ scaleX }}
    />
  );
}

