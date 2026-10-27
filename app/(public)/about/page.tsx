import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
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

      <Section size="narrow">
        <Reveal className="space-y-5 border-l border-rose/40 pl-6 text-lg leading-relaxed text-cocoa/90 sm:pl-10">
          <p>
            Her work is rooted in connection. Every bride brings a different
            story, style, and vision to the chair. Maureen&apos;s role is to
            listen, guide, and create a look that feels beautiful, personal, and
            lasting.
          </p>
          <p>
            As a business owner, wife, mom, bridal artist, and mentor, Maureen
            brings both artistry and organization to her work. Her goal is not
            only to make brides look beautiful, but to help the entire beauty
            experience feel relaxed, thoughtful, and easy.
          </p>
        </Reveal>
      </Section>

      <Section tone="espresso" className="text-center">
        <h2 className="mx-auto max-w-2xl text-4xl text-porcelain">
          Let&apos;s plan your wedding morning together
        </h2>
        <div className="mt-8 flex justify-center">
          <CtaButton href="/contact">Request Availability</CtaButton>
        </div>
      </Section>
    </>
  );
}
