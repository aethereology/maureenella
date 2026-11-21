"use client";

import { Button } from "@/components/ui/Button";

/** Opens the browser print dialog; the guide page ships print-only styles. */
export function PrintButton({ label = "Print this checklist" }: { label?: string }) {
  return (
    <Button variant="ghost" type="button" onClick={() => window.print()} className="print:hidden">
      {label}
    </Button>
  );
}
