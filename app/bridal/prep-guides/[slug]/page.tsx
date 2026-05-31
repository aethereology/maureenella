import Image from "next/image";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { StickyMobileCta } from "@/components/sections/StickyMobileCta";
import { prepGuides, getPrepGuide } from "@/content/prepGuides";

export function generateStaticParams() {
  return prepGuides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getPrepGuide(slug);
  if (!guide) return {};
  return pageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/bridal/prep-guides/${guide.slug}`,
    image: guide.image,
  });
}

export default async function PrepGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getPrepGuide(slug);
  if (!guide) notFound();

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Bridal", path: "/bridal" },
          { name: "Prep Guides", path: "/bridal/prep-guides" },
          { name: guide.title, path: `/bridal/prep-guides/${guide.slug}` },
        ]}
      />

      <article>
        <div className="bg-cream">
          <Container size="narrow" className="py-12">
            <p className="eyebrow">Bridal prep guide</p>
            <h1 className="mt-3 text-4xl sm:text-5xl">{guide.title}</h1>
            <p className="mt-5 text-lg text-cocoa/80">{guide.intro}</p>
          </Container>
        </div>

        <Container size="narrow" className="py-12">
          <div className="relative mb-10 aspect-[3/2] overflow-hidden rounded-card">
            <Image
              src={guide.image}
              alt={guide.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>

          <div className="space-y-10">
            {guide.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl text-espresso">{section.heading}</h2>
                {section.intro && (
                  <p className="mt-2 text-cocoa/80">{section.intro}</p>
                )}
                <ul className="mt-4 space-y-2">
                  {section.checklist.map((item) => (
                    <li key={item} className="flex gap-3 text-cocoa/90">
                      <span aria-hidden className="mt-1 text-rose">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </Container>
      </article>

      <Section tone="espresso" className="text-center">
        <h2 className="mx-auto max-w-2xl text-4xl text-porcelain">
          Ready to plan your look together?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-porcelain/80">
          Book your bridal preview as part of your wedding-day experience.
        </p>
        <div className="mt-8 flex justify-center">
          <CtaButton href="/contact">Request Availability</CtaButton>
        </div>
      </Section>

      <StickyMobileCta />
    </>
  );
}
