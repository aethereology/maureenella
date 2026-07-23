"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, m, useReducedMotion } from "motion/react";

/** A restrained page hand-off that keeps route changes from feeling abrupt. */
export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.main
        id="main"
        key={pathname}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
        transition={{ duration: reduceMotion ? 0.16 : 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </m.main>
    </AnimatePresence>
  );
}

