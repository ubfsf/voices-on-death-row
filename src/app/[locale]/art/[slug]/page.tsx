import { client } from '@/lib/sanity';
import Link from 'next/link';
import * as motion from "framer-motion/client";
import Typewriter from '@/components/Typewriter';

export default async function ArtDetail({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;

  const query = `*[_type == "art" && (slug.current == $slug || _id == $slug)][0]{
    title,
    artist,
    medium,
    dateCreated,
    facility,
    "description": description[$locale],
    "imageUrl": image.asset->url
  }`;

  const piece = await client.fetch(query, { slug, locale });

  if (!piece) return <div className="bg-black min-h-screen" />;

  return (
    <main className="min-h-screen bg-[#050505] text-white font-serif selection:bg-white selection:text-black overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <Link href={`/${locale}/art`} className="fixed top-12 left-12 z-50 text-white/20 hover:text-white transition-all duration-500 uppercase text-[10px] tracking-[0.8em] font-bold mix-blend-difference">
        ← BACK
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        
        {/* LEFT: The Artwork Focus */}
        <div className="relative h-[60vh] lg:h-screen lg:sticky lg:top-0 overflow-hidden border-r border-white/5 bg-stone-900/10 flex items-center justify-center">
          {piece.imageUrl ? (
            <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 2 }} className="w-full h-full">
              <img src={piece.imageUrl} className="w-full h-full object-contain p-12 md:p-24 grayscale-[0.2] hover:grayscale-0 transition-all duration-1000" alt={piece.title} />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-[#050505] pointer-events-none" />
            </motion.div>
          ) : (
            <div className="p-20 text-center">
              <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-stone-800 leading-none">
                {piece.artist}
              </h2>
            </div>
          )}
        </div>

        {/* RIGHT: The Context & Description */}
        <div className="relative z-10 px-6 md:px-20 py-24 lg:py-48 space-y-24">
          <header className="space-y-12">
            <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.85]">
              {piece.title}
            </motion.h1>
            
            <div className="grid grid-cols-2 gap-8 border-y border-white/5 py-10">
              <div>
                <p className="text-stone-600 font-mono text-[8px] uppercase tracking-widest font-bold">Artist</p>
                <p className="text-stone-300 text-sm italic">{piece.artist || 'Anonymous'}</p>
              </div>
              <div>
                <p className="text-stone-600 font-mono text-[8px] uppercase tracking-widest font-bold">Medium</p>
                <p className="text-stone-300 text-sm italic">{piece.medium || 'Original Work'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-stone-600 font-mono text-[8px] uppercase tracking-widest font-bold">Origin</p>
                <p className="text-stone-300 text-sm italic uppercase tracking-wider">
                  {piece.facility} {piece.dateCreated && `// ${piece.dateCreated}`}
                </p>
              </div>
            </div>
          </header>

          {/* Typewriter Description or Poem */}
          <div className="text-lg md:text-2xl leading-[1.7] text-stone-300 font-light italic tracking-tight max-w-2xl border-l border-stone-900 pl-8 md:pl-12 whitespace-pre-wrap">
            {piece.description && <Typewriter text={piece.description} speed={0.005} />}
          </div>

          <footer className="pt-24 opacity-20">
             <p className="font-mono text-[9px] uppercase tracking-[0.8em]">End of Exhibit // Ref. {slug.toUpperCase()}</p>
          </footer>
        </div>
      </div>
    </main>
  );
}
