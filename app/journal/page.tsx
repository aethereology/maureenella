import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { getArticles, isPublished, type Article } from "@/content/journal";
import { categoryLabel } from "@/lib/content";

export const metadata = pageMetadata({
  title: "Journal",
  description:
    "Bridal beauty notes, prep guides, real weddings, and favorites from Maureen Ella.",
  path: "/journal",
});

type JournalPageProps = {
  searchParams: Promise<{ category?: string | string[] }>;
};

function articleTime(article: Article) {
  if (!article.datePublished) return "From the archive";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${article.datePublished}T00:00:00Z`));
}

export default async function JournalPage({ searchParams }: JournalPageProps) {
  const articles = getArticles();
  const published = articles
    .filter(isPublished)
    .sort((a, b) => (b.datePublished ?? "").localeCompare(a.datePublished ?? ""));
  const upcoming = articles.filter((article) => !isPublished(article));
  const categories = Array.from(new Set(published.map((article) => article.category)));
  const requestedCategory = (await searchParams).category;
  const selectedCategory =
    typeof requestedCategory === "string" && categories.includes(requestedCategory)
      ? requestedCategory
      : "all";
  const visibleArticles =
    selectedCategory === "all"
      ? published
      : published.filter((article) => article.category === selectedCategory);
  const latest = published.slice(0, 4);

  return (
    <>
      <Breadcrumbs items={[{ name: "Journal", path: "/journal" }]} />

      <header className="border-b border-hairline bg-ivory">
        <Container className="py-16 sm:py-24 lg:py-28" size="wide">
          <div className="flex items-center gap-4 border-t border-hairline pt-4">
            <span className="index-mark">◦</span>
            <span className="eyebrow">Notes from the beauty chair</span>
          </div>
          <h1 className="mt-8 max-w-5xl text-[clamp(3.25rem,6vw,5.75rem)] leading-[0.9] tracking-[-0.04em]">
            The Journal<span className="text-rose">.</span>
          </h1>
          <div className="mt-10 grid gap-6 border-t border-hairline pt-6 md:grid-cols-2">
            <p className="max-w-lg text-lg leading-relaxed text-cocoa/80">
              Practical, honest writing on bridal prep, wedding-morning beauty,
              and the details that help your day flow.
            </p>
            <p className="eyebrow self-end md:text-right">
              Bridal beauty · Real weddings · Favorites
            </p>
          </div>
        </Container>
      </header>

      {latest.length > 0 && (
        <section className="border-b border-hairline py-16 sm:py-20">
          <Container size="wide">
            <div className="mb-8 flex items-end justify-between gap-6">
              <h2 className="text-4xl sm:text-5xl">Latest</h2>
              <span className="eyebrow">Recently published</span>
            </div>

            <div className="grid border-l border-t border-hairline sm:grid-cols-2 lg:grid-cols-4">
              {latest.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/journal/${post.slug}`}
                  className="group flex min-h-full flex-col border-b border-r border-hairline bg-porcelain transition-colors hover:bg-ivory"
                >
                  <div className="flex items-center justify-between px-5 py-4">
                    <span className="index-mark">{String(index).padStart(2, "0")}</span>
                    <span className="eyebrow">{categoryLabel(post.category)}</span>
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden border-y border-hairline bg-cream">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        style={{ objectPosition: post.imagePosition }}
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center font-serif text-8xl text-taupe/30">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="text-2xl leading-[1.08] transition-colors group-hover:text-rose">
                      {post.title}
                    </h3>
                    <p className="mt-8 border-t border-hairline pt-4 text-xs uppercase tracking-[0.16em] text-cocoa/60">
                      {articleTime(post)} · Maureen Ella
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <main className="py-16 sm:py-24">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <div>
              <p className="eyebrow">The archive</p>
              <h2 className="mt-4 text-5xl sm:text-6xl">All stories</h2>
              <p className="mt-5 max-w-sm text-cocoa/70">
                Browse every guide, favorite, and real-wedding story, or choose a
                collection below.
              </p>
              <p className="mt-8 border-y border-hairline py-4 text-xs uppercase tracking-[0.18em] text-cocoa/60">
                {published.length} posts · {categories.length} collections
              </p>
            </div>

            <div>
              <nav aria-label="Filter journal stories" className="flex flex-wrap gap-x-6 gap-y-3 border-b border-hairline pb-6">
                <Link
                  href="/journal#stories"
                  aria-current={selectedCategory === "all" ? "page" : undefined}
                  className={`text-xs uppercase tracking-[0.2em] transition-colors hover:text-rose ${
                    selectedCategory === "all" ? "text-espresso" : "text-cocoa/50"
                  }`}
                >
                  All <span className="text-rose">[{published.length}]</span>
                </Link>
                {categories.map((category) => {
                  const count = published.filter((post) => post.category === category).length;
                  return (
                    <Link
                      key={category}
                      href={`/journal?category=${category}#stories`}
                      aria-current={selectedCategory === category ? "page" : undefined}
                      className={`text-xs uppercase tracking-[0.2em] transition-colors hover:text-rose ${
                        selectedCategory === category ? "text-espresso" : "text-cocoa/50"
                      }`}
                    >
                      {categoryLabel(category)} <span className="text-rose">[{count}]</span>
                    </Link>
                  );
                })}
              </nav>

              <div id="stories" className="scroll-mt-24">
                {visibleArticles.map((post, index) => (
                  <Link
                    key={post.slug}
                    href={`/journal/${post.slug}`}
                    className="group grid gap-5 border-b border-hairline py-7 sm:grid-cols-[8rem_minmax(0,1fr)_9rem] sm:items-center"
                  >
                    <div className="text-xs uppercase leading-relaxed tracking-[0.14em] text-cocoa/55">
                      <p>{articleTime(post)}</p>
                      <p className="mt-1 text-taupe-deep">{categoryLabel(post.category)}</p>
                    </div>
                    <div>
                      <span className="index-mark">{String(index + 1).padStart(2, "0")}</span>
                      <h3 className="mt-2 text-2xl leading-[1.08] transition-colors group-hover:text-rose sm:text-3xl">
                        {post.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-cocoa/70">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt=""
                          fill
                          sizes="144px"
                          style={{ objectPosition: post.imagePosition }}
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center font-serif text-5xl text-taupe/30">◦</div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {upcoming.length > 0 && (
            <section className="mt-24 border-t border-hairline pt-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
                <div>
                  <p className="eyebrow">On the desk</p>
                  <h2 className="mt-3 text-3xl">Coming soon</h2>
                </div>
                <ul className="grid border-l border-t border-hairline sm:grid-cols-2">
                  {upcoming.map((post) => (
                    <li key={post.slug} className="border-b border-r border-hairline p-5">
                      <p className="eyebrow">{categoryLabel(post.category)}</p>
                      <p className="mt-3 font-serif text-xl leading-tight text-cocoa">{post.title}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </Container>
      </main>
    </>
  );
}
