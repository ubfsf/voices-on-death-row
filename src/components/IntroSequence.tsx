// src/components/IntroSequence.tsx
"use client";
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';

interface IntroSequenceProps {
  onComplete?: () => void;
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const params = useParams();
  const locale = params.locale || 'en';
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-play video
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay prevented, show play button
      });
    }

    // Scroll to exit intro
    const handleScroll = () => {
      if (window.scrollY > 50) {
        handleComplete();
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Auto-advance after 8 seconds (faster for better UX)
    const timer = setTimeout(() => {
      handleComplete();
    }, 8000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleComplete = () => {
    setIsVisible(false);
    if (onComplete) {
      onComplete();
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center cursor-pointer"
      onClick={handleComplete}
    >
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          onEnded={handleComplete}
        >
          <source src="/videos/writing-hand.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-8xl font-serif font-black text-white uppercase tracking-tight leading-none"
          >
            {locale === 'fr' ? 'Voix du Couloir de la Mort' : 'Voices On Death Row'}
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            className="text-stone-300 text-sm md:text-base mt-4 font-light tracking-[0.3em] uppercase"
          >
            {locale === 'fr' ? 'Histoires de l\'intérieur' : 'Stories from the Inside'}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-8 flex flex-col items-center gap-4"
          >
            <div className="text-white/40 text-xs tracking-[0.2em] font-light animate-pulse">
              {locale === 'fr' ? 'Défiler pour entrer' : 'Scroll to enter'}
            </div>
            <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}