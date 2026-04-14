"use client";
import { useRef, useEffect } from "react";
import { useScroll, useTransform, motion, useSpring, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import ContactForm from "./ContactForm";

export default function StoryArchive() {
  const t = useTranslations("HomePage");
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Background shifts as we scroll deeper into the archive
  const bgOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 0.1, 0.15, 0.3]);

  // Letters and Drawings parallax effects
  const yLetter1 = useTransform(smoothProgress, [0, 0.3], [200, -50]);
  const opacityLetter1 = useTransform(smoothProgress, [0, 0.1, 0.25, 0.35], [0, 1, 1, 0]);

  const yLetter2 = useTransform(smoothProgress, [0.2, 0.5], [200, -50]);
  const opacityLetter2 = useTransform(smoothProgress, [0.2, 0.3, 0.45, 0.55], [0, 1, 1, 0]);

  const yQuote = useTransform(smoothProgress, [0.4, 0.7], [200, -50]);
  const opacityQuote = useTransform(smoothProgress, [0.4, 0.5, 0.65, 0.75], [0, 1, 1, 0]);

  const footerOpacity = useTransform(smoothProgress, [0.8, 0.95], [0, 1]);

  // Audio for atmosphere during scroll
  const atmosphereSound = useRef<Howl | null>(null);

  useEffect(() => {
    // Optionally we can play a lower-volume atmospheric drone here
    // For now we rely on the visual silence or adding a drone later.
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-[400vh] bg-[#0a0a09] text-stone-200 selection:bg-stone-700 selection:text-white pb-24">
      
      {/* Texture Layer */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="fixed inset-0 pointer-events-none z-0 bg-[url('/images/ink-texture.png')] bg-repeat mix-blend-screen opacity-10"
      />

      {/* Floating Elements Container */}
      <div className="fixed inset-0 pointer-events-none z-10 flex flex-col items-center justify-center overflow-hidden">
        
        {/* Fragment 1: The Initial Letter */}
        <motion.div
          style={{ y: yLetter1, opacity: opacityLetter1 }}
          className="absolute max-w-2xl px-8 text-center"
        >
          <p className="font-artistic italic text-3xl md:text-5xl leading-tight text-white/90 drop-shadow-2xl">
            "My name is… I have been on death row for 19 years. I am writing this from a place the world rarely sees."
          </p>
          <div className="mt-8 text-[11px] uppercase tracking-[0.4em] text-white/40 font-sans">
            Letter 01 / TX Polunsky Unit
          </div>
        </motion.div>

        {/* Fragment 2: The Illustration & Narrative */}
        <motion.div
          style={{ y: yLetter2, opacity: opacityLetter2 }}
          className="absolute w-full max-w-4xl px-8 flex flex-col md:flex-row items-center gap-12"
        >
          <div className="flex-1 relative">
             <img 
               src="/images/hero-illustration.png" 
               className="w-full border border-white/10 p-2 bg-black/50 shadow-2xl" 
               alt="Prisoner Illustration" 
             />
             <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none"></div>
          </div>
          <div className="flex-1 text-left">
             <h2 className="text-[10px] uppercase tracking-[0.5em] text-white/40 mb-6 font-sans">
               Art & Isolation
             </h2>
             <p className="text-xl md:text-2xl font-serif text-white/80 leading-relaxed indent-8">
               "When the door locks, the only way out is onto the page. You draw, you write, you remember what sunlight felt like."
             </p>
          </div>
        </motion.div>

        {/* Fragment 3: The Mission */}
        <motion.div
          style={{ y: yQuote, opacity: opacityQuote }}
          className="absolute max-w-3xl px-8 text-center"
        >
          <h2 className="text-[10px] uppercase tracking-[1em] text-white/30 mb-8 font-sans">
            The Cooperative Model
          </h2>
          <p className="text-3xl md:text-5xl font-artistic italic text-white/90 leading-tight">
             {t("mission")}
          </p>
          <div className="mt-12 w-24 h-px bg-white/20 mx-auto" />
        </motion.div>
      </div>

      {/* FOOTER & CONTACT (Reveals at the very end of scroll) */}
      <motion.div 
        style={{ opacity: footerOpacity }}
        className="absolute bottom-0 w-full min-h-screen flex items-center justify-center bg-white text-black z-20 pointer-events-auto"
      >
        <div className="max-w-6xl w-full mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-start py-32">
          <div>
            <h1 className="text-6xl md:text-8xl font-artistic italic lowercase tracking-tighter text-stone-900">
              about
            </h1>
            <p className="font-serif text-2xl opacity-70 mt-8 max-w-md leading-relaxed">
              Voices on Death Row was born from a deeply human connection and 17 years of correspondence. It is an advocacy project that aims to raise awareness, humanize, and spark meaningful conversations about those living on death row.
            </p>
            <div className="mt-16 pt-12 border-t border-stone-200 flex items-center gap-6">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold">
                H
              </div>
              <div>
                <p className="text-sm font-bold tracking-tight text-black uppercase">
                  Halima Kilgore
                </p>
                <p className="text-[10px] uppercase tracking-widest text-stone-500 mt-1 font-sans">
                  Founder & Project Lead
                </p>
              </div>
            </div>
          </div>
          <div className="bg-stone-50 p-8 border border-stone-200">
            <ContactForm />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
