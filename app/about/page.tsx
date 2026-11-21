import Image from "next/image";
import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { Hero } from "@/components/sections/Hero";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = pageMetadata({
  title: "About Maureen Ella",
  description:
    "Meet Maureen Ella — the bridal hair and makeup artist behind calm, beautifully organized wedding mornings across Northeast Florida.",
  path: "/about",
  image: "/images/about/aboutmefinal-1.jpg",
});

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "About", path: "/about" }]} />

      <Hero
        eyebrow="Meet Maureen"
        title="The artist behind the calm"
        subtitle="Maureen Ella is the artist behind a bridal hair and makeup experience rooted in romantic styling, glowing makeup, and calm wedding-morning energy."
        image="/images/about/aboutmefinal-1.jpg"
        imageAlt="Maureen Ella, bridal hair and makeup artist"
        primaryCta={site.cta.primary}
        secondaryCta={{ label: "Explore bridal services", href: "/bridal/services" }}
        priority
      />

      {/* Her story, set editorially: portrait beside the opening line. */}
      <section className="bg-porcelain py-24 sm:py-32">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal as="figure" className="mx-auto w-full max-w-[20rem] sm:max-w-md lg:col-span-5 lg:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden bg-oatmeal">
                <Image
                  src="/images/about/maureen-headshot.jpg"
                  alt="Portrait of Maureen Ella"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                />
              </div>
            </Reveal>

            <Reveal delay={80} className="lg:col-span-7">
              <h2 className="max-w-xl text-[clamp(2.5rem,4.6vw,4.25rem)] leading-[1] tracking-[-0.03em] text-espresso">
                Her work is rooted in connection.
              </h2>
              <p className="mt-8 max-w-xl text-lg leading-[1.85] text-cocoa/90">
                Every bride brings a different story, style, and vision to the
                chair. Maureen&apos;s role is to listen, guide, and create a look
                that feels beautiful, personal, and lasting.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Pull quote beside a second portrait. */}
      <section className="overflow-hidden bg-ivory py-24 sm:py-32">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
            <Reveal className="order-2 lg:order-1 lg:col-span-7">
              <p className="max-w-xl text-lg leading-[1.85] text-cocoa/90">
                As a business owner, wife, mom, bridal artist, and mentor, Maureen
                brings both artistry and organization to her work.
              </p>
              <blockquote className="mt-10 border-l border-rose-deep/50 pl-6 sm:pl-10">
                <p className="pullquote max-w-2xl text-[clamp(1.75rem,3.2vw,2.6rem)] leading-[1.22] text-espresso">
                  Her goal is not only to make brides look beautiful, but to help
                  the entire beauty experience feel relaxed, thoughtful, and easy.
                </p>
              </blockquote>
            </Reveal>

            <Reveal
              as="figure"
              delay={80}
              className="order-1 mx-auto w-full max-w-[19rem] sm:max-w-sm lg:order-2 lg:col-span-5 lg:max-w-none"
            >
              <div className="relative aspect-[2/3] overflow-hidden bg-oatmeal">
                <Image
                  src="/images/about/ML2023-full-res-12.webp"
                  alt="Maureen Ella seated on a white studio block"
                  fill
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section tone="espresso" className="text-center">
        <h2 className="mx-auto max-w-2xl text-4xl text-porcelain sm:text-5xl">
          Let&apos;s plan your wedding morning together
        </h2>
        <div className="mt-8 flex justify-center">
          <CtaButton href="/contact">Request Availability</CtaButton>
        </div>
      </Section>
    </>
  );
}
