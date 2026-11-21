import Image from "next/image";
import { Container } from "@/components/ui/Container";

const badges: { src: string; alt: string; optical?: string }[] = [
  {
    src: "/images/badges/maureenbadge1.png",
    alt: "2024 Premier Bride Top 3 Best Wedding Pro in the 904",
  },
  {
    src: "/images/badges/maureenbadge2.png",
    alt: "Southern Bride recognition",
    // Artwork carries ~17% transparent padding; scale so it reads the same size.
    optical: "scale-[1.18]",
  },
  {
    src: "/images/badges/maureenbadge3.png",
    alt: "2024 Styled Challenge Trendsetter Award winner",
  },
  {
    src: "/images/badges/maureenbadge4.png",
    alt: "2024 Styled Challenge Best Design Award winner",
  },
  {
    src: "/images/badges/maureenbadge5.png",
    alt: "Simply Eloped Top Vendor 2023",
  },
];

/**
 * Recognition ribbon. Motion lives entirely in app/globals.css
 * (.awards-marquee / -track / -copy) and depends on each cell's width
 * (w-40 / sm:w-48) — keep those widths if restyling, or the loop speed changes.
 * Only a top border: the host section already draws the hairline below.
 */
export function RecognitionMarquee() {
  return (
    <div className="border-t border-hairline bg-ivory/70">
      <Container className="grid items-stretch lg:grid-cols-[auto_minmax(0,1fr)]">
        <div className="flex items-center pt-4 lg:border-r lg:border-hairline lg:pr-10 lg:pt-0">
          <p className="whitespace-nowrap font-serif text-lg italic leading-tight text-taupe-ink">
            As seen &amp; celebrated
          </p>
        </div>

        <div className="awards-marquee relative overflow-hidden" aria-label="Awards and professional recognition">
          <div className="awards-marquee-track flex h-full w-max">
            <BadgeGroup />
            <BadgeGroup duplicate />
          </div>
        </div>
      </Container>
    </div>
  );
}

function BadgeGroup({
  duplicate = false,
}: {
  duplicate?: boolean;
}) {
  return (
    <div
      aria-hidden={duplicate || undefined}
      className={`awards-marquee-group flex h-full shrink-0 items-center ${duplicate ? "awards-marquee-copy" : ""}`}
    >
      {badges.map((badge) => (
        <figure
          key={badge.src}
          className="flex h-24 w-40 shrink-0 items-center justify-center sm:h-[6.5rem] sm:w-48"
        >
          <Image
            src={badge.src}
            alt={duplicate ? "" : badge.alt}
            width={160}
            height={160}
            sizes="(max-width: 640px) 68px, 84px"
            className={`h-[4.25rem] w-[4.25rem] object-contain opacity-90 mix-blend-multiply sm:h-[5.25rem] sm:w-[5.25rem] ${badge.optical ?? ""}`}
          />
        </figure>
      ))}
    </div>
  );
}
