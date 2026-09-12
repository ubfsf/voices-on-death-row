// src/hooks/useCurtainTrigger.ts
//
// Encapsulates the homepage "curtain unveil" state machine:
//   - unveiled → the curtain animation has been triggered
//   - settled  → the curtain animation finished; content is in normal flow
//
// Owns all side effects so the UI component stays purely presentational:
//   - gesture listeners (wheel / touch swipe / keyboard)
//   - ambient soundtrack: unlocked & started by the unveiling gesture,
//     plays only while the video intro is on screen, and STOPS as soon
//     as the menu settles into place
//   - body scroll locking (with cleanup)
//   - soundtrack stop on unmount (with cleanup)
//   - settle fallback timer (covers reduced-motion / missed transitionend)
"use client";
import { useCallback, useEffect, useRef, useState } from 'react';
import { playWritingSound, stopWritingSound, unlockAudio } from '@/lib/sound';

interface UseCurtainTriggerOptions {
  /** Curtain transition duration in ms — used for the settle fallback timer. */
  transitionDuration?: number;
}

export function useCurtainTrigger({ transitionDuration = 800 }: UseCurtainTriggerOptions = {}) {
  const [unveiled, setUnveiled] = useState(false);
  const [settled, setSettled] = useState(false);

  // Idempotency lock: the very first gesture wins, all others are ignored.
  const hasTriggered = useRef(false);
  const touchStartY = useRef(0);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Start ambient sound only after an explicit user gesture.
  // This avoids autoplay blocks and follows best practice for audio.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (unveiled) return;

    const started = { value: false };
    const startAudio = () => {
      if (unveiled || started.value) return;
      started.value = true;
      unlockAudio();
      playWritingSound();
    };

    // First user activation – pointer/touch down is a reliable gesture
    window.addEventListener('pointerdown', startAudio, { passive: true });
    window.addEventListener('touchstart', startAudio, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', startAudio);
      window.removeEventListener('touchstart', startAudio);
    };
  }, [unveiled]);

  // ── Trigger the curtain unveil (idempotent) ──
  const openCurtain = useCallback(() => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;

    // Unveil the curtain and stop the ambient hero soundtrack immediately
    setUnveiled(true);
    stopWritingSound();
  }, []);

  // ── Gesture listeners: wheel, touch swipe, keyboard ──
  useEffect(() => {
    // 1. Mouse wheel / trackpad — scrolling down unveils
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) openCurtain();
    };

    // 2. Touch — swipe UP by more than 50px unveils
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      if (touchStartY.current - touchEndY > 50) openCurtain();
    };

    // 3. Keyboard accessibility — arrows / space / enter / page-down
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowUp', ' ', 'Enter', 'PageDown'].includes(e.key)) {
        openCurtain();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [openCurtain]);

  // ── Settle fallback: guarantees the curtain settles even if the CSS
  //    transitionend event never fires (e.g. motion-reduce:transition-none).
  //    Settling = the menu has arrived → the intro soundtrack stops. ──
  useEffect(() => {
    if (!unveiled) return;

    settleTimer.current = setTimeout(() => {
      settleTimer.current = null;
      setSettled(true);
      // 🎵 Menu is up — the sound belongs to the video intro only.
      stopWritingSound();
    }, transitionDuration + 100);

    return () => {
      if (settleTimer.current) {
        clearTimeout(settleTimer.current);
        settleTimer.current = null;
      }
    };
  }, [unveiled, transitionDuration]);

  // ── Stop the soundtrack when the homepage unmounts so it doesn't
  //    bleed into inner pages that may have their own audio. ──
  useEffect(() => {
    return () => {
      stopWritingSound();
    };
  }, []);

  // ── Lock page scroll while the hero is showing / curtain is animating. ──
  useEffect(() => {
    document.body.style.overflow = settled ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [settled]);

  // ── Called by the UI when the CSS transition finishes ──
  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLElement>) => {
      if (e.propertyName !== 'transform') return;
      if (settleTimer.current) {
        clearTimeout(settleTimer.current);
        settleTimer.current = null;
      }
      setSettled(true);
      // 🎵 Menu is up — stop the intro soundtrack.
      stopWritingSound();
    },
    []
  );

  return { unveiled, settled, openCurtain, handleTransitionEnd };
}