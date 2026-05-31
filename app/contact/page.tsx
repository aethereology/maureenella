import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { InquiryForm } from "@/components/forms/InquiryForm";

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
      </Container>
    </>
  );
}
