import { client } from '@/lib/sanity';
import Link from 'next/link';
import * as motion from "framer-motion/client";

export default async function LettersArchive({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Querying letters - fetching content preview and author
  const query = `*[_type == "letters"] | order(_createdAt desc){
    _id,
    title,
    author,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    "content": content[$locale]
  }`;

  const letters = await client.fetch(query, { locale });

  return (
    <main className="bg-[#050505] min-h-screen relative overflow-x-hidden selection:bg-white selection:text-black font-serif">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <Link href={`/${locale}`} className="fixed top-12 left-12 z-50 text-white/20 hover:text-white transition-all duration-700 uppercase text-[10px] tracking-[1em] font-black mix-blend-difference">
        ← MENU
      </Link>

      <div className="relative z-10 max-w-7xl mx-auto pt-32 px-6 md:px-16">
        <div className="border-b border-white/5 pb-12">
          <p className="text-stone-700 font-mono text-[10px] uppercase tracking-[1em] mb-4">Archive // Vol. 02</p>
          <h1 className="text-6xl md:text-[8vw] font-black italic uppercase tracking-tighter leading-none text-white">
            The <span className="text-stone-800 font-black">Letters</span>
          </h1>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 pb-40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
        {letters?.map((letter: any, index: number) => (
          <motion.div
            key={letter._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            {/* LINK LOGIC: Uses slug if exists, otherwise uses Sanity ID */}
            <Link href={`/${locale}/letters/${letter.slug || letter._id}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden shadow-2xl border border-white/5 bg-[#0a0a0a] mb-8 transition-all duration-700 group-hover:scale-[1.02]">
                
                {/* Tape Effect */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/5 backdrop-blur-md rotate-1 z-20 border-x border-white/5" />
                
                {letter.imageUrl ? (
                  <img 
                    src={letter.imageUrl} 
                    alt={letter.title}
                    className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-1000"
                  />
                ) : (
                  /* TEXT FOCUS: If no image, display the actual message content */
                  <div className="w-full h-full p-10 flex flex-col justify-start relative">
                    <span className="text-stone-700 font-mono text-[8px] uppercase tracking-[0.4em] mb-8">Transcription_Preview</span>
                    <p className="text-stone-400 font-serif italic text-lg leading-relaxed line-clamp-[10]">
                      {letter.content}
                    </p>
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
                  </div>
                )}

                {/* Author Badge */}
                <div className="absolute top-8 right-8 z-20 bg-black/60 backdrop-blur-sm px-3 py-1 border border-white/10">
                  <span className="text-[8px] font-mono text-stone-500 tracking-[0.4em] uppercase">
                    By: {letter.author || 'Anonymous'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter leading-none text-white group-hover:text-stone-400 transition-colors">
                  {letter.title}
                </h2>
                <p className="text-stone-600 font-mono text-[9px] uppercase tracking-widest">
                  Ref. {letter.slug || letter._id.substring(0, 8)}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
