"use client";

import { domAnimation, LazyMotion, MotionConfig } from "motion/react";

/**
 * One motion policy for the whole site: a compact feature bundle, natural
 * spring defaults, and automatic respect for the visitor's motion preference.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ type: "spring", stiffness: 280, damping: 30, mass: 0.7 }}
    >
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}

