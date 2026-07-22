import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { HomeReviews } from "@/components/sections/HomeReviews";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { StickyMobileCta } from "@/components/sections/StickyMobileCta";
import { CtaButton } from "@/components/ui/CtaButton";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceSchema, FaqSchema } from "@/components/seo/JsonLd";
import { permissions } from "@/lib/permissions";
import { galleryByTag } from "@/content/gallery";
import { faqsByCategory } from "@/lib/content";
import { locations, getLocation, otherLocations } from "@/content/locations";

export function generateStaticParams() {
  return locations.map((l) => ({ area: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area } = await params;
  const loc = getLocation(area);
  if (!loc) return {};
  return pageMetadata({
    title: loc.metaTitle,
    description: loc.metaDescription,
    path: `/bridal/${loc.slug}`,
    image: permissions.portfolioPublished ? loc.image : "/images/og-default.jpg",
  });
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area } = await params;
  const loc = getLocation(area);
  if (!loc) notFound();

  const images = galleryByTag(loc.portfolioTag);
  const faqs = faqsByCategory().slice(0, 4);
  const siblings = otherLocations(loc.slug);
  const showPortfolioImages = permissions.portfolioPublished;

  return (
    <>
      <ServiceSchema
        name={`Bridal Hair and Makeup in ${loc.city}`}
        description={loc.metaDescription}
        path={`/bridal/${loc.slug}`}
      />
      <FaqSchema
        faqs={faqs.map((f) => ({ question: f.question, answer: f.answer }))}
      />
      <Breadcrumbs
        items={[
          { name: "Bridal", path: "/bridal" },
          { name: loc.city, path: `/bridal/${loc.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="bg-cream">
        <div className={`mx-auto grid items-center gap-10 px-5 py-14 sm:px-8 ${
          showPortfolioImages
            ? "max-w-6xl lg:grid-cols-2"
            : "max-w-4xl"
        }`}>
          <div>
            <p className="eyebrow">Maureen Ella Bridal</p>
            <h1 className="mt-4 text-4xl leading-tight sm:text-5xl">
              {loc.heading}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-cocoa/85">{loc.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaButton href={site.cta.primary.href}>
                {site.cta.primary.label}
              </CtaButton>
              <ButtonLink href="/bridal/portfolio" variant="secondary">
                View Portfolio
              </ButtonLink>
            </div>
          </div>
          {showPortfolioImages && (
            <div className="relative aspect-[4/5] overflow-hidden rounded-card">
              <Image
                src={loc.image}
                alt={loc.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* Local intro + highlights */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5 text-lg leading-relaxed text-cocoa/90">
            {loc.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="rounded-card border border-hairline bg-cream p-7">
            <h2 className="text-xl text-espresso">What we offer in {loc.city}</h2>
            <ul className="mt-4 space-y-3">
              {loc.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-cocoa/90">
                  <span aria-hidden className="mt-1 text-rose">
                    ✓
                  </span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <HomeReviews />

      {/* Portfolio */}
      {showPortfolioImages && (
        <Section tone="cream">
          <SectionHeading
            eyebrow="Portfolio"
            title={`Bridal work near ${loc.city}`}
          />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {images.slice(0, 8).map((item) => (
              <figure
                key={item.src}
                className="relative aspect-[4/5] overflow-hidden rounded-card border border-hairline"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover"
                />
              </figure>
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href="/bridal/portfolio" variant="ghost">
              View full portfolio →
            </ButtonLink>
          </div>
        </Section>
      )}

      {/* Services */}
      <Section>
        <SectionHeading eyebrow="Services" title={`Bridal services in ${loc.city}`} />
        <div className="mt-10">
          <ServiceCards />
        </div>
      </Section>

      {/* Process */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="How it works"
          title="A calm, guided wedding-day process"
        />
        <div className="mt-10">
          <ProcessSteps />
        </div>
      </Section>

      {/* FAQ */}
      <Section size="narrow">
        <SectionHeading eyebrow="Good to know" title="Bridal FAQs" />
        <div className="mt-8">
          <FaqAccordion faqs={faqs} />
        </div>
        <div className="mt-8">
          <ButtonLink href="/bridal/faq" variant="ghost">
            Read all FAQs →
          </ButtonLink>
        </div>
      </Section>

      {/* Other areas — internal links */}
      <Section tone="cream">
        <SectionHeading eyebrow="Also serving" title="Other areas we cover" />
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {siblings.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/bridal/${s.slug}`}
                className="block rounded-card border border-hairline bg-ivory p-6 transition-colors hover:bg-cream"
              >
                <h3 className="font-serif text-lg text-espresso">{s.city}</h3>
                <span className="mt-2 inline-block text-sm text-espresso underline underline-offset-4">
                  View {s.city} bridal beauty →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* CTA */}
      <Section tone="espresso" className="text-center">
        <h2 className="mx-auto max-w-2xl text-4xl text-porcelain">
          Planning a {loc.city} wedding?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-porcelain/80">
          Share your date and details and we&apos;ll check availability and send
          next steps.
        </p>
        <div className="mt-8 flex justify-center">
          <CtaButton href="/contact">Request Availability</CtaButton>
        </div>
      </Section>

      <StickyMobileCta />
    </>
  );
}
