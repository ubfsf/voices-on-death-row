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
    { 
      title: "Voices", 
      slug: "voices", 
      img: "/images/eyes.jpg", 
      chapter: "Chapter I",
      ref: "D-884",
      desc: "The individuals behind the statistics.",
      align: "left"
    },
    { 
      title: "Letters", 
      slug: "letters", 
      img: "/images/writing_another.jpg", 
      chapter: "Chapter II",
      ref: "A-202",
      desc: "Original handwritten correspondence.",
      align: "right"
    },
    { 
      title: "Art From Inside", 
      slug: "art", 
      img: "/images/art_from_inside.jpg", 
      chapter: "Chapter III",
      ref: "G-103",
      desc: "Visual expressions of the unseen.",
      align: "left"
    },
    { 
      title: "Podcast", 
      slug: "podcast", 
      img: "/images/person_back.jpg", 
      chapter: "Chapter IV",
      ref: "S-404",
      desc: "Audio testimonies and reflections.",
      align: "right"
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white font-serif overflow-x-hidden selection:bg-white selection:text-black">
      
      {/* 1. ARCHIVAL HEADER - Responsive Typography */}
      <header className="max-w-7xl mx-auto pt-24 pb-12 md:pt-40 md:pb-20 px-6 md:px-16 border-b border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          <p className="text-stone-600 uppercase tracking-[0.6em] md:tracking-[0.8em] text-[8px] md:text-[10px] font-sans font-bold mb-4 md:mb-8">
            {locale === 'fr' ? 'Navigation des Archives' : 'Archive Navigation'}
          </p>
          <h1 className="text-5xl sm:text-7xl md:text-[8vw] font-black italic uppercase leading-[0.85] md:leading-[0.75] tracking-tighter">
            The <br/> <span className="text-stone-500">Archive</span>
          </h1>
        </motion.div>
      </header>

      {/* 2. STORYTELLING MENU - Responsive Spacing & Scaling */}
      <main className="max-w-7xl mx-auto px-4 md:px-16 py-20 md:py-40 space-y-32 md:space-y-72">
        {MENU_ITEMS.map((item, index) => (
          <motion.section 
            key={item.slug}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col ${item.align === 'right' ? 'items-end' : 'items-start'}`}
          >
            <Link href={`/${locale}/${item.slug}`} className="relative group block w-full sm:w-11/12 md:w-9/12">
              
              {/* IMAGE CONTAINER - Optimized for all aspect ratios */}
              <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-stone-900 shadow-[0_20px_40px_rgba(0,0,0,0.8)] md:shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/5">
                {/* Tape Effect */}
                <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 w-20 md:w-32 h-6 md:h-10 bg-white/5 backdrop-blur-md rotate-1 z-20 border-x border-white/5" />
                
                <img 
                  src={item.img} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105" 
                />
                
                {/* Archival Badge */}
                <div className="absolute top-4 left-4 md:top-8 md:left-8 z-20">
                  <span className="font-mono text-[7px] md:text-[9px] tracking-[0.3em] md:tracking-[0.4em] text-white uppercase bg-black/60 backdrop-blur-md px-2 py-1 md:px-4 md:py-2 border border-white/10">
                    {item.ref} // {item.chapter}
                  </span>
                </div>
              </div>

              {/* OVERLAPPING TYPOGRAPHY - Scaled for Mobile */}
              <div className={`absolute bottom-[-8%] md:bottom-[-15%] ${item.align === 'left' ? 'right-[-2%] md:right-[-5%]' : 'left-[-2%] md:left-[-5%]'} z-30`}>
                <motion.h2 
                  initial={{ opacity: 0, x: item.align === 'left' ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 1 }}
                  className="text-4xl sm:text-6xl md:text-[9vw] font-black italic uppercase tracking-tighter leading-none text-white drop-shadow-[0_10px_20px_rgba(0,0,0,1)] md:drop-shadow-[0_15px_30px_rgba(0,0,0,1)]"
                >
                  {item.title}
                </motion.h2>
              </div>

              {/* CHAPTER METADATA - Adjusted for narrow screens */}
              <div className={`mt-16 md:mt-24 max-w-[280px] md:max-w-sm ${item.align === 'right' ? 'text-right ml-auto' : 'text-left'}`}>
                <div className={`flex items-center gap-3 md:gap-4 mb-4 md:mb-6 ${item.align === 'right' ? 'justify-end' : 'justify-start'}`}>
                  <div className="h-px w-8 md:w-12 bg-stone-800" />
                  <p className="text-stone-500 font-sans text-[8px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] font-bold">
                    {item.chapter}
                  </p>
                </div>
                <p className="text-stone-400 font-serif italic text-base md:text-xl leading-relaxed pl-4 border-l border-stone-900 group-hover:border-white transition-colors duration-700">
                  {item.desc}
                </p>
              </div>

            </Link>
          </motion.section>
        ))}
      </main>

      {/* 3. CINEMATIC TRANSITION - Responsive Padding */}
      <section className="py-40 md:py-80 flex flex-col items-center justify-center text-center px-6 bg-[#030303]">
        <div className="w-px h-24 md:h-48 bg-gradient-to-b from-stone-800 to-transparent mb-12 md:mb-16" />
        <h3 className="text-2xl sm:text-4xl md:text-6xl font-light italic text-stone-500 max-w-4xl leading-tight tracking-tight px-4">
          "The paper becomes the bridge between the world outside and the silence within."
        </h3>
        <div className="mt-16 md:mt-32">
           <Link 
              href={`/${locale}/voices`}
              className="group relative inline-flex items-center gap-4 md:gap-6 px-8 py-4 md:px-16 md:py-6 border border-white/10 hover:border-white transition-all duration-700 active:scale-95"
            >
              <span className="font-sans text-[8px] md:text-[10px] uppercase tracking-[0.6em] md:tracking-[0.8em] font-bold">
                Enter the Voices
              </span>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-pulse" />
            </Link>
        </div>
      </section>
    </div>
  );
}

