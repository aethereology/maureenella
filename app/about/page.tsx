import Image from "next/image";
import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CtaButton } from "@/components/ui/CtaButton";

export const metadata = pageMetadata({
  title: "About Maureen Ella",
  description:
    "Meet Maureen Ella — the bridal hair and makeup artist behind calm, beautifully organized wedding mornings across Northeast Florida.",
  path: "/about",
  image: "/images/about/maureen.jpg",
});

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "About", path: "/about" }]} />

      <section className="bg-cream">
        <Container className="grid items-center gap-10 py-14 lg:grid-cols-2">
          <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-card lg:order-none">
            <Image
              src="/images/about/maureen.jpg"
              alt="Maureen Ella, bridal hair and makeup artist"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">About</p>
            <h1 className="mt-3 text-4xl sm:text-5xl">
              The artist behind the calm
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-cocoa/85">
              Maureen Ella is the artist behind Maureen Ella Bridal, a bridal
              hair and makeup experience based in St. Johns County, Florida.
              Known for romantic styling, glowing makeup, and calm
              wedding-morning energy, Maureen helps brides feel confident from
              the first preview to the final touch-up.
            </p>
          </div>
        </Container>
      </section>

      <Section size="narrow">
        <div className="space-y-5 text-lg leading-relaxed text-cocoa/90">
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
        </div>
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
