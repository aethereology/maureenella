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
        // Confirmed NAP lives in LocalBusinessSchema (BeautySalon) below.
      }}
    />
  );
}

/**
 * LocalBusiness markup. Renders only once phone + email are confirmed (D009);
 * the street address joins the payload once it is confirmed too.
 */
export function LocalBusinessSchema() {
  const { phone, email, address } = site.contact;
  if (!phone.confirmed || !email.confirmed || !phone.value || !email.value) {
    return null;
  }
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BeautySalon",
        "@id": `${site.baseUrl}/#business`,
        name: site.brand,
        url: site.baseUrl,
        description: site.description,
        telephone: `+1${phone.value.replace(/\D/g, "")}`,
        email: email.value,
        ...(address.confirmed && address.value
          ? {
              address: {
                "@type": "PostalAddress",
                streetAddress: "206 Ashourian Ave",
                addressLocality: "St. Augustine",
                addressRegion: "FL",
                postalCode: "32092",
                addressCountry: "US",
              },
            }
          : {}),
        areaServed: site.serviceAreas,
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "06:00",
          closes: "18:00",
        },
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
  dateModified,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const url = new URL(path, site.baseUrl).toString();

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        inLanguage: "en-US",
        ...(image ? { image: new URL(image, site.baseUrl).toString() } : {}),
        ...(datePublished ? { datePublished } : {}),
        ...(dateModified ? { dateModified } : {}),
        author: { "@type": "Person", name: "Maureen Ella" },
        publisher: {
          "@type": "Organization",
          "@id": `${site.baseUrl}/#organization`,
          name: site.brand,
          url: site.baseUrl,
        },
      }}
    />
  );
}
