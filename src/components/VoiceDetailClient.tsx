"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Typewriter from "@/components/Typewriter";

export default function VoiceDetailClient({ voice, locale, slug }: any) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Cinematic transforms for the hero section
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);

  const narrativeSections = [
    { id: "01", label: "THE STORY", content: voice.about },
    { id: "02", label: "LEGAL SITUATION", content: voice.legalSituation },
    { id: "03", label: "PERSONAL LIFE", content: voice.personalLife },
    { id: "04", label: "VOICE & EXPRESSION", content: voice.voiceExpression },
  ].filter(s => s.content);

  return (
    <main ref={containerRef} className="bg-[#f2efe8] min-h-[500vh] text-black font-sans selection:bg-black selection:text-white relative overflow-x-hidden">
      
      {/* Cinematic Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* 1. FIXED NAVIGATION - High visibility for the "Back" button */}
      <Link 
        href={`/${locale}/voices`} 
        className="fixed top-8 left-8 md:top-12 md:left-12 z-[100] flex items-center gap-3 group"
      >
        <div className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center bg-white/50 backdrop-blur-md group-hover:bg-black group-hover:text-white transition-all duration-500 shadow-sm">
          <span className="text-lg">←</span>
        </div>
        <span className="font-black uppercase text-[10px] tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">
          Archive
        </span>
      </Link>

      {/* 2. RESPONSIVE HERO: Name and Image */}
      <section className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-6 md:px-20">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          
          {/* LEFT: Name - Adjusted sizes for better window fit */}
          <div className="lg:col-span-6 z-20 order-2 lg:order-1">
            <motion.div layoutId={`name-${slug}`}>
              <h1 className="text-6xl sm:text-7xl md:text-[7vw] font-black uppercase leading-[0.85] tracking-tighter mb-6">
                {voice.name.split(' ')[0]} <br/>
                <span className="text-stone-400/60">{voice.name.split(' ').slice(1).join(' ')}</span>
              </h1>
            </motion.div>
            <p className="font-mono text-[9px] uppercase tracking-[0.6em] text-stone-400">
              Documentary Entry // {voice.inmateNumber || '000'}
            </p>
          </div>

          {/* RIGHT: Polaroid */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end order-1 lg:order-2">
            <motion.div 
              layoutId={`image-${slug}`}
              className="relative w-full max-w-[320px] sm:max-w-md md:max-w-lg"
            >
              <img 
                src={voice.imageUrl} 
                alt={voice.name} 
                className="w-full h-auto block drop-shadow-2xl rotate-1" 
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 3. NARRATIVE: Scaled down text for readability */}
      <div className="relative z-30 max-w-5xl mx-auto px-6 md:px-20 pb-[100vh] pt-[20vh]">
        {narrativeSections.map((section, index) => (
          <motion.section 
            key={section.label}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col mb-[40vh] md:mb-[60vh] ${index % 2 === 0 ? 'items-start' : 'items-end'}`}
          >
            <div className="w-full md:w-10/12 space-y-12">
              <div className="flex items-center gap-6">
                <div className="h-px w-12 bg-black/10" />
                <span className="text-stone-400 font-mono text-[10px] uppercase tracking-[0.6em] font-bold">
                  {section.label}
                </span>
              </div>
              
              {/* Text Size: text-2xl for mobile, text-4xl for desktop (Reduced from 6xl) */}
              <div className="text-2xl md:text-4xl font-light italic leading-[1.4] tracking-tight text-stone-900 whitespace-pre-wrap border-l border-black/5 pl-8 md:pl-16">
                <Typewriter text={section.content} speed={0.005} />
              </div>
            </div>
          </motion.section>
        ))}

        {/* BELIEF QUOTE */}
        {voice.beliefQuote && (
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="py-40 text-center border-t border-black/5"
          >
            <blockquote className="text-3xl md:text-6xl font-black italic uppercase tracking-tighter text-black/10 leading-tight">
              "{voice.beliefQuote}"
            </blockquote>
          </motion.section>
        )}
      </div>

      {/* 4. FOOTER */}
      <footer className="relative h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="w-px h-40 bg-gradient-to-b from-stone-300 to-transparent mb-12" />
        <Link 
          href={`/${locale}/voices`}
          className="group relative inline-flex items-center gap-6 px-12 py-5 border border-black/10 hover:bg-black hover:text-white transition-all duration-700"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.8em] font-bold">Return to Archive</span>
          <div className="w-2 h-2 bg-black rounded-full group-hover:bg-white animate-pulse" />
        </Link>
      </footer>
    </main>
  );
}
