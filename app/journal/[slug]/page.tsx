import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { ButtonLink } from "@/components/ui/Button";
import { ArticleSchema, FaqSchema } from "@/components/seo/JsonLd";
import { ArticleBody } from "@/components/journal/ArticleBody";
import { getArticle, getArticles, isPublished, type Article } from "@/content/journal";
import { categoryLabel } from "@/lib/content";

export function generateStaticParams() {
  return getArticles()
    .filter(isPublished)
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.metaTitle ?? article.title,
    description: article.excerpt,
    path: `/journal/${article.slug}`,
    image: article.image,
    imageAlt: article.imageAlt,
  });
}

function articleDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function readingMinutes(article: Article) {
  const words = article.body
    .map((b) => (b.type === "ul" ? b.items.join(" ") : b.text))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

/** Bridal-side collections; Education stays out of bridal reading (D003). */
const BRIDAL_SIDE = new Set([
  "bridal-prep",
  "real-weddings",
  "beauty-favorites",
  "planning-etiquette",
]);

/** Latest stories from the same collection (then the same side), skipping curated links. */
function moreStories(article: Article, limit = 3): Article[] {
  const linked = new Set((article.relatedLinks ?? []).map((l) => l.href));
  const candidates = getArticles()
    .filter(isPublished)
    .filter((a) => a.slug !== article.slug && !linked.has(`/journal/${a.slug}`))
    .filter((a) =>
      BRIDAL_SIDE.has(article.category)
        ? BRIDAL_SIDE.has(a.category)
        : a.category === article.category,
    )
    .sort((a, b) => (b.datePublished ?? "").localeCompare(a.datePublished ?? ""));
  const same = candidates.filter((a) => a.category === article.category);
  const rest = candidates.filter((a) => a.category !== article.category);
  return [...same, ...rest].slice(0, limit);
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article || !isPublished(article)) notFound();

  const more = moreStories(article);

  return (
    <>
      <ArticleSchema
        title={article.title}
        description={article.excerpt}
        path={`/journal/${article.slug}`}
        image={article.image}
        datePublished={article.datePublished}
        dateModified={article.dateModified}
      />
      <FaqSchema faqs={article.faqs ?? []} />
      <Breadcrumbs
        items={[
          { name: "Journal", path: "/journal" },
          { name: article.title, path: `/journal/${article.slug}` },
        ]}
      />

      <article>
        <header className="relative overflow-hidden bg-ivory">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 -top-56 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(216,191,156,0.38),rgba(216,191,156,0)_68%)]"
          />
          <div className="relative mx-auto max-w-[44rem] px-5 pb-12 pt-14 sm:px-8 sm:pb-16 sm:pt-20">
            <p className="eyebrow">{categoryLabel(article.category)}</p>
            <h1 className="mt-3 text-[clamp(2.4rem,5vw,3.6rem)] leading-[1.02] tracking-[-0.03em]">
              {article.title}
            </h1>
            <p className="mt-6 font-serif text-[1.35rem] leading-[1.45] text-cocoa sm:text-[1.5rem]">
              {article.excerpt}
            </p>
            <p className="mt-7 border-t border-hairline pt-4 text-sm text-taupe-ink">
              By Maureen Ella
              {article.datePublished && (
                <>
                  <span aria-hidden className="mx-2 text-taupe">
                    ·
                  </span>
                  <time dateTime={article.datePublished}>
                    {articleDate(article.datePublished)}
                  </time>
                </>
              )}
              <span aria-hidden className="mx-2 text-taupe">
                ·
              </span>
              {readingMinutes(article)} min read
            </p>
          </div>
        </header>

        {article.image && (
          <div className="mx-auto max-w-5xl sm:px-8">
            <div className="relative aspect-[4/3] overflow-hidden bg-cream sm:aspect-[16/9]">
              <Image
                src={article.image}
                alt={article.imageAlt ?? article.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                style={{ objectPosition: article.imagePosition }}
                className="object-cover"
              />
            </div>
          </div>
        )}

        <div className="mx-auto max-w-[44rem] px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-16">
          <ArticleBody blocks={article.body} />

          {article.faqs && article.faqs.length > 0 && (
            <section
              aria-labelledby="article-faq-heading"
              className="mt-16"
            >
              <h2
                id="article-faq-heading"
                className="text-[clamp(1.75rem,3.2vw,2.3rem)] leading-[1.08] tracking-[-0.02em] text-espresso"
              >
                Frequently asked questions
              </h2>
              <div className="mt-6 divide-y divide-hairline border-y border-hairline">
                {article.faqs.map((faq) => (
                  <div key={faq.question} className="py-6">
                    <h3 className="text-[1.4rem] leading-tight text-espresso">{faq.question}</h3>
                    <p className="mt-2.5 leading-[1.75] text-cocoa/90">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {article.relatedLinks && article.relatedLinks.length > 0 && (
            <nav aria-labelledby="continue-reading-heading" className="mt-16">
              <p className="eyebrow">Continue planning</p>
              <h2 id="continue-reading-heading" className="mt-2 text-3xl text-espresso">
                Helpful next steps
              </h2>
              <ul className="mt-6 divide-y divide-hairline border-y border-hairline">
                {article.relatedLinks.map((related) => (
                  <li key={related.href}>
                    <Link href={related.href} className="group block py-5">
                      <span className="block font-serif text-[1.35rem] leading-tight text-espresso transition-colors duration-300 group-hover:text-rose-deep">
                        {related.title}
                      </span>
                      <span className="mt-1.5 block text-[0.95rem] leading-relaxed text-cocoa/80">
                        {related.description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        <aside aria-labelledby="more-stories-heading" className="border-t border-hairline bg-ivory">
          <Container className="py-14 sm:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2
                id="more-stories-heading"
                className="text-[clamp(1.9rem,3.5vw,2.75rem)] leading-none"
              >
                More from the Journal
              </h2>
              <ButtonLink href="/journal" variant="ghost">
                Back to the Journal
              </ButtonLink>
            </div>
            {more.length > 0 && (
              <ul className="mt-8 grid sm:grid-cols-3 sm:gap-8">
                {more.map((story) => (
                  <li
                    key={story.slug}
                    className="border-b border-hairline last:border-b-0 sm:border-b-0"
                  >
                    <Link
                      href={`/journal/${story.slug}`}
                      className="group grid grid-cols-[5.5rem_minmax(0,1fr)] items-start gap-4 py-5 sm:block sm:py-0"
                    >
                      <div className="img-zoom relative aspect-square overflow-hidden bg-cream sm:aspect-[3/2]">
                        {story.image && (
                          <Image
                            src={story.image}
                            alt=""
                            fill
                            sizes="(max-width: 640px) 88px, 360px"
                            style={{ objectPosition: story.imagePosition }}
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="min-w-0 sm:mt-4">
                        <p className="text-[0.8rem] text-taupe-ink">
                          {categoryLabel(story.category)}
                        </p>
                        <h3 className="mt-1 text-[1.3rem] leading-[1.12] transition-colors duration-300 group-hover:text-rose-deep sm:text-[1.45rem]">
                          {story.title}
                        </h3>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Container>
        </aside>
      </article>

      <Section tone="espresso" className="text-center">
        <h2 className="mx-auto max-w-2xl text-4xl text-porcelain">
          Planning your wedding-day beauty?
        </h2>
        <div className="mt-8 flex justify-center">
          <CtaButton href="/contact">Request Availability</CtaButton>
        </div>
      </Section>
    </>
  );
}
