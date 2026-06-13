"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import Typewriter from "@/components/Typewriter";

interface VoiceProps {
  voice: {
    name: string;
    inmateNumber?: string;
    facility?: string;
    photo?: any;
    about?: string;
    beliefQuote?: string;
    legalSituation?: string;
    professionalBackground?: string;
    personalLife?: string;
    voiceExpression?: string;
    supportAdvocacy?: string;
    contactInfo?: string;
    caseLink?: string;
  };
  locale: string;
  slug: string;
}

export default function VoiceDetailClient({ voice, locale, slug }: VoiceProps) {
  const containerRef = useRef(null);
  const fallbackImage = "/images/eyes.jpg"; 
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Cinematic transforms for the hero section
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);

  // Organize content - Neutral palette, no blue
  const narrativeSections = [
    { label: "01 // THE STORY", content: voice.about },
    { label: "02 // LEGAL SITUATION", content: voice.legalSituation },
    { label: "03 // PERSONAL LIFE", content: voice.personalLife },
    { label: "04 // PROFESSIONAL BACKGROUND", content: voice.professionalBackground },
    { label: "05 // MAILING DETAILS", content: voice.contactInfo },
  ].filter(s => s.content);

  return (
    <main ref={containerRef} className="bg-[#fcfaf7] min-h-screen text-black selection:bg-black selection:text-white relative overflow-x-hidden">
      
      {/* Cinematic Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* 1. NAVIGATION - Minimalist Archive Link */}
      <Link 
        href={`/${locale}/voices`} 
        className="fixed top-8 left-8 md:top-12 md:left-12 z-[100] flex items-center gap-3 group mix-blend-difference"
      >
        <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center bg-white/20 backdrop-blur-md group-hover:bg-black group-hover:text-white transition-all duration-500">
          <span className="text-lg">←</span>
        </div>
      </Link>

      {/* 2. HERO SECTION - Matching Screenshot Typography */}
      <section className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-6 md:px-20">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Large Serif Name Layout */}
          <div className="lg:col-span-7 z-20 order-2 lg:order-1">
            <h1 className="text-6xl sm:text-7xl md:text-[8vw] font-serif uppercase leading-[0.85] tracking-tighter mb-8">
              {voice.name.split(' ')[0]} <br/>
              <span className="text-stone-400 font-light">{voice.name.split(' ').slice(1).join(' ')}</span>
            </h1>
            <div className="flex items-center gap-4">
              <div className="w-1 h-1 bg-stone-300 rounded-full" />
              <p className="font-mono text-[9px] uppercase tracking-[0.6em] text-stone-400">
                Document Entry // {voice.inmateNumber || 'REF-000'}
              </p>
            </div>
          </div>

          {/* Polaroid Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative w-full max-w-[300px] sm:max-w-md shadow-2xl rotate-1 p-2 bg-white">
              <img 
                src={voice.photo ? urlFor(voice.photo).url() : fallbackImage} 
                alt={voice.name} 
                className="w-full h-auto block grayscale-[0.2]" 
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. NARRATIVE CONTENT - Clean Editorial Spacing */}
      <div className="relative z-30 max-w-5xl mx-auto px-6 md:px-20 pb-[20vh] pt-[20vh]">
        {narrativeSections.map((section, index) => (
          <motion.section 
            key={section.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-15%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col mb-[40vh] md:mb-[60vh] ${index % 2 === 0 ? 'items-start' : 'items-end'}`}
          >
            <div className="w-full md:w-11/12 space-y-12">
              <div className="flex items-center gap-6">
                <div className="h-px w-8 bg-black/20" />
                <span className="text-stone-400 font-mono text-[9px] uppercase tracking-[0.5em] font-bold">
                  {section.label}
                </span>
              </div>
              
              <div className="text-2xl md:text-4xl font-serif font-light italic leading-[1.5] tracking-tight text-stone-800 whitespace-pre-wrap border-l border-stone-200 pl-8 md:pl-16">
                <Typewriter text={section.content} speed={0.005} />
              </div>
            </div>
          </motion.section>
        ))}
      </div>

      {/* 4. FOOTER - Matching "CLOSE DOCUMENT" Screenshot */}
      <footer className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="space-y-24">
          <div className="space-y-8">
            <Link 
              href={`/${locale}/voices`}
              className="font-serif italic text-stone-400 text-2xl hover:text-black transition-colors"
            >
              Return to Archive
            </Link>
            <div className="w-px h-32 bg-stone-200 mx-auto" />
          </div>

          <div className="space-y-12">
            <Link 
              href={`/${locale}/letters?voice=${slug}`}
              className="group flex flex-col items-center gap-6"
            >
              <span className="font-sans text-[11px] uppercase tracking-[0.8em] text-stone-400 group-hover:text-black transition-all">
                Read Letters
              </span>
              <div className="w-2 h-2 bg-stone-300 rounded-full group-hover:bg-black transition-colors animate-pulse" />
            </Link>

            {voice.caseLink && (
              <a 
                href={voice.caseLink} 
                target="_blank" 
                className="block font-mono text-[8px] uppercase tracking-[0.4em] text-stone-300 hover:text-stone-500"
              >
                View Legal Records
              </a>
            )}
          </div>
        </div>
      </footer>
    </main>
  );
}
