import Link from "next/link";
import { site } from "@/lib/site";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import {
  whoFor,
  problems,
  framework,
  mentor,
  starterChecklist,
  upcomingProducts,
} from "@/content/education";

export const metadata = pageMetadata({
  title: "Maureen Ella Education",
  description:
    "Mentorship and resources for bridal hair and makeup artists who want clearer pricing, a confident inquiry process, calmer wedding mornings, and a business built on referrals.",
  path: "/education",
});

const checklistPath = `/education/${starterChecklist.slug}`;

export default function EducationPage() {
  if (site.sections.education === "hidden") notFound();

  return (
    <>
      <Breadcrumbs items={[{ name: "Education", path: "/education" }]} />
      <PageHeader
        eyebrow="For bridal beauty professionals"
        title="Build a Bridal Beauty Business That Feels Clear, Confident & Organized"
        intro="Maureen Ella Education helps bridal hair and makeup artists build stronger systems, a better client experience, and more confidence in how they price, market, and run wedding mornings."
      />

      {/* Who it's for */}
      <Section>
        <SectionHeading
          index="01"
          eyebrow="Who it's for"
          title="Made for working bridal artists"
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {whoFor.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-card border border-hairline bg-cream p-5 text-cocoa/90"
            >
              <span aria-hidden className="mt-1 text-rose">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Problems solved */}
      <Section tone="cream">
        <SectionHeading
          index="02"
          eyebrow="What we fix"
          title="Less guesswork. More confidence."
          intro="Most bridal artists aren't short on talent — they're short on systems. These are the gaps the mentorship is built to close."
        />
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {problems.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-card border border-hairline bg-porcelain p-5 text-cocoa/90"
            >
              <span aria-hidden className="mt-1 text-rose">
                →
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* The CONFIDENT framework */}
      <Section>
        <SectionHeading
          index="03"
          eyebrow="The method"
          title="The CONFIDENT Bridal Business Method"
          intro="A simple framework for turning scattered effort into a calm, repeatable bridal business."
        />
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {framework.map((step) => (
            <li
              key={`${step.letter}-${step.title}`}
              className="rounded-card border border-hairline bg-cream p-6"
            >
              <span className="font-serif text-3xl text-rose" aria-hidden>
                {step.letter}
              </span>
              <h3 className="mt-2 text-lg text-espresso">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cocoa/80">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Mentor */}
      <Section tone="cream" size="narrow">
        <SectionHeading
          index="04"
          eyebrow={mentor.eyebrow}
          title={mentor.title}
        />
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-cocoa/85">
          {mentor.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Section>

      {/* Free lead magnet */}
      <Section size="narrow" className="text-center">
        <p className="eyebrow">Free starter resource</p>
        <h2 className="mt-3 text-3xl sm:text-4xl">{starterChecklist.title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-cocoa/80">
          {starterChecklist.description}
        </p>
        <div className="mt-8 flex justify-center">
          <CtaButton href={checklistPath} event="education_cta_click">
            Get the free checklist
          </CtaButton>
        </div>
      </Section>

      {/* What's coming */}
      <Section tone="cream">
        <SectionHeading
          index="05"
          eyebrow="What's coming"
          title="Templates, workshops & mentorship in development"
          intro="These resources are being built. Pricing and details will be shared with the waitlist first — no hype, no guarantees, just practical tools when they're ready."
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingProducts.map((product) => (
            <li
              key={product.id}
              className="rounded-card border border-hairline bg-porcelain p-6"
            >
              <span className="eyebrow text-rose">{product.levelLabel}</span>
              <h3 className="mt-2 text-lg text-espresso">{product.title}</h3>
              <p className="mt-3 text-xs uppercase tracking-[0.15em] text-cocoa/55">
                {product.statusLabel}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Waitlist */}
      <Section tone="espresso" size="narrow" className="text-center">
        <p className="eyebrow text-champagne">Join the waitlist</p>
        <h2 className="mt-3 text-3xl text-porcelain sm:text-4xl">
          Be first when the program opens
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-porcelain/80">
          Add your email to hear first when mentorship, templates, and workshops
          go live. Start with the{" "}
          <Link href={checklistPath} className="underline hover:text-champagne">
            free starter checklist
          </Link>{" "}
          today.
        </p>
        <div className="mx-auto mt-8 max-w-md">
          <WaitlistForm
            list="education-waitlist"
            cta="Join the Waitlist"
            event="education_waitlist_submit"
            showName
          />
        </div>
      </Section>
    </>
  );
}
