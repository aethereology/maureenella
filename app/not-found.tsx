import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const PATHS = [
  { href: "/bridal", label: "Bridal hair & makeup", note: "Services for brides, bridal parties, and guests" },
  { href: "/bridal/portfolio", label: "Portfolio", note: "Real brides and wedding mornings" },
  { href: "/journal", label: "Journal", note: "Prep guides, planning answers, and real weddings" },
  { href: "/bridal/faq", label: "FAQ", note: "Booking, previews, and the wedding morning" },
];

/** Branded 404 (D016): a calm way back instead of a dead end. */
export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-ivory">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-56 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(216,191,156,0.42),rgba(216,191,156,0)_68%)]"
      />
      <Container className="relative py-24 sm:py-32">
        <p className="eyebrow">Page not found</p>
        <h1 className="mt-4 max-w-3xl text-[clamp(2.6rem,5vw,4.75rem)] leading-[0.98] tracking-[-0.03em]">
          This page has wandered off, but your wedding morning is still in good hands
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-cocoa/85">
          The link may be old or mistyped. Here are the places brides usually
          look for — or check your date with Maureen directly.
        </p>

        <ul className="mt-12 grid max-w-3xl border-t border-hairline sm:grid-cols-2">
          {PATHS.map((path) => (
            <li key={path.href} className="border-b border-hairline sm:odd:border-r sm:odd:pr-8 sm:even:pl-8">
              <Link
                href={path.href}
                className="group block py-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
              >
                <span className="font-serif text-2xl text-espresso transition-colors group-hover:text-rose-deep">
                  {path.label}
                </span>
                <span className="mt-1 block text-sm text-cocoa/80">{path.note}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <CtaButton href="/contact">Request Availability</CtaButton>
        </div>
      </Container>
    </section>
  );
}
