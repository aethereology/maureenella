"use client";

import { useState } from "react";

export function CopyLinkButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          setCopied(false);
        }
      }}
      className="border border-espresso px-6 py-3 font-sans text-[0.68rem] uppercase tracking-[0.2em] text-espresso transition-colors hover:bg-espresso hover:text-porcelain focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
    >
      {copied ? "Copied" : "Copy link"}
    </button>
  );
}
