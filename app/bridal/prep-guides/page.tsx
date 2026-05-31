import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { StickyMobileCta } from "@/components/sections/StickyMobileCta";
import { prepGuides } from "@/content/prepGuides";

export const metadata = pageMetadata({
  title: "Bridal Prep Guides",
  description:
    "Free wedding-morning prep guides for hair, makeup, and your bridal preview — so you arrive confident and ready.",
  path: "/bridal/prep-guides",
});

export default function PrepGuidesPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Bridal", path: "/bridal" },
          { name: "Prep Guides", path: "/bridal/prep-guides" },
        ]}
      />
      <PageHeader
        eyebrow="Free prep guides"
        title="Arrive confident and ready"
        intro="Simple, supportive checklists to help you prepare your hair, skin, and wedding-morning timeline — before your preview and the big day."
      />

      <Container className="py-14">
        <div className="grid gap-8 md:grid-cols-3">
          {prepGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/bridal/prep-guides/${guide.slug}`}
              className="group block overflow-hidden rounded-card border border-hairline bg-cream"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={guide.image}
                  alt={guide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h2 className="font-serif text-xl text-espresso">
                  {guide.title}
                </h2>
                <p className="mt-2 text-sm text-cocoa/80">
                  {guide.description}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-espresso underline underline-offset-4">
                  Read the guide →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>

      <Section tone="espresso" className="text-center">
        <h2 className="mx-auto max-w-2xl text-4xl text-porcelain">
          Planning your wedding-day beauty?
        </h2>
        <div className="mt-8 flex justify-center">
          <CtaButton href="/contact">Request Availability</CtaButton>
        </div>
      </Section>

      <StickyMobileCta />
    </>
  );
}
