import Link from "next/link";
import { clsx } from "@/lib/clsx";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group/btn inline-flex items-center justify-center gap-2.5 font-sans text-[0.72rem] uppercase tracking-[0.18em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-espresso px-7 py-3.5 text-porcelain hover:bg-cocoa focus-visible:outline-rose",
  secondary:
    "border border-espresso px-7 py-3.5 text-espresso hover:bg-espresso hover:text-porcelain focus-visible:outline-rose",
  ghost: "text-espresso focus-visible:outline-rose",
};

/** Ghost variant renders text with an animated underline + arrow. */
function GhostInner({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-flex items-center gap-2">
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-espresso transition-transform duration-300 group-hover/btn:scale-x-0" />
      </span>
      <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
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
  return (
    <Link href={href} className={clsx(base, variants[variant], className)} {...rest}>
      {variant === "ghost" ? <GhostInner>{children}</GhostInner> : children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  className,
  ...rest
}: {
  variant?: Variant;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={clsx(base, variants[variant], className)} {...rest}>
      {variant === "ghost" ? <GhostInner>{children}</GhostInner> : children}
    </button>
  );
}
