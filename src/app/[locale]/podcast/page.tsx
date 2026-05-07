import { client } from '@/lib/sanity';
import Link from 'next/link';
import * as motion from "framer-motion/client";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PodcastPage({ params }: Props) {
  const { locale } = await params;

  // 1. Fetch real episodes from Sanity
  const episodes = await client.fetch(`*[_type == "podcast"] | order(episodeNumber desc){
    _id,
    episodeNumber,
    duration,
    releaseDate,
    videoUrl,
    "title": title[$locale],
    "description": description[$locale],
    "imageUrl": coverImage.asset->url
  }`, { locale });

  const hasEpisodes = episodes && episodes.length > 0;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-12 pb-40 px-6 md:px-16 font-serif relative">
      
      {/* BACK TO MENU BUTTON */}
      <Link 
        href={`/${locale}`} 
        className="fixed top-12 left-8 z-50 text-white/30 hover:text-white transition-colors uppercase text-[10px] tracking-[0.5em] mix-blend-difference"
      >
        ← {locale === 'fr' ? 'ACCUEIL' : 'HOME'}
      </Link>

      <header className="max-w-4xl mx-auto mb-32 text-center pt-24">
        <p className="text-stone-500 uppercase tracking-[0.6em] text-[10px] mb-4 font-sans">
          {locale === 'fr' ? 'Témoignages Audio' : 'Audio Testimonies'}
        </p>
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter italic mb-8">
          {locale === 'fr' ? 'Le Podcast' : 'The Podcast'}
        </h1>
        <div className="h-px w-32 bg-white/20 mx-auto" />
      </header>

      <div className="max-w-5xl mx-auto">
        {hasEpisodes ? (
          /* DISPLAY REAL EPISODES */
          <div className="space-y-32">
            {episodes.map((ep: any) => (
              <section key={ep._id} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-white/5 pt-16">
                <div className="lg:col-span-5">
                  <div className="relative shadow-2xl rotate-[-1deg]">
                    <img src={ep.imageUrl} alt={ep.title} className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                </div>
                <div className="lg:col-span-7 space-y-6">
                  <h2 className="text-4xl font-bold italic tracking-tight">{ep.title}</h2>
                  <p className="text-lg text-white/70 leading-relaxed font-light">{ep.description}</p>
                  {ep.videoUrl && (
                    <div className="pt-8 aspect-video w-full bg-white/5 border border-white/10">
                      <iframe src={ep.videoUrl.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen />
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        ) : (
          /* PLACEHOLDER / COMING SOON SECTION */
          <div className="text-center py-20 space-y-12 opacity-40">
            <div className="max-w-2xl mx-auto border-2 border-dashed border-white/10 p-20">
              <h2 className="text-2xl uppercase tracking-[0.3em] mb-4">
                {locale === 'fr' ? 'Épisodes à venir' : 'Episodes Coming Soon'}
              </h2>
              <p className="font-sans text-sm tracking-widest">
                {locale === 'fr' 
                  ? 'Les témoignages audio sont en cours de synchronisation.' 
                  : 'Audio testimonies are currently being synchronized.'}
              </p>
            </div>
            
            {/* Mock layout to show the client what it will look like */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 grayscale blur-[2px] pointer-events-none">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="bg-white/5 aspect-[4/5] flex items-center justify-center">
                    <span className="text-[10px] tracking-widest">PREVIEW EP {i}</span>
                 </div>
               ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
