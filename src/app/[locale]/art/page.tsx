import { client } from '@/lib/sanity';
import Link from 'next/link';
import * as motion from "framer-motion/client";

export default async function ArtArchive({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const query = `*[_type == "art"] | order(_createdAt desc){
    _id,
    title,
    artist,
    medium,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    "description": description[$locale]
  }`;

  const artPieces = await client.fetch(query, { locale });

  return (
    <main className="bg-[#050505] min-h-screen relative overflow-x-hidden selection:bg-white selection:text-black font-serif">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <Link href={`/${locale}`} className="fixed top-12 left-12 z-50 text-white/20 hover:text-white transition-all duration-700 uppercase text-[10px] tracking-[1em] font-black mix-blend-difference">
        ← MENU
      </Link>

      <div className="relative z-10 max-w-7xl mx-auto pt-32 px-6 md:px-16">
        <div className="border-b border-white/5 pb-12">
          <p className="text-stone-700 font-mono text-[10px] uppercase tracking-[1em] mb-4">Archive // Vol. 03</p>
          <h1 className="text-6xl md:text-[8vw] font-black italic uppercase tracking-tighter leading-none text-white">
            The <span className="text-stone-800 font-black">Art</span>
          </h1>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 pb-40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
        {artPieces?.map((piece: any, index: number) => (
          <motion.div
            key={piece._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/${locale}/art/${piece.slug || piece._id}`} className="group block">
              <div className="relative aspect-square overflow-hidden shadow-2xl border border-white/5 bg-[#0a0a0a] mb-8 transition-all duration-700 group-hover:scale-[1.02]">
                
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/5 backdrop-blur-md rotate-1 z-20 border-x border-white/5" />
                
                {piece.imageUrl ? (
                  <img 
                    src={piece.imageUrl} 
                    alt={piece.title}
                    className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-1000"
                  />
                ) : (
                  <div className="w-full h-full p-10 flex flex-col justify-start relative">
                    <span className="text-stone-700 font-mono text-[8px] uppercase tracking-[0.4em] mb-8 italic">Poetic_Expression</span>
                    <p className="text-stone-400 font-serif italic text-lg leading-relaxed line-clamp-6">
                      {piece.description}
                    </p>
                  </div>
                )}

                <div className="absolute top-8 right-8 z-20 bg-black/60 backdrop-blur-sm px-3 py-1 border border-white/10">
                  <span className="text-[8px] font-mono text-stone-500 tracking-[0.4em] uppercase">
                    {piece.medium || 'Exhibit'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter leading-none text-white group-hover:text-stone-400 transition-colors">
                  {piece.title}
                </h2>
                <p className="text-stone-600 font-mono text-[9px] uppercase tracking-widest">
                  By: {piece.artist || 'Anonymous'}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
