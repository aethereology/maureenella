import type { Metadata } from "next";
import crypto from "node:crypto";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/site";
import { createPricingToken, pricingPath, PRICING_TOKEN_TTL_DAYS } from "@/lib/pricing-link";
import { Section } from "@/components/ui/Section";
import { CopyLinkButton } from "@/components/pricing/CopyLinkButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "New Pricing Link",
  description: "Internal tool.",
  path: "/pricing/new",
  noindex: true,
});

function keyMatches(provided: string | undefined): boolean {
  const expected = process.env.PRICING_OWNER_KEY;
  if (!expected || !provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export default async function NewPricingLinkPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string; name?: string }>;
}) {
  const { key, name } = await searchParams;
  if (!keyMatches(key)) notFound();

  const firstName = name?.trim() ?? "";
  const url = new URL(
    pricingPath(createPricingToken({ firstName })),
    site.baseUrl,
  ).toString();

  return (
    <Section tone="ivory" size="narrow" className="min-h-[80vh]">
      <p className="eyebrow">Internal</p>
      <h1 className="mt-5 font-serif text-4xl text-espresso">New pricing link</h1>
      <p className="mt-4 text-cocoa/80">
        Valid for {PRICING_TOKEN_TTL_DAYS} days. Reload this page for a fresh link.
      </p>

      <form method="get" className="mt-10 flex flex-wrap items-end gap-4 border-t border-hairline pt-8">
        <input type="hidden" name="key" value={key} />
        <div className="flex-1">
          <label htmlFor="name" className="eyebrow block">
            Bride&apos;s first name (optional)
          </label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={firstName}
            maxLength={40}
            autoComplete="off"
            className="mt-3 w-full border border-hairline bg-porcelain px-4 py-3 text-cocoa focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
          />
        </div>
        <button
          type="submit"
          className="bg-espresso px-7 py-4 font-sans text-[0.68rem] uppercase tracking-[0.2em] text-porcelain transition-colors hover:bg-cocoa focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
        >
          Generate
        </button>
      </form>

      <div className="mt-10 border border-hairline bg-porcelain p-6">
        <p className="eyebrow">Link</p>
        <p className="mt-3 break-all font-mono text-sm text-cocoa">{url}</p>
        <div className="mt-6">
          <CopyLinkButton value={url} />
        </div>
      </div>
    </Section>
  );
}
