import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { StickyMobileCta } from "@/components/sections/StickyMobileCta";
import { testimonials } from "@/lib/content";
import { permissions } from "@/lib/permissions";

export const metadata = pageMetadata({
  title: "Bridal Reviews",
  description:
    "What brides say about their wedding-day hair and makeup experience with Maureen Ella.",
  path: "/bridal/reviews",
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
