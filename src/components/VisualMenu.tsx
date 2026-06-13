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
    { title: "Voices", slug: "voices", img: "/images/eyes.jpg", align: "left" },
    { title: "Letters", slug: "letters", img: "/images/writing_another.jpg", align: "right" },
    { title: "Art From Inside", slug: "art", img: "/images/art_from_inside.jpg", align: "left" },
    { title: "Podcast", slug: "podcast", img: "/images/person_back.jpg", align: "right" },
    { title: "About", slug: "about", img: "/images/about.jpg", align: "left" },
  ];

  return (
    <div className="bg-black min-h-screen text-white font-serif overflow-x-hidden selection:bg-white selection:text-black">
      
      {/* 1. INTRODUCTORY HEADER */}
      <header className="max-w-7xl mx-auto pt-32 pb-20 px-6 md:px-16 border-b border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          <p className="text-stone-600 uppercase tracking-[0.6em] md:tracking-[0.8em] text-[8px] md:text-[10px] font-sans font-bold mb-8">
            {locale === 'fr' ? 'Une Introduction' : 'An Introduction'}
          </p>
          <h1 className="text-5xl sm:text-7xl md:text-[10vw] font-black italic uppercase leading-[0.8] tracking-tighter">
            Voices <br/> <span className="text-stone-500 font-black">On Death Row</span>
          </h1>
          
          <p className="mt-12 text-stone-400 font-serif italic text-lg md:text-2xl max-w-3xl leading-relaxed">
            {locale === 'fr' 
              ? "À travers des lettres, de l'art et des témoignages, nous documentons les histoires humaines au sein du système judiciaire pour susciter une conversation significative."
              : "Through letters, art, and testimonies, we document the human stories within the justice system to spark meaningful conversation."}
          </p>
        </motion.div>
      </header>

      {/* 2. STORYTELLING MENU GRID - IMMERSIVE "THE BOAT" STYLE */}
      <main className="max-w-7xl mx-auto px-4 md:px-16 py-20 space-y-48 md:space-y-80">
        {MENU_ITEMS.map((item, index) => (
          <MenuItem key={item.slug} item={item} locale={locale} />
        ))}
      </main>

      {/* 3. THE GENESIS: FINAL NARRATIVE TRANSITION */}
      <section className="py-40 md:py-80 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 px-6 bg-[#030303] border-t border-white/5 relative">
        
        {/* Hero Illustration Next to Story */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2 }}
          className="w-full max-w-sm md:max-w-md"
        >
          <img 
            src="/images/hero-illustration.png" 
            alt="Hero Illustration" 
            className="w-full h-auto"
          />
        </motion.div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-2xl">
          <div className="w-px h-24 bg-gradient-to-b from-stone-800 to-transparent mb-12" />
        
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="text-2xl sm:text-4xl md:text-5xl font-light italic text-stone-300 leading-tight tracking-tight mb-16"
          >
            {locale === 'fr'
              ? "Ce projet a débuté par une correspondance entre Halima, en France, et Borgela, un Haïtien condamné à mort en Pennsylvanie."
              : "This project began with correspondence between Halima, in France, and Borgela, a Haitian man sentenced to death in Pennsylvania."}
          </motion.p>
          
          <Link 
            href={`/${locale}/about`}
            className="group relative inline-flex items-center gap-6 px-12 py-5 border border-white/10 hover:border-white transition-all duration-700 active:scale-95"
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.8em] font-bold">
              Learn About the Founder
            </span>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </Link>
        </div>
      </section>
    </div>
  );
}

{/* SUB-COMPONENT FOR PARALLAX ANIMATION */}
function MenuItem({ item, locale }: { item: any, locale: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax effect for the image container
  const y = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section 
      ref={ref}
      style={{ opacity }}
      className={`flex flex-col ${item.align === 'right' ? 'items-end' : 'items-start'} relative`}
    >
      <Link href={`/${locale}/${item.slug}`} className="relative group block w-full sm:w-11/12 md:w-10/12">
        
        {/* IMAGE CONTAINER - PRESERVING ORIGINAL ASSET */}
        <motion.div 
          style={{ y }}
          className="relative w-full h-auto overflow-hidden bg-stone-900 shadow-[0_40px_100px_rgba(0,0,0,0.9)] border border-white/5"
        >
          <img 
            src={item.img} 
            alt={item.title}
            className="w-full h-auto object-contain transition-all duration-[2s] ease-out group-hover:scale-105" 
          />
          
          {/* Subtle archival overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-700" />
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </motion.div>

        {/* OVERLAPPING TYPOGRAPHY - FIXED FOR IPHONE/IPAD */}
        <div className={`
          absolute 
          bottom-[-1.5rem] sm:bottom-[-3rem] md:bottom-[-5rem] 
          ${item.align === 'left' ? 'right-0 md:right-[-5%]' : 'left-0 md:left-[-5%]'} 
          z-30 pointer-events-none max-w-[85%]
        `}>
          <motion.h2 
            initial={{ opacity: 0, x: item.align === 'left' ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-5xl sm:text-7xl md:text-[10vw] font-black italic uppercase leading-[0.8] tracking-tighter text-white drop-shadow-[0_20px_40px_rgba(0,0,0,1)]"
          >
            {item.title}
          </motion.h2>
        </div>

      </Link>
    </motion.section>
  );
}
