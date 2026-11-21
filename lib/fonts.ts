import localFont from "next/font/local";

/**
 * Site fonts, shared by both root layouts (app/(public) and app/(private)).
 * Self-hosted, Latin-subset variable WOFF2 built from the TTF sources in
 * app/fonts by scripts/subset-fonts.py (~142 KB total vs ~2 MB of TTF).
 * Weight ranges match each font's real variable axis. Self-hosting keeps the
 * build offline-safe and satisfies the CSP (font-src 'self').
 */
export const cormorant = localFont({
  src: [
    {
      path: "../app/fonts/CormorantGaramond-Latin.woff2",
      weight: "300 700",
      style: "normal",
    },
    {
      path: "../app/fonts/CormorantGaramond-Italic-Latin.woff2",
      weight: "300 700",
      style: "italic",
    },
  ],
  fallback: ["Georgia", "serif"],
  adjustFontFallback: "Times New Roman",
  variable: "--font-cormorant",
  display: "swap",
});

export const jost = localFont({
  src: [
    {
      path: "../app/fonts/Jost-Latin.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  variable: "--font-jost",
  display: "swap",
});
