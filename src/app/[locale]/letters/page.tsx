import { client } from '@/lib/sanity';
import Link from 'next/link';
import * as motion from "framer-motion/client";
import ArchiveHeader from '@/components/ui/ArchiveHeader';

export default async function LettersArchive({ params }: { params: Promise<{ locale: string }> }) {
  const { locale = 'en' } = await params;

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
    <main className="page-paper">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] bg-[url('/textures/noise.svg')]" />
      
      <Link href={`/${locale}`} className="fixed top-12 left-12 z-50 text-stone-400 hover:text-black transition-all duration-700 uppercase text-[10px] tracking-[1em] font-black mix-blend-difference">
        ← MENU
      </Link>

      <div className="relative z-10 max-w-7xl mx-auto pt-32 px-6 md:px-16">
        <ArchiveHeader label="Archive // Letters & Poetry" word="Letters" />
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
              <div className="relative aspect-[4/5] overflow-hidden shadow-2xl border border-stone-200 bg-white mb-8 transition-all duration-700 group-hover:scale-[1.02]">
                
                {/* Tape Effect */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-stone-200/60 backdrop-blur-md rotate-1 z-20 border-x border-stone-300" />
                
                {letter.imageUrl ? (
                  <img 
                    src={letter.imageUrl} 
                    alt={letter.title}
                    className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000 brightness-90 group-hover:brightness-100"
                  />
                ) : (
                  /* BLANK COVER STATE: Light background for the overlay to sit on */
                  <div className="w-full h-full bg-stone-100 flex items-center justify-center p-12">
                     <div className="w-full h-full border border-stone-200 opacity-10" />
                  </div>
                )}

                {/* TEXT OVERLAY: Author and Date (Minutes Before Six Style) */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 z-30 text-center">
                   {/* Gradient for readability - stronger when an image is present */}
                   <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none ${letter.imageUrl ? 'opacity-80' : 'opacity-40'}`} />
                   
                   <div className="relative z-10">
                      <p className="text-white text-lg md:text-xl font-medium italic mb-1">
                        Poetry by {letter.author || 'Anonymous'}
                      </p>
                      {letter.writtenDate && (
                        <p className="text-stone-300 uppercase tracking-[0.3em] text-[9px] font-mono">
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
                <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter leading-none text-black group-hover:text-stone-500 transition-colors">
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