import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { StickyMobileCta } from "@/components/sections/StickyMobileCta";
import { ReviewCollection } from "@/components/sections/ReviewCollection";
import { testimonials } from "@/lib/content";
import { permissions } from "@/lib/permissions";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Bridal Hair & Makeup Reviews",
  description:
    "Read 29 five-star Google reviews about bridal hair, makeup, elopements, photo shoots, and the client experience with Maureen Ella at The Parlor.",
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
            <div className="flex items-center gap-4 border-t border-hairline pt-4">
              <span className="index-mark">01</span>
              <span className="eyebrow">Love notes from our brides</span>
            </div>
            <h1 className="mt-7 max-w-xl text-5xl leading-[0.94] sm:text-6xl lg:text-[5.3rem]">
              Beautiful is the look.
              <span className="block font-normal italic text-rose">Calm is the feeling.</span>
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
                aria-label="View Maureen At The Parlor on Google"
                className="group absolute right-0 top-5 bg-espresso px-4 py-5 text-center text-porcelain shadow-xl transition-colors hover:bg-cocoa sm:-right-5 sm:px-5"
              >
                <span aria-label={`${averageRating.toFixed(1)} out of 5 stars`} className="block text-xs tracking-[0.16em] text-champagne">★★★★★</span>
                <span className="mt-1 block font-serif text-3xl italic leading-none text-porcelain">{averageRating.toFixed(1)} on Google</span>
                <span className="mt-2 block text-[0.58rem] uppercase tracking-[0.2em]">{reviews.length} client reviews · View profile ↗</span>
              </a>
            )}
          </Reveal>
        </Container>
      </section>

      {reviews.length > 0 && (
        <section className="border-b border-hairline bg-porcelain">
          <Container>
            <div className="grid divide-y divide-hairline py-2 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <ProofPoint number={String(reviews.length).padStart(2, "0")} label="Five-star Google reviews" />
              <ProofPoint number="01" label="On-location hair + makeup artist" />
              <ProofPoint number="∞" label="Calm, organized care" />
            </div>
          </Container>
        </section>
      )}

      <Section id="bride-stories" className="bg-porcelain">
        <SectionHeading
          index="02"
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
          <div className="mt-10 flex flex-col gap-4 border-t border-hairline pt-6 text-sm text-cocoa/65 sm:flex-row sm:items-center sm:justify-between">
            <p>All {reviews.length} five-star reviews shown here were shared publicly on Google for Maureen At The Parlor.</p>
            <a
              href={site.reviews.google.value}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-[0.68rem] uppercase tracking-[0.18em] text-espresso underline decoration-rose underline-offset-8"
            >
              Visit the Google profile ↗
            </a>
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
              <span aria-hidden className="font-serif text-7xl leading-none text-rose-soft">“</span>
              <blockquote className="-mt-3 font-serif text-3xl italic leading-tight text-espresso sm:text-4xl">
                My wedding day look was everything I dreamed of and more. Timeless, classic, and still completely me.
              </blockquote>
              <p className="mt-7 text-xs uppercase tracking-[0.2em] text-taupe-deep">Inspired by Elaine&apos;s review</p>
              <div className="mt-10 border-t border-hairline pt-6">
                <p className="max-w-md leading-relaxed text-cocoa/75">
                  That balance is the heart of the experience: elevated enough for the photographs, familiar enough to feel like you.
                </p>
                <Link href="/bridal/portfolio" className="mt-5 inline-flex text-xs uppercase tracking-[0.18em] text-espresso underline decoration-rose underline-offset-8">
                  See the bridal portfolio
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {site.reviews.google.confirmed && (
        <Section size="narrow" className="text-center">
          <Reveal className="mx-auto max-w-2xl">
            <p
              aria-hidden
              className="text-sm tracking-[0.3em] text-rose"
            >
              ★★★★★
            </p>
            <p className="eyebrow mt-5">The complete Google profile</p>
            <h2 className="mt-4 text-4xl text-espresso sm:text-5xl">
              More stories. More beautiful mornings.
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-cocoa/80">
              Visit Maureen At The Parlor on Google to explore the business profile and the latest reviews shared by clients.
            </p>
            <a
              href={site.reviews.google.value}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-3 border border-espresso bg-transparent px-7 py-3.5 text-[0.72rem] uppercase tracking-[0.18em] text-espresso transition-colors duration-300 hover:bg-espresso hover:text-porcelain focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
            >
              View Google reviews
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                ↗
              </span>
            </a>
          </Reveal>
        </Section>
      )}

      <Section tone="espresso">
        <div className="grid items-end gap-9 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow text-champagne">Your story starts here</p>
            <h2 className="mt-5 max-w-3xl text-4xl text-porcelain sm:text-6xl">
              A wedding morning that feels as good as it looks.
            </h2>
            <p className="mt-5 max-w-xl text-porcelain/70">Tell us your date, venue, and vision. We&apos;ll take it from there—with care.</p>
          </div>
          <CtaButton
            href="/contact"
            className="!bg-porcelain !text-espresso hover:!bg-champagne"
          >
            Request Availability
          </CtaButton>
        </div>
      </Section>

      <StickyMobileCta />
    </>
  );
}

function ProofPoint({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-5 px-5 py-7 first:pl-0 last:pr-0 sm:justify-center sm:px-7">
      <span className="font-serif text-4xl italic text-rose">{number}</span>
      <span className="max-w-32 text-[0.65rem] uppercase leading-relaxed tracking-[0.17em] text-cocoa/70">{label}</span>
    </div>
  );
}
