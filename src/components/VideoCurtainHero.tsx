// src/components/VideoCurtainHero.tsx
//
// Full-screen video hero that sits *underneath* the main content curtain.
// The video (writing-hand loop) plays muted/inline so autoplay works on
// iOS and Android.  The parent (homepage) listens for wheel / touch-swipe
// gestures and slides the next section up over this layer — this component
// is purely presentational and is unmounted once the curtain has settled.
"use client";
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { ArrowDown } from 'lucide-react';

export default function VideoCurtainHero() {
  const params = useParams();
  const locale = params.locale || 'en';
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Muted autoplay is allowed by all modern browsers; catch just in case.
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-hidden">
      {/* ── Background Video (decorative) ── */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/videos/writing-hand.mp4" type="video/mp4" />
      </video>

      {/* ── Overlay Gradient (contrast for the title) ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      {/* ── Overlay Content ── */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
          className="text-5xl md:text-8xl lg:text-9xl font-serif font-black text-white uppercase tracking-tight leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
        >
          {locale === 'fr' ? 'Voix du Couloir de la Mort' : 'Voices On Death Row'}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
          className="text-stone-200 text-sm md:text-base mt-6 font-light tracking-[0.3em] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
        >
          {locale === 'fr' ? "Histoires de l'intérieur" : 'Stories from the Inside'}
        </motion.p>

        {/* ── Bouncing scroll / swipe hint ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-12 flex flex-col items-center gap-3"
        >
          <div className="text-white/30 text-xs tracking-[0.3em] font-light uppercase">
            {locale === 'fr' ? 'Défiler / Glisser pour entrer' : 'Scroll / Swipe Up to Enter'}
          </div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="text-white/60"
          >
            <ArrowDown size={28} />
          </motion.div>
          <motion.div
            animate={{ height: [20, 40, 20] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-px bg-gradient-to-b from-white/30 to-transparent"
          />
        </motion.div>
      </div>
    </div>
  );
}
