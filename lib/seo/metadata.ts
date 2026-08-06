import type { Metadata } from "next";
import { site } from "@/lib/site";

type PageMetaInput = {
  title: string;
  description: string;
  /** Path beginning with "/" — used for canonical + OG url. */
  path: string;
  /** Optional absolute or /public-relative OG image. */
  image?: string;
  /** Describes the social image when it carries editorial meaning. */
  imageAlt?: string;
  noindex?: boolean;
};

/**
 * Build per-route metadata with canonical URL, Open Graph, and Twitter cards.
 * Title is suffixed with the brand unless it already contains it.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = "/images/og-default.jpg",
  imageAlt,
  noindex = false,
}: PageMetaInput): Metadata {
  const url = new URL(path, site.baseUrl).toString();
  const fullTitle = title.includes(site.brand)
    ? title
    : `${title} | ${site.brand}`;

  return {
    // `absolute` bypasses the root layout's title template so the brand
    // suffix isn't applied twice.
    title: { absolute: fullTitle },
    description,
    // A canonical for a page crawlers are told to ignore is meaningless —
    // and for /pricing/[token] it would point at the un-tokened "/pricing"
    // path, which 404s. Omit it whenever the page is noindex.
    alternates: noindex ? undefined : { canonical: url },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      siteName: site.brand,
      title: fullTitle,
      description,
      // Same reasoning as the canonical above: for /pricing/[token] this
      // would be the un-tokened "/pricing" path, which 404s — omit it rather
      // than advertise a dead URL.
      ...(noindex ? {} : { url }),
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt ?? title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
