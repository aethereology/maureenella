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

      <Container className="py-14 sm:py-20">
        <ul className="divide-y divide-hairline border-b border-hairline">
          {prepGuides.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/bridal/prep-guides/${guide.slug}`}
                className="group grid gap-6 py-8 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] sm:gap-10 sm:py-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)_minmax(0,16rem)] lg:items-start"
              >
                <div className="img-zoom relative aspect-[3/2] overflow-hidden bg-cream">
                  <Image
                    src={guide.image}
                    alt={guide.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 320px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.05] tracking-[-0.02em] transition-colors duration-300 group-hover:text-rose-deep">
                    {guide.title}
                  </h2>
                  <p className="mt-3 max-w-xl leading-relaxed text-cocoa/85">{guide.description}</p>
                  <span className="mt-5 inline-block border-b border-espresso/35 pb-1 text-[0.95rem] font-normal text-espresso transition-colors duration-300 group-hover:border-espresso">
                    Open the checklist
                  </span>
                </div>
                <div className="sm:col-start-2 lg:col-start-auto">
                  <p className="eyebrow">What it covers</p>
                  <ul className="mt-2 space-y-1.5 text-[0.95rem] text-cocoa/85">
                    {guide.sections.map((section) => (
                      <li key={section.heading} className="flex items-baseline gap-3">
                        <span
                          aria-hidden
                          className="inline-block h-2.5 w-2.5 shrink-0 translate-y-[-0.05em] border border-taupe-deep"
                        />
                        {section.heading}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </li>
          ))}
        </ul>
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
