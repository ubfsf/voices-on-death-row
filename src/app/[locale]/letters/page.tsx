import { client } from '@/lib/sanity';
import Link from 'next/link';
import * as motion from "framer-motion/client";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LettersArchive({ params }: Props) {
  const { locale } = await params;

  // 1. The Query: Fetching from the "archive" type (Letters)
  // We fetch the title, the image, and the slug to create the link
  const query = `*[_type == "archive"] | order(_createdAt desc){
    _id,
    title,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    "excerpt": excerpt[$locale]
  }`;

  const letters = await client.fetch(query, { locale });

  return (
    <main className="bg-[#050505] min-h-screen relative overflow-x-hidden selection:bg-white selection:text-black">
      
      {/* Background Overlays */}
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

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto pt-32 px-6 md:px-16">
        <div className="border-b border-white/5 pb-12">
          <p className="text-stone-700 font-mono text-[10px] uppercase tracking-[1em] mb-4">Archive // Vol. 02</p>
          <h1 className="text-6xl md:text-[8vw] font-black italic uppercase tracking-tighter leading-none text-white">
            The <span className="text-stone-800 font-black">Letters</span>
          </h1>
        </div>
      </div>

      {/* Letters Collage/Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {letters?.length > 0 ? (
            letters.map((letter: any, index: number) => (
              <motion.div
                key={letter._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/${locale}/letters/${letter.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden shadow-2xl border border-white/5 bg-stone-900 mb-8">
                    {/* Archival Tape Effect */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/5 backdrop-blur-md rotate-1 z-20" />
                    
                    <img 
                      src={letter.imageUrl} 
                      alt={letter.title}
                      className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-none group-hover:text-stone-400 transition-colors">
                      {letter.title}
                    </h2>
                    <p className="text-stone-500 font-serif italic text-sm line-clamp-2">
                      {letter.excerpt}
                    </p>
                    <div className="pt-4 flex items-center gap-4">
                       <div className="h-px w-8 bg-stone-800 group-hover:w-12 group-hover:bg-white transition-all" />
                       <span className="text-[10px] font-mono text-stone-600 uppercase tracking-widest">Read Entry</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full h-64 flex items-center justify-center">
              <p className="text-stone-600 font-mono text-[10px] uppercase tracking-[1em] animate-pulse">
                Archive Empty // Checking Connection
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
