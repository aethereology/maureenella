"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { gallery, PORTFOLIO_FILTERS } from "@/content/gallery";
import { permissions } from "@/lib/permissions";
import { clsx } from "@/lib/clsx";
import { trackEvent } from "@/lib/analytics";
import { AnimatePresence, LayoutGroup, m } from "motion/react";

export function PortfolioGrid() {
  const [active, setActive] = useState("all");

  const items = useMemo(
    () => (active === "all" ? gallery : gallery.filter((g) => g.tags.includes(active))),
    [active],
  );

  if (!permissions.portfolioPublished) {
    return (
      <p className="text-cocoa/80">
        Our full portfolio is being prepared. In the meantime, request availability
        and we&apos;ll share recent work relevant to your wedding.
      </p>
    );
  }

  const filters = PORTFOLIO_FILTERS.filter(
    (f) => f.key === "all" || gallery.some((g) => g.tags.includes(f.key)),
  );

  return (
    <LayoutGroup id="portfolio-gallery">
      <div
        role="group"
        aria-label="Filter portfolio"
        className="mb-10 flex flex-wrap gap-2 border-y border-hairline py-4"
      >
        {filters.map((f) => (
          <m.button
            key={f.key}
            type="button"
            aria-pressed={active === f.key}
            onClick={() => {
              setActive(f.key);
              if (f.key !== "all") trackEvent("portfolio_filter_use", { filter: f.key });
            }}
            className={clsx(
              "relative isolate px-4 py-2.5 text-[0.67rem] uppercase tracking-[0.18em] transition-colors",
              active === f.key
                ? "text-espresso"
                : "text-cocoa/60 hover:text-espresso",
            )}
            whileTap={{ scale: 0.96 }}
          >
            {active === f.key && (
              <m.span
                layoutId="portfolio-filter-active"
                className="absolute inset-0 -z-10 border border-hairline bg-cream"
                transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.65 }}
              />
            )}
            {f.label}
          </m.button>
        ))}
      </div>

      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((item) => (
            <m.figure
              layout
              key={item.src}
              className="group img-zoom break-inside-avoid overflow-hidden"
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1], layout: { type: "spring", stiffness: 260, damping: 30 } }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={500}
                height={625}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="h-auto w-full object-cover"
              />
              {item.credit && (
                <figcaption className="mt-1.5 text-[0.62rem] uppercase tracking-[0.15em] text-taupe-deep">
                  Photo · {item.credit}
                </figcaption>
              )}
            </m.figure>
          ))}
        </AnimatePresence>
      </div>

      {items.length === 0 && <p className="text-cocoa/80">No images in this category yet.</p>}
    </LayoutGroup>
  );
}
