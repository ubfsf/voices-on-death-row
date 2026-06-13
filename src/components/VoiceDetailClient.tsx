"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { urlFor } from "@/lib/sanity";
import Link from 'next/link';

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
    caseLink?: string;
  };
  locale: string;
  slug: string;
}

export default function VoiceDetailClient({ voice, locale, slug }: VoiceProps) {
  const fallbackImage = "/images/eyes.jpg"; 
  const containerRef = useRef(null);
  
  // Create a scroll-linked animation for the image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Image zooms slightly as you read his story
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0.5]);

  const renderChapter = (title: string, content: string | undefined, index: number) => {
    if (!content) return null;
    return (
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: "-20%" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="min-h-[60vh] flex flex-col justify-center mb-32"
      >
        <h3 className="text-[#3B6FE3] font-black uppercase tracking-[0.4em] text-[10px] mb-6 opacity-40">
          Chapter 0{index + 1} // {title}
        </h3>
        <p className="text-slate-900 text-2xl md:text-4xl font-[200] leading-tight italic tracking-tight whitespace-pre-line">
          {content}
        </p>
      </motion.section>
    );
  };

  return (
    <div ref={containerRef} className="relative bg-[#fcfaf7] min-h-[300vh]">
      
      {/* Navigation */}
      <Link 
        href={`/${locale}`} 
        className="fixed top-12 left-12 z-50 text-white/20 hover:text-white transition-all duration-700 uppercase text-[10px] tracking-[1em] font-black mix-blend-difference"
      >
        ← MENU
      </Link>
      
      {/* 1. STICKY VISUAL SIDE (The Human Focus) */}
      <div className="sticky top-0 h-screen w-full lg:w-1/2 overflow-hidden hidden lg:block">
        <motion.div 
          style={{ scale: imageScale, opacity: imageOpacity }}
          className="w-full h-full relative"
        >
          <img 
            src={voice.photo ? urlFor(voice.photo).url() : fallbackImage} 
            alt={voice.name}
            className="w-full h-full object-cover grayscale-[0.3] brightness-90"
          />
          {/* Paper Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#fcfaf7]" />
        </motion.div>
      </div>

      {/* 2. SCROLLING NARRATIVE SIDE */}
      <div className="relative z-10 lg:absolute lg:top-0 lg:right-0 w-full lg:w-1/2 px-8 md:px-20 py-32">
        
        {/* Intro Header */}
        <header className="mb-40">
          <motion.h1 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-8xl font-[800] italic uppercase tracking-tighter leading-[0.8] text-slate-900 mb-8"
          >
            {voice.name}
          </motion.h1>
          
          <div className="flex flex-wrap gap-4">
             <span className="bg-[#3B6FE3] text-white px-4 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-widest">
               {voice.facility}
             </span>
             <span className="border border-slate-300 text-slate-500 px-4 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-widest">
               {voice.inmateNumber}
             </span>
          </div>
        </header>

        {/* The Story Chapters */}
        <div className="space-y-32">
          {renderChapter("The Background", voice.about, 0)}
          {renderChapter("Professional Life", voice.professionalBackground, 1)}
          {renderChapter("Personal Reflections", voice.personalLife, 2)}
          {renderChapter("Legal Situation", voice.legalSituation, 3)}
        </div>

        {/* Call to Action */}
        <footer className="pt-20 border-t border-slate-200">
           <h4 className="text-slate-900 font-bold italic text-xl mb-8">Want to support {voice.name.split(' ')[0]}?</h4>
           <div className="flex flex-col gap-4">
              <Link 
                href={`/${locale}/letters?voice=${slug}`}
                className="bg-[#3B6FE3] text-white py-5 px-10 rounded-full font-black uppercase italic tracking-widest text-xs hover:scale-105 transition-all text-center block"
              >
                Read His Letters
              </Link>
              {voice.caseLink && (
                <a href={voice.caseLink} target="_blank" rel="noopener noreferrer" className="text-[#3B6FE3] font-bold uppercase tracking-widest text-[10px] text-center hover:underline">
                  View Full Case Details
                </a>
              )}
           </div>
        </footer>
      </div>

      {/* Mobile Image (Visible only on small screens) */}
      <div className="lg:hidden w-full aspect-square overflow-hidden mb-12">
        <img src={urlFor(voice.photo).url()} className="w-full h-full object-cover grayscale-[0.2]" alt={voice.name} />
      </div>
    </div>
  );
}