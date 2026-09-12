// src/components/IntroSequence.tsx
//
// Presentational intro overlay: video background + title.
// All lifecycle logic (auto-advance timer, throttled scroll detection,
// keyboard dismissal, idempotent completion) lives in `useIntroSequence`.
"use client";
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useIntroSequence } from '@/hooks/useIntroSequence';

interface IntroSequenceProps {
  onComplete?: () => void;
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const params = useParams();
  const locale = params.locale || 'en';
  const { isVisible, complete } = useIntroSequence({ onComplete });

  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play the muted video; catch in case autoplay is blocked.
  useEffect(() => {
    videoRef.current?.play().catch(() => {
      // Autoplay prevented — the intro still auto-advances via timer.
    });
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label={
        locale === 'fr'
          ? 'Introduction — appuyez sur Entrée ou Échap pour continuer'
          : 'Introduction — press Enter or Escape to continue'
      }
      onClick={complete}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          complete();
        }
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Video Background (decorative) */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          aria-hidden="true"
          tabIndex={-1}
          onEnded={complete}
        >
          <source src="/videos/writing-hand.mp4" type="video/mp4" />
        </video>

        {/* Overlay Gradient - Darker for better title contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/85" />

        {/* Content - Title appears immediately and prominently */}
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-8xl lg:text-9xl font-serif font-black text-white uppercase tracking-tight leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
          >
            {locale === 'fr' ? 'Voix du Couloir de la Mort' : 'Voices On Death Row'}
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="text-stone-200 text-sm md:text-base mt-6 font-light tracking-[0.3em] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
          >
            {locale === 'fr' ? 'Histoires de l\'intérieur' : 'Stories from the Inside'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-10 flex flex-col items-center gap-4"
          >
            <div className="text-white/50 text-xs tracking-[0.2em] font-light animate-pulse">
              {locale === 'fr' ? 'Défiler pour entrer' : 'Scroll to enter'}
            </div>
            <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}