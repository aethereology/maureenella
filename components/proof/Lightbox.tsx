"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, m } from "motion/react";

export type LightboxItem = {
  src: string;
  alt: string;
  credit?: string;
};

const FOCUSABLE =
  'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

/**
 * Accessible image lightbox (D016). A modal dialog that shows one photo at a
 * time with its caption and photographer credit (only when real credit data
 * exists). Keyboard: Left/Right step through, Escape closes, Tab is trapped.
 * Focus returns to the element that opened it. Motion is a short fade/scale
 * that answers the action; MotionConfig reducedMotion="user" calms it.
 */
export function Lightbox({
  items,
  index,
  onIndexChange,
  onClose,
}: {
  items: LightboxItem[];
  /** Index of the open photo, or null when closed. */
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const open = index !== null && items[index] !== undefined;
  // Portal only after mount so server and first client render match.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return !mounted
    ? null
    : createPortal(
        <AnimatePresence>
          {open && (
            <LightboxDialog
              key="lightbox"
              items={items}
              index={index}
              onIndexChange={onIndexChange}
              onClose={onClose}
            />
          )}
        </AnimatePresence>,
        document.body,
      );
}

function LightboxDialog({
  items,
  index,
  onIndexChange,
  onClose,
}: {
  items: LightboxItem[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = items[index];
  const total = items.length;
  const hasMany = total > 1;

  const step = useCallback(
    (delta: number) => onIndexChange((index + delta + total) % total),
    [index, total, onIndexChange],
  );

  // Move focus in, lock page scroll, and restore both on close.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const previousPadding = root.style.paddingRight;
    const scrollbar = window.innerWidth - root.clientWidth;

    root.style.overflow = "hidden";
    if (scrollbar > 0) root.style.paddingRight = `${scrollbar}px`;
    closeRef.current?.focus();

    return () => {
      root.style.overflow = previousOverflow;
      root.style.paddingRight = previousPadding;
      opener?.focus({ preventScroll: true });
    };
  }, []);

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (hasMany && event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
      return;
    }
    if (hasMany && event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
      return;
    }
    if (event.key === "Tab" && dialogRef.current) {
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !dialogRef.current.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !dialogRef.current.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  const captionId = "lightbox-caption";

  return (
    <m.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio photo viewer"
      aria-describedby={captionId}
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-[200] flex flex-col bg-espresso text-porcelain"
      data-tone="dark"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Click outside the photo closes. */}
      <div aria-hidden className="absolute inset-0" onClick={onClose} />

      <div className="relative flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <p className="text-sm tabular-nums text-porcelain/75" aria-live="polite">
          {index + 1} of {total}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close photo viewer"
          className="grid h-11 w-11 place-items-center text-porcelain/85 transition-colors hover:text-porcelain focus-visible:outline-champagne"
        >
          <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            <path
              d="M6 6l12 12M18 6 6 18"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="pointer-events-none relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20 lg:px-28">
        <AnimatePresence mode="wait" initial={false}>
          <m.figure
            key={item.src}
            className="pointer-events-auto flex h-full w-full max-w-5xl flex-col"
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.995 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative min-h-0 flex-1">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 85vw, 1024px"
                className="object-contain"
              />
            </div>
            <figcaption
              id={captionId}
              className="mx-auto max-w-2xl px-2 pb-1 pt-5 text-center"
            >
              <span className="block font-serif text-lg italic leading-snug text-porcelain sm:text-xl">
                {item.alt}
              </span>
              {item.credit && (
                <span className="mt-1.5 block text-sm text-champagne">
                  Photo: {item.credit}
                </span>
              )}
            </figcaption>
          </m.figure>
        </AnimatePresence>

        {hasMany && (
          <>
            <StepButton
              direction="previous"
              onClick={() => step(-1)}
              className="left-2 sm:left-5 lg:left-8"
            />
            <StepButton
              direction="next"
              onClick={() => step(1)}
              className="right-2 sm:right-5 lg:right-8"
            />
          </>
        )}
      </div>

      <div className="h-4 sm:h-6" aria-hidden />
    </m.div>
  );
}

function StepButton({
  direction,
  onClick,
  className,
}: {
  direction: "previous" | "next";
  onClick: () => void;
  className?: string;
}) {
  const previous = direction === "previous";
  return (
    <m.button
      type="button"
      onClick={onClick}
      aria-label={previous ? "Previous photo" : "Next photo"}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 480, damping: 30 }}
      className={`pointer-events-auto absolute top-[40%] grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-espresso/55 text-porcelain/90 backdrop-blur-sm transition-colors hover:bg-cocoa hover:text-porcelain focus-visible:outline-champagne sm:top-1/2 sm:bg-transparent ${className ?? ""}`}
    >
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path
          d={previous ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </m.button>
  );
}
