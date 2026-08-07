"use client";

import Link from "next/link";
import { m, type HTMLMotionProps } from "motion/react";
import { clsx } from "@/lib/clsx";

type Variant = "primary" | "secondary" | "ghost" | "ghostInverse";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden font-sans text-[0.68rem] uppercase tracking-[0.2em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-espresso px-7 py-4 text-porcelain shadow-[0_12px_30px_rgba(37,29,23,0.12)] hover:bg-cocoa focus-visible:outline-rose",
  secondary:
    "border border-espresso px-7 py-4 text-espresso hover:bg-espresso hover:text-porcelain focus-visible:outline-rose",
  ghost: "text-espresso focus-visible:outline-rose",
  ghostInverse: "text-porcelain focus-visible:outline-champagne",
};

function isGhostVariant(variant: Variant) {
  return variant === "ghost" || variant === "ghostInverse";
}

/** Ghost variant renders text with an animated underline + arrow. */
function GhostInner({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-flex items-center gap-2">
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-current transition-transform duration-300 group-hover/btn:scale-x-0"
        />
      </span>
      <span aria-hidden className="transition-transform duration-300 group-hover/btn:translate-x-1">
        →
      </span>
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className">) {
  const ghost = isGhostVariant(variant);

  return (
    <m.span
      className="inline-flex"
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ y: 0, scale: 0.965 }}
      transition={{ type: "spring", stiffness: 480, damping: 28, mass: 0.45 }}
    >
      <Link href={href} className={clsx(base, variants[variant], className)} {...rest}>
        {!ghost && (
          <span
            aria-hidden
            className="absolute inset-y-0 -left-1/3 w-1/4 -skew-x-12 bg-white/10 opacity-0 blur-sm transition-all duration-700 group-hover/btn:left-[115%] group-hover/btn:opacity-100"
          />
        )}
        <span className="relative">
          {ghost ? <GhostInner>{children}</GhostInner> : children}
        </span>
      </Link>
    </m.span>
  );
}

export function Button({
  children,
  variant = "primary",
  className,
  ...rest
}: {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
} & Omit<HTMLMotionProps<"button">, "children" | "className">) {
  const ghost = isGhostVariant(variant);

  return (
    <m.button
      className={clsx(base, variants[variant], className)}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ y: 0, scale: 0.965 }}
      transition={{ type: "spring", stiffness: 480, damping: 28, mass: 0.45 }}
      {...rest}
    >
      {ghost ? <GhostInner>{children}</GhostInner> : children}
    </m.button>
  );
}
