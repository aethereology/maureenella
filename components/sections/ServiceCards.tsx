import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

type ServiceCard = { title: string; description: string };

/** Copy from docs/PAGE_COPY_DRAFTS.md. Pricing never shown while inquiry-only. */
const CARDS: ServiceCard[] = [
  {
    title: "Bridal Hair",
    description:
      "Soft updos, romantic waves, polished buns, braids, curls, and veil-ready styles created around your dress, accessories, hair texture, and wedding-day vision.",
  },
  {
    title: "Bridal Makeup",
    description:
      "Glowing, photo-ready makeup designed to feel like you at your most confident. May include airbrush and lashes depending on your selected service.",
  },
  {
    title: "Bridal Preview",
    description:
      "A dedicated appointment to explore your hair and/or makeup look, test inspiration, discuss your dress and accessories, and plan for the wedding morning.",
  },
  {
    title: "Bridal Party + Guests",
    description:
      "Hair and makeup for bridesmaids, mothers, family members, and guests who want to feel polished and ready for photos.",
  },
  {
    title: "Add-On Artist",
    description:
      "For larger parties or tighter timelines, an additional artist may be requested based on availability.",
  },
];

export function ServiceCards() {
  return (
    <Stagger className="border-t border-hairline">
      {CARDS.map((card, i) => (
        <StaggerItem
          as="article"
          key={card.title}
          className="group relative grid grid-cols-1 items-baseline gap-3 overflow-hidden border-b border-hairline py-8 transition-colors sm:grid-cols-[auto_1fr_1.4fr] sm:gap-8 sm:px-3"
        >
          <span aria-hidden className="absolute inset-0 -z-10 origin-left scale-x-0 bg-porcelain/70 transition-transform duration-500 ease-out group-hover:scale-x-100" />
          <span className="index-mark transition-transform duration-500 group-hover:translate-x-1">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="font-serif text-2xl text-espresso transition-colors duration-500 group-hover:text-rose sm:text-3xl">
            {card.title}
          </h3>
          <p className="text-cocoa/80">{card.description}</p>
        </StaggerItem>
      ))}

      {!site.pricing.published && (
        <Reveal className="grid grid-cols-1 items-baseline gap-3 py-7 sm:grid-cols-[auto_1fr_1.4fr] sm:gap-8">
          <span className="index-mark">◦</span>
          <h3 className="font-serif text-2xl text-taupe-deep sm:text-3xl">Pricing</h3>
          <p className="text-cocoa/80">
            Every wedding is different. Share your date and details and we&apos;ll
            send service options and availability tailored to your day.
          </p>
        </Reveal>
      )}
    </Stagger>
  );
}
