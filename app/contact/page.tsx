import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { site, phoneHref } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Request Availability",
  description:
    "Share a few details about your wedding day so we can check availability, service fit, and next steps for bridal hair and makeup with Maureen Ella.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Request Availability", path: "/contact" }]} />
      <PageHeader
        eyebrow="Request availability"
        title="Tell us about your wedding day"
        intro="Share a few details so we can check availability, service fit, artist needs, and next steps. This inquiry does not reserve your date."
      />
      <Container size="narrow" className="py-14">
        <InquiryForm />
        {(site.contact.email.confirmed || site.contact.phone.confirmed) && (
          <div className="mt-12 border-t border-hairline pt-8">
            <h2 className="eyebrow mb-4">Prefer email or phone?</h2>
            <div className="space-y-1.5 text-sm text-cocoa">
              {site.contact.email.confirmed && site.contact.email.value && (
                <p>
                  <a
                    href={`mailto:${site.contact.email.value}`}
                    className="transition-colors hover:text-rose"
                  >
                    {site.contact.email.value}
                  </a>
                </p>
              )}
              {site.contact.phone.confirmed && site.contact.phone.value && (
                <p>
                  <a href={phoneHref} className="transition-colors hover:text-rose">
                    {site.contact.phone.value}
                  </a>
                </p>
              )}
              {site.contact.hours.confirmed && site.contact.hours.value && (
                <p className="text-cocoa/70">{site.contact.hours.value}</p>
              )}
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
