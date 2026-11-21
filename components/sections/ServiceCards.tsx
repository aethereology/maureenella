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
      {CARDS.map((card) => (
        <StaggerItem
          as="article"
          key={card.title}
          className="grid grid-cols-1 items-baseline gap-3 border-b border-hairline py-8 sm:grid-cols-[1fr_1.4fr] sm:gap-10"
        >
          <h3 className="font-serif text-2xl text-espresso sm:text-[2rem]">
            {card.title}
          </h3>
          <p className="max-w-xl text-cocoa/85">{card.description}</p>
        </StaggerItem>
      ))}

      {!site.pricing.published && (
        <Reveal className="grid grid-cols-1 items-baseline gap-3 py-8 sm:grid-cols-[1fr_1.4fr] sm:gap-10">
          <h3 className="font-serif text-2xl italic text-taupe-ink sm:text-[2rem]">
            Pricing
          </h3>
          <p className="max-w-xl text-cocoa/85">
            Every wedding is different. Share your date and details and we&apos;ll
            send service options and availability tailored to your day.
          </p>
        </Reveal>
      )}
    </Stagger>
  );
}
