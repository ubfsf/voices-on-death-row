// src/components/InteractiveStoryteller.tsx
// Minimal immersive intro: muted looping video with tap / Enter to dismiss.
// Sound/gesture matrix removed per Ponytail minimal code.
"use client";
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { ArrowUp } from 'lucide-react';

interface InteractiveStorytellerProps {
  onComplete?: () => void;
}

export default function InteractiveStoryteller({ onComplete }: InteractiveStorytellerProps) {
  const params = useParams();
  const locale = params.locale || 'en';

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  const handleActivate = () => onComplete?.();

  return (
    <div
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center cursor-pointer overflow-hidden"
      role="button"
      tabIndex={0}
      aria-label={
        locale === 'fr'
          ? 'Introduction immersive — appuyez sur Entrée pour continuer'
          : 'Immersive introduction — press Enter to continue'
      }
      onClick={handleActivate}
      onTouchStart={handleActivate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleActivate();
        }
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          loop
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="/videos/writing-hand.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-8xl lg:text-9xl font-serif font-black text-white uppercase tracking-tight leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
          >
            {locale === 'fr' ? 'Voix du Couloir de la Mort' : 'Voices On Death Row'}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            className="text-stone-200 text-sm md:text-base mt-6 font-light tracking-[0.3em] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
          >
            {locale === 'fr' ? "Histoires de l\u00e9rieur" : 'Stories from the Inside'}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-12 flex flex-col items-center gap-3"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="text-white/60 text-3xl"
            >
              <ArrowUp size={28} aria-hidden="true" />
            </motion.div>
            <div className="text-white/30 text-xs tracking-[0.3em] font-light uppercase">
              {locale === 'fr' ? 'Appuyez pour continuer' : 'Tap to continue'}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}