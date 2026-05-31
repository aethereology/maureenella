"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { gallery, PORTFOLIO_FILTERS } from "@/content/gallery";
import { permissions } from "@/lib/permissions";
import { clsx } from "@/lib/clsx";
import { trackEvent } from "@/lib/analytics";

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
    <div>
      <div
        role="group"
        aria-label="Filter portfolio"
        className="mb-10 flex flex-wrap gap-x-7 gap-y-3 border-y border-hairline py-4"
      >
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            aria-pressed={active === f.key}
            onClick={() => {
              setActive(f.key);
              if (f.key !== "all") trackEvent("portfolio_filter_use", { filter: f.key });
            }}
            className={clsx(
              "text-[0.7rem] uppercase tracking-[0.18em] transition-colors",
              active === f.key
                ? "text-espresso underline decoration-rose decoration-1 underline-offset-[6px]"
                : "text-cocoa/60 hover:text-espresso",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
        {items.map((item) => (
          <figure key={item.src} className="group img-zoom break-inside-avoid overflow-hidden">
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
          </figure>
        ))}
      </div>

      {items.length === 0 && <p className="text-cocoa/80">No images in this category yet.</p>}
    </div>
  );
}
