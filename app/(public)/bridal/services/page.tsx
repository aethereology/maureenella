import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { StickyMobileCta } from "@/components/sections/StickyMobileCta";
import { CtaButton } from "@/components/ui/CtaButton";
import { ServiceSchema } from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  title: "Bridal Services & Pricing",
  description:
    "Bridal hair, makeup, previews, and bridal party services. Share your wedding details for service options and availability tailored to your day.",
  path: "/bridal/services",
});

export default function ServicesPage() {
  return (
    <>
      <ServiceSchema
        name="Bridal Hair and Makeup Services"
        description="Bridal hair, bridal makeup, bridal preview, and bridal party hair and makeup services."
        path="/bridal/services"
      />
      <Breadcrumbs
        items={[
          { name: "Bridal", path: "/bridal" },
          { name: "Services", path: "/bridal/services" },
        ]}
      />
      <PageHeader
        eyebrow="Bridal services"
        title="Wedding-day hair & makeup, planned with care"
        intro="Maureen Ella Bridal offers wedding-day hair and makeup for brides, bridal parties, guests, elopements, and destination celebrations. Each wedding is quoted individually based on your services, party size, location, and timeline."
      />

      <Section>
        <SectionHeading eyebrow="Services" title="What's available" />
        <div className="mt-10">
          <ServiceCards />
        </div>
      </Section>

      {/* Pricing note — inquiry-only until confirmed. */}
      {!site.pricing.published && (
        <Section tone="cream" size="narrow" className="text-center">
          <p className="eyebrow">Pricing</p>
          <h2 className="mt-3 text-3xl">Tailored to your wedding day</h2>
          <p className="mx-auto mt-4 max-w-2xl text-cocoa/80">
            Because party size, services, location, and timeline vary for every
            wedding, we provide pricing and service options after you share your
            details. There&apos;s no obligation — just a clear picture of what
            your day could look like.
          </p>
          <div className="mt-7 flex justify-center">
            <CtaButton href="/contact">Request Pricing & Availability</CtaButton>
          </div>
        </Section>
      )}

      <Section>
        <SectionHeading
          eyebrow="The experience"
          title="How your wedding-day beauty comes together"
        />
        <div className="mt-10">
          <ProcessSteps />
        </div>
      </Section>

      <Section tone="espresso" className="text-center">
        <h2 className="mx-auto max-w-2xl text-4xl text-porcelain">
          Ready to plan your wedding-day look?
        </h2>
        <div className="mt-8 flex justify-center">
          <CtaButton href="/contact">Request Availability</CtaButton>
        </div>
      </Section>

      <StickyMobileCta />
    </>
  );
}
