import Image from "next/image";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { HomeReviews } from "@/components/sections/HomeReviews";
import { StickyMobileCta } from "@/components/sections/StickyMobileCta";
import { CtaButton } from "@/components/ui/CtaButton";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceSchema } from "@/components/seo/JsonLd";
import Link from "next/link";
import { featuredGallery } from "@/content/gallery";
import { faqsByCategory } from "@/lib/content";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { locations } from "@/content/locations";
import { permissions } from "@/lib/permissions";
import { Hero } from "@/components/sections/Hero";

export const metadata = pageMetadata({
  title: "Bridal Hair & Makeup",
  description:
    "On-location bridal hair and makeup for weddings, elopements, and destination celebrations across St. Augustine, Jacksonville, Palm Coast, and Northeast Florida.",
  path: "/bridal",
  image: "/images/hero/bridal-hero.jpg",
});

export default function BridalPage() {
  const faqs = faqsByCategory().slice(0, 4);
  const portfolio = permissions.portfolioPublished ? featuredGallery : [];

  return (
    <>
      <ServiceSchema
        name="Bridal Hair and Makeup"
        description="On-location wedding-day bridal hair and makeup services for brides, bridal parties, and guests."
        path="/bridal"
      />
      <Breadcrumbs items={[{ name: "Bridal", path: "/bridal" }]} />

      <Hero
        eyebrow="Maureen Ella Bridal"
        title="Wedding-day hair & makeup, beautifully organized"
        subtitle="Whether you are getting ready in a St. Augustine bridal suite, a Jacksonville venue, a Palm Coast resort, or a private home, the experience is designed to be organized, warm, and beautifully personal."
        image="/images/hero/bridal-hero.jpg"
        imageAlt="Bride with romantic bridal hair and makeup on her wedding morning"
        primaryCta={site.cta.primary}
        secondaryCta={{ label: "View the portfolio", href: "/bridal/portfolio" }}
        priority
      />

      {/* Service area */}
      <Section size="narrow" className="text-center">
        <p className="eyebrow">Where we serve</p>
        <h2 className="mt-3 text-3xl">On-location across Northeast Florida</h2>
        <p className="mx-auto mt-4 max-w-2xl text-cocoa/80">
          {site.serviceAreas.join(" · ")}. Travel beyond these areas may be
          available for destination weddings — share your details and we&apos;ll
          let you know.
        </p>
      </Section>

      <HomeReviews />

      {/* Services */}
      <Section tone="cream">
        <SectionHeading eyebrow="Services" title="What we offer" />
        <div className="mt-10">
          <ServiceCards />
        </div>
        <div className="mt-10">
          <ButtonLink href="/bridal/services" variant="secondary">
            See full service details
          </ButtonLink>
        </div>
      </Section>

      {portfolio.length > 0 && (
        <Section>
          <SectionHeading eyebrow="Portfolio" title="Recent bridal work" />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {portfolio.map((item) => (
              <div
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
              </div>
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href="/bridal/portfolio" variant="ghost">
              View full portfolio →
            </ButtonLink>
          </div>
        </Section>
      )}

      {/* Process */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="The experience"
          title="A calm, guided wedding-day process"
        />
        <div className="mt-10">
          <ProcessSteps />
        </div>
      </Section>

      {/* Areas we serve — internal links to location pages */}
      <Section size="narrow">
        <SectionHeading
          eyebrow="Areas we serve"
          title="On-location across Northeast Florida"
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {locations.map((loc) => (
            <li key={loc.slug}>
              <Link
                href={`/bridal/${loc.slug}`}
                className="flex items-center justify-between rounded-card border border-hairline bg-cream px-6 py-5 transition-colors hover:bg-oatmeal/40"
              >
                <span className="font-serif text-lg text-espresso">
                  {loc.city}
                </span>
                <span aria-hidden className="text-taupe-deep">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
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

      {/* CTA */}
      <Section tone="espresso" className="text-center">
        <h2 className="mx-auto max-w-2xl text-4xl text-porcelain">
          Start your bridal inquiry
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-porcelain/80">
          Tell us about your wedding day and we&apos;ll check availability and
          send next steps.
        </p>
        <div className="mt-8 flex justify-center">
          <CtaButton href="/contact">Request Availability</CtaButton>
        </div>
      </Section>

      <StickyMobileCta />
    </>
  );
}
