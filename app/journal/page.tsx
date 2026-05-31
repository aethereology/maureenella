import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { getArticles, isPublished } from "@/content/journal";
import { categoryLabel } from "@/lib/content";

export const metadata = pageMetadata({
  title: "Journal",
  description:
    "Bridal beauty notes, prep guides, real weddings, and favorites from Maureen Ella.",
  path: "/journal",
});

export default function JournalPage() {
  const articles = getArticles();
  const published = articles.filter(isPublished);
  const upcoming = articles.filter((a) => !isPublished(a));

  return (
    <>
      <Breadcrumbs items={[{ name: "Journal", path: "/journal" }]} />
      <PageHeader
        eyebrow="Journal"
        title="Bridal beauty notes & guides"
        intro="Practical, honest writing on bridal prep, wedding-morning beauty, and the details that help your day flow."
      />

      <Container className="py-14">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {published.map((post) => (
            <Link
              key={post.slug}
              href={`/journal/${post.slug}`}
              className="group block overflow-hidden rounded-card border border-hairline bg-cream"
            >
              {post.image && (
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6">
                <p className="eyebrow">{categoryLabel(post.category)}</p>
                <h2 className="mt-2 font-serif text-xl text-espresso">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-cocoa/80">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>

        {upcoming.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl text-espresso">Coming soon</h2>
            <p className="mt-2 text-sm text-cocoa/70">
              More stories and guides are on the way.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((post) => (
                <li
                  key={post.slug}
                  className="rounded-card border border-dashed border-taupe bg-ivory p-5"
                >
                  <p className="eyebrow">{categoryLabel(post.category)}</p>
                  <p className="mt-2 font-serif text-lg text-cocoa">
                    {post.title}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </>
  );
}
