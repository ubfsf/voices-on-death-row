import { getPodcastEpisodes } from '@/lib/sanityQueries';
import { isEpisodeMediaType, type PodcastEpisode } from '@/types/episode';
import Image from 'next/image';
import Link from 'next/link';

// Episodes change rarely; serve cached HTML and revalidate hourly.
export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string }>;
};

/** Extract a YouTube video ID for nocookie embeds, or null if not a YouTube URL. */
function youTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const id =
      parsed.searchParams.get('v') ??
      (parsed.hostname.includes('youtu.be') ? parsed.pathname.slice(1) : null);
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  } catch {
    return null;
  }
}

function EpisodeMedia({ episode }: { episode: PodcastEpisode }) {
  const { mediaType } = episode;

  if (mediaType === 'video' && episode.videoUrl) {
    const embedUrl = youTubeEmbedUrl(episode.videoUrl);
    if (!embedUrl) return null;
    return (
      <div className="aspect-video w-full bg-stone-100 border border-stone-200">
        <iframe
          src={embedUrl}
          title={episode.title ?? 'Podcast episode video'}
          className="w-full h-full"
          allowFullScreen
        />
      </div>
    );
  }

  if (mediaType === 'video' && episode.videoFileUrl) {
    return (
      <div className="w-full bg-black border border-stone-200 shadow-xl">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption -- raw file upload; captions arrive with transcript segments */}
        <video controls preload="metadata" className="w-full">
          <source src={episode.videoFileUrl} type="video/mp4" />
        </video>
      </div>
    );
  }

  if (isEpisodeMediaType(mediaType) && mediaType === 'audio' && episode.audioUrl) {
    return (
      <div className="bg-stone-100 p-6 border border-stone-200 rounded-sm">
        {/* TODO(slice-2): replace with accessible custom player driven by useAudioPlayer */}
        <audio controls preload="metadata" className="w-full opacity-80">
          <source src={episode.audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }

  return null;
}

function EpisodeCard({ episode, locale }: { episode: PodcastEpisode; locale: string }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-stone-200 pt-16">

      {/* LEFT: Cover Image */}
      <div className="lg:col-span-5">
        {episode.imageUrl && (
          <div className="relative shadow-2xl rotate-[-1deg] aspect-[3/4]">
            <Image
              src={episode.imageUrl}
              alt={episode.title ?? ''}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        )}
      </div>

      {/* RIGHT: Content & Media Player */}
      <div className="lg:col-span-7 space-y-8">
        <h2 className="text-4xl font-bold italic tracking-tight">{episode.title}</h2>
        <p className="text-lg text-stone-600 leading-relaxed font-light">{episode.description}</p>

        <div className="space-y-6">
          <EpisodeMedia episode={episode} />
        </div>

        {/* TRANSCRIPT / CC SECTION */}
        {episode.transcript && (
          <div className="mt-12 pt-8 border-t border-stone-200">
            <h3 className="text-[10px] uppercase tracking-[0.4em] text-stone-400 mb-6 font-sans">Transcript</h3>
            <div className="text-sm leading-relaxed text-stone-500 max-h-60 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-stone-300 italic">
              {episode.transcript}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default async function PodcastPage({ params }: Props) {
  const { locale } = await params;

  let episodes: PodcastEpisode[] = [];
  let fetchFailed = false;
  try {
    episodes = await getPodcastEpisodes(locale);
  } catch (error) {
    // Graceful degradation: render the page shell rather than a 500.
    fetchFailed = true;
    console.error('[podcast] Failed to fetch episodes:', error);
  }

  const hasEpisodes = episodes.length > 0;

  return (
    <main className="page-paper pt-12 pb-40 px-6 md:px-16">

      <Link
        href={`/${locale}`}
        className="fixed top-12 left-8 z-50 text-stone-400 hover:text-black transition-colors uppercase text-[10px] tracking-[0.5em] mix-blend-difference"
      >
        ← {locale === 'fr' ? 'ACCUEIL' : 'HOME'}
      </Link>

      <header className="max-w-4xl mx-auto mb-32 text-center pt-24">
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter italic mb-8">
          {locale === 'fr' ? 'Le Podcast' : 'The Podcast'}
        </h1>
        <div className="h-px w-32 bg-stone-300 mx-auto" />
      </header>

      <div className="max-w-5xl mx-auto">
        {fetchFailed ? (
          <div className="text-center py-20 text-stone-500">
            <p className="italic">
              {locale === 'fr'
                ? 'Impossible de charger les épisodes pour le moment. Veuillez réessayer plus tard.'
                : 'Unable to load episodes right now. Please check back shortly.'}
            </p>
          </div>
        ) : hasEpisodes ? (
          <div className="space-y-32">
            {episodes.map((episode) => (
              <EpisodeCard key={episode._id} episode={episode} locale={locale} />
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