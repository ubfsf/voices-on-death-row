"use client";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

interface VisualMenuProps {
  sections?: any[];
}

export default function VisualMenu({ sections }: VisualMenuProps) {
  const params = useParams();
  const locale = params.locale || 'en';

  const MENU_ITEMS = [
    { title: "Voices", slug: "voices", img: "/images/eyes.jpg", align: "left" },
    { title: "Letters", slug: "letters", img: "/images/writing_another.jpg", align: "right" },
    { title: "Art From Inside", slug: "art", img: "/images/art_from_inside.jpg", align: "left" },
    { title: "Podcast", slug: "podcast", img: "/images/person_back.jpg", align: "right" },
    { title: "", slug: "about", img: "/images/about.jpg", align: "left" },
  ];

  return (
    <div className="bg-black min-h-screen text-white font-serif overflow-x-hidden selection:bg-white selection:text-black">
      
      {/* 1. INTRODUCTORY HEADER 
          Replaces "The Archive" with the project title and a brief intro 
      */}
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

      {/* 2. STORYTELLING MENU GRID
          Consistent with the heavy black italic font style
      */}
      <main className="max-w-7xl mx-auto px-4 md:px-16 py-20 md:py-40 space-y-48 md:space-y-64">
        {MENU_ITEMS.map((item, index) => (
          <motion.section 
            key={item.slug}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col ${item.align === 'right' ? 'items-end' : 'items-start'}`}
          >
            <Link href={`/${locale}/${item.slug}`} className="relative group block w-full sm:w-11/12 md:w-10/12">
              
              {/* IMAGE CONTAINER */}
              <div className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-stone-900 shadow-[0_20px_40px_rgba(0,0,0,0.8)] md:shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/5">
                <img 
                  src={item.img} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                />
                
                {/* Subtle Archival Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
              </div>

              {/* OVERLAPPING TYPOGRAPHY - Consistent Font */}
              <div className={`absolute bottom-[-10%] md:bottom-[-15%] ${item.align === 'left' ? 'right-[-2%] md:right-[-5%]' : 'left-[-2%] md:left-[-5%]'} z-30`}>
                <motion.h2 
                  initial={{ opacity: 0, x: item.align === 'left' ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 1 }}
                  className="text-4xl sm:text-6xl md:text-[10vw] font-black italic uppercase tracking-tighter leading-none text-white drop-shadow-[0_10px_20px_rgba(0,0,0,1)] md:drop-shadow-[0_15px_30px_rgba(0,0,0,1)]"
                >
                  {item.title}
                </motion.h2>
              </div>

            </Link>
          </motion.section>
        ))}
      </main>

      {/* 3. CINEMATIC TRANSITION */}
      <section className="py-40 md:py-80 flex flex-col items-center justify-center text-center px-6 bg-[#030303]">
        <div className="w-px h-24 md:h-48 bg-gradient-to-b from-stone-800 to-transparent mb-12 md:mb-16" />
        <h3 className="text-2xl sm:text-4xl md:text-6xl font-light italic text-stone-500 max-w-4xl leading-tight tracking-tight px-4">
          "The paper becomes the bridge between the world outside and the silence within."
        </h3>
        <div className="mt-16 md:mt-32">
           <Link 
              href={`/${locale}/about`}
              className="group relative inline-flex items-center gap-4 md:gap-6 px-8 py-4 md:px-16 md:py-6 border border-white/10 hover:border-white transition-all duration-700 active:scale-95"
            >
              <span className="font-sans text-[8px] md:text-[10px] uppercase tracking-[0.8em] font-bold">
                Learn About the Founder
              </span>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-pulse" />
            </Link>
        </div>
      </section>
    </div>
  );
}
