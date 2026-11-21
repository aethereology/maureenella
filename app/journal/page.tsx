import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { JournalBrowser, type StorySummary } from "@/components/journal/JournalBrowser";
import { getArticles, isPublished, type Article } from "@/content/journal";
import { categoryLabel } from "@/lib/content";

export const metadata = pageMetadata({
  title: "Journal",
  description:
    "Bridal beauty notes, prep guides, real weddings, and favorites from Maureen Ella.",
  path: "/journal",
});

function articleTime(article: Article) {
  if (!article.datePublished) return "From the archive";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${article.datePublished}T00:00:00Z`));
}

function toSummary(article: Article): StorySummary {
  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    categoryLabel: categoryLabel(article.category),
    dateLabel: articleTime(article),
    datePublished: article.datePublished,
    image: article.image,
    imagePosition: article.imagePosition,
  };
}

export default function JournalPage() {
  const articles = getArticles();
  const published = articles
    .filter(isPublished)
    .sort((a, b) => (b.datePublished ?? "").localeCompare(a.datePublished ?? ""));
  const upcoming = articles.filter((article) => !isPublished(article));

  const counts = new Map<string, number>();
  for (const article of published) {
    counts.set(article.category, (counts.get(article.category) ?? 0) + 1);
  }
  const categories = Array.from(counts, ([value, count]) => ({
    value,
    label: categoryLabel(value),
    count,
  })).sort((a, b) => b.count - a.count);

  const featured = published[0];

  return (
    <>
      <Breadcrumbs items={[{ name: "Journal", path: "/journal" }]} />

      <PageHeader
        eyebrow="Notes from the beauty chair"
        title="The Journal"
        intro="Practical, honest writing on bridal prep, wedding-morning beauty, and the details that help your day flow."
      />

      {featured && (
        <section aria-labelledby="featured-story" className="border-b border-hairline">
          <Container size="wide" className="py-12 sm:py-16 lg:py-20">
            <Link
              href={`/journal/${featured.slug}`}
              className="group grid gap-7 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-center lg:gap-16"
            >
              <div className="img-zoom relative aspect-[4/3] overflow-hidden bg-cream lg:aspect-[5/4]">
                {featured.image && (
                  <Image
                    src={featured.image}
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 720px"
                    style={{ objectPosition: featured.imagePosition }}
                    className="object-cover"
                  />
                )}
              </div>
              <div>
                <p className="eyebrow">The latest story</p>
                <h2
                  id="featured-story"
                  className="mt-3 text-[clamp(2.1rem,4vw,3.4rem)] leading-[1.02] tracking-[-0.025em] transition-colors duration-300 group-hover:text-rose-deep"
                >
                  {featured.title}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-cocoa/85">{featured.excerpt}</p>
                <p className="mt-6 text-sm text-taupe-ink">
                  {categoryLabel(featured.category)}
                  <span aria-hidden className="mx-1.5 text-taupe">
                    ·
                  </span>
                  {featured.datePublished ? (
                    <time dateTime={featured.datePublished}>{articleTime(featured)}</time>
                  ) : (
                    articleTime(featured)
                  )}
                </p>
                <span className="mt-7 inline-block border-b border-espresso/35 pb-1 text-[0.95rem] font-normal text-espresso transition-colors duration-300 group-hover:border-espresso">
                  Read the story
                </span>
              </div>
            </Link>
          </Container>
        </section>
      )}

      <section aria-labelledby="archive-heading" className="py-14 sm:py-20">
        <Container size="wide">
          <h2 id="archive-heading" className="text-[clamp(2.25rem,4vw,3.5rem)] leading-none tracking-[-0.025em]">
            Every story
          </h2>
          <p className="mt-4 max-w-xl text-cocoa/80">
            Guides, favorites, and wedding-day notes. Choose a collection to narrow the list.
          </p>
          <div className="mt-8">
            <JournalBrowser
              stories={published.map(toSummary)}
              categories={categories}
              featuredSlug={featured?.slug}
            />
          </div>

          {upcoming.length > 0 && (
            <section
              aria-labelledby="upcoming-heading"
              className="mt-20 grid gap-8 border-t border-hairline pt-10 lg:grid-cols-[1fr_2fr]"
            >
              <div>
                <p className="eyebrow">On the desk</p>
                <h2 id="upcoming-heading" className="mt-2 text-3xl">
                  Coming soon
                </h2>
              </div>
              <ul className="divide-y divide-hairline border-y border-hairline">
                {upcoming.map((post) => (
                  <li key={post.slug} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <p className="font-serif text-xl leading-tight text-cocoa">{post.title}</p>
                    <p className="shrink-0 text-sm text-taupe-ink">{categoryLabel(post.category)}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </Container>
      </section>
    </>
  );
}
