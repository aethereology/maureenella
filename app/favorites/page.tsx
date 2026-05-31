import { site } from "@/lib/site";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";

export const metadata = pageMetadata({
  title: "Bride Prep Favorites",
  description:
    "A curated collection of beauty, hair, fragrance, and styling favorites to help brides prepare for previews and wedding mornings.",
  path: "/favorites",
});

const CATEGORIES = [
  "Bridal prep favorites",
  "Hair favorites",
  "Makeup favorites",
  "Fragrance",
  "Business tools",
];

export default function FavoritesPage() {
  if (site.sections.favorites === "hidden") notFound();

  return (
    <>
      <Breadcrumbs items={[{ name: "Favorites", path: "/favorites" }]} />
      <PageHeader
        eyebrow="Favorites"
        title="Bride Prep Favorites, Curated by Maureen Ella"
        intro="A curated collection of beauty, hair, fragrance, and styling favorites to help brides prepare for previews, wedding mornings, and every celebration in between."
      />

      <Section>
        <SectionHeading eyebrow="Coming soon" title="Curated categories" />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <li
              key={cat}
              className="rounded-card border border-dashed border-taupe bg-cream p-6"
            >
              <h3 className="font-serif text-lg text-espresso">{cat}</h3>
              <p className="mt-2 text-sm text-cocoa/70">
                Maureen&apos;s recommendations are being curated. Check back soon.
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Affiliate disclosure — shown even on the teaser for transparency. */}
      <Section tone="cream" size="narrow">
        <h2 className="text-xl text-espresso">Affiliate disclosure</h2>
        <p className="mt-3 text-sm text-cocoa/80">
          Some links may be affiliate links. If you purchase through them,
          Maureen Ella may earn a small commission at no extra cost to you. We
          only recommend products we genuinely believe in.
        </p>
      </Section>
    </>
  );
}
