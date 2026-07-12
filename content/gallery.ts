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
  { key: "bridesmaids", label: "Bridal Party" },
  { key: "getting-ready", label: "Getting Ready" },
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
    credit: "My Nguyen Photography",
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

  // --- Full portfolio publish (D011, 2026-07-12): 75 additional approved images ---
  {
    src: "/images/portfolio/pf-1.jpg",
    alt: "Bride with soft, romantic bridal hair and glowing natural makeup",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-10.jpg",
    alt: "Finished bridal look with polished hair and photo-ready makeup",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-12.jpg",
    alt: "Bride with an elegant styled updo and radiant wedding makeup",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-15.jpg",
    alt: "Romantic bridal waves and soft glam makeup on the wedding day",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-16.jpg",
    alt: "Bride with timeless bridal hair and makeup in Northeast Florida",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-17.jpg",
    alt: "Detailed bridal hairstyling with a soft, luminous makeup look",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-18.jpg",
    alt: "Bride photographed after hair and makeup on her wedding morning",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-19.jpg",
    alt: "Classic bridal beauty look with securely styled wedding hair",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-1caleigh-getting-ready.jpg",
    alt: "Bride Caleigh getting ready on her wedding morning",
    tags: ["getting-ready", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-1huong-michael-engagementpreview-2155.jpg",
    alt: "Huong with soft, photo-ready hair and makeup at her engagement session",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-2.jpg",
    alt: "Bride with soft, romantic bridal hair and glowing natural makeup",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-20.jpg",
    alt: "Finished bridal look with polished hair and photo-ready makeup",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-21.jpg",
    alt: "Bride with an elegant styled updo and radiant wedding makeup",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-22.jpg",
    alt: "Romantic bridal waves and soft glam makeup on the wedding day",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-23.jpg",
    alt: "Bride with timeless bridal hair and makeup in Northeast Florida",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-24.jpg",
    alt: "Detailed bridal hairstyling with a soft, luminous makeup look",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-25.jpg",
    alt: "Bride photographed after hair and makeup on her wedding morning",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-26.jpg",
    alt: "Classic bridal beauty look with securely styled wedding hair",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-27.jpg",
    alt: "Bride with soft, romantic bridal hair and glowing natural makeup",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-28.jpg",
    alt: "Finished bridal look with polished hair and photo-ready makeup",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-29.jpg",
    alt: "Bride with an elegant styled updo and radiant wedding makeup",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-30.jpg",
    alt: "Romantic bridal waves and soft glam makeup on the wedding day",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-31.jpg",
    alt: "Bride with timeless bridal hair and makeup in Northeast Florida",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-32.jpg",
    alt: "Detailed bridal hairstyling with a soft, luminous makeup look",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-34.jpg",
    alt: "Bride photographed after hair and makeup on her wedding morning",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-35.jpg",
    alt: "Classic bridal beauty look with securely styled wedding hair",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-36.jpg",
    alt: "Bride with soft, romantic bridal hair and glowing natural makeup",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-37.jpg",
    alt: "Finished bridal look with polished hair and photo-ready makeup",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-6.jpg",
    alt: "Bride with an elegant styled updo and radiant wedding makeup",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-7.jpg",
    alt: "Romantic bridal waves and soft glam makeup on the wedding day",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-8.jpg",
    alt: "Bride with timeless bridal hair and makeup in Northeast Florida",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-9.jpg",
    alt: "Detailed bridal hairstyling with a soft, luminous makeup look",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-angela.jpg",
    alt: "Bride Angela with a soft, polished bridal beauty look",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-beach-1.jpg",
    alt: "Beach bride with wind-ready hair and long-wear bridal makeup",
    tags: ["beach", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-bridesmaids-2.jpg",
    alt: "Bridesmaids with coordinated wedding-day hair and makeup",
    tags: ["bridesmaids", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-bridesmaids-4.jpg",
    alt: "Bridal party hair and makeup styled for the ceremony",
    tags: ["bridesmaids", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-bridesmaids-5.jpg",
    alt: "Bride and bridesmaids ready with finished hair and makeup",
    tags: ["bridesmaids", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-bridesmaids-6.jpg",
    alt: "Wedding party beauty looks styled on location",
    tags: ["bridesmaids", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-bridesmaids-7.jpg",
    alt: "Bridesmaids with coordinated wedding-day hair and makeup",
    tags: ["bridesmaids", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-bridesmaids-8.jpg",
    alt: "Bridal party hair and makeup styled for the ceremony",
    tags: ["bridesmaids", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-caleigh-eric-wedding-getting-ready-23.jpg",
    alt: "Bride Caleigh getting ready on her wedding morning",
    tags: ["getting-ready", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-caleigh-eric-wedding-party-54.jpg",
    alt: "Caleigh and her wedding party with finished hair and makeup",
    tags: ["bridesmaids", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-caleigh-eric-wedding-party-bridesmaids.jpg",
    alt: "Caleigh and her wedding party with finished hair and makeup",
    tags: ["bridesmaids", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-curly-blond-hairstyle-2.jpg",
    alt: "Bride embracing natural curls in a styled curly bridal look",
    tags: ["hair", "curly"],
  },
  {
    src: "/images/portfolio/pf-curly-blonde-hair-style-1.jpg",
    alt: "Defined curly bridal hairstyle with soft face-framing pieces",
    tags: ["hair", "curly"],
  },
  {
    src: "/images/portfolio/pf-curly-hairstyle-3.jpg",
    alt: "Curly blonde bridal hairstyle styled for the wedding day",
    tags: ["hair", "curly"],
  },
  {
    src: "/images/portfolio/pf-elopement-1.jpg",
    alt: "Elopement bride with effortless hair and makeup styled on location",
    tags: ["elopement", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-elopement-10.jpg",
    alt: "Intimate Florida elopement bridal look with soft styled hair",
    tags: ["elopement", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-elopement-11.jpg",
    alt: "Bride and partner at their elopement, hair and makeup by Maureen Ella",
    tags: ["elopement", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-elopement-12.jpg",
    alt: "Wind-tested elopement hairstyle and long-wear bridal makeup",
    tags: ["elopement", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-elopement-13.jpg",
    alt: "Elopement bride with a relaxed, romantic wedding-day look",
    tags: ["elopement", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-elopement-2.jpg",
    alt: "Elopement bride with effortless hair and makeup styled on location",
    tags: ["elopement", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-elopement-22.jpg",
    alt: "Intimate Florida elopement bridal look with soft styled hair",
    tags: ["elopement", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-elopement-23.jpg",
    alt: "Bride and partner at their elopement, hair and makeup by Maureen Ella",
    tags: ["elopement", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-elopement-3.jpg",
    alt: "Wind-tested elopement hairstyle and long-wear bridal makeup",
    tags: ["elopement", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-elopement-4.jpg",
    alt: "Elopement bride with a relaxed, romantic wedding-day look",
    tags: ["elopement", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-elopement-5.jpg",
    alt: "Elopement bride with effortless hair and makeup styled on location",
    tags: ["elopement", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-elopement-6.jpg",
    alt: "Intimate Florida elopement bridal look with soft styled hair",
    tags: ["elopement", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-elopement-7.jpg",
    alt: "Bride and partner at their elopement, hair and makeup by Maureen Ella",
    tags: ["elopement", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-elopement-8.jpg",
    alt: "Wind-tested elopement hairstyle and long-wear bridal makeup",
    tags: ["elopement", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-elopement-9.jpg",
    alt: "Elopement bride with a relaxed, romantic wedding-day look",
    tags: ["elopement", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-florida-saintaugustine-kckelveyryan-181.jpg",
    alt: "McKelvey and Ryan's St. Augustine beach elopement, bridal beauty by Maureen Ella",
    credit: "My Nguyen Photography",
    tags: ["beach", "elopement", "st-augustine", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-florida-saintaugustine-kckelveyryan.jpg",
    alt: "McKelvey and Ryan's St. Augustine beach elopement, bridal beauty by Maureen Ella",
    credit: "My Nguyen Photography",
    tags: ["beach", "elopement", "st-augustine", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-getting-ready-1.jpg",
    alt: "Bride getting ready on her wedding morning with hair and makeup underway",
    tags: ["getting-ready", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-getting-ready-10.jpg",
    alt: "Calm wedding-morning getting-ready moment during bridal styling",
    tags: ["getting-ready", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-getting-ready-2.jpg",
    alt: "Bridal hair styling in progress on the morning of the wedding",
    tags: ["getting-ready", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-getting-ready-3.jpg",
    alt: "Finishing touches during a bride's wedding-morning beauty session",
    tags: ["getting-ready", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-getting-ready-4.jpg",
    alt: "Bride getting ready on her wedding morning with hair and makeup underway",
    tags: ["getting-ready", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-getting-ready22.jpg",
    alt: "Calm wedding-morning getting-ready moment during bridal styling",
    tags: ["getting-ready", "hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-hailey-1.jpg",
    alt: "Bride Hailey with romantic styled hair and natural glam makeup",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-huong-michael-engagementpreview-001.jpg",
    alt: "Huong with soft, photo-ready hair and makeup at her engagement session",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-jennifer-robert-married-47.jpg",
    alt: "Bride Jennifer with timeless wedding-day hair and makeup",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-lolulamore-tuscanrosevineyard-042821-taylor-tyler-2763.jpg",
    alt: "Bride Taylor at Tuscan Rose Vineyard with romantic bridal hair and makeup",
    credit: "Lolulamore",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-lolulamore-tuscanrosevineyard-042821-taylor-tyler-7731.jpg",
    alt: "Bride Taylor at Tuscan Rose Vineyard with romantic bridal hair and makeup",
    credit: "Lolulamore",
    tags: ["hair-makeup"],
  },
  {
    src: "/images/portfolio/pf-southern-bride-magazine-1.jpg",
    alt: "Editorial bridal hair and makeup look",
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
