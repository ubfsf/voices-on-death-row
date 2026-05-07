import { client } from '@/lib/sanity';
import Link from 'next/link';

export default async function PodcastPage({ params }: Props) {
  const { locale } = await params;

  const episodes = await client.fetch(`*[_type == "podcast"] | order(episodeNumber desc){
    _id,
    episodeNumber,
    mediaType,
    videoUrl,
    "audioUrl": audioFile.asset->url,
    "title": title[$locale],
    "description": description[$locale],
    "imageUrl": coverImage.asset->url
  }`, { locale });

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-40 px-8 font-serif">
      <div className="max-w-5xl mx-auto space-y-32">
        {episodes?.map((ep: any) => (
          <section key={ep._id} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-white/5 pt-16">
            <div className="lg:col-span-5">
              <img src={ep.imageUrl} alt={ep.title} className="w-full h-auto shadow-2xl rotate-[-1deg]" />
            </div>

            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-4xl font-bold italic">{ep.title}</h2>
              <p className="text-lg text-white/70 font-light">{ep.description}</p>

              {/* VIDEO PLAYER */}
              {ep.mediaType === 'video' && ep.videoUrl && (
                <div className="aspect-video w-full bg-white/5 border border-white/10">
                  <iframe src={ep.videoUrl.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen />
                </div>
              )}

              {/* AUDIO PLAYER */}
              {ep.mediaType === 'audio' && ep.audioUrl && (
                <div className="bg-white/5 p-6 border border-white/10 rounded-sm">
                  <h3 className="text-[10px] uppercase tracking-widest text-white/40 mb-4">Listen to Testimony</h3>
                  <audio controls className="w-full">
                    <source src={ep.audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
