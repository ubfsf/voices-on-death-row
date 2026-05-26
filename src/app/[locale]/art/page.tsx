import { client } from '@/lib/sanity';
import Link from 'next/link';
import * as motion from "framer-motion/client";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ArtArchive({ params }: Props) {
  const { locale } = await params;

  // 1. The Query: Fetching from the "art" type in Sanity
  const query = `*[_type == "art"] | order(_createdAt desc){
    _id,
    title,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    "description": description[$locale],
    artist
  }`;

  const artPieces = await client.fetch(query, { locale });

  return (
    <main className="bg-[#050505] min-h-screen relative overflow-x-hidden selection:bg-white selection:text-black">
      
      {/* Cinematic Background Overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(20,20,20,1)_0%,_rgba(0,0,0,1)_100%)]" />
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* FIXED NAVIGATION */}
      <Link 
        href={`/${locale}`} 
        className="fixed top-12 left-12 z-50 text-white/20 hover:text-white transition-all duration-700 uppercase text-[10px] tracking-[1em] font-black mix-blend-difference"
      >
        ← MENU
      </Link>

      {/* ARCHIVAL HEADER */}
      <div className="relative z-10 max-w-7xl mx-auto pt-32 px-6 md:px-16">
        <div className="border-b border-white/5 pb-12">
          <p className="text-stone-700 font-mono text-[10px] uppercase tracking-[1em] mb-4">Archive // Vol. 03</p>
          <h1 className="text-6xl md:text-[8vw] font-black italic uppercase tracking-tighter leading-none text-white">
            The <span className="text-stone-800 font-black">Art</span>
          </h1>
        </div>
      </div>

      {/* ART COLLAGE GRID */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24">
          {artPieces?.length > 0 ? (
            artPieces.map((piece: any, index: number) => {
              // Scattered rotations for the "scrapbook" feel
              const rotation = (index % 3 === 0 ? -2 : index % 2 === 0 ? 2 : -1);
              
              return (
                <motion.div
                  key={piece._id}
                  initial={{ opacity: 0, y: 30, rotate: rotation }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/${locale}/art/${piece.slug}`} className="block">
                    {/* The Artwork "Dossier" */}
                    <div className="relative aspect-square md:aspect-[4/5] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-white/5 bg-stone-900 mb-10 transition-transform duration-700 group-hover:scale-[1.02] group-hover:rotate-0">
                      
                      {/* Archival Tape Graphic */}
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 h-8 bg-white/5 backdrop-blur-md rotate-1 z-20 border-x border-white/5" />
                      
                      <img 
                        src={piece.imageUrl} 
                        alt={piece.title}
                        className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-[1.5s] ease-out"
                      />

                      {/* Reference Badge */}
                      <div className="absolute top-8 right-8 z-20 bg-black/60 backdrop-blur-sm px-3 py-1 border border-white/10">
                        <span className="text-[8px] font-mono text-stone-400 tracking-[0.4em] uppercase">
                          Exhibit_{index + 1}
                        </span>
                      </div>
                    </div>
                    
                    {/* Captioning */}
                    <div className="space-y-4 px-2">
                      <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none text-white group-hover:text-stone-400 transition-colors">
                        {piece.title}
                      </h2>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono text-stone-600 uppercase tracking-widest">
                          By {piece.artist || 'Unknown Artist'}
                        </span>
                        <div className="h-px flex-grow bg-stone-900" />
                      </div>
                      <p className="text-stone-500 font-serif italic text-sm line-clamp-2 leading-relaxed">
                        {piece.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full h-64 flex items-center justify-center">
              <p className="text-stone-600 font-mono text-[10px] uppercase tracking-[1em] animate-pulse">
                Gallery Empty // Synchronizing with Sanity
              </p>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER TRANSITION */}
      <div className="relative z-10 py-40 flex flex-col items-center justify-center text-center">
        <div className="w-px h-24 bg-gradient-to-b from-stone-800 to-transparent mb-8" />
        <p className="text-stone-800 font-mono text-[9px] uppercase tracking-[1.5em]">
          End of Gallery
        </p>
      </div>
    </main>
  );
}
