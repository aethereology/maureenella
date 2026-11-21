import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { StickyMobileCta } from "@/components/sections/StickyMobileCta";
import { PrintButton } from "@/components/journal/PrintButton";
import { PrintStyles } from "@/components/journal/PrintStyles";
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

  const otherGuides = prepGuides.filter((g) => g.slug !== guide.slug);

  return (
    <>
      <PrintStyles />
      <Breadcrumbs
        items={[
          { name: "Bridal", path: "/bridal" },
          { name: "Prep Guides", path: "/bridal/prep-guides" },
          { name: guide.title, path: `/bridal/prep-guides/${guide.slug}` },
        ]}
      />

      <article>
        <header className="relative overflow-hidden bg-ivory print:bg-transparent">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 -top-56 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(216,191,156,0.38),rgba(216,191,156,0)_68%)] print:hidden"
          />
          <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-16 print:block print:p-0">
            <div>
              <p className="eyebrow">Bridal prep guide</p>
              <h1 className="mt-3 text-[clamp(2.4rem,5vw,3.6rem)] leading-[1.02] tracking-[-0.03em]">
                {guide.title}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-cocoa/85">{guide.intro}</p>
              <div className="mt-7">
                <PrintButton />
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-cream print:hidden">
              <Image
                src={guide.image}
                alt={guide.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover"
              />
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[44rem] px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-16 print:max-w-none print:p-0 print:pt-6">
          <div className="space-y-12 print:space-y-7">
            {guide.sections.map((section) => {
              const headingId = `${guide.slug}-${section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
              return (
                <section key={section.heading} aria-labelledby={headingId}>
                  <h2
                    id={headingId}
                    className="border-b border-hairline pb-3 text-[clamp(1.7rem,3vw,2.2rem)] leading-[1.08] tracking-[-0.02em] text-espresso"
                  >
                    {section.heading}
                  </h2>
                  {section.intro && (
                    <p className="mt-4 font-serif text-[1.2rem] italic leading-snug text-taupe-ink">
                      {section.intro}
                    </p>
                  )}
                  <ul className="mt-2 divide-y divide-hairline print:divide-y-0">
                    {section.checklist.map((item) => (
                      <li
                        key={item}
                        className="flex gap-4 py-4 text-[1.0625rem] leading-[1.65] text-cocoa sm:text-[1.125rem] print:py-1.5"
                      >
                        <span
                          aria-hidden
                          data-print-box=""
                          className="mt-[0.3em] h-[1.05rem] w-[1.05rem] shrink-0 border border-taupe-deep"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>

          <p className="mt-10 hidden text-sm print:block">
            {guide.title} · {site.brand} · {site.domain}/bridal/prep-guides/{guide.slug}
          </p>

          {otherGuides.length > 0 && (
            <nav aria-labelledby="more-guides-heading" className="mt-16 print:hidden">
              <h2 id="more-guides-heading" className="eyebrow">
                More prep guides
              </h2>
              <ul className="mt-3 divide-y divide-hairline border-y border-hairline">
                {otherGuides.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/bridal/prep-guides/${g.slug}`} className="group block py-5">
                      <span className="block font-serif text-[1.35rem] leading-tight text-espresso transition-colors duration-300 group-hover:text-rose-deep">
                        {g.title}
                      </span>
                      <span className="mt-1.5 block text-[0.95rem] leading-relaxed text-cocoa/80">
                        {g.description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </article>

      <Section tone="espresso" className="text-center print:hidden">
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

      <div className="print:hidden">
        <StickyMobileCta />
      </div>
    </>
  );
}
