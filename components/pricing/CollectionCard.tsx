import { clsx } from "@/lib/clsx";
import type { Collection } from "@/content/pricing";

export function CollectionCard({
  collection,
  index,
}: {
  collection: Collection;
  index: number;
}) {
  const { name, price, positioning, includes, featured, featuredLabel } = collection;

  return (
    <article
      className={clsx(
        "relative flex h-full flex-col border p-8 sm:p-10",
        featured ? "border-espresso bg-porcelain" : "border-hairline",
      )}
    >
      {featured && featuredLabel && (
        <span className="absolute -top-3 left-8 bg-espresso px-3 py-1 font-sans text-[0.6rem] uppercase tracking-[0.25em] text-porcelain">
          {featuredLabel}
        </span>
      )}
      <span className="index-mark">{String(index + 1).padStart(2, "0")}</span>
      <h3 className="mt-4 font-serif text-3xl leading-tight text-espresso sm:text-4xl">
        {name}
      </h3>
      <p className="mt-3 font-serif text-2xl text-rose">{price}</p>
      <p className="mt-4 text-cocoa/80">{positioning}</p>
      <ul className="mt-7 space-y-2.5 border-t border-hairline pt-6">
        {includes.map((item) => (
          <li key={item} className="flex gap-3 text-sm text-cocoa/85">
            <span aria-hidden className="mt-[0.6em] h-px w-4 shrink-0 bg-taupe" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
