import Image from "next/image";
import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { StickyMobileCta } from "@/components/sections/StickyMobileCta";
import { ReviewCollection } from "@/components/sections/ReviewCollection";
import { RecognitionMarquee } from "@/components/sections/RecognitionMarquee";
import { testimonials } from "@/lib/content";
import { permissions } from "@/lib/permissions";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Bridal Hair & Makeup Reviews",
  description:
    "Read five-star Google reviews about bridal hair, makeup, elopements, photo shoots, and the client experience with Maureen Ella at The Parlor.",
  path: "/bridal/reviews",
  noindex: !permissions.testimonialsPublished,
});

export default function ReviewsPage() {
  const reviews = permissions.testimonialsPublished ? testimonials : [];
  const averageRating = reviews.length
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Bridal", path: "/bridal" },
          { name: "Reviews", path: "/bridal/reviews" },
        ]}
      />
      <section className="relative overflow-hidden border-b border-hairline bg-ivory">
        <div aria-hidden className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-rose-soft/25 blur-3xl" />
        <Container className="relative grid min-h-[42rem] items-center gap-12 py-14 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-24">
          <Reveal>
            <p className="eyebrow">Love notes from our brides</p>
            <h1 className="mt-5 max-w-xl text-[clamp(3rem,5vw,4.75rem)] leading-[0.96] tracking-[-0.035em]">
              Beautiful is the look.
              <span className="block font-normal italic text-rose-deep">Calm is the feeling.</span>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-cocoa/80">
              The best reviews are about more than hair and makeup. They&apos;re about feeling heard, cared for, and completely yourself from the first pin to the final touch.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <CtaButton href="/contact">Check My Date</CtaButton>
              <ButtonLink href="#bride-stories" variant="ghost">Read their stories</ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={120} className="relative mx-auto w-full max-w-xl pb-8 pl-7 sm:pl-14 lg:pb-12">
            <div className="relative ml-auto aspect-[4/5] w-[82%] overflow-hidden bg-oatmeal">
              <Image
                src="/images/reviews/southern-bride-197.jpg"
                alt="Bride walking down a flower-lined aisle"
                fill
                priority
                sizes="(max-width: 1024px) 75vw, 42vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-[54%] border-[10px] border-ivory bg-ivory sm:border-[14px]">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/reviews/southern-bride-37.jpg"
                  alt="Maureen applying bridal makeup beside a chair embroidered with The Parlor"
                  fill
                  sizes="(max-width: 1024px) 45vw, 22vw"
                  className="object-cover"
                />
              </div>
            </div>
            {site.reviews.google.confirmed && (
              <a
                href={site.reviews.google.value}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${averageRating.toFixed(1)} on Google. View Maureen At The Parlor on Google (opens in a new tab)`}
                className="group absolute right-0 top-5 bg-espresso px-4 py-5 text-center text-porcelain shadow-xl transition-colors hover:bg-cocoa sm:-right-5 sm:px-5"
              >
                <span aria-label={`${averageRating.toFixed(1)} out of 5 stars`} className="block text-xs tracking-[0.16em] text-champagne">★★★★★</span>
                <span className="mt-1 block font-serif text-3xl italic leading-none text-porcelain">{averageRating.toFixed(1)} on Google</span>
              </a>
            )}
          </Reveal>
        </Container>

        <RecognitionMarquee />
      </section>

      {reviews.length > 0 && (
        <section className="border-b border-hairline bg-porcelain">
          <Container>
            <ul className="grid divide-y divide-hairline sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <ProofPoint>Five-star Google reviews</ProofPoint>
              <ProofPoint>On-location hair + makeup artist</ProofPoint>
              <ProofPoint>Calm, organized care</ProofPoint>
            </ul>
          </Container>
        </section>
      )}

      <Section id="bride-stories" className="bg-porcelain">
        <SectionHeading
          eyebrow="In their own words"
          title="The moments they remember"
          intro="Explore the artistry, the experience, and the feeling brides carried with them long after the last bobby pin was placed."
        />
        <div className="mt-12">
          {reviews.length > 0 ? (
            <ReviewCollection items={reviews} />
          ) : (
            <p className="max-w-2xl text-cocoa/80">
              Reviews are being added soon. In the meantime, request availability and we&apos;ll be glad to share references relevant to your wedding.
            </p>
          )}
        </div>
        {reviews.length > 0 && site.reviews.google.confirmed && (
          <div className="mt-10 flex flex-col gap-4 border-t border-hairline pt-6 text-sm text-cocoa/70 sm:flex-row sm:items-center sm:justify-between">
            <p>Every review shown here was shared publicly on Google for Maureen At The Parlor.</p>
            <ButtonLink
              href={site.reviews.google.value}
              variant="ghost"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              Visit the Google profile
              <span className="sr-only"> (opens in a new tab)</span>
            </ButtonLink>
          </div>
        )}
      </Section>

      <section className="overflow-hidden bg-cream">
        <Container className="grid items-stretch lg:grid-cols-2">
          <Reveal className="relative min-h-[30rem] lg:min-h-[42rem]">
            <Image
              src="/images/portfolio/angeline.jpg"
              alt="Bride smiling in softly polished wedding hair and makeup"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={100} className="flex items-center px-0 py-16 sm:px-10 lg:px-16 lg:py-20">
            <div>
              <blockquote className="font-serif text-3xl italic leading-tight text-espresso sm:text-4xl">
                My wedding day look was everything I dreamed of and more. Timeless, classic, and still completely me.
              </blockquote>
              <p className="eyebrow mt-6">Inspired by Elaine&apos;s review</p>
              <div className="mt-10 border-t border-hairline pt-6">
                <p className="max-w-md leading-relaxed text-cocoa/75">
                  That balance is the heart of the experience: elevated enough for the photographs, familiar enough to feel like you.
                </p>
                <div className="mt-5">
                  <ButtonLink href="/bridal/portfolio" variant="ghost">
                    See the bridal portfolio
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {site.reviews.google.confirmed && (
        <Section size="narrow" className="text-center">
          <Reveal className="mx-auto max-w-2xl">
            <p className="eyebrow">The complete Google profile</p>
            <h2 className="mt-4 text-4xl text-espresso sm:text-5xl">
              More stories. More beautiful mornings.
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-cocoa/80">
              Visit Maureen At The Parlor on Google to explore the business profile and the latest reviews shared by clients.
            </p>
            <div className="mt-8 flex justify-center">
              <ButtonLink
                href={site.reviews.google.value}
                variant="secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Google reviews
                <span className="sr-only"> (opens in a new tab)</span>
              </ButtonLink>
            </div>
          </Reveal>
        </Section>
      )}

      <Section tone="espresso">
        <div className="grid items-end gap-9 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow">Your story starts here</p>
            <h2 className="mt-5 max-w-3xl text-4xl text-porcelain sm:text-6xl">
              A wedding morning that feels as good as it looks.
            </h2>
            <p className="mt-5 max-w-xl text-porcelain/70">Tell us your date, venue, and vision. We&apos;ll take it from there—with care.</p>
          </div>
          <div>
            <CtaButton href="/contact">Request Availability</CtaButton>
          </div>
        </div>
      </Section>

      <StickyMobileCta />
    </>
  );
}

function ProofPoint({ children }: { children: React.ReactNode }) {
  return (
    <li className="py-5 font-serif text-xl italic text-espresso sm:px-6 sm:py-7 sm:text-center sm:first:pl-0 sm:last:pr-0">
      {children}
    </li>
  );
}
