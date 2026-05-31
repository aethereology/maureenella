import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { ChecklistGate } from "@/components/forms/ChecklistGate";
import { starterChecklist } from "@/content/education";

export const metadata = pageMetadata({
  title: starterChecklist.title,
  description: starterChecklist.description,
  path: `/education/${starterChecklist.slug}`,
});

export default function StarterChecklistPage() {
  if (site.sections.education === "hidden") notFound();

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Education", path: "/education" },
          {
            name: "Starter Checklist",
            path: `/education/${starterChecklist.slug}`,
          },
        ]}
      />

      <article>
        <div className="bg-cream">
          <Container size="narrow" className="py-12">
            <p className="eyebrow">Free for bridal beauty pros</p>
            <h1 className="mt-3 text-4xl sm:text-5xl">
              {starterChecklist.title}
            </h1>
            <p className="mt-5 text-lg text-cocoa/80">
              {starterChecklist.intro}
            </p>
          </Container>
        </div>

        <Container size="narrow" className="py-12">
          <ChecklistGate
            sections={starterChecklist.sections}
            cta="Get the checklist"
          />
        </Container>
      </article>

      <Section tone="espresso" className="text-center">
        <h2 className="mx-auto max-w-2xl text-4xl text-porcelain">
          Want the systems behind the checklist?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-porcelain/80">
          Mentorship, templates, and workshops for bridal artists are in the
          works. Join the waitlist to hear first.
        </p>
        <div className="mt-8 flex justify-center">
          <CtaButton href="/education">Explore Maureen Ella Education</CtaButton>
        </div>
      </Section>
    </>
  );
}
