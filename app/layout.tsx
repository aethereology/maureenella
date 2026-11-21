import type { Metadata } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import {
  LocalBusinessSchema,
  OrganizationSchema,
  WebsiteSchema,
} from "@/components/seo/JsonLd";
import { Analytics } from "@/components/Analytics";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { RouteTransition } from "@/components/motion/RouteTransition";
import "./globals.css";

// Self-hosted, Latin-subset variable WOFF2 built from the TTF sources in
// app/fonts by scripts/subset-fonts.py (~142 KB total vs ~2 MB of TTF).
// Weight ranges match each font's real variable axis.
const cormorant = localFont({
  src: [
    {
      path: "./fonts/CormorantGaramond-Latin.woff2",
      weight: "300 700",
      style: "normal",
    },
    {
      path: "./fonts/CormorantGaramond-Italic-Latin.woff2",
      weight: "300 700",
      style: "italic",
    },
  ],
  fallback: ["Georgia", "serif"],
  adjustFontFallback: "Times New Roman",
  variable: "--font-cormorant",
  display: "swap",
});

const jost = localFont({
  src: [
    {
      path: "./fonts/Jost-Latin.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.baseUrl),
  title: {
    default: `${site.brand} | Bridal Hair & Makeup`,
    template: `%s | ${site.brand}`,
  },
  description: site.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* No-JS / crawler fallback: never hide reveal-wrapped content. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-espresso focus:px-4 focus:py-2 focus:text-porcelain"
        >
          Skip to content
        </a>
        <MotionProvider>
          <OrganizationSchema />
          <WebsiteSchema />
          <LocalBusinessSchema />
          <SiteHeader />
          <RouteTransition>{children}</RouteTransition>
          <SiteFooter />
          <Analytics />
        </MotionProvider>
      </body>
    </html>
  );
}
