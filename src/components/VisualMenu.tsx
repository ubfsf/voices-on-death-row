"use client";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface VisualMenuProps {
  sections?: any[];
}

export default function VisualMenu({ sections }: VisualMenuProps) {
  const params = useParams();
  const locale = Array.isArray(params.locale) ? params.locale[0] : params.locale || 'en';

  const MENU_ITEMS = [
    { title: "About", slug: "about", img: "/images/hero-illustration.png", align: "left" },
    { title: "Voices", slug: "voices", img: "/images/eyes.jpg", align: "right" },
    { title: "Letters", slug: "letters", img: "/images/writing_another.jpg", align: "left" },
    { title: "Art From Inside", slug: "art", img: "/images/art_from_inside.jpg", align: "right" },
    { title: "Podcast", slug: "podcast", img: "/images/person_back.jpg", align: "left" },
    { title: "Families' Voices", slug: "families_voices", align: "right" }, 
    { title: "Resources", slug: "resources", align: "left" }, 
    { title: "Contact", slug: "contact", align: "right" }, 
  ];

  return (
    <div className="bg-black min-h-screen text-white font-serif overflow-x-hidden selection:bg-white selection:text-black">
      
      {/* 1. INTRODUCTORY HEADER */}
      <header className="max-w-7xl mx-auto pt-24 pb-16 md:pt-32 md:pb-20 px-6 md:px-16 border-b border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          <p className="text-stone-600 uppercase tracking-[0.6em] md:tracking-[0.8em] text-[8px] md:text-[10px] font-sans font-bold mb-6 md:mb-8">
            {locale === 'fr' ? 'Une Introduction' : 'An Introduction'}
          </p>
          <h1 className="text-4xl sm:text-7xl md:text-[10vw] font-black italic uppercase leading-[0.9] md:leading-[0.8] tracking-tighter text-white">
            Voices <br/> <span className="text-stone-700">On Death Row</span>
          </h1>
          <p className="mt-12 text-stone-400 font-serif italic text-lg md:text-2xl max-w-3xl leading-relaxed">
            {locale === 'fr' 
              ? "À travers des lettres, de l'art et des témoignages, nous documentons les histoires humaines au sein du système judiciaire pour susciter une conversation significative."
              : "Through letters, art, and testimonies, we document the human stories within the justice system to spark meaningful conversation."}
          </p>
        </motion.div>
      </header>

      {/* 2. STORYTELLING MENU GRID */}
      <main className="max-w-7xl mx-auto px-4 md:px-16 py-16 md:py-20 space-y-32 md:space-y-80">
        {MENU_ITEMS.map((item, index) => (
          <MenuItem key={item.slug} item={item} locale={locale} />
        ))}
      </main>

      {/* 3. THE GENESIS SECTION */}
      <section className="py-32 md:py-80 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 px-6 bg-[#030303] border-t border-white/5 relative">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2 }}
          className="w-full max-w-[280px] md:max-w-md"
        >
          <img 
            src="/images/hero-illustration.png" 
            alt="Archive Illustration" 
            className="w-full h-auto opacity-100"
          />
        </motion.div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-2xl">
          <div className="w-px h-16 md:h-24 bg-stone-800 mb-8 md:mb-12" />
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="text-xl sm:text-4xl md:text-5xl font-light italic text-stone-400 leading-tight tracking-tight mb-12 md:mb-16"
          >
            {locale === 'fr'
              ? "Ce projet est une archive dédiée à la préservation de la dignité humaine."
              : "This project is an archive dedicated to the preservation of human dignity."}
          </motion.p>
          
          <Link 
            href={`/${locale}/about`}
            className="group relative inline-flex items-center gap-6 px-10 py-4 md:px-12 md:py-5 border border-white/10 hover:border-white transition-all duration-700 active:scale-95"
          >
            <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.6em] md:tracking-[0.8em] font-bold text-stone-300 group-hover:text-white">
              Learn More
            </span>
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-stone-500 rounded-full group-hover:bg-white transition-colors" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function MenuItem({ item, locale }: { item: any, locale: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Reduced parallax movement for mobile to prevent jitter
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section 
      ref={ref}
      style={{ opacity }}
      className={`flex flex-col ${item.align === 'right' ? 'items-end' : 'items-start'} relative w-full`}
    >
      <Link href={`/${locale}/${item.slug}`} className="relative group block w-full sm:w-11/12 md:w-10/12">
        
        {item.img ? (
          <motion.div 
            style={{ y }}
            className="relative w-full aspect-[16/10] overflow-hidden bg-stone-900/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)] md:shadow-[0_40px_100px_rgba(0,0,0,0.9)] border border-white/5 flex items-center justify-center"
          >
            <img 
              src={item.img} 
              alt={item.title}
              className="w-full h-full object-contain transition-all duration-[2s] ease-out group-hover:scale-105" 
              draggable={false}
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
          </motion.div>
        ) : (
          <div className="h-16 md:h-40" /> 
        )}

        {/* OVERLAPPING TYPOGRAPHY - Adjusted for mobile overlap */}
        <div className={`
          ${item.img ? 'absolute bottom-[-1rem] md:bottom-[-5rem]' : 'relative'} 
          ${item.align === 'left' ? 'right-0 md:right-[-5%]' : 'left-0 md:left-[-5%]'} 
          z-30 pointer-events-none max-w-[90%]
        `}>
          <motion.h2 
            initial={{ opacity: 0, x: item.align === 'left' ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-4xl sm:text-7xl md:text-[10vw] font-black italic uppercase leading-[0.8] tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(0,0,0,1)] group-hover:text-stone-500 transition-colors duration-500"
          >
            {item.title}
          </motion.h2>
        </div>
      </Link>
    </motion.section>
  );
}
