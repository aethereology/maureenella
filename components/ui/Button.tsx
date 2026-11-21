"use client";

import Link from "next/link";
import { m, type HTMLMotionProps } from "motion/react";
import { clsx } from "@/lib/clsx";

type Variant = "primary" | "secondary" | "ghost" | "ghostInverse";

/*
  Colours resolve through --btn-* variables (app/globals.css). Inside a
  Section tone="espresso" (data-tone="dark") they flip to light-on-dark, so a
  primary CTA is never espresso-on-espresso.
*/
const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 font-sans text-[0.7rem] uppercase tracking-[0.18em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--btn-focus)] disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-[color:var(--btn-bg)] px-7 py-4 text-[color:var(--btn-fg)] hover:bg-[color:var(--btn-bg-hover)]",
  secondary:
    "border border-[color:var(--btn-ink)] px-7 py-4 text-[color:var(--btn-ink)] hover:bg-[color:var(--btn-ink)] hover:text-[color:var(--btn-fg)]",
  ghost: "py-2 text-[color:var(--btn-ink)]",
  // Explicit light ghost, kept for the private pricing guide (works anywhere).
  ghostInverse: "py-2 text-porcelain focus-visible:outline-champagne",
};

function isGhostVariant(variant: Variant) {
  return variant === "ghost" || variant === "ghostInverse";
}

/** Ghost link: a hairline underline that thickens toward the hover. */
function GhostInner({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative">
      {children}
      <span
        aria-hidden
        className="absolute -bottom-1.5 left-0 h-px w-full bg-current opacity-40 transition-opacity duration-300 group-hover/btn:opacity-100"
      />
      <span
        aria-hidden
        className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:scale-x-100"
      />
    </span>
  );
}

const press = {
  whileHover: { y: -1 },
  whileTap: { y: 0, scale: 0.98 },
  transition: { type: "spring" as const, stiffness: 480, damping: 30, mass: 0.45 },
};

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
    <m.span className="inline-flex" {...press}>
      <Link href={href} className={clsx(base, variants[variant], className)} {...rest}>
        {ghost ? <GhostInner>{children}</GhostInner> : children}
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
    <m.button className={clsx(base, variants[variant], className)} {...press} {...rest}>
      {ghost ? <GhostInner>{children}</GhostInner> : children}
    </m.button>
  );
}
