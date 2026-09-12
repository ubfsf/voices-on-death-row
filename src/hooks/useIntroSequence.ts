// src/hooks/useIntroSequence.ts
//
// Encapsulates the intro-sequence lifecycle so the UI component stays
// purely presentational:
//   - auto-advance timer (with cleanup)
//   - throttled scroll-to-exit detection (with cleanup)
//   - keyboard dismissal (Escape / Enter / Space) for accessibility
//   - idempotent completion: scroll, click, timer and video-end can all
//     race, but onComplete fires exactly once.
"use client";
import { useCallback, useEffect, useRef, useState } from 'react';

interface UseIntroSequenceOptions {
  /** Called exactly once when the intro finishes. */
  onComplete?: () => void;
  /** Auto-advance delay in ms. */
  autoAdvanceMs?: number;
  /** Scroll threshold (px) that dismisses the intro. */
  scrollThreshold?: number;
}

export function useIntroSequence({
  onComplete,
  autoAdvanceMs = 8000,
  scrollThreshold = 50,
}: UseIntroSequenceOptions = {}) {
  const [isVisible, setIsVisible] = useState(true);

  // Idempotency lock: multiple exit paths must only fire once.
  const hasCompleted = useRef(false);

  // Keep the latest callback in a ref so listeners never need re-binding.
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const complete = useCallback(() => {
    if (hasCompleted.current) return;
    hasCompleted.current = true;
    setIsVisible(false);
    onCompleteRef.current?.();
  }, []);

  useEffect(() => {
    // Throttled scroll detection — the handler runs at most every 100ms
    // instead of on every scroll frame.
    let lastCheck = 0;
    const handleScroll = () => {
      if (hasCompleted.current) return;
      const now = Date.now();
      if (now - lastCheck < 100) return;
      lastCheck = now;
      if (window.scrollY > scrollThreshold) complete();
    };

    // Keyboard dismissal — Escape / Enter / Space all exit the intro.
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        complete();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    // Auto-advance fallback so the user is never stuck.
    const timer = setTimeout(complete, autoAdvanceMs);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [complete, autoAdvanceMs, scrollThreshold]);

  return { isVisible, complete };
}