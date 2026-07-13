import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { StickyMobileCta } from "@/components/sections/StickyMobileCta";
import { testimonials } from "@/lib/content";
import { permissions } from "@/lib/permissions";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Bridal Reviews",
  description:
    "What brides say about their wedding-day hair and makeup experience with Maureen Ella.",
  path: "/bridal/reviews",
  noindex: !permissions.testimonialsPublished,
});

export default function ReviewsPage() {
  const reviews = permissions.testimonialsPublished ? testimonials : [];

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Bridal", path: "/bridal" },
          { name: "Reviews", path: "/bridal/reviews" },
        ]}
      />
      <PageHeader
        eyebrow="Reviews"
        title="Calm mornings, beautiful results"
        intro="In their own words — what brides remember about working with Maureen Ella."
      />

      <Container className="py-14">
        {reviews.length > 0 ? (
          <ul className="grid gap-6 md:grid-cols-2">
            {reviews.map((t) => (
              <li
                key={t.id}
                className="rounded-card border border-hairline bg-cream p-8"
              >
                <p className="font-serif text-xl italic leading-snug text-espresso">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="mt-4 text-sm tracking-wide text-taupe-deep">
                  — {t.displayName}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-cocoa/80">
            Reviews are being added soon. In the meantime, request availability
            and we&apos;ll be glad to share references relevant to your wedding.
          </p>
        )}
      </Container>

      {site.reviews.google.confirmed && (
        <Section tone="cream" size="narrow" className="text-center">
          <div className="mx-auto max-w-2xl">
            <p
              aria-hidden
              className="text-sm tracking-[0.3em] text-rose"
            >
              ★★★★★
            </p>
            <p className="eyebrow mt-5">A little love goes a long way</p>
            <h2 className="mt-4 text-4xl text-espresso sm:text-5xl">
              Were we part of your wedding morning?
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-cocoa/80">
              Your story helps future brides choose their beauty team with
              confidence. We&apos;d be honored if you shared your experience.
            </p>
            <a
              href={site.reviews.google.value}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-3 border border-espresso bg-transparent px-7 py-3.5 text-[0.72rem] uppercase tracking-[0.18em] text-espresso transition-colors duration-300 hover:bg-espresso hover:text-porcelain focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
            >
              Leave a Google review
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                ↗
              </span>
            </a>
          </div>
        </Section>
      )}

      <Section tone="espresso" className="text-center">
        <h2 className="mx-auto max-w-2xl text-4xl text-porcelain">
          Your wedding morning, beautifully handled
        </h2>
        <div className="mt-8 flex justify-center">
          <CtaButton href="/contact">Request Availability</CtaButton>
        </div>
      </Section>

      <StickyMobileCta />
    </>
  );
}
