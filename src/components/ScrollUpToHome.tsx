// src/components/ScrollUpToHome.tsx
//
// Sticky scroll-up-to-home controller for inner pages.
//
// When the user is near the top of the page and scrolls **up**, the screen
// smoothly scrolls to the top and (unless we are already on the homepage)
// navigates to the VisualMenu at `/{locale}`.
//
// On the homepage itself, it simply scrolls to the top — it does NOT
// re-navigate, to avoid a full page reload.
//
// Usage: drop  <ScrollUpToHome />  anywhere inside the [locale] layout
// (it returns null — it's purely an event-listener hook).
//
// All listener/timer lifecycle logic lives in `useScrollUpNavigation`.
"use client";
import { useParams, usePathname } from 'next/navigation';
import { useScrollUpNavigation } from '@/hooks/useScrollUpNavigation';

export default function ScrollUpToHome() {
  const params = useParams();
  const pathname = usePathname();
  const locale = Array.isArray(params?.locale) ? params.locale[0] : (params?.locale ?? 'en');

  useScrollUpNavigation(locale, pathname);

  return null;
}