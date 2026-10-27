import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { StickyMobileCta } from "@/components/sections/StickyMobileCta";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { FaqSchema } from "@/components/seo/JsonLd";
import { faqs } from "@/lib/content";

export const metadata = pageMetadata({
  title: "Bridal FAQ",
  description:
    "Answers to common questions about booking, previews, timelines, travel, and touch-ups for wedding-day hair and makeup with Maureen Ella.",
  path: "/bridal/faq",
});

export default function FaqPage() {
  return (
    <>
      {/* Schema mirrors the visible answers exactly (Google requirement). */}
      <FaqSchema
        faqs={faqs.map((f) => ({ question: f.question, answer: f.answer }))}
      />
      <Breadcrumbs
        items={[
          { name: "Bridal", path: "/bridal" },
          { name: "FAQ", path: "/bridal/faq" },
        ]}
      />
      <PageHeader
        eyebrow="FAQ"
        title="Questions, answered clearly"
        intro="A few of the things brides ask most. Have something specific? Add it to your inquiry and we'll cover it."
      />

      <Container size="narrow" className="py-14">
        <FaqAccordion faqs={faqs} />
      </Container>

      <Section tone="espresso" className="text-center">
        <h2 className="mx-auto max-w-2xl text-4xl text-porcelain">
          Still have a question?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-porcelain/80">
          Send it along with your wedding details and we&apos;ll get back to you.
        </p>
        <div className="mt-8 flex justify-center">
          <CtaButton href="/contact">Request Availability</CtaButton>
        </div>
      </Section>

      <StickyMobileCta />
    </>
  );
}
