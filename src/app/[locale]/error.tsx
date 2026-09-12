'use client';

import Link from 'next/link';
import { useEffect } from 'react';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * Route-level error boundary for all [locale] pages.
 * Renders a dignified fallback instead of an unstyled crash screen,
 * and offers recovery without a full page reload.
 */
export default function LocaleError({ error, reset }: Props) {
  useEffect(() => {
    // Structured log hook point: wire to Sentry/Sentry.captureException here.
    console.error('[locale-error]', {
      message: error.message,
      digest: error.digest,
    });
  }, [error]);

  return (
    <main className="page-paper min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold italic tracking-tight mb-6">
          Something went wrong
        </h1>
        <p className="text-stone-500 leading-relaxed mb-8">
          We were unable to load this page. This has been logged and we&apos;re looking into it.
        </p>
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={reset}
            className="uppercase text-[10px] tracking-[0.4em] border border-stone-300 px-6 py-3 hover:bg-stone-900 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-stone-900"
          >
            Try again
          </button>
          <Link
            href="/"
            className="uppercase text-[10px] tracking-[0.4em] text-stone-400 hover:text-black transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-stone-900"
          >
            ← Home
          </Link>
        </div>
      </div>
    </main>
  );
}
