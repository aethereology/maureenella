import type { Metadata } from "next";
import { site } from "@/lib/site";

type PageMetaInput = {
  title: string;
  description: string;
  /** Path beginning with "/" — used for canonical + OG url. */
  path: string;
  /** Optional absolute or /public-relative OG image. */
  image?: string;
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
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      siteName: site.brand,
      title: fullTitle,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: site.brand }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
