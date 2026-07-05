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

  // Updated MENU_ITEMS: Removed "About" per your request
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
    }
  ];

  return (
    <div className="bg-black min-h-screen text-white font-serif overflow-x-hidden selection:bg-white selection:text-black">
      
      <header className="max-w-7xl mx-auto pt-24 pb-16 md:pt-32 md:pb-20 px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <p className="text-stone-600 uppercase tracking-[0.8em] text-[10px] font-sans font-bold mb-8">
            {locale === 'fr' ? 'Une Introduction' : 'An Introduction'}
          </p>
          <h1 className="text-5xl md:text-[8vw] font-black italic uppercase leading-[0.8] tracking-tighter text-white">
            Voices <br/> <span className="text-stone-700">On Death Row</span>
          </h1>
        </motion.div>
      </header>

      <main className="w-full space-y-0">
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
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden group border-b border-white/10"
    >
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={item.img} 
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-105" 
          draggable={false}
        />
        
        {/* Cinematic Overlays */}
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-700 group-hover:bg-black/20`} />
        <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30`} />
        
        {/* Directional gradient based on text alignment */}
        {item.align === 'left' ? (
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-l from-black via-black/20 to-transparent" />
        )}
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-8 md:px-24 flex items-center">
        <motion.div 
          initial={{ opacity: 0, x: item.align === 'right' ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`w-full max-w-2xl flex flex-col gap-6 ${item.align === 'right' ? 'ml-auto text-right items-end' : 'mr-auto text-left items-start'}`}
        >
          <h2 className="text-6xl sm:text-8xl md:text-[120px] font-black italic uppercase leading-none tracking-tighter text-white">
            {item.title}
          </h2>
          
          <p className="text-stone-200 font-sans font-light text-lg md:text-xl max-w-md leading-relaxed tracking-wide">
            {item.subtitle}
          </p>

          <div className="pt-4">
            <Link 
              href={`/${locale}/${item.slug}`}
              className="inline-block font-sans text-sm uppercase tracking-[0.4em] font-bold text-white border-b-2 border-white pb-2 hover:text-[#FFB81C] hover:border-[#FFB81C] transition-all duration-300"
            >
              Explore
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
