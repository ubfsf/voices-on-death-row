import { client } from '@/lib/sanity';
import Link from 'next/link';
import * as motion from "framer-motion/client";

export default async function LettersArchive({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Querying letters - fetching content preview, author, and writtenDate
  const query = `*[_type == "letters"] | order(_createdAt desc){
    _id,
    title,
    author,
    writtenDate,
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
          <p className="text-stone-700 font-mono text-[10px] uppercase tracking-[1em] mb-4">Archive // Letters & Poetry</p>
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
            <Link href={`/${locale}/letters/${letter.slug || letter._id}`} className="group block">
              
              {/* THE COVER CONTAINER */}
              <div className="relative aspect-[4/5] overflow-hidden shadow-2xl border border-white/5 bg-[#0a0a0a] mb-8 transition-all duration-700 group-hover:scale-[1.02]">
                
                {/* Tape Effect */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/5 backdrop-blur-md rotate-1 z-20 border-x border-white/5" />
                
                {letter.imageUrl ? (
                  <img 
                    src={letter.imageUrl} 
                    alt={letter.title}
                    className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000 brightness-75 group-hover:brightness-100"
                  />
                ) : (
                  /* BLANK COVER STATE: Dark background for the overlay to sit on */
                  <div className="w-full h-full bg-stone-900/20 flex items-center justify-center p-12">
                     <div className="w-full h-full border border-white/5 opacity-10" />
                  </div>
                )}

                {/* TEXT OVERLAY: Author and Date (Minutes Before Six Style) */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 z-30 text-center">
                   {/* Gradient for readability - stronger when an image is present */}
                   <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent ${letter.imageUrl ? 'opacity-80' : 'opacity-40'}`} />
                   
                   <div className="relative z-10">
                      <p className="text-white text-lg md:text-xl font-medium italic mb-1">
                        Poetry by {letter.author || 'Anonymous'}
                      </p>
                      {letter.writtenDate && (
                        <p className="text-stone-400 uppercase tracking-[0.3em] text-[9px] font-mono">
                          {new Date(letter.writtenDate).toLocaleDateString(locale, { 
                            month: 'long', 
                            day: 'numeric', 
                            year: 'numeric' 
                          }).toUpperCase()}
                        </p>
                      )}
                   </div>
                </div>
              </div>
              
              {/* EXTERNAL TITLE */}
              <div className="space-y-2 px-2">
                <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter leading-none text-white group-hover:text-[#3B6FE3] transition-colors">
                  {letter.title}
                </h2>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
