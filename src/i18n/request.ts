// src/i18n/request.ts
//
// Resolves the active locale for next-intl on the server.
//
// Priority:
//   1. The URL locale from the [locale] route segment (source of truth —
//      the middleware enforces locale-prefixed paths, e.g. /fr/voices).
//   2. Legacy fallback: the 'locale' cookie (set by older switcher flows).
//   3. 'en'.
//
// Previously this read ONLY the cookie, so visiting /fr directly rendered
// every next-intl string in English until the visitor happened to use the
// language switcher — the "menu doesn't translate" bug.
import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

const LOCALES = ['en', 'fr'] as const;
type Locale = (typeof LOCALES)[number];

function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale: Locale = 'en';

  // 1. Locale from the URL segment
  const urlLocale = await requestLocale;
  if (isLocale(urlLocale)) {
    locale = urlLocale;
  } else {
    // 2. Legacy cookie fallback (routes outside [locale], direct hits)
    const cookieStore = await cookies();
    const cookieLocale = cookieStore.get('locale')?.value;
    if (isLocale(cookieLocale)) {
      locale = cookieLocale;
    }
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});