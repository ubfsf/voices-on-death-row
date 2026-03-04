"use client";
import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, ScrollText } from 'lucide-react';
import ContactForm from "@/components/ContactForm";

export default function HomePage() {
  const t = useTranslations('HomePage');
  const [hasEntered, setHasEntered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Typewriter animation settings for the intro
  const sentence = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };
  const letter = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="relative min-h-screen bg-[#fcfaf7] overflow-x-hidden text-stone-900 font-serif">
      {/* 1. THE SOUND ENGINE (Pencil writing sound) */}
      <audio ref={audioRef} src="/sounds/pencil.mp3" loop />

      <AnimatePresence mode="wait">
        {!hasEntered ? (
          /* 2. IMMERSIVE OPENING EXPERIENCE (Black screen with writing hand) */
          <motion.div 
            key="landing"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white"
          >
            <div className="absolute inset-0 opacity-40">
               <img src="/images/writing.png" className="w-full h-full object-cover" alt="Writing" />
               <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="relative z-10 text-center px-6 max-w-4xl">
              <motion.h1 
                variants={sentence} initial="hidden" animate="visible"
                onAnimationComplete={() => audioRef.current?.play()}
                className="text-4xl md:text-6xl tracking-[0.2em] mb-6 font-light uppercase"
              >
                {t('hero_title').split("").map((char, index) => (
                  <motion.span key={index} variants={letter}>{char}</motion.span>
                ))}
              </motion.h1>
              
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 2.5, duration: 2 }} className="text-sm md:text-lg tracking-[0.4em] uppercase font-sans font-light mb-16 border-t border-white/20 pt-8">
                {t('hero_subtitle')}
              </motion.p>

              <motion.button
                onClick={() => { setHasEntered(true); audioRef.current?.pause(); }}
                className="group relative border border-white/30 px-16 py-5 text-[10px] tracking-[0.5em] hover:bg-white hover:text-black transition-all duration-700 uppercase font-sans"
              >
                {t('enter_button')}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          /* 3. INTERACTIVE DOCUMENTARY (Scroll Reveal Sections) */
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
            
            {/* CHAPTER 01: CINEMATIC REVEAL (The Patience) */}
            <section className="relative h-screen flex items-center justify-center text-center px-6 bg-black overflow-hidden shadow-inner">
              <div className="absolute inset-0 opacity-30 grayscale">
                <img src="/images/style-cinematic.jpg" className="w-full h-full object-cover" alt="Cinematic" />
              </div>
              <div className="relative z-10 max-w-4xl">
                <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 0.5 }} className="text-[10px] uppercase tracking-[0.5em] text-white mb-8 block font-sans">Chapter 01</motion.span>
                <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-6xl md:text-9xl text-white italic tracking-tighter mb-12">The Patience</motion.h2>
                <div className="prose prose-invert mx-auto italic text-lg md:text-2xl leading-relaxed opacity-70">
                  <p>"The muscles must tear and repair... the understanding of a concept coming to you in a moment completely devoid of artistic intention."</p>
                </div>
              </div>
            </section>

            {/* CHAPTER 02: SIMPLE IMAGE + TEXT REVEAL (Replaced MLK Split) */}
            <section className="py-40 bg-[#fcfaf7] border-y border-stone-100">
              <div className="max-w-5xl mx-auto px-8 flex flex-col items-center text-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  whileInView={{ opacity: 1, scale: 1 }} 
                  transition={{ duration: 1.5 }}
                  className="mb-20 w-full max-w-3xl"
                >
                  <img src="/images/hero-illustration.png" className="w-full grayscale border border-stone-200 p-2 bg-white shadow-xl" alt="Friend Illustration" />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}>
                  <h2 className="text-5xl italic mb-8">A Human Identity</h2>
                  <p className="prose prose-stone text-xl italic opacity-80 leading-relaxed max-w-2xl mx-auto">
                    "In 2020, a creative idea came to mind. Not because we don't want to, but because we don't know where to start."
                  </p>
                </motion.div>
              </div>
            </section>

            {/* CHAPTER 03: EDITORIAL SPREAD (Yellow Style) */}
            <section className="py-40 bg-white">
              <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                <motion.img 
                  initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}
                  src="/images/style-editorial.jpg" className="w-full shadow-2xl border border-stone-200" alt="Editorial" 
                />
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold mb-6 block font-sans">The Mission</span>
                  <h2 className="text-5xl italic mb-8 leading-tight">Culturally Relevant & Informed.</h2>
                  <p className="prose prose-stone text-lg leading-relaxed opacity-80 italic">
                    {t('mission')}
                  </p>
                </motion.div>
              </div>
            </section>

            {/* CHAPTER 04: HANDWRITTEN COLLAGE (Archive Preview) */}
            <section className="relative py-60 bg-stone-950 text-white overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <img src="/images/style-handwritten.jpg" className="w-full h-full object-cover" alt="Archive" />
              </div>
              <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
                <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.5 }} className="text-6xl md:text-8xl italic mb-12 tracking-tight">Why wait to fight?</motion.h2>
                <p className="text-xl italic opacity-60 mb-16 max-w-2xl mx-auto leading-relaxed">
                  "Every letter carries a voice the world has forgotten. We document real human stories that are often erased."
                </p>
                <a href="/letters" className="inline-block border border-white/30 px-16 py-5 text-[10px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all font-sans">
                  Enter the Archive
                </a>
              </div>
            </section>

            {/* FINAL SECTION: CONTACT & MISSION RECAP */}
            <div className="max-w-4xl mx-auto px-8 py-40">
              <div className="bg-stone-100 p-12 rounded-sm border border-stone-200 flex flex-col md:flex-row justify-between items-start gap-16 shadow-sm">
                <div className="max-w-sm">
                  <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4 text-stone-400 font-sans">{t('contact_label')}</h3>
                  <h2 className="text-3xl italic text-stone-900 mb-6">{t('contact_title')}</h2>
                  <p className="text-sm text-stone-500 leading-relaxed font-serif mb-10">{t('contact_desc')}</p>
                  <div className="pt-6 border-t border-stone-200 font-sans">
                    <p className="text-sm font-bold text-stone-900 tracking-tight">Halima Kilgore</p>
                    <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] mt-1">Executive Admin, UBFSF</p>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
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

