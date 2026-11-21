import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { ButtonLink } from "@/components/ui/Button";
import { RecognitionMarquee } from "@/components/sections/RecognitionMarquee";
import { ParallaxFrame } from "@/components/motion/ParallaxFrame";

export function Hero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  primaryCta,
  secondaryCta,
  reviewCta,
  showAwards = false,
  priority = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  reviewCta?: { label: string; href: string };
  showAwards?: boolean;
  priority?: boolean;
}) {
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-porcelain">
      {/* First light: a still champagne glow, the morning motif at rest (D016). */}
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-40 h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle,rgba(216,191,156,0.5),rgba(216,191,156,0)_66%)]" />
      <Container className="relative grid min-h-[calc(100svh-5.25rem)] items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20 lg:py-20">
        <div className="order-2 lg:order-1">
          {eyebrow && (
            <p className="eyebrow">{eyebrow}</p>
          )}
          <div>
            <h1 className="mt-5 max-w-3xl text-[clamp(2.85rem,4.8vw,5.2rem)] leading-[0.96] tracking-[-0.035em] text-espresso">
              {title}
            </h1>
          </div>
          <div>
            <p className="mt-8 max-w-xl text-[1.05rem] leading-[1.8] text-cocoa/85 sm:text-lg">
              {subtitle}
            </p>
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <CtaButton href={primaryCta.href}>{primaryCta.label}</CtaButton>
            {secondaryCta && (
              <ButtonLink href={secondaryCta.href} variant="ghost">
                {secondaryCta.label}
              </ButtonLink>
            )}
          </div>
          {reviewCta && (
            <div className="mt-7">
              <a
                href={reviewCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/review inline-flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-cocoa/75 transition-colors hover:text-espresso focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
              >
                <span
                  aria-hidden
                  className="text-[0.68rem] tracking-[0.18em] text-rose"
                >
                  ★★★★★
                </span>
                <span className="border-b border-hairline pb-0.5 transition-colors group-hover/review:border-rose">
                  {reviewCta.label}
                </span>
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover/review:-translate-y-0.5 group-hover/review:translate-x-0.5"
                >
                  ↗
                </span>
              </a>
            </div>
          )}
        </div>

        <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-[34rem] lg:mr-0">
            <ParallaxFrame className="img-zoom aspect-[4/3] w-full shadow-[0_30px_80px_rgba(70,56,48,0.12)] sm:aspect-[4/5]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority={priority}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </ParallaxFrame>
          </div>
        </div>
      </Container>
      {showAwards && <RecognitionMarquee />}
    </section>
  );
}
