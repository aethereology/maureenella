import { site } from "@/lib/site";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

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

      {/* Affiliate disclosure — placed before any recommendation, shown even on the teaser. */}
      <Container className="pt-12 sm:pt-16">
        <aside
          aria-labelledby="affiliate-disclosure"
          className="max-w-3xl border-l-2 border-rose-deep bg-cream px-6 py-5 sm:px-8 sm:py-6"
        >
          <h2 id="affiliate-disclosure" className="text-2xl text-espresso">
            Affiliate disclosure
          </h2>
          <p className="mt-2 leading-relaxed text-cocoa">
            Some links may be affiliate links. If you purchase through them,
            Maureen Ella may earn a small commission at no extra cost to you. We
            only recommend products we genuinely believe in.
          </p>
        </aside>
      </Container>

      <Section className="pt-14! sm:pt-20!">
        <SectionHeading
          eyebrow="Coming soon"
          title="Curated categories"
          intro="Maureen's recommendations are being curated. Check back soon."
        />
        <ul className="mt-10 grid border-t border-hairline sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <li key={cat} className="border-b border-hairline py-5">
              <h3 className="font-serif text-[1.45rem] leading-tight text-espresso">{cat}</h3>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
