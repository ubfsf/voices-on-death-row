"use client";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

interface VisualMenuProps {
  sections?: any[];
}

export default function VisualMenu({ sections }: VisualMenuProps) {
  const params = useParams();
  const locale = Array.isArray(params.locale) ? params.locale[0] : params.locale || 'en';

  const MENU_ITEMS = [
    { 
      title: "Voices", 
      slug: "voices", 
      img: "/images/eyes.jpg", 
      align: "left",
      subtitle: locale === 'fr' 
        ? "Témoignages et récits directs du couloir de la mort."
        : "Firsthand testimonies and personal narratives from death row."
    },
    { 
      title: "Letters", 
      slug: "letters", 
      img: "/images/writing_another.jpg", 
      align: "right",
      subtitle: locale === 'fr' 
        ? "Correspondance depuis l'intérieur de la prison."
        : "Correspondence from inside prison."
    },
    { 
      title: "Podcast", 
      slug: "podcast", 
      img: "/images/person_back.jpg", 
      align: "left",
      subtitle: locale === 'fr' 
        ? "Des conversations qui explorent la justice, la mémoire, le trauma et l'humanité."
        : "Conversations that explore justice, memory, trauma, and humanity."
    },
    { 
      title: "Families' Voices", 
      slug: "families-voices", 
      img: "/images/families.jpg", 
      align: "right",
      subtitle: locale === 'fr' 
        ? "Les impacts profonds sur les proches et les communautés."
        : "The deep impacts and stories from loved ones and communities."
    },
    { 
      title: "Justice", 
      slug: "justice", 
      img: "/images/justice-scale.jpg", 
      align: "left",
      subtitle: locale === 'fr' 
        ? "Analyse critique et perspectives sur les cadres juridiques."
        : "Critical analysis and perspectives on legal frameworks."
    },
    { 
      title: "Research", 
      slug: "research", 
      img: "/images/archive.jpg", 
      align: "right",
      subtitle: locale === 'fr' 
        ? "Données, études et documents d'archive."
        : "Data-driven studies, insights, and archival materials."
    },
    { 
      title: "About", 
      slug: "about", 
      img: "/images/hero-illustration.png", 
      align: "left",
      subtitle: locale === 'fr' 
        ? "Notre mission, notre histoire et l'objectif de ce projet."
        : "Our mission, our history, and the purpose behind this project."
    }
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
      <main className="w-full mx-auto py-12 space-y-1">
        {MENU_ITEMS.map((item) => (
          <MenuItem key={item.slug} item={item} locale={locale} />
        ))}
      </main>
    </div>
  );
}

function MenuItem({ item, locale }: { item: any, locale: string }) {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full aspect-[21/9] min-h-[350px] max-h-[600px] overflow-hidden border-b border-white/10 group"
    >
      {/* Cinematic Full-Width Background Image */}
      <div className="absolute inset-0 w-full h-full bg-stone-950">
        <img 
          src={item.img} 
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105" 
          draggable={false}
        />
        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      </div>

      {/* Content Placements */}
      <div className="absolute inset-0 w-full h-full max-w-7xl mx-auto px-8 md:px-24 flex items-center z-10">
        <div className={`w-full max-w-md md:max-w-lg flex flex-col gap-4 ${item.align === 'right' ? 'ml-auto text-left' : 'mr-auto text-left'}`}>
          
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black italic uppercase leading-[0.8] tracking-tighter text-white">
            {item.title}
          </h2>
          
          <p className="text-stone-300 font-sans font-light text-sm md:text-lg max-w-sm sm:max-w-md leading-relaxed tracking-wide drop-shadow-md">
            {item.subtitle}
          </p>

          <div className="pt-2">
            <Link 
              href={`/${locale}/${item.slug}`}
              className="inline-block font-sans text-xs uppercase tracking-[0.3em] font-bold text-white border-b border-white/40 pb-1 hover:border-white hover:text-stone-200 transition-all duration-300"
            >
              Explore
            </Link>
          </div>

        </div>
      </div>
    </motion.section>
  );
}