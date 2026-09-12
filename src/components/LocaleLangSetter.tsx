"use client";

import { useEffect } from "react";

/**
 * Sets the <html lang> attribute on the client side after hydration.
 * The root layout renders <html lang="en" suppressHydrationWarning>;
 * this component safely corrects it to the active locale (e.g. "fr")
 * without causing a hydration mismatch.
 */
export default function LocaleLangSetter({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}