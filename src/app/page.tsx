"use client";
import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { Howl } from 'howler';
import ContactForm from "@/components/ContactForm";
import Typewriter from "@/components/Typewriter";

export default function HomePage() {
  const t = useTranslations('HomePage');
  const [hasEntered, setHasEntered] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    // 1. Initialize the writing sound
    soundRef.current = new Howl({
      src: ['/sounds/writing.mp3'],
      loop: true,
      volume: 0.3,
    });

    // 2. Navigation Logic: When user scrolls up, slide intro away
    const handleScroll = () => {
      if (window.scrollY > 10 && !hasEntered) {
        setHasEntered(true);
        if (soundRef.current) {
          soundRef.current.fade(0.3, 0, 2000); 
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (soundRef.current) soundRef.current.unload();
    };
  }, [hasEntered]);

  const startAtmosphere = () => {
    if (soundRef.current && !soundRef.current.playing()) {
      soundRef.current.play();
    }
  };

  return (
    <main 
      className="relative min-h-[200vh] paper-texture overflow-x-hidden text-stone-900"
      onClick={startAtmosphere}
    >
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          /* SECTION 1: THE BLACK INTRO GATE (Slides UP on scroll) */
          <motion.div 
            key="landing"
            exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.45, 0, 0.55, 1] } }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] text-white"
          >
            <div className="absolute inset-0 opacity-20">
               <video autoPlay loop muted playsInline className="w-full h-full object-cover grayscale">
                 <source src="/videos/writing-hand.mp4" type="video/mp4" />
               </video>
            </div>
            <div className="relative z-10 text-center px-6">
              <h1 className="hero-title-clean text-2xl md:text-4xl uppercase tracking-[0.7em]">
                {t('hero_title')}
              </h1>
              <p className="text-[9px] tracking-[0.5em] uppercase font-sans font-light mt-6 opacity-40">
                {t('hero_subtitle')}
              </p>
              <div className="mt-40 flex flex-col items-center gap-4 opacity-20">
                <ChevronUp className="w-5 h-5 animate-bounce" />
                <span className="text-[8px] uppercase tracking-[0.6em] italic font-sans text-white">Scroll up to begin</span>
              </div>
            </div>
          </motion.div>
        ) : (
          /* SECTION 2: THE REVEALED CONTENT */
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1.5 }}
            className="w-full"
          >
            
            {/* ORDER 1: THE DEEP TEXT - Starts typing immediately after scroll-up */}
            <section className="h-screen flex flex-col items-center justify-center px-8 text-center bg-transparent">
                 <Typewriter 
                   text="My name is… I have been on death row for 19 years. I am writing this from a place the world rarely sees."
                   className="story-text-main"
                   delay={0.6} // Wait for the intro slide to finish
                 />
            </section>

            {/* ORDER 2: THE IMAGE - Fades in as you scroll down */}
            <section className="min-h-screen flex items-center justify-center px-8 py-40">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.98 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 2 }}
                 viewport={{ once: true, margin: "-10%" }}
                 className="relative w-full max-w-4xl"
               >
                 <img 
                   src="/images/hero-illustration.png" 
                   className="w-full grayscale border border-stone-200 p-3 bg-white shadow-2xl contrast-125" 
                   alt="Prisoner Illustration" 
                 />

                 {/* ORDER 3: THE QUOTE - Appears on top of the image */}
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: 1, duration: 1.5 }}
                   className="absolute -bottom-8 -right-8 bg-[#fcfaf7] border border-stone-200 p-8 shadow-2xl max-w-xs hidden md:block"
                 >
                    <p className="font-artistic italic text-stone-800 text-xl leading-tight">
                      "A voice from inside."
                    </p>
                    <div className="mt-4 w-12 h-[1px] bg-stone-300" />
                 </motion.div>
               </motion.div>
            </section>

            {/* ORDER 4: MISSION RECAP */}
            <section className="py-60 px-8 max-w-4xl mx-auto text-center border-t border-stone-100">
                <Typewriter 
                  text={t('mission')}
                  className="text-xl md:text-2xl font-artistic italic text-stone-500 leading-relaxed"
                />
            </section>

            {/* FINAL CONTACT */}
            <section className="py-60 border-t border-stone-200 bg-white relative z-50">
              <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                <div>
                  <h1 className="text-8xl font-artistic italic lowercase tracking-tighter text-stone-900">connect</h1>
                  <p className="ink-text text-2xl opacity-60 mt-8">
                    We are a student-led cooperative. Join us in preserving these stories.
                  </p>
                  <div className="mt-16 pt-12 border-t border-stone-100">
                    <p className="text-sm font-bold tracking-tight text-stone-900">Halima Kilgore</p>
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 mt-1 font-sans">Founder, Voices On Death Row</p>
                  </div>
                </div>
                <ContactForm />
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
