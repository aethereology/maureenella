import type { CSSProperties, ReactNode } from "react";

/**
 * Lightweight reveal wrapper. It renders visible server HTML and lets CSS add
 * the entrance motion, so content never depends on client hydration to appear.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "figure";
  className?: string;
}) {
  return (
    <Tag
      data-reveal=""
      className={`is-in${className ? ` ${className}` : ""}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
