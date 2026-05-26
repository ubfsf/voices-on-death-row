"use client";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function VisualMenu() {
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
      
      {/* 1. ARCHIVAL HEADER */}
      <header className="max-w-7xl mx-auto pt-40 pb-20 px-6 md:px-16 border-b border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          <p className="text-stone-600 uppercase tracking-[0.8em] text-[10px] font-sans font-bold mb-8">
            {locale === 'fr' ? 'Navigation des Archives' : 'Archive Navigation'}
          </p>
          <h1 className="text-[12vw] md:text-[8vw] font-black italic uppercase leading-[0.75] tracking-tighter">
            The <br/> <span className="text-stone-500">Archive</span>
          </h1>
        </motion.div>
      </header>

      {/* 2. STORYTELLING MENU - POP UP ANIMATION */}
      <main className="max-w-7xl mx-auto px-6 md:px-16 py-40 space-y-72">
        {MENU_ITEMS.map((item, index) => (
          <motion.section 
            key={item.slug}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col ${item.align === 'right' ? 'md:items-end' : 'md:items-start'}`}
          >
            <Link href={`/${locale}/${item.slug}`} className="relative group block w-full md:w-9/12">
              
              {/* ORIGINAL IMAGE - No filters or grayscale */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-900 shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/5">
                {/* Subtle Tape Effect for Archival Look */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-10 bg-white/5 backdrop-blur-md rotate-1 z-20 border-x border-white/5" />
                
                <img 
                  src={item.img} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105" 
                />
                
                {/* Archival Badge */}
                <div className="absolute top-8 left-8 z-20">
                  <span className="font-mono text-[9px] tracking-[0.4em] text-white uppercase bg-black/60 backdrop-blur-md px-4 py-2 border border-white/10">
                    {item.ref} // {item.chapter}
                  </span>
                </div>
              </div>

              {/* OVERLAPPING TYPOGRAPHY - Heavy Italic Francis Harris Style */}
              <div className={`absolute bottom-[-15%] ${item.align === 'left' ? 'right-[-5%]' : 'left-[-5%]'} z-30`}>
                <motion.h2 
                  initial={{ opacity: 0, x: item.align === 'left' ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 1 }}
                  className="text-7xl md:text-[9vw] font-black italic uppercase tracking-tighter leading-none text-white drop-shadow-[0_15px_30px_rgba(0,0,0,1)]"
                >
                  {item.title}
                </motion.h2>
              </div>

              {/* CHAPTER METADATA */}
              <div className={`mt-24 max-w-sm ${item.align === 'right' ? 'text-right ml-auto' : 'text-left'}`}>
                <div className={`flex items-center gap-4 mb-6 ${item.align === 'right' ? 'justify-end' : 'justify-start'}`}>
                  <div className="h-px w-12 bg-stone-800" />
                  <p className="text-stone-500 font-sans text-[10px] uppercase tracking-[0.5em] font-bold">
                    {item.chapter}
                  </p>
                </div>
                <p className="text-stone-400 font-serif italic text-xl leading-relaxed pl-4 border-l border-stone-900 group-hover:border-white transition-colors duration-700">
                  {item.desc}
                </p>
              </div>

            </Link>
          </motion.section>
        ))}
      </main>

      {/* 3. CINEMATIC TRANSITION */}
      <section className="py-80 flex flex-col items-center justify-center text-center px-6 bg-[#030303]">
        <div className="w-px h-48 bg-gradient-to-b from-stone-800 to-transparent mb-16" />
        <h3 className="text-4xl md:text-6xl font-light italic text-stone-500 max-w-4xl leading-tight tracking-tight px-4">
          "The paper becomes the bridge between the world outside and the silence within."
        </h3>
        <div className="mt-32">
           <Link 
              href={`/${locale}/voices`}
              className="group relative inline-flex items-center gap-6 px-16 py-6 border border-white/10 hover:border-white transition-all duration-700"
            >
              <span className="font-sans text-[10px] uppercase tracking-[0.8em] font-bold">
                Enter the Voices
              </span>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </Link>
        </div>
      </section>
    </div>
  );
}
