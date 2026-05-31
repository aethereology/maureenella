import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { prepGuides } from "@/content/prepGuides";
import { getArticles, isPublished } from "@/content/journal";
import { locations } from "@/content/locations";

/** Dynamic sitemap covering all public, indexable routes. */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, site.baseUrl).toString();

  const staticPaths = [
    "/",
    "/bridal",
    "/bridal/services",
    "/bridal/portfolio",
    "/bridal/reviews",
    "/bridal/faq",
    "/bridal/prep-guides",
    "/journal",
    "/about",
    "/contact",
    ...(site.sections.education !== "hidden"
      ? ["/education", "/education/starter-checklist"]
      : []),
    ...(site.sections.favorites !== "hidden" ? ["/favorites"] : []),
    "/privacy",
    "/terms",
  ];

  const areaPaths = locations.map((l) => `/bridal/${l.slug}`);
  const guidePaths = prepGuides.map((g) => `/bridal/prep-guides/${g.slug}`);
  const articlePaths = getArticles()
    .filter(isPublished)
    .map((a) => `/journal/${a.slug}`);

  return [...staticPaths, ...areaPaths, ...guidePaths, ...articlePaths].map((path) => ({
    url: url(path),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/bridal") ? 0.8 : 0.6,
  }));
}
