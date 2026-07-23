"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import navigation from "@/seed/navigation.json";
import { clsx } from "@/lib/clsx";
import { site } from "@/lib/site";
import { ScrollProgress } from "@/components/motion/ScrollProgress";

const navSpring = { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.65 };

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const activeHref = useMemo(
    () =>
      navigation.primary
        .filter(
          (item) => pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`)),
        )
        .sort((a, b) => b.href.length - a.href.length)[0]?.href,
    [pathname],
  );

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-porcelain/90 shadow-[0_8px_30px_rgba(37,29,23,0.035)] backdrop-blur-xl">
      <div className="mx-auto flex h-[5.25rem] max-w-[90rem] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="group text-espresso"
          aria-label="Maureen Ella home"
        >
          <span>
            <span className="block font-serif text-[1.55rem] leading-none tracking-[-0.025em]">Maureen Ella</span>
            <span className="mt-1 hidden text-[0.52rem] uppercase tracking-[0.27em] text-taupe-deep sm:block">Bridal artistry</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
          {navigation.primary.map((item) => {
            const active = activeHref === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "relative isolate px-3 py-2.5 text-[0.62rem] uppercase tracking-[0.18em] transition-colors duration-300",
                  active ? "text-espresso" : "text-cocoa/70 hover:text-espresso",
                )}
              >
                {active && (
                  <m.span
                    layoutId="primary-navigation-active"
                    className="absolute inset-0 -z-10 border border-hairline bg-cream/75"
                    transition={navSpring}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
          <m.span
            className="ml-3 inline-flex"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0, scale: 0.97 }}
            transition={navSpring}
          >
            <Link
              href={navigation.cta.href}
              className="border border-espresso bg-espresso px-5 py-3 text-[0.62rem] uppercase tracking-[0.18em] text-porcelain transition-colors duration-300 hover:bg-cocoa"
            >
              {navigation.cta.label}
            </Link>
          </m.span>
        </nav>

        <div className="flex items-center gap-1 xl:hidden">
          {site.social.instagram.confirmed && site.social.instagram.value && (
            <a
              href={site.social.instagram.value}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Maureen Ella on Instagram"
              className="inline-flex h-11 w-11 items-center justify-center text-espresso transition-colors hover:text-rose focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
            >
              <InstagramIcon />
            </a>
          )}
          <m.button
            type="button"
            className="inline-flex h-11 w-11 flex-col items-center justify-center gap-[5px]"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
            whileTap={{ scale: 0.9 }}
          >
            <span className={clsx("block h-px w-6 bg-espresso transition-transform duration-300", open && "translate-y-[6px] rotate-45")} />
            <span className={clsx("block h-px w-6 bg-espresso transition-opacity duration-300", open && "opacity-0")} />
            <span className={clsx("block h-px w-6 bg-espresso transition-transform duration-300", open && "-translate-y-[6px] -rotate-45")} />
          </m.button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <m.nav
            id="mobile-nav"
            aria-label="Primary mobile"
            className="overflow-hidden border-t border-hairline bg-porcelain xl:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mx-auto grid max-w-7xl gap-7 px-5 py-7 sm:px-8 md:grid-cols-[1fr_auto] md:items-end">
              <m.ul
                className="grid sm:grid-cols-2"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.045, delayChildren: 0.06 } } }}
              >
                {navigation.primary.map((item, index) => (
                  <m.li
                    key={item.href}
                    className="border-b border-hairline sm:odd:border-r"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <Link
                      href={item.href}
                      aria-current={activeHref === item.href ? "page" : undefined}
                      className="group flex items-baseline gap-4 py-3.5 sm:px-4"
                    >
                      <span className="index-mark">{String(index + 1).padStart(2, "0")}</span>
                      <span className={clsx("font-serif text-2xl transition-colors group-hover:text-rose", activeHref === item.href ? "text-rose" : "text-espresso")}>{item.label}</span>
                    </Link>
                  </m.li>
                ))}
              </m.ul>
              <div>
                <p className="mb-4 max-w-xs font-serif text-xl italic text-cocoa/70">Calm artistry for your most photographed morning.</p>
                <Link
                  href={navigation.cta.href}
                  className="block bg-espresso px-6 py-4 text-center text-[0.66rem] uppercase tracking-[0.2em] text-porcelain"
                >
                  {navigation.cta.label}
                </Link>
              </div>
            </div>
          </m.nav>
        )}
      </AnimatePresence>

      <ScrollProgress />
    </header>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.4" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
