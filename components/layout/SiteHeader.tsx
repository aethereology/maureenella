"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import navigation from "@/seed/navigation.json";
import { clsx } from "@/lib/clsx";
import { site } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-porcelain/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-serif text-[1.6rem] leading-none tracking-tight text-espresso"
        >
          Maureen Ella
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 lg:flex"
        >
          {navigation.primary.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "relative text-[0.7rem] uppercase tracking-[0.18em] text-cocoa transition-colors hover:text-espresso",
                  "after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-rose after:transition-all after:duration-300",
                  active ? "text-espresso after:w-full" : "after:w-0 hover:after:w-full",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={navigation.cta.href}
            className="ml-2 border border-espresso px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.18em] text-espresso transition-colors duration-300 hover:bg-espresso hover:text-porcelain"
          >
            {navigation.cta.label}
          </Link>
        </nav>

        {/* Mobile social link + toggle */}
        <div className="flex items-center gap-1 lg:hidden">
          {site.social.instagram.confirmed && site.social.instagram.value && (
            <a
              href={site.social.instagram.value}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Maureen Ella on Instagram"
              className="inline-flex h-10 w-10 items-center justify-center text-espresso transition-colors hover:text-rose focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-5 w-5"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4.25" />
                <circle cx="17.4" cy="6.7" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          )}
          <button
            type="button"
            className="inline-flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={clsx("block h-px w-6 bg-espresso transition-transform", open && "translate-y-[6px] rotate-45")} />
            <span className={clsx("block h-px w-6 bg-espresso transition-opacity", open && "opacity-0")} />
            <span className={clsx("block h-px w-6 bg-espresso transition-transform", open && "-translate-y-[6px] -rotate-45")} />
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="border-t border-hairline bg-porcelain px-5 py-5 lg:hidden"
        >
          <ul className="flex flex-col">
            {navigation.primary.map((item, i) => (
              <li key={item.href} className="border-b border-hairline last:border-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-3 py-3.5 text-lg text-cocoa hover:text-espresso"
                >
                  <span className="index-mark">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-serif text-2xl">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={navigation.cta.href}
            onClick={() => setOpen(false)}
            className="mt-5 block border border-espresso px-5 py-3 text-center text-[0.7rem] uppercase tracking-[0.18em] text-espresso"
          >
            {navigation.cta.label}
          </Link>
        </nav>
      )}
    </header>
  );
}
