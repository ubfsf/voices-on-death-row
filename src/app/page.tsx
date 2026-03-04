"use client";
import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { Howl } from 'howler';
import ContactForm from "@/components/ContactForm";
import StorySection from "@/components/StorySection";
import SplitHero from "@/components/SplitHero";

export default function HomePage() {
  const t = useTranslations('HomePage');
  const [hasEntered, setHasEntered] = useState(false);
  const [shouldBounce, setShouldBounce] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    // 1. Initialize local rain sound
    soundRef.current = new Howl({
      src: ['/sounds/rain-loop-2400.wav'],
      loop: true,
      volume: 0, 
    });

    // 2. Scroll logic: The landing page slides UP once the user starts scrolling
    const handleScroll = () => {
      if (window.scrollY > 10 && !hasEntered) {
        if (soundRef.current) {
          // Fade out the rain as the documentary content appears
          soundRef.current.fade(0.15, 0, 2000); 
        }
        setHasEntered(true);
        setTimeout(() => {
          if (soundRef.current) soundRef.current.stop();
        }, 2000);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (soundRef.current) soundRef.current.unload();
    };
  }, [hasEntered]);

  // Start the rain sound with a very low, subtle volume for that "quiet" creative feel
  const startAtmosphere = () => {
    if (soundRef.current && !soundRef.current.playing()) {soundRef.current.fade(0, 0.2, 3000); 
      soundRef.current.play();
      soundRef.current.fade(0, 0.15, 4000); // Fades in to only 15% volume
    }
  };

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { delay: 0.5, staggerChildren: 0.12 }
    }
  };

  const letter = {
    hidden: { opacity: 0, y: 10, filter: "blur(5px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" }
  };

  // Hint logic: Start a subtle upward bounce after 3 seconds
    const hintTimer = setTimeout(() => setShouldBounce(true), 3000);

  // Scroll logic: The page "bunches up" and slides UP
    const handleScroll = () => {
      if (window.scrollY > 10 && !hasEntered) {
        if (soundRef.current) soundRef.current.fade(0.2, 0, 2000);
        setHasEntered(true);
        setTimeout(() => {
          if (soundRef.current) soundRef.current.stop();
        }, 2000);
      }
    };

  return (
    <main 
      className="relative min-h-[200vh] overflow-x-hidden" 
      onMouseEnter={startAtmosphere} 
      onClick={startAtmosphere}
    >
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          /* 1. ARTISTIC SPLASH SCREEN - SLIDES UP ON SCROLL */
          <motion.div 
            key="landing"
            initial={{ y: 0 }}
            animate={shouldBounce ? { y: [0, -10, 0] } : {}}
            transition={shouldBounce ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
            exit={{ y: "-100%", transition: { duration: 1.2, ease: [0.45, 0, 0.55, 1] } }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] text-white"
          >
            <div className="absolute inset-0 opacity-20">
               <video autoPlay loop muted playsInline className="w-full h-full object-cover grayscale">
                 <source src="/videos/writing-hand.mp4" type="video/mp4" />
               </video>
               <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
            </div>

            <div className="relative z-10 text-center px-6 max-w-5xl">
              <motion.h1 
                variants={sentence} initial="hidden" animate="visible"
                className="text-4xl md:text-6xl font-artistic tracking-tighter mb-8 italic"
              >
                {t('hero_title').split("").map((char, index) => (
                  <motion.span key={index} variants={letter}>{char}</motion.span>
                ))}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ delay: 3, duration: 2 }}
                className="text-[10px] md:text-xs tracking-[0.8em] uppercase font-sans font-light"
              >
                {t('hero_subtitle')}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 5, duration: 1 }}
                className="mt-20 flex flex-col items-center gap-4 opacity-30"
              >
                <span className="text-[8px] uppercase tracking-[0.6em] font-sans italic">Scroll upward to begin</span>
              </motion.div>
            </div> <ChevronUp className="w-4 h-4" />
          </motion.div>
        ) : (
          /* 2. THE DOCUMENTARY EXPERIENCE */
          <motion.div 
            key="content" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 2.5 }}
          >
            {/* Cinematic Opening (The Patience) */}
            <section className="relative h-screen flex items-center justify-center text-center px-6 bg-black overflow-hidden">
              <div className="absolute inset-0 opacity-20 grayscale">
                <img src="/images/style-cinematic.jpg" className="w-full h-full object-cover" alt="Cinematic" />
              </div>
              <div className="relative z-10 max-w-4xl text-white">
                <h2 className="text-7xl md:text-9xl font-artistic italic tracking-tighter mb-12">The Patience</h2>
                <div className="prose prose-invert mx-auto italic text-xl md:text-2xl opacity-60 font-artistic leading-relaxed">
                  <p>"The muscles must tear and repair... a concept coming to you in a moment devoid of intention."</p>
                </div>
              </div>
            </section>

            {/* Story Sections */}
            <StorySection image="/images/hero-illustration.png" side="left">
              <h2 className="text-5xl font-artistic italic mb-8 border-b border-stone-200 pb-4 inline-block text-stone-900">A Human Identity</h2>
              <p className="text-2xl font-artistic leading-relaxed text-stone-800 italic">"In 2020, a creative idea came to mind. We didn't know where to start."</p>
            </StorySection>

            <SplitHero 
              title="Reclaiming the Narrative"
              text={t('mission')}
              imageSide="right"
            />

            <StorySection image="/images/style-editorial.jpg" side="right">
              <h2 className="text-5xl font-artistic italic mb-8 border-b border-stone-200 pb-4 inline-block text-stone-900">Strategic Reform</h2>
              <p className="text-2xl font-artistic text-stone-800 italic">We prioritize strategic arts programming and professional development for those within the system.</p>
            </StorySection>

            {/* Final Contact Portal */}
            <div className="max-w-6xl mx-auto px-8 py-60 border-t border-stone-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                <div>
                  <h1 className="hero-title text-8xl text-stone-900">Connect</h1>
                  <p className="ink-text text-2xl opacity-60 mt-8">For inquiries regarding research, media, or participation, please reach out.</p>
                  <div className="mt-16 pt-12 border-t border-stone-200">
                    <p className="text-sm font-bold tracking-tight text-stone-900">Halima Kilgore</p>
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 mt-1">Founder, Voices On Death Row</p>
                  </div>
                </div>
                <div className="bg-white p-12 shadow-2xl border border-stone-100">
                  <ContactForm />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
