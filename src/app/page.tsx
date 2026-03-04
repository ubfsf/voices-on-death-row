"use client";
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, ScrollText } from 'lucide-react';
import ContactForm from "@/components/ContactForm";
import SplitHero from "@/components/SplitHero";

export default function HomePage() {
  const t = useTranslations('HomePage');
  const [hasEntered, setHasEntered] = useState(false);

  // Typewriter animation settings
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { delay: 0.5, staggerChildren: 0.08 }
    }
  };

  const letter = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="relative min-h-screen bg-[#fcfaf7] overflow-x-hidden text-stone-900 font-serif">
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          /* 1. IMMERSIVE OPENING EXPERIENCE */
          <motion.div 
            key="landing"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white"
          >
            {/* Background Visual */}
            <div className="absolute inset-0 opacity-40">
               <img 
                src="/images/writing.png" 
                className="w-full h-full object-cover"
                alt="Hand writing a letter"
               />
               <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Typewriter Text Overlay */}
            <div className="relative z-10 text-center px-6 max-w-4xl">
              <motion.h1 
                variants={sentence}
                initial="hidden"
                animate="visible"
                className="text-4xl md:text-6xl tracking-[0.2em] mb-6 font-light uppercase"
              >
                {t('hero_title').split("").map((char, index) => (
                  <motion.span key={index} variants={letter}>{char}</motion.span>
                ))}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 2.5, duration: 2 }}
                className="text-sm md:text-lg tracking-[0.4em] uppercase font-sans font-light mb-16 border-t border-white/20 pt-8"
              >
                {t('hero_subtitle')}
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4, duration: 1 }}
                onClick={() => setHasEntered(true)}
                className="group relative border border-white/30 px-16 py-5 text-[10px] tracking-[0.5em] hover:bg-white hover:text-black transition-all duration-700 uppercase font-sans"
              >
                {t('enter_button')}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          /* 2. MAIN WEBSITE INTERFACE (Scroll Storytelling) */
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            {/* SECTION 01: CINEMATIC (Mick Jenkins Style) */}
            <section className="relative h-screen flex items-center justify-center text-center px-6 bg-black overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img src="/images/style-cinematic.jpg" className="w-full h-full object-cover opacity-40 grayscale" alt="Cinematic" />
              </div>
              <div className="relative z-10 max-w-4xl">
                <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 0.5 }} className="text-[10px] uppercase tracking-[0.5em] text-white mb-8 block font-sans">Chapter 01</motion.span>
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-6xl md:text-9xl text-white mb-12 tracking-tighter italic">THE PATIENCE</motion.h2>
                <div className="prose prose-invert mx-auto italic text-lg md:text-2xl leading-relaxed opacity-70">
                  <p>"The muscles must tear and repair... the understanding of a concept coming to you in a moment completely devoid of artistic intention."</p>
                </div>
              </div>
            </section>

            {/* SECTION 02: EDITORIAL (Magazine Style) */}
            <section className="py-32 bg-[#fcfaf7] border-y border-stone-200">
              <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                <img src="/images/style-editorial.jpg" className="w-full shadow-2xl border border-stone-200" alt="Editorial Style" />
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold mb-6 block font-sans">The System</span>
                  <h2 className="text-5xl italic mb-8 leading-tight">Culturally Relevant & Informed.</h2>
                  <p className="prose prose-stone text-lg leading-relaxed opacity-80 italic">
                    We prioritize strategic arts programming and professional development for those within the system to disrupt the school-to-prison pipeline.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 03: SPLIT HERO (MLK Style) */}
            <SplitHero 
              title="A Human Identity"
              text="In 2020, a creative idea came to mind. Not because we don't want to, but because we don't know where to start. This project is about giving that starting point to those who have been silenced."
              imageSide="left"
            />

            {/* SECTION 04: HANDWRITTEN (Archive Preview) */}
            <section className="relative py-40 bg-stone-900 text-white overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <img src="/images/style-handwritten.jpg" className="w-full h-full object-cover" alt="Handwritten letters" />
              </div>
              <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
                <h2 className="text-5xl md:text-7xl italic mb-12 tracking-tight">Why wait to fight?</h2>
                <p className="text-xl italic opacity-60 mb-16 max-w-2xl mx-auto leading-relaxed">
                  "Hope I only leave good vibes on your living room floor... cause sometimes it's better that way."
                </p>
                <a href="/letters" className="inline-block border border-white/30 px-12 py-4 text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all font-sans">
                  Explore the Letters
                </a>
              </div>
            </section>

            {/* FINAL SECTION: MISSION & CONTACT */}
            <div className="max-w-4xl mx-auto px-8 py-32">
              <h1 className="text-5xl md:text-7xl italic mb-12 leading-tight text-center">
                {t('title')}
              </h1>

              <article className="prose prose-stone lg:prose-xl italic opacity-80 mx-auto text-center leading-relaxed mb-32">
                <p>{t('mission')}</p>
              </article>

              {/* GRID LINKS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-stone-200 pt-16 mb-32 font-sans">
                <div className="group cursor-pointer">
                  <ScrollText className="w-5 h-5 mb-6 opacity-30 group-hover:opacity-100 transition-opacity text-stone-900" />
                  <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4 text-stone-400">{t('archive_label')}</h3>
                  <p className="text-stone-600 text-sm italic leading-relaxed">{t('archive_desc')}</p>
                </div>
                <div className="group cursor-pointer">
                  <Mic className="w-5 h-5 mb-6 opacity-30 group-hover:opacity-100 transition-opacity text-stone-900" />
                  <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4 text-stone-400">{t('podcast_label')}</h3>
                  <p className="text-stone-600 text-sm italic leading-relaxed">{t('podcast_desc')}</p>
                </div>
              </div>

              {/* INTERACTIVE CONTACT */}
              <div className="bg-stone-100 p-12 rounded-sm border border-stone-200 flex flex-col md:flex-row justify-between items-start gap-16">
                <div className="max-w-sm">
                  <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4 text-stone-400 font-sans">{t('contact_label')}</h3>
                  <h2 className="text-3xl italic text-stone-900 mb-6">{t('contact_title')}</h2>
                  <p className="text-sm text-stone-500 leading-relaxed mb-10">
                    {t('contact_desc')}
                  </p>
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
