// src/hooks/useVisualMenuData.ts
//
// Encapsulates the VisualMenu data layer so the UI component stays purely
// presentational.
//
// Merge semantics (matches the Sanity schema's contract — "Extra Menu
// Items: the defaults are always shown"):
//   - The hardcoded defaults are ALWAYS the base of the menu.
//   - Active CMS items OVERRIDE a default with the same slug (so Mrs.
//     Kilgore can retitle/reimage an existing entry) and APPEND new slugs.
//   - CMS items marked inactive are ignored — they can never remove a
//     default or another item.
//   - If the CMS is unavailable or returns nothing, the menu is exactly
//     the defaults.
//
// Also:
//   - prefers server-provided initialData (no client fetch)
//   - fetches from the CMS exactly once (idempotent)
//   - aborts in-flight requests on unmount / locale change (no leaks,
//     no setState-after-unmount)
"use client";
import { useEffect, useRef, useState } from 'react';

export interface VisualMenuItem {
  title: string;
  subtitle: string;
  slug: string;
  image: string;
  /** Sanity hotspot for focal-point-aware cropping. */
  hotspot?: { x: number; y: number } | null;
  align: 'left' | 'right';
  isActive: boolean;
  /** Tailwind object-position class controlling the image focal point */
  imagePosition?: string;
  /** Optional offset classes to nudge the text block clear of the subject */
  textShift?: string;
}

interface UseVisualMenuDataOptions {
  /** Server-rendered data, when available. */
  initialData?: { menuItems?: VisualMenuItem[] } | null;
  /** Active locale for the CMS query. */
  locale: string;
  /** Fallback/base items — always present in the final menu. */
  defaults: VisualMenuItem[];
}

/**
 * Merge CMS items on top of the defaults:
 *   - active CMS item with an existing slug → overrides that default
 *   - active CMS item with a new slug → appended after the defaults
 *   - inactive CMS items → ignored entirely
 */
function mergeMenuItems(defaults: VisualMenuItem[], cmsItems: VisualMenuItem[]): VisualMenuItem[] {
  const overrides = new Map<string, VisualMenuItem>();
  for (const item of cmsItems) {
    if (item.isActive) overrides.set(item.slug, item);
  }

  const merged: VisualMenuItem[] = defaults.map(
    (d) => overrides.get(d.slug) ?? d
  );

  const defaultSlugs = new Set(defaults.map((d) => d.slug));
  for (const item of cmsItems) {
    if (item.isActive && !defaultSlugs.has(item.slug)) {
      merged.push(item);
    }
  }

  return merged;
}

export function useVisualMenuData({ initialData, locale, defaults }: UseVisualMenuDataOptions) {
  const [menuItems, setMenuItems] = useState<VisualMenuItem[]>(defaults);
  const [isLoading, setIsLoading] = useState(false);

  // Idempotency lock: only one CMS fetch per component lifetime.
  const hasFetched = useRef(false);

  useEffect(() => {
    // If we have initialData from the server, merge it immediately — no fetch.
    if (initialData) {
      if (initialData.menuItems && initialData.menuItems.length > 0) {
        setMenuItems(mergeMenuItems(defaults, initialData.menuItems));
      }
      return;
    }

    // Prevent duplicate fetches across re-renders.
    if (hasFetched.current) return;
    hasFetched.current = true;

    // AbortController: cancels the request if we unmount or the locale
    // changes mid-flight, and prevents setState after unmount.
    const controller = new AbortController();
    setIsLoading(true);

    (async () => {
      try {
        const res = await fetch(`/api/visual-menu?locale=${encodeURIComponent(locale)}`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error('CMS not available');

        const data = await res.json();

        if (data && data.menuItems && data.menuItems.length > 0) {
          setMenuItems(mergeMenuItems(defaults, data.menuItems));
        } else {
          // CMS empty → menu is exactly the defaults.
          setMenuItems(defaults);
        }
      } catch (error) {
        // Swallow aborts (component unmounted / locale changed) — anything
        // else falls back to the defaults.
        if ((error as Error).name !== 'AbortError') {
          setMenuItems(defaults);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    })();

    return () => controller.abort();
  }, [locale, initialData, defaults]);

  return { menuItems, isLoading };
}