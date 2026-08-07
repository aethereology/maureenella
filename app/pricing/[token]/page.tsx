import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo/metadata";
import { site, phoneHref } from "@/lib/site";
import { verifyPricingToken, PRICING_TOKEN_TTL_DAYS } from "@/lib/pricing-link";
import { collections, pricingIntro, goodToKnow } from "@/content/pricing";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CtaButton } from "@/components/ui/CtaButton";
import { CollectionCard } from "@/components/pricing/CollectionCard";
import { ALaCarteTable } from "@/components/pricing/ALaCarteTable";

/** Expiry must be evaluated per request, never cached. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Your Bridal Pricing Guide",
  description: "A private bridal pricing guide prepared for you.",
  path: "/pricing",
  noindex: true,
});

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "America/New_York",
});

export default async function PricingGuidePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const result = verifyPricingToken(token);

  if (!result.ok) return <ExpiredLink />;

  const { firstName, expiresAt } = result;

  return (
    <>
      <Section tone="ivory" size="narrow" className="pb-12 sm:pb-16">
        <p className="eyebrow">Private pricing guide</p>
        <h1 className="mt-5 font-serif text-[clamp(2.6rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.03em] text-espresso">
          {firstName ? `Prepared for ${firstName}` : "Bridal Collections"}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-cocoa/80">{pricingIntro}</p>
      </Section>

      <Section size="wide" className="pt-0">
        <SectionHeading index="01" eyebrow="Collections" title="Bridal glam collections" />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {collections.map((collection, i) => (
            <CollectionCard key={collection.slug} collection={collection} index={i} />
          ))}
        </div>
      </Section>

      <Section tone="ivory" size="narrow">
        <SectionHeading index="02" eyebrow="Individual services" title="À la carte" />
        <div className="mt-12">
          <ALaCarteTable />
        </div>
      </Section>

      <Section size="narrow">
        <SectionHeading index="03" eyebrow="Details" title="Good to know" />
        <ul className="mt-12 space-y-5 border-t border-hairline pt-8">
          {goodToKnow.map((note) => (
            <li key={note} className="flex gap-4 text-cocoa/85">
              <span aria-hidden className="mt-[0.7em] h-px w-5 shrink-0 bg-taupe" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="espresso" size="narrow">
        <SectionHeading
          index="04"
          eyebrow="Next step"
          title="Tell me more about your day"
          intro="Book a 30-minute consultation and we'll walk through your timeline, your party, and the collection that fits."
          invert
        />
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href={site.booking.calendly.value} variant="ghostInverse">
            Book a 30-Minute Call
          </ButtonLink>
          <ButtonLink
            href={`mailto:${site.contact.email.value}`}
            variant="ghostInverse"
            className="opacity-70 hover:opacity-100"
          >
            Or reply by email
          </ButtonLink>
        </div>
        <p className="mt-10 border-t border-porcelain/25 pt-6 text-sm text-porcelain/70">
          This pricing was prepared for you and is valid through{" "}
          {dateFormat.format(expiresAt)}. Please keep the link private.
        </p>
      </Section>
    </>
  );
}

/** Shown for expired, tampered, and malformed links alike — never a 404. */
function ExpiredLink() {
  return (
    <Section tone="ivory" size="narrow" className="min-h-[70vh]">
      <p className="eyebrow">Pricing guide</p>
      <h1 className="mt-5 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1] tracking-[-0.03em] text-espresso">
        This pricing link has expired
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-cocoa/80">
        Pricing links stay active for {PRICING_TOKEN_TTL_DAYS} days. Book a call and Maureen will send you a
        current guide, or reach out directly and she&apos;ll get a fresh link over to you.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <ButtonLink href={site.booking.calendly.value}>Book a 30-Minute Call</ButtonLink>
        <CtaButton href="/contact" variant="secondary">
          Request Availability
        </CtaButton>
      </div>
      <p className="mt-10 border-t border-hairline pt-6 text-sm text-cocoa/70">
        <Link href={`mailto:${site.contact.email.value}`} className="hover:text-espresso">
          {site.contact.email.value}
        </Link>
        {" · "}
        <Link href={phoneHref} className="hover:text-espresso">
          {site.contact.phone.value}
        </Link>
      </p>
    </Section>
  );
}
