import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Hero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  primaryCta,
  secondaryCta,
  priority = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  priority?: boolean;
}) {
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-porcelain">
      <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="order-2 lg:order-1">
          {eyebrow && (
            <Reveal className="flex items-center gap-4">
              <span className="index-mark">01</span>
              <span className="eyebrow">{eyebrow}</span>
            </Reveal>
          )}
          <Reveal delay={90}>
            <h1 className="mt-6 text-[var(--text-hero)] leading-[1.02] text-espresso">
              {title}
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-cocoa/85">
              {subtitle}
            </p>
          </Reveal>
          <Reveal delay={260} className="mt-9 flex flex-wrap items-center gap-5">
            <CtaButton href={primaryCta.href}>{primaryCta.label}</CtaButton>
            {secondaryCta && (
              <ButtonLink href={secondaryCta.href} variant="ghost">
                {secondaryCta.label}
              </ButtonLink>
            )}
          </Reveal>
        </div>

        <Reveal delay={120} className="order-1 lg:order-2">
          <div className="relative">
            {/* Offset accent frame for editorial depth */}
            <div
              aria-hidden
              className="absolute -right-3 -top-3 hidden h-full w-full border border-rose/40 sm:block"
            />
            <div className="img-zoom relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority={priority}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
