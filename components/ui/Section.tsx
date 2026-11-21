import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { clsx } from "@/lib/clsx";

export function Section({
  children,
  className,
  tone = "default",
  size = "default",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "ivory" | "cream" | "espresso";
  size?: "default" | "narrow" | "wide";
  id?: string;
}) {
  return (
    <section
      id={id}
      // Dark bands flip button + label colours through CSS variables
      // (app/globals.css), so every CTA stays visible on espresso.
      data-tone={tone === "espresso" ? "dark" : undefined}
      className={clsx(
        "relative py-24 sm:py-32",
        tone === "ivory" && "bg-ivory",
        tone === "cream" && "bg-cream",
        tone === "espresso" && "bg-espresso text-porcelain",
        className,
      )}
    >
      <Container size={size}>{children}</Container>
    </section>
  );
}

/**
 * Section heading: an optional quiet italic label, then the serif title.
 * `index` is accepted for backwards compatibility but no longer rendered —
 * numbers are reserved for content that is a real sequence (D016).
 * `invert` for use on espresso backgrounds.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  invert = false,
}: {
  /** @deprecated Decorative indices were removed in D016; ignored. */
  index?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <Reveal className={clsx("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className={clsx("eyebrow", invert && "text-champagne")}>{eyebrow}</p>
      )}
      <h2
        className={clsx(
          "text-[clamp(2.6rem,5vw,4.75rem)] leading-[0.98] tracking-[-0.03em]",
          eyebrow && "mt-3",
          invert ? "text-porcelain" : "text-espresso",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={clsx(
            "mt-5 max-w-2xl text-lg leading-relaxed",
            align === "center" && "mx-auto",
            invert ? "text-porcelain/80" : "text-cocoa/85",
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
