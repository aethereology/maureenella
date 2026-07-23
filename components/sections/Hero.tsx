import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
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
      <div aria-hidden className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-rose-soft/20 blur-3xl" />
      <Container className="relative grid min-h-[calc(100svh-5.25rem)] items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20 lg:py-20">
        <div className="order-2 lg:order-1">
          {eyebrow && (
            <Reveal className="flex items-center gap-4">
              <span className="index-mark">01</span>
              <span className="eyebrow">{eyebrow}</span>
            </Reveal>
          )}
          <Reveal delay={90}>
            <h1 className="mt-7 max-w-3xl text-[clamp(2.85rem,4.8vw,5.2rem)] leading-[0.96] tracking-[-0.035em] text-espresso">
              {title}
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-8 max-w-xl text-[1.05rem] leading-[1.8] text-cocoa/78 sm:text-lg">
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
          {reviewCta && (
            <Reveal delay={330} className="mt-7">
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
            </Reveal>
          )}
        </div>

        <Reveal delay={120} className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-[34rem] lg:mr-0">
            {/* Offset accent frame for editorial depth */}
            <div
              aria-hidden
              className="absolute -right-3 -top-3 hidden h-full w-full border border-rose/40 sm:block"
            />
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
            <div aria-hidden className="absolute -bottom-5 -left-5 h-24 w-px bg-rose/55" />
          </div>
        </Reveal>
      </Container>
      {showAwards && <RecognitionMarquee />}
    </section>
  );
}
