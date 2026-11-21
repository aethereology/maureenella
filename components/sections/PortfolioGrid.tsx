"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { m } from "motion/react";
import { gallery, PORTFOLIO_FILTERS } from "@/content/gallery";
import { permissions } from "@/lib/permissions";
import { clsx } from "@/lib/clsx";
import { trackEvent } from "@/lib/analytics";
import { Lightbox } from "@/components/proof/Lightbox";

export function PortfolioGrid() {
  const [active, setActive] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // The server-rendered grid must be visible without JS; only fade after a
  // visitor actually changes the filter.
  const [filtered, setFiltered] = useState(false);

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
    <>
      <div
        role="group"
        aria-label="Filter portfolio"
        className="mb-10 flex flex-wrap gap-x-1 gap-y-2 border-y border-hairline py-4"
      >
        {filters.map((f) => {
          const isActive = active === f.key;
          return (
            <m.button
              key={f.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => {
                setActive(f.key);
                setFiltered(true);
                if (f.key !== "all") trackEvent("portfolio_filter_use", { filter: f.key });
              }}
              className={clsx(
                "border px-3 py-2 text-sm transition-colors duration-300 sm:px-4 sm:py-2.5",
                isActive
                  ? "border-hairline bg-cream text-espresso"
                  : "border-transparent text-cocoa/75 hover:text-espresso",
              )}
              whileTap={{ scale: 0.97 }}
            >
              {f.label}
            </m.button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {items.length} {items.length === 1 ? "photo" : "photos"} shown
      </p>

      {/* Re-keyed per filter so the new set settles in with one quiet fade. */}
      <m.ul
        key={active}
        role="list"
        className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4 [&>li]:mb-3 sm:[&>li]:mb-4"
        initial={filtered ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {items.map((item, index) => (
          <li key={item.src} className="break-inside-avoid">
            <figure>
              <button
                type="button"
                aria-haspopup="dialog"
                aria-label={`View larger: ${item.alt}`}
                onClick={(event) => {
                  // Safari doesn't focus buttons on click; make sure focus has
                  // a home to return to when the lightbox closes.
                  event.currentTarget.focus();
                  setOpenIndex(index);
                }}
                className="img-zoom block w-full cursor-zoom-in bg-oatmeal focus-visible:outline-offset-4"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={500}
                  height={625}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="h-auto w-full object-cover"
                />
              </button>
              {item.credit && (
                <figcaption className="mt-2 text-xs text-taupe-ink">
                  Photo: {item.credit}
                </figcaption>
              )}
            </figure>
          </li>
        ))}
      </m.ul>

      {items.length === 0 && <p className="text-cocoa/80">No images in this category yet.</p>}

      <Lightbox
        items={items}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </>
  );
}
