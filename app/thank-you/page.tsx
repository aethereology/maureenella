import { pageMetadata } from "@/lib/seo/metadata";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = pageMetadata({
  title: "Thank You",
  description: "Your inquiry has been received.",
  path: "/thank-you",
  noindex: true,
});

export default function ThankYouPage() {
  return (
    <Section size="narrow" className="text-center">
      <p className="eyebrow">Inquiry received</p>
      <h1 className="mt-3 text-3xl sm:text-4xl">Thank you</h1>
      <p className="mx-auto mt-5 max-w-xl text-cocoa/80">
        Your details have been received. We&apos;ll review your date, service
        count, location, and timeline needs before sending next steps. In the
        meantime, feel free to explore the portfolio and prep guides.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/bridal/portfolio" variant="secondary">
          View Portfolio
        </ButtonLink>
        <ButtonLink href="/bridal/prep-guides" variant="ghost">
          Read the Prep Guides
        </ButtonLink>
      </div>
    </Section>
  );
}
