import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/thank-you", "/pricing", "/unsubscribe", "/api/"],
    },
    sitemap: new URL("/sitemap.xml", site.baseUrl).toString(),
  };
}
