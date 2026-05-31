import Link from "next/link";
import navigation from "@/seed/navigation.json";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { locations } from "@/content/locations";

export function SiteFooter() {
  const year = 2026; // static build; update annually or derive at request time

  return (
    <footer className="border-t border-hairline bg-ivory">
      <Container className="py-16 sm:py-20">
        {/* Oversized wordmark + CTA */}
        <div className="flex flex-col gap-8 border-b border-hairline pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="index-mark">Maureen Ella Bridal</p>
            <p className="mt-4 font-serif text-4xl leading-[1.05] text-espresso sm:text-5xl">
              Let&apos;s plan your
              <br />
              wedding morning.
            </p>
          </div>
          <Link
            href={navigation.cta.href}
            className="group inline-flex w-fit items-center gap-3 border-b border-espresso pb-1 text-[0.7rem] uppercase tracking-[0.22em] text-espresso"
          >
            {navigation.cta.label}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Columns */}
        <div className="grid gap-10 pt-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="max-w-sm text-sm leading-relaxed text-cocoa/80">
              {site.tagline}
            </p>
            <p className="mt-4 text-sm text-cocoa/70">
              Serving {site.serviceAreas.slice(0, 4).join(" · ")} &amp;
              destination weddings.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="eyebrow mb-5">Explore</h2>
            <ul className="space-y-2.5 text-sm">
              {[...navigation.primary, ...navigation.footer].map((item) => (
                <li key={item.href + item.label}>
                  <Link href={item.href} className="text-cocoa transition-colors hover:text-rose">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Service areas">
            <h2 className="eyebrow mb-5">Service areas</h2>
            <ul className="space-y-2.5 text-sm">
              {locations.map((loc) => (
                <li key={loc.slug}>
                  <Link href={`/bridal/${loc.slug}`} className="text-cocoa transition-colors hover:text-rose">
                    {loc.city}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-hairline pt-6 text-xs uppercase tracking-[0.15em] text-cocoa/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.brand}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-espresso">Privacy</Link>
            <Link href="/terms" className="hover:text-espresso">Terms</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
