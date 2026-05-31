import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { ArticleSchema } from "@/components/seo/JsonLd";
import { getArticle, getArticles, isPublished } from "@/content/journal";
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
    title: article.title,
    description: article.excerpt,
    path: `/journal/${article.slug}`,
    image: article.image,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article || !isPublished(article)) notFound();

  return (
    <>
      <ArticleSchema
        title={article.title}
        description={article.excerpt}
        path={`/journal/${article.slug}`}
        image={article.image}
        datePublished={article.datePublished}
      />
      <Breadcrumbs
        items={[
          { name: "Journal", path: "/journal" },
          { name: article.title, path: `/journal/${article.slug}` },
        ]}
      />

      <article>
        <div className="bg-cream">
          <Container size="narrow" className="py-12">
            <p className="eyebrow">{categoryLabel(article.category)}</p>
            <h1 className="mt-3 text-4xl sm:text-5xl">{article.title}</h1>
            <p className="mt-5 text-lg text-cocoa/80">{article.excerpt}</p>
          </Container>
        </div>

        <Container size="narrow" className="py-12">
          {article.image && (
            <div className="relative mb-10 aspect-[3/2] overflow-hidden rounded-card">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          )}

          <div className="space-y-5 text-lg leading-relaxed text-cocoa/90">
            {article.body.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2 key={i} className="pt-4 text-2xl text-espresso">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "ul") {
                return (
                  <ul key={i} className="space-y-2 pl-1">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden className="mt-2 text-rose">
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return <p key={i}>{block.text}</p>;
            })}
          </div>

          <p className="mt-12 border-t border-hairline pt-6">
            <Link
              href="/journal"
              className="text-sm font-medium text-espresso underline underline-offset-4"
            >
              ← Back to the Journal
            </Link>
          </p>
        </Container>
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
