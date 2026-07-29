// src/components/IntroSequence.tsx
"use client";
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';

interface IntroSequenceProps {
  onComplete?: () => void;
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const params = useParams();
  const locale = params.locale || 'en';
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartY = useRef(0);

  useEffect(() => {
    // Auto-play video
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    // ✅ SCROLL UP DETECTION
    const handleScroll = () => {
      // If user scrolls UP (scrollY < 0 means scrolling up)
      if (window.scrollY > 50) {
        handleComplete();
      }
    };

    // ✅ TOUCH DETECTION FOR MOBILE (scroll up)
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchEndY = e.touches[0].clientY;
      const diff = touchStartY.current - touchEndY;
      // If user swiped UP (diff > 50 means swiping up)
      if (diff > 50) {
        handleComplete();
      }
    };

    // ✅ WHEEL DETECTION (scroll up)
    const handleWheel = (e: WheelEvent) => {
      // If user scrolls UP (deltaY < 0 means scrolling up)
      if (e.deltaY < -30) {
        handleComplete();
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('wheel', handleWheel);

    // Auto-advance after 12 seconds (fallback)
    const timer = setTimeout(() => {
      handleComplete();
    }, 12000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(timer);
    };
  }, []);

  const handleComplete = () => {
    setIsVisible(false);
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -50,
            transition: { duration: 0.6, ease: "easeInOut" }
          }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
        >
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              muted
              playsInline
              onEnded={() => {
                // Don't auto-close on video end - wait for scroll
              }}
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
              
              {/* ✅ SCROLL UP INDICATOR */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="mt-8 flex flex-col items-center gap-4"
              >
                <div className="text-white/40 text-xs tracking-[0.2em] font-light animate-pulse">
                  ↑ {locale === 'fr' ? 'Défiler vers le haut pour entrer' : 'Scroll up to enter'}
                </div>
                <div className="w-px h-12 bg-gradient-to-t from-white/40 to-transparent animate-pulse" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}