"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { clsx } from "@/lib/clsx";

/** Scroll-linked image drift with enough overscan to keep the frame filled. */
export function ParallaxFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: frame,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-22, 22]);

  return (
    <div ref={frame} className={clsx("relative overflow-hidden", className)}>
      <m.div
        className="absolute -inset-[5%]"
        style={{ y: reduceMotion ? 0 : y }}
      >
        {children}
      </m.div>
    </div>
  );
}

