import Link from "next/link";
import Image from "next/image";
import navigation from "@/seed/navigation.json";
import { site, phoneHref } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { locations } from "@/content/locations";

const footerBadges = [
  {
    src: "/images/badges/maureenbadge1.png",
    alt: "Premier Bride Top 3 Best Wedding Pro",
  },
  {
    src: "/images/badges/maureenbadge2.png",
    alt: "Southern Bride recognition",
  },
  {
    src: "/images/badges/maureenbadge3.png",
    alt: "Styled Challenge Trendsetter Award",
  },
  {
    src: "/images/badges/maureenbadge4.png",
    alt: "Styled Challenge Best Design Award",
  },
  {
    src: "/images/badges/maureenbadge5.png",
    alt: "Simply Eloped Top Vendor",
  },
];

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
            <div className="mt-6 space-y-1.5 text-sm">
              {site.contact.email.confirmed && site.contact.email.value && (
                <p>
                  <a
                    href={`mailto:${site.contact.email.value}`}
                    className="text-cocoa transition-colors hover:text-rose"
                  >
                    {site.contact.email.value}
                  </a>
                </p>
              )}
              {site.contact.phone.confirmed && site.contact.phone.value && (
                <p>
                  <a href={phoneHref} className="text-cocoa transition-colors hover:text-rose">
                    {site.contact.phone.value}
                  </a>
                </p>
              )}
              {site.contact.hours.confirmed && site.contact.hours.value && (
                <p className="text-cocoa/70">{site.contact.hours.value}</p>
              )}
            </div>
            {site.social.instagram.confirmed && site.social.instagram.value && (
              <a
                href={site.social.instagram.value}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Maureen Ella on Instagram"
                className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-espresso transition-colors duration-300 hover:border-rose hover:bg-rose hover:text-porcelain focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-[18px] w-[18px]"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4.25" />
                  <circle cx="17.4" cy="6.7" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
            )}
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

            <div className="mt-7 border-t border-hairline pt-5">
              <p className="mb-3 text-[0.6rem] uppercase tracking-[0.18em] text-taupe-deep">
                Recognition
              </p>
              <div className="grid grid-cols-5 gap-2" aria-label="Awards and recognition">
                {footerBadges.map((badge) => (
                  <figure
                    key={badge.src}
                    className="group flex h-16 items-center justify-center"
                  >
                    <Image
                      src={badge.src}
                      alt={badge.alt}
                      width={64}
                      height={64}
                      sizes="64px"
                      className="h-auto max-h-14 w-auto max-w-full object-contain mix-blend-multiply opacity-85 transition duration-300 group-hover:scale-105 group-hover:opacity-100"
                    />
                  </figure>
                ))}
              </div>
            </div>
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
