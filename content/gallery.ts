/**
 * Curated portfolio gallery — real Maureen Ella work, photographer-credited.
 * Filter tags power /bridal/portfolio. Permission is gated by
 * permissions.portfolioPublished. Credits come from seed/portfolio.json where
 * the bride is known.
 */
export type GalleryItem = {
  src: string;
  /** Intentional, descriptive alt text (UI_DIRECTION accessibility). */
  alt: string;
  credit?: string;
  /** Filter keys — must exist in PORTFOLIO_FILTERS. */
  tags: string[];
  featured?: boolean;
};

export const PORTFOLIO_FILTERS: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "hair-makeup", label: "Hair + Makeup" },
  { key: "hair", label: "Hair Only" },
  { key: "updo", label: "Updos & Braids" },
  { key: "curly", label: "Curly Hair" },
  { key: "elopement", label: "Elopements" },
  { key: "beach", label: "Beach Weddings" },
  { key: "st-augustine", label: "St. Augustine" },
  { key: "jacksonville", label: "Jacksonville" },
];

export const gallery: GalleryItem[] = [
  {
    src: "/images/portfolio/angeline.jpg",
    alt: "Bride Angeline with soft romantic bridal hair and glowing makeup",
    credit: "Daybreak Photo Co.",
    tags: ["hair-makeup"],
    featured: true,
  },
  {
    src: "/images/portfolio/april.jpg",
    alt: "Bride April with polished bridal hair and natural makeup in St. Augustine",
    credit: "Angelita Esparar Photography",
    tags: ["hair-makeup", "st-augustine"],
    featured: true,
  },
  {
    src: "/images/portfolio/jennifer.jpg",
    alt: "Bride Jennifer with timeless bridal hair and makeup",
    tags: ["hair-makeup"],
    featured: true,
  },
  {
    src: "/images/portfolio/caleigh.jpg",
    alt: "Bride Caleigh getting ready on the wedding morning",
    tags: ["hair-makeup", "updo"],
  },
  {
    src: "/images/portfolio/kloe.jpg",
    alt: "Bride Kloe with a romantic styled look at Tuscan Rose Vineyard",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/sansone.jpg",
    alt: "Bride with soft glam bridal makeup and elegant hair",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/taylor.jpg",
    alt: "Bride Taylor with vineyard wedding bridal hair and makeup",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/beach-elopement.jpg",
    alt: "Bride with windproof beach elopement hair and makeup in St. Augustine",
    credit: "Kristinaclicks",
    tags: ["hair-makeup", "beach", "elopement", "st-augustine"],
    featured: true,
  },
  {
    src: "/images/portfolio/kristina.jpg",
    alt: "Bride Kristina with a braided bridal style",
    credit: "The Capps Co.",
    tags: ["hair", "updo"],
  },
  {
    src: "/images/portfolio/huong.jpg",
    alt: "Bride Huong with soft, photo-ready bridal beauty",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/erika.jpg",
    alt: "Bridal braid and styled hair detail",
    credit: "Daybreak Photo Co.",
    tags: ["hair", "updo"],
  },
  {
    src: "/images/portfolio/curly.jpg",
    alt: "Bride with a natural curly bridal hairstyle",
    tags: ["hair", "curly"],
    featured: true,
  },
  {
    src: "/images/portfolio/bridal-01.jpg",
    alt: "Romantic bridal hair and makeup portrait",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/bridal-02.jpg",
    alt: "Editorial bridal beauty portrait",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/bridal-03.jpg",
    alt: "Bride with polished updo and glowing makeup",
    tags: ["hair-makeup", "updo"],
  },
  {
    src: "/images/portfolio/bridal-04.jpg",
    alt: "Soft bridal waves and natural bridal makeup",
    tags: ["hair-makeup"],
  },
];

export const featuredGallery = gallery.filter((g) => g.featured);

/**
 * Images matching a filter tag, for server-rendered area pages. Falls back to
 * the featured set when a tag has too few matches, so a location page never
 * looks empty.
 */
export function galleryByTag(tag: string | null, min = 3): GalleryItem[] {
  if (!tag) return featuredGallery;
  const matches = gallery.filter((g) => g.tags.includes(tag));
  return matches.length >= min ? matches : featuredGallery;
}
