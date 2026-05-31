import { pageMetadata } from "@/lib/seo/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Maureen Ella collects and uses information submitted through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <Container size="narrow" className="py-12">
        <div className="space-y-5 text-cocoa/90">
          {/* TEMPLATE — review with Maureen / legal counsel before launch. */}
          <p className="rounded-md bg-cream px-4 py-3 text-sm text-cocoa/70">
            This is a starter template and should be reviewed before launch.
          </p>
          <p>
            Maureen Ella respects your privacy. This policy explains what
            information we collect through this website and how we use it.
          </p>
          <h2 className="pt-2 text-2xl text-espresso">Information we collect</h2>
          <p>
            When you submit an inquiry or join a list, we collect the details
            you provide — such as your name, email, phone number, and wedding
            details — so we can respond to you. We do not sell your information.
          </p>
          <h2 className="pt-2 text-2xl text-espresso">Analytics</h2>
          <p>
            We may use privacy-conscious analytics to understand how the site is
            used and improve it. This data is aggregated and not used to
            personally identify you.
          </p>
          <h2 className="pt-2 text-2xl text-espresso">Contact</h2>
          <p>
            For any questions about your information, please reach out through
            the contact form.
          </p>
        </div>
      </Container>
    </>
  );
}
