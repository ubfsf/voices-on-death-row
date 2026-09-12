// src/components/LocalSwitcher.tsx
//
// Language toggle.
//  - Switching rewrites the locale prefix of the current path and
//    navigates client-side — the URL is the single source of truth for
//    locale (matching src/i18n/request.ts and the middleware).
//  - The 'locale' cookie is still written for any legacy readers.
//  - Clicking the already-active locale is a no-op.
//  - Buttons expose their pressed state via aria-pressed in a labelled
//    group for assistive tech.
"use client";
import { useParams, usePathname, useRouter } from 'next/navigation';

const LOCALES = ['en', 'fr'] as const;

export default function LocalSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = Array.isArray(params?.locale) ? params.locale[0] : (params?.locale ?? 'en');

  const handleLocaleChange = (newLocale: string) => {
    // Idempotent: switching to the active locale does nothing.
    if (newLocale === currentLocale) return;

    // Keep the legacy cookie in sync.
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`;

    // Swap the locale prefix of the current path and navigate client-side,
    // e.g. /en/voices → /fr/voices. Falls back to /{locale} when the
    // current path has no recognizable prefix.
    const segments = (pathname || '').split('/').filter(Boolean);
    if (segments.length > 0 && (LOCALES as readonly string[]).includes(segments[0])) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    router.push(`/${segments.join('/')}`);
  };

  return (
    <div role="group" aria-label="Language" className="flex gap-4 p-4">
      {LOCALES.map((curr) => (
        <button
          key={curr}
          type="button"
          onClick={() => handleLocaleChange(curr)}
          aria-pressed={currentLocale === curr}
          aria-label={`Switch to ${curr.toUpperCase()}`}
          className="px-3 py-1 border rounded hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 transition-colors"
        >
          {curr.toUpperCase()}
        </button>
      ))}
    </div>
  );
}