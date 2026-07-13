import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { Hero } from "@/components/sections/Hero";
import { HomeReviews } from "@/components/sections/HomeReviews";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import { ButtonLink } from "@/components/ui/Button";
import { featuredGallery } from "@/content/gallery";
import { getArticles, isPublished } from "@/content/journal";
import { categoryLabel } from "@/lib/content";
import { permissions } from "@/lib/permissions";

export const metadata = pageMetadata({
  title: "St. Augustine Bridal Hair & Makeup",
  description: site.description,
  path: "/",
  image: "/images/hero/home-hero-final-2.jpg",
});

export default function HomePage() {
  const journal = getArticles().filter(isPublished).slice(0, 3);
  const portfolio = permissions.portfolioPublished
    ? featuredGallery.slice(0, 5)
    : [];

  return (
    <>
      <Hero
        eyebrow="Maureen Ella Bridal"
        title="Bridal hair & makeup for a calm, beautiful wedding morning"
        subtitle="Romantic, polished, long-lasting bridal beauty for weddings, elopements, and destination celebrations across St. Augustine, Jacksonville, Palm Coast, and Northeast Florida."
        image="/images/hero/home-hero-final-2.jpg"
        imageAlt="Bride and groom embracing beside a vintage car outside their wedding venue"
        primaryCta={site.cta.primary}
        secondaryCta={{ label: "View the portfolio", href: "/bridal/portfolio" }}
        reviewCta={
          site.reviews.google.confirmed
            ? {
                label: "Already a Maureen Ella bride? Leave a Google review",
                href: site.reviews.google.value,
              }
            : undefined
        }
        priority
      />

      <HomeReviews />

      {/* Manifesto intro */}
      <Section size="narrow" className="text-center">
        <Reveal>
          <p className="eyebrow">A premium bridal beauty experience</p>
          <p className="mx-auto mt-7 max-w-3xl font-serif text-3xl leading-[1.15] text-espresso sm:text-[2.6rem]">
            Your wedding morning should feel relaxed, organized, and full of the
            moments you want to remember.
          </p>
          <p className="mx-auto mt-7 max-w-xl text-cocoa/80">
            Maureen creates bridal hair and makeup with a calm presence, an
            editorial eye, and the timeline awareness needed to help your day flow
            beautifully — from your preview to the final touch-up.
          </p>
        </Reveal>
      </Section>

      {/* Services */}
      <Section tone="ivory">
        <SectionHeading
          index="02"
          eyebrow="What we offer"
          title="Bridal services designed around your day"
          intro="Wedding-day hair and makeup for brides, bridal parties, guests, elopements, and destination celebrations."
        />
        <div className="mt-12">
          <ServiceCards />
        </div>
        <Reveal className="mt-10">
          <ButtonLink href="/bridal/services" variant="ghost">
            Explore bridal services
          </ButtonLink>
        </Reveal>
      </Section>

      {portfolio.length > 0 && (
        <Section>
          <SectionHeading index="03" eyebrow="Portfolio" title="Real brides, real wedding mornings" />
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {portfolio.slice(0, 4).map((item, i) => (
              <Reveal
                as="figure"
                key={item.src}
                delay={i * 80}
                className={clsxFeatured(i)}
              >
                <div className="img-zoom relative h-full w-full overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <ButtonLink href="/bridal/portfolio" variant="ghost">
              View the full portfolio
            </ButtonLink>
          </Reveal>
        </Section>
      )}

      {/* Process */}
      <Section tone="cream">
        <SectionHeading index="04" eyebrow="How it works" title="A calm, guided process from inquiry to wedding morning" />
        <div className="mt-14">
          <ProcessSteps />
        </div>
      </Section>

      {/* Prep guides — editorial split */}
      <Section>
        <div className="grid items-stretch gap-10 lg:grid-cols-2">
          <Reveal className="flex flex-col justify-center">
            <span className="eyebrow">Free prep guides</span>
            <h2 className="mt-5 text-4xl sm:text-5xl">Arrive confident and ready</h2>
            <p className="mt-5 max-w-md text-cocoa/80">
              Our bridal prep guides help you prepare your hair, skin, and
              wedding-morning timeline before your preview and the big day.
            </p>
            <div className="mt-8">
              <ButtonLink href="/bridal/prep-guides" variant="secondary">
                Read the prep guides
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={120} as="figure" className="img-zoom relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/guides/hair-prep.jpg"
              alt="Bride preparing for her wedding morning"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </Section>

      {/* Journal preview */}
      {journal.length > 0 && (
        <Section tone="ivory">
          <SectionHeading index="05" eyebrow="Journal" title="Bridal beauty notes & guides" />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {journal.map((post, i) => (
              <Reveal as="article" key={post.slug} delay={i * 90}>
                <Link href={`/journal/${post.slug}`} className="group block">
                  {post.image && (
                    <div className="img-zoom relative aspect-[3/2] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <p className="eyebrow mt-5">{categoryLabel(post.category)}</p>
                  <h3 className="mt-2.5 font-serif text-2xl leading-snug text-espresso transition-colors group-hover:text-rose">
                    {post.title}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* Education teaser */}
      {site.sections.education !== "hidden" && (
        <Section size="narrow" className="text-center">
          <Reveal>
            <p className="eyebrow">For bridal beauty professionals</p>
            <h2 className="mt-5 text-4xl sm:text-5xl">Maureen Ella Education</h2>
            <p className="mx-auto mt-5 max-w-xl text-cocoa/80">
              Mentorship and resources for bridal hair and makeup artists who want
              stronger systems, better client experience, and confident pricing.
            </p>
            <div className="mt-8 flex justify-center">
              <ButtonLink href="/education" variant="ghost">
                Join the education waitlist
              </ButtonLink>
            </div>
          </Reveal>
        </Section>
      )}

      {/* Final CTA */}
      <Section tone="espresso" className="text-center">
        <Reveal>
          <p className="eyebrow text-champagne">Ready when you are</p>
          <h2 className="mx-auto mt-5 max-w-2xl text-4xl text-porcelain sm:text-6xl">
            Let&apos;s check availability for your wedding date
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-porcelain/75">
            Share a few details about your day and we&apos;ll be in touch with
            service options and next steps.
          </p>
          <div className="mt-9 flex justify-center">
            <CtaButton href="/contact">Request availability</CtaButton>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

/** Varied aspect ratios for the editorial portfolio preview. */
function clsxFeatured(i: number): string {
  const ratios = [
    "aspect-[3/4]",
    "aspect-[3/4] lg:mt-10",
    "aspect-[3/4]",
    "aspect-[3/4] lg:mt-10",
  ];
  return ratios[i] ?? "aspect-[3/4]";
}
