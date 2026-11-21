import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { Section } from "@/components/ui/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { StickyMobileCta } from "@/components/sections/StickyMobileCta";
import { permissions } from "@/lib/permissions";

export const metadata = pageMetadata({
  title: "Bridal Portfolio",
  description:
    "Real bridal hair and makeup work by Maureen Ella — soft updos, romantic waves, braids, curly bridal hair, beach elopements, and glowing bridal makeup.",
  path: "/bridal/portfolio",
  noindex: !permissions.portfolioPublished,
});

export default function PortfolioPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Bridal", path: "/bridal" },
          { name: "Portfolio", path: "/bridal/portfolio" },
        ]}
      />
      <PageHeader
        eyebrow="Portfolio"
        title="Real brides, real wedding mornings"
        intro="A selection of bridal hair and makeup from weddings and elopements across Northeast Florida. Photographer credits are noted where available."
      />

      <Container className="py-12">
        <PortfolioGrid />
      </Container>

      <Section tone="espresso" className="text-center">
        <h2 className="mx-auto max-w-2xl text-4xl text-porcelain">
          Love what you see?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-porcelain/80">
          Share your wedding date and we&apos;ll send recent work relevant to
          your vision, plus availability.
        </p>
        <div className="mt-8 flex justify-center">
          <CtaButton href="/contact">Request Availability</CtaButton>
        </div>
      </Section>

      <StickyMobileCta />
    </>
  );
}
