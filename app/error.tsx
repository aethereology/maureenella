"use client";

/**
 * Global error boundary. The most common real-world trigger is a stale form
 * submission: a tab opened before a redeploy posts to a server action whose
 * build no longer exists (404 "Failed to find Server Action"). Recovery is
 * simply reloading the page, so guide the visitor there instead of dead-ending.
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="font-serif text-3xl text-espresso">
        Something went wrong on our end
      </h1>
      <p className="text-cocoa/80">
        This can happen if the page has been open for a while. Please refresh
        and try again — if you were sending an inquiry, your details are still
        in the form after most refreshes.
      </p>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="border border-espresso px-6 py-3 text-[0.7rem] uppercase tracking-[0.22em] text-espresso transition-colors hover:bg-espresso hover:text-porcelain"
        >
          Refresh the page
        </button>
        <button
          type="button"
          onClick={reset}
          className="px-6 py-3 text-[0.7rem] uppercase tracking-[0.22em] text-cocoa/70 underline underline-offset-4 hover:text-espresso"
        >
          Try again without refreshing
        </button>
      </div>
    </main>
  );
}
