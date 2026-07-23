"use client";

import { m } from "motion/react";
import { clsx } from "@/lib/clsx";

type GroupTag = "div" | "ul" | "ol";
type ItemTag = "div" | "li" | "article" | "figure";

const groupTags = { div: m.div, ul: m.ul, ol: m.ol };
const itemTags = { div: m.div, li: m.li, article: m.article, figure: m.figure };

export function Stagger({
  children,
  className,
  as = "div",
  delay = 0,
  stagger = 0.085,
}: {
  children: React.ReactNode;
  className?: string;
  as?: GroupTag;
  delay?: number;
  stagger?: number;
}) {
  const MotionTag = groupTags[as] as typeof m.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: {},
        visible: { transition: { delayChildren: delay, staggerChildren: stagger } },
      }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: ItemTag;
}) {
  const MotionTag = itemTags[as] as typeof m.div;

  return (
    <MotionTag
      className={clsx(className)}
      variants={{
        hidden: { opacity: 0, y: 22 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}

