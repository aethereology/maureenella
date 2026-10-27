import { pageMetadata } from "@/lib/seo/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "The terms that govern use of the Maureen Ella website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Use" />
      <Container size="narrow" className="py-12">
        <div className="space-y-5 text-cocoa/90">
          <p>Last updated: October 27, 2026.</p>
          <p>
            By using this website, you agree to these terms. The content here is
            provided for general information about Maureen Ella&apos;s bridal
            hair and makeup services.
          </p>
          <h2 className="pt-2 text-2xl text-espresso">Inquiries</h2>
          <p>
            Submitting an inquiry through this site does not reserve a date or
            create a booking. Wedding dates are secured only through a separate
            signed agreement.
          </p>
          <h2 className="pt-2 text-2xl text-espresso">Content</h2>
          <p>
            Photography and other content remain the property of their respective
            creators. Please obtain permission before reproducing them.
          </p>
          <h2 className="pt-2 text-2xl text-espresso">Booking & service terms</h2>
          <p>
            Specific pricing, deposit, travel, and policy terms are provided
            directly during the inquiry and booking process.
          </p>
        </div>
      </Container>
    </>
  );
}
