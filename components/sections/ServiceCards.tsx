import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

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
    <div className="border-t border-hairline">
      {CARDS.map((card, i) => (
        <Reveal
          as="article"
          key={card.title}
          delay={i * 60}
          className="group grid grid-cols-1 items-baseline gap-3 border-b border-hairline py-7 transition-colors sm:grid-cols-[auto_1fr_1.4fr] sm:gap-8"
        >
          <span className="index-mark">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="font-serif text-2xl text-espresso transition-colors group-hover:text-rose sm:text-3xl">
            {card.title}
          </h3>
          <p className="text-cocoa/80">{card.description}</p>
        </Reveal>
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
    </div>
  );
}
