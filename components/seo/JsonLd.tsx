import { site } from "@/lib/site";

/** Renders a JSON-LD <script> tag from a plain object. */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Schema is build-time/static and contains no user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: site.brand,
        url: site.baseUrl,
        description: site.description,
        areaServed: site.serviceAreas,
        // NAP (phone/email/address) intentionally omitted until confirmed.
        // LocalBusiness/BeautySalon schema added only after NAP is confirmed.
      }}
    />
  );
}

export function WebsiteSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: site.brand,
        url: site.baseUrl,
      }}
    />
  );
}

export function ServiceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: name,
        name,
        description,
        url: new URL(path, site.baseUrl).toString(),
        provider: { "@type": "Organization", name: site.brand },
        areaServed: site.serviceAreas,
      }}
    />
  );
}

export function FaqSchema({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  if (faqs.length === 0) return null;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: new URL(item.path, site.baseUrl).toString(),
        })),
      }}
    />
  );
}

export function ArticleSchema({
  title,
  description,
  path,
  image,
  datePublished,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url: new URL(path, site.baseUrl).toString(),
        ...(image ? { image: new URL(image, site.baseUrl).toString() } : {}),
        ...(datePublished ? { datePublished } : {}),
        author: { "@type": "Organization", name: site.brand },
        publisher: { "@type": "Organization", name: site.brand },
      }}
    />
  );
}
