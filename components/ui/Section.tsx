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
      className={clsx(
        "py-20 sm:py-28",
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
 * Editorial section heading: numbered index + eyebrow on a hairline rule,
 * then an oversized serif title. `invert` for use on espresso backgrounds.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  align = "left",
  invert = false,
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <Reveal className={clsx("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {(eyebrow || index) && (
        <div
          className={clsx(
            "flex items-center gap-4 border-t pt-4",
            invert ? "border-porcelain/25" : "border-hairline",
            align === "center" && "justify-center",
          )}
        >
          {index && <span className="index-mark">{index}</span>}
          {eyebrow && (
            <span className={clsx("eyebrow", invert && "text-champagne")}>{eyebrow}</span>
          )}
        </div>
      )}
      <h2
        className={clsx(
          "mt-5 text-4xl sm:text-5xl",
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
            invert ? "text-porcelain/75" : "text-cocoa/80",
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
