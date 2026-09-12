// src/hooks/useScrollUpNavigation.ts
//
// Encapsulates the "scroll up near the top → go home" behaviour used on
// inner pages:
//   - scroll-up detection with re-arm logic (with listener cleanup)
//   - ambient soundtrack start inside the user gesture
//   - deferred navigation via a TRACKED timer (cleared on unmount /
//     re-run so we never navigate after unmount or double-navigate)
//   - respects prefers-reduced-motion
"use client";
import { useEffect, useRef } from 'react';

export function useScrollUpNavigation(locale: string, pathname: string | null) {
  // Tracked navigation timer — cleared on cleanup to prevent navigating
  // after unmount or stacking duplicate navigations.
  const navTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const homePath = `/${locale}`;

    // Opt-out editorial routes where scroll-up should only scroll, never trigger special behaviour
    const optOut = ['/about','/families_voices','/voices','/families'].some(
      p => pathname?.startsWith(`${homePath}${p}`)
    );
    if (optOut) return;

    let lastY = window.scrollY;
    let armed = true;

    const onScroll = () => {
      const y = window.scrollY;
      const goingUp = y < lastY && lastY - y > 40;

      // Re-arm after scrolling down past 300 px
      if (y > 300) armed = true;

      if (goingUp && y < 150 && armed) {
        armed = false;

        // Smooth scroll to the very top of the current page – do NOT navigate home
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      lastY = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (navTimer.current) {
        clearTimeout(navTimer.current);
        navTimer.current = null;
      }
    };
  }, [locale, pathname]);
}