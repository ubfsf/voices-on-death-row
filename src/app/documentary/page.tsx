"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Howl } from 'howler';
import Typewriter from "@/components/Typewriter";
import ContactForm from "@/components/ContactForm";

export default function DocumentaryPage() {
  const [hasEntered, setHasEntered] = useState(false);
  const containerRef = useRef(null);
  
  // 1. Scroll Tracking for the "Drift" effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Random drift values for a non-traditional feel
  const drift1 = useTransform(scrollYProgress, [0.2, 0.4], [0, -100]);
  const drift2 = useTransform(scrollYProgress, [0.3, 0.6], [0, 150]);
  const drift3 = useTransform(scrollYProgress, [0.5, 0.8], [0, -80]);

  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: ['/sounds/rain-loop-2400.wav'],
      loop: true,
      volume: 0, 
    });

    const handleScroll = () => {
      if (window.scrollY > 10 && !hasEntered) {
        setHasEntered(true);
        if (soundRef.current) soundRef.current.fade(0.15, 0, 2000);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasEntered]);

  return (
    <main ref={containerRef} className="relative min-h-[600vh] paper-texture overflow-x-hidden text-stone-900">
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          /* SECTION 1: THE BLACK INTRO */
          <motion.div 
            key="intro"
            exit={{ y: "-100%", transition: { duration: 1, ease: [0.45, 0, 0.55, 1] } }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] text-white"
          >
            <div className="absolute inset-0 opacity-20">
               <video autoPlay loop muted playsInline className="w-full h-full object-cover grayscale">
                 <source src="/videos/writing-hand.mp4" type="video/mp4" />
               </video>
            </div>
            <h1 className="text-3xl md:text-5xl font-sans uppercase tracking-[0.8em] font-light">Voices</h1>
            <p className="mt-20 text-[8px] uppercase tracking-[0.6em] opacity-20 italic animate-bounce">Scroll up to open</p>
          </motion.div>
        ) : (
          /* SECTION 2: THE FLOWING STORY */
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
            
            {/* 2A: THE TEXT REVEAL (Types immediately) */}
            <section className="h-screen flex items-center justify-center px-8">
              <Typewriter 
                text="They tell you death is a moment. They don't tell you it is a thousand days of waiting for a door to open that never will."
                className="text-4xl md:text-4xl font-artistic italic text-center max-w-4xl leading-tight"
                delay={0.5}
              />
            </section>

            {/* 2B: THE CENTERED IMAGE (Reveals as you scroll past text) */}
            <section className="min-h-screen flex items-center justify-center py-40">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 2 }}
                className="w-full max-w-4xl"
              >
                <img src="/images/hero-illustration.png" className="w-full grayscale border border-stone-200 p-2 bg-white shadow-2xl" alt="Prisoner" />
              </motion.div>
            </section>

            {/* 2C: THE DRIFTING ARCHIVE (Placeholder Images) */}
            <section className="py-96 space-y-[40vh]">
               {/* Placeholder 1: Left Drift */}
               <motion.div style={{ x: drift1 }} className="max-w-md ml-20">
                 <div className="bg-stone-200 aspect-video w-full grayscale border border-stone-300 flex items-center justify-center text-[10px] uppercase tracking-widest text-stone-500">Image Placeholder 01</div>
                 <Typewriter text="The silence here has a weight. It presses against your chest until you forget how to breathe." className="mt-8 font-artistic italic text-2xl text-stone-400" />
               </motion.div>

               {/* Placeholder 2: Right Drift */}
               <motion.div style={{ x: drift2 }} className="max-w-lg ml-auto mr-20">
                 <div className="bg-stone-200 aspect-square w-full grayscale border border-stone-300 flex items-center justify-center text-[10px] uppercase tracking-widest text-stone-500">Image Placeholder 02</div>
                 <Typewriter text="We write because paper is the only thing that can cross the line we cannot." className="mt-8 font-artistic italic text-2xl text-stone-800" />
               </motion.div>

               {/* Placeholder 3: Slow Vertical Drift */}
               <motion.div style={{ y: drift3 }} className="max-w-2xl mx-auto text-center">
                 <h2 className="text-6xl font-artistic italic mb-12">The Archive</h2>
                 <div className="bg-stone-200 aspect-video w-full grayscale border border-stone-300 flex items-center justify-center text-[10px] uppercase tracking-widest text-stone-500">Documentary Video Placeholder</div>
               </motion.div>
            </section>

            {/* SECTION 3: THE CONTACT (At the very bottom) */}
            <section className="py-60 border-t border-stone-200 bg-white">
              <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24">
                <div>
                  <h1 className="text-7xl font-artistic italic lowercase tracking-tighter">connect</h1>
                  <p className="ink-text text-xl opacity-60 mt-8">For inquiries regarding research or participation, please reach out.</p>
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
