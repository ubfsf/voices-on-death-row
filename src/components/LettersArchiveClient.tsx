"use client";
import { motion } from "framer-motion";
import Link from "next/link";

interface LettersArchiveClientProps {
  letters: any[];
  locale: string;
}

export default function LettersArchiveClient({ letters, locale }: LettersArchiveClientProps) {
  return (
    <main className="bg-[#050505] min-h-screen relative overflow-x-hidden selection:bg-white selection:text-black">
      
      {/* Cinematic Background Overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(15,15,15,1)_0%,_rgba(0,0,0,1)_100%)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* Navigation */}
      <Link 
        href={`/${locale}`} 
        className="fixed top-12 left-12 z-50 text-white/20 hover:text-white transition-all duration-700 uppercase text-[10px] tracking-[1em] font-black mix-blend-difference"
      >
        ← MENU
      </Link>

      {/* Narrative Header */}
      <div className="relative z-10 max-w-7xl mx-auto pt-32 px-6 md:px-16">
        <div className="border-b border-white/5 pb-12">
          <p className="text-stone-700 font-mono text-[10px] uppercase tracking-[1em] mb-4">Archive // Vol. 02</p>
          <h1 className="text-6xl md:text-[8vw] font-black italic uppercase tracking-tighter leading-none text-white">
            The <span className="text-stone-800 font-black">Letters</span>
          </h1>
        </div>
      </div>

      {/* Interactive Collage Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {letters?.length > 0 ? (
            letters.map((letter: any, index: number) => {
              const rotation = (index % 3 === 0 ? -2 : index % 2 === 0 ? 2 : -1);

              return (
                <motion.div
                  key={letter._id}
                  initial={{ opacity: 0, y: 30, rotate: rotation }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/${locale}/letters/${letter.slug || letter._id}`} className="block">
                    {/* The "Physical" Document Frame */}
                    <div className="relative aspect-[4/5] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-white/5 bg-stone-900 mb-8 transition-transform duration-700 group-hover:scale-[1.02] group-hover:rotate-0">
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/5 backdrop-blur-md rotate-1 z-20 border-x border-white/5" />
                      
                      {letter.imageUrl ? (
                        <img 
                          src={letter.imageUrl} 
                          alt={letter.title}
                          className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-[1.5s] ease-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-800 font-mono text-[9px] uppercase tracking-widest">
                          Image_Missing.doc
                        </div>
                      )}

                      <div className="absolute top-8 right-8 z-20 bg-black/60 backdrop-blur-sm px-3 py-1 border border-white/10">
                        <span className="text-[8px] font-mono text-stone-400 tracking-[0.4em] uppercase">
                          Ref_{index + 1}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-4 px-2">
                      <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-none text-white group-hover:text-stone-400 transition-colors">
                        {letter.title || "Untitled Correspondence"}
                      </h2>
                      <p className="text-stone-500 font-serif italic text-sm line-clamp-3 leading-relaxed border-l border-stone-900 pl-4 group-hover:border-stone-500 transition-colors">
                        {letter.content}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full h-64 flex flex-col items-center justify-center gap-4 text-center">
              <p className="text-stone-600 font-mono text-[10px] uppercase tracking-[1em] animate-pulse">
                Archive Empty // Checking Sanity Connection
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 py-40 flex flex-col items-center justify-center text-center">
        <div className="w-px h-24 bg-gradient-to-b from-stone-800 to-transparent mb-8" />
        <p className="text-stone-800 font-mono text-[9px] uppercase tracking-[1.5em]">
          End of Correspondence
        </p>
      </div>
    </main>
  );
}
