import type { ALaCarteItem } from "@/lib/pricing-catalog";

export function ALaCarteTable({ items }: { items: ALaCarteItem[] }) {
  return (
    <dl className="border-t border-hairline">
      {items.map((item) => (
        <div
          key={item.service}
          className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-hairline py-5"
        >
          <dt className="font-serif text-xl text-espresso sm:text-2xl">{item.service}</dt>
          <dd className="font-sans text-sm uppercase tracking-[0.15em] text-taupe-deep">
            {item.price}
          </dd>
        </div>
      ))}
    </dl>
  );
}
