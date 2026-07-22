import Image from "next/image";
import { Container } from "@/components/ui/Container";

const badges = [
  {
    src: "/images/badges/maureenbadge1.png",
    alt: "2024 Premier Bride Top 3 Best Wedding Pro in the 904",
  },
  {
    src: "/images/badges/maureenbadge2.png",
    alt: "Southern Bride recognition",
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

export function RecognitionMarquee() {
  return (
    <div className="border-y border-hairline bg-ivory/80">
      <Container className="grid items-stretch px-0 sm:px-0 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <div className="flex items-center justify-between gap-4 border-b border-hairline px-5 py-4 sm:px-8 lg:block lg:border-b-0 lg:border-r lg:py-6">
          <div>
            <p className="eyebrow">Award-winning artistry</p>
            <p className="mt-1 font-serif text-xl italic leading-tight text-espresso">As seen &amp; celebrated</p>
          </div>
        </div>

        <div className="awards-marquee relative min-h-28 overflow-hidden sm:min-h-32 lg:min-h-0" aria-label="Awards and professional recognition">
          <div className="awards-marquee-track flex h-full w-max">
            <BadgeGroup />
            <BadgeGroup duplicate />
          </div>
        </div>
      </Container>
    </div>
  );
}

function BadgeGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div
      aria-hidden={duplicate || undefined}
      className={`awards-marquee-group flex h-full shrink-0 items-stretch ${duplicate ? "awards-marquee-copy" : ""}`}
    >
      {badges.map((badge, index) => (
        <figure
          key={badge.src}
          className="flex h-full min-h-28 w-40 shrink-0 items-center justify-center border-r border-hairline px-5 py-3 sm:min-h-32 sm:w-48 sm:px-7"
        >
          <Image
            src={badge.src}
            alt={duplicate ? "" : badge.alt}
            width={160}
            height={160}
            sizes="(max-width: 640px) 120px, 145px"
            className={`h-auto w-auto object-contain mix-blend-multiply ${
              index === 1 ? "max-h-24 max-w-36 sm:max-h-28 sm:max-w-40" : "max-h-20 max-w-24 sm:max-h-24 sm:max-w-28"
            }`}
          />
        </figure>
      ))}
    </div>
  );
}
