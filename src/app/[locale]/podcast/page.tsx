import { client } from '@/lib/sanity';
import Link from 'next/link';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PodcastPage({ params }: Props) {
  const { locale } = await params;

  const episodes = await client.fetch(`*[_type == "podcast"] | order(episodeNumber desc){
    _id,
    episodeNumber,
    mediaType,
    videoUrl,
    "videoFileUrl": videoFile.asset->url,
    "audioUrl": audioFile.asset->url,
    "title": title[$locale],
    "description": description[$locale],
    "transcript": transcript[$locale],
    "imageUrl": coverImage.asset->url
  }`, { locale });

  const hasEpisodes = episodes && episodes.length > 0;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-12 pb-40 px-6 md:px-16 font-serif relative">
      
      <Link 
        href={`/${locale}`} 
        className="fixed top-12 left-8 z-50 text-white/30 hover:text-white transition-colors uppercase text-[10px] tracking-[0.5em] mix-blend-difference"
      >
        ← {locale === 'fr' ? 'ACCUEIL' : 'HOME'}
      </Link>

      <header className="max-w-4xl mx-auto mb-32 text-center pt-24">
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter italic mb-8">
          {locale === 'fr' ? 'Le Podcast' : 'The Podcast'}
        </h1>
        <div className="h-px w-32 bg-white/20 mx-auto" />
      </header>

      <div className="max-w-5xl mx-auto">
        {hasEpisodes ? (
          <div className="space-y-32">
            {episodes.map((ep: any) => (
              <section key={ep._id} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-white/5 pt-16">
                
                {/* LEFT: Cover Image */}
                <div className="lg:col-span-5">
                  <div className="relative shadow-2xl rotate-[-1deg]">
                    <img src={ep.imageUrl} alt={ep.title} className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                </div>

                {/* RIGHT: Content & Media Player */}
                <div className="lg:col-span-7 space-y-8">
                  <h2 className="text-4xl font-bold italic tracking-tight">{ep.title}</h2>
                  <p className="text-lg text-white/70 leading-relaxed font-light">{ep.description}</p>
                  
                  {/* MEDIA PLAYER LOGIC */}
                  <div className="space-y-6">
                    {/* 1. YouTube/Vimeo Link */}
                    {ep.mediaType === 'video' && ep.videoUrl && (
                      <div className="aspect-video w-full bg-white/5 border border-white/10">
                        <iframe src={ep.videoUrl.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen />
                      </div>
                    )}

                    {/* 2. Direct MP4 Upload */}
                    {ep.mediaType === 'video' && ep.videoFileUrl && (
                      <div className="w-full bg-black border border-white/10 shadow-xl">
                        <video controls className="w-full">
                          <source src={ep.videoFileUrl} type="video/mp4" />
                        </video>
                      </div>
                    )}

                    {/* 3. Audio Upload */}
                    {ep.mediaType === 'audio' && ep.audioUrl && (
                      <div className="bg-white/5 p-6 border border-white/10 rounded-sm">
                        <audio controls className="w-full opacity-80">
                          <source src={ep.audioUrl} type="audio/mpeg" />
                        </audio>
                      </div>
                    )}
                  </div>

                  {/* TRANSCRIPT / CC SECTION */}
                  {ep.transcript && (
                    <div className="mt-12 pt-8 border-t border-white/5">
                      <h3 className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-6 font-sans">Transcript</h3>
                      <div className="text-sm leading-relaxed text-white/50 max-h-60 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10 italic">
                        {ep.transcript}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 opacity-40">
            <h2 className="text-2xl uppercase tracking-[0.3em]">
              {locale === 'fr' ? 'Épisodes à venir' : 'Episodes Coming Soon'}
            </h2>
          </div>
        )}
      </div>
    </main>
  );
}
