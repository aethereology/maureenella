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
          {/* TEMPLATE — review with Maureen / legal counsel before launch.
              Booking, deposit, and service terms are intentionally NOT stated
              here until confirmed (see docs/CONFIRMATION_NEEDED.md). */}
          <p className="rounded-md bg-cream px-4 py-3 text-sm text-cocoa/70">
            This is a starter template and should be reviewed before launch.
          </p>
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
            Photography and content on this site are used with permission where
            applicable and remain the property of their respective creators.
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
