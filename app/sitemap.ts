import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { permissions } from "@/lib/permissions";
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
    // Portfolio/reviews enter the sitemap only once their content is cleared
    // to publish (they render placeholder copy + noindex until then).
    ...(permissions.portfolioPublished ? ["/bridal/portfolio"] : []),
    ...(permissions.testimonialsPublished ? ["/bridal/reviews"] : []),
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
  const articles = getArticles().filter(isPublished);

  const pages: MetadataRoute.Sitemap = [
    ...staticPaths,
    ...areaPaths,
    ...guidePaths,
  ].map((path) => ({
      url: url(path),
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : path.startsWith("/bridal") ? 0.8 : 0.6,
    }));

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: url(`/journal/${article.slug}`),
    changeFrequency: "monthly",
    priority: article.priority === "high" ? 0.7 : 0.6,
    ...(article.dateModified || article.datePublished
      ? { lastModified: article.dateModified ?? article.datePublished }
      : {}),
  }));

  return [...pages, ...articlePages];
}
