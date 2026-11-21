"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { clsx } from "@/lib/clsx";

export type StorySummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryLabel: string;
  dateLabel: string;
  datePublished?: string;
  image?: string;
  imagePosition?: string;
};

type CategoryOption = { value: string; label: string; count: number };

const ALL = "all";

/**
 * Journal archive with a category filter. Every story is always rendered into
 * the HTML (crawlers see all links); the filter only toggles `hidden`. The
 * selection mirrors to `?category=` with replaceState, read once on mount, so
 * the page itself stays statically rendered.
 */
export function JournalBrowser({
  stories,
  categories,
  featuredSlug,
}: {
  stories: StorySummary[];
  categories: CategoryOption[];
  /** Shown above as the lead story; omitted from "All" to avoid a duplicate. */
  featuredSlug?: string;
}) {
  const [active, setActive] = useState<string>(ALL);
  const listId = useId();

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("category");
    if (requested && categories.some((c) => c.value === requested)) {
      setActive(requested);
    }
  }, [categories]);

  function choose(value: string) {
    setActive(value);
    const url = new URL(window.location.href);
    if (value === ALL) url.searchParams.delete("category");
    else url.searchParams.set("category", value);
    window.history.replaceState(window.history.state, "", url);
  }

  const options: CategoryOption[] = [
    { value: ALL, label: "All", count: stories.length },
    ...categories,
  ];
  const activeOption = options.find((o) => o.value === active) ?? options[0];
  const status =
    active === ALL
      ? `Showing all ${stories.length} stories`
      : `${activeOption.count} ${activeOption.count === 1 ? "story" : "stories"} in ${activeOption.label}`;

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-hairline pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="group"
          aria-label="Filter stories by collection"
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {options.map((option) => {
            const pressed = option.value === active;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={pressed}
                aria-controls={listId}
                onClick={() => choose(option.value)}
                className={clsx(
                  "shrink-0 whitespace-nowrap border px-4 py-2.5 text-[0.9rem] leading-tight transition-colors duration-200",
                  pressed
                    ? "border-espresso bg-espresso text-porcelain"
                    : "border-hairline bg-porcelain text-cocoa hover:border-taupe-deep hover:text-espresso",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
        <p role="status" aria-live="polite" className="font-serif text-[1.05rem] italic text-taupe-ink">
          {status}
        </p>
      </div>

      <ul
        id={listId}
        className="mt-2 grid sm:mt-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-3 lg:gap-x-10"
      >
        {stories.map((story) => {
          const visible =
            active === ALL ? story.slug !== featuredSlug : story.category === active;
          return (
            <li
              key={story.slug}
              hidden={!visible}
              className="border-b border-hairline sm:border-b-0"
            >
              <StoryCard story={story} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function StoryCard({ story }: { story: StorySummary }) {
  return (
    <Link
      href={`/journal/${story.slug}`}
      className="group grid grid-cols-[5.5rem_minmax(0,1fr)] items-start gap-4 py-5 sm:block sm:py-0"
    >
      <div className="img-zoom relative aspect-square overflow-hidden bg-cream sm:aspect-[3/2]">
        {story.image ? (
          <Image
            src={story.image}
            alt=""
            fill
            sizes="(max-width: 640px) 88px, (max-width: 1024px) 50vw, 400px"
            style={{ objectPosition: story.imagePosition }}
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(216,191,156,0.55),rgba(216,191,156,0)_60%)]"
          />
        )}
      </div>
      <div className="min-w-0 sm:mt-5">
        <p className="text-[0.8rem] leading-snug text-taupe-ink">
          {story.categoryLabel}
          <span aria-hidden className="mx-1.5 text-taupe">
            ·
          </span>
          {story.datePublished ? (
            <time dateTime={story.datePublished}>{story.dateLabel}</time>
          ) : (
            story.dateLabel
          )}
        </p>
        <h3 className="mt-1.5 text-[1.3rem] leading-[1.12] tracking-[-0.01em] transition-colors duration-300 group-hover:text-rose-deep sm:mt-2 sm:text-[1.6rem]">
          {story.title}
        </h3>
        <p className="mt-3 hidden text-[0.95rem] leading-relaxed text-cocoa/80 sm:line-clamp-3">
          {story.excerpt}
        </p>
      </div>
    </Link>
  );
}
