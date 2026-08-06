import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";
import { redirects } from "./lib/seo/redirects";

const projectRoot = dirname(fileURLToPath(import.meta.url));

const isDev = process.env.NODE_ENV !== "production";

/**
 * Content Security Policy. The production build is mostly static/SSG — only
 * `/pricing/[token]` and `/pricing/new` are `force-dynamic` (D013) — so
 * per-request nonces aren't available; inline scripts (JSON-LD + the GA4 init
 * snippet) and Tailwind/Next inline styles require 'unsafe-inline'. Development
 * also needs 'unsafe-eval' and websocket connections for React Refresh/HMR.
 */
const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  isDev ? "'unsafe-eval'" : null,
  "https://www.googletagmanager.com",
  "https://www.google-analytics.com",
]
  .filter(Boolean)
  .join(" ");

const connectSrc = [
  "'self'",
  "https://www.google-analytics.com",
  "https://region1.google-analytics.com",
  "https://www.googletagmanager.com",
  isDev ? "ws://localhost:*" : null,
  isDev ? "ws://127.0.0.1:*" : null,
  isDev ? "http://localhost:*" : null,
  isDev ? "http://127.0.0.1:*" : null,
]
  .filter(Boolean)
  .join(" ");

const csp = [
  "default-src 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.googletagmanager.com https://www.google-analytics.com",
  "font-src 'self'",
  `connect-src ${connectSrc}`,
  "worker-src 'self' blob:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  isDev ? null : "upgrade-insecure-requests",
]
  .filter(Boolean)
  .join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: projectRoot,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return redirects;
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // `/pricing/[token]` URLs are bearer credentials — the signed token in
      // the path IS the authorization for a bride's private pricing. The
      // site-wide `strict-origin-when-cross-origin` policy above still sends
      // the full URL as `document.referrer` on same-origin hard navigations
      // (e.g. a bride ctrl/middle-clicking a link to the portfolio), which
      // would hand the token to any analytics loaded on that destination
      // page. This entry is declared after the site-wide one, so per
      // Next.js's header-merging rules it wins for this single key on
      // matching paths — no pricing URL is ever sent as a referrer, to any
      // destination, first-party or third-party.
      {
        source: "/pricing/:path*",
        headers: [{ key: "Referrer-Policy", value: "no-referrer" }],
      },
    ];
  },
};

export default nextConfig;
