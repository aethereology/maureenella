"use client";

import { useState } from "react";

type CopyState = "idle" | "copied" | "failed";

export function CopyLinkButton({ value }: { value: string }) {
  const [state, setState] = useState<CopyState>("idle");

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setState("copied");
        } catch {
          setState("failed");
        }
        setTimeout(() => setState("idle"), 2000);
      }}
      className="border border-espresso px-6 py-3 font-sans text-[0.68rem] uppercase tracking-[0.2em] text-espresso transition-colors hover:bg-espresso hover:text-porcelain focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
    >
      {state === "copied"
        ? "Copied"
        : state === "failed"
          ? "Copy failed — select the link above"
          : "Copy link"}
    </button>
  );
}
