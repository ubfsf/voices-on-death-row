import { client } from '@/lib/sanity';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CondemnedPage({ params }: Props) {
  const { locale } = await params;

  // Query only items that match the "condemned" category
  const query = `*[_type == "familyVoice" && category == "condemned"]{
    name,
    slug,
    image,
    "introduction": introduction[$locale]
  }`;

  const stories = await client.fetch(query, { locale });

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 px-6 md:px-16 font-serif">
      {/* Back Navigation */}
      <Link 
        href={`/${locale}/families_voices`} 
        className="fixed top-8 left-8 z-[100] w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-md hover:bg-white hover:text-black transition-all duration-500 font-sans"
      >
        <span className="text-lg">←</span>
      </Link>

      <h1 className="text-6xl md:text-8xl font-black italic uppercase mb-12">
        Families of the Condemned
      </h1>
      <p className="text-stone-400 text-xl mb-20 max-w-3xl font-serif font-light italic">
        Stories of love, separation, uncertainty, and families living in the shadow of a death sentence.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {stories.map((story: any) => (
          <Link 
            key={story.slug.current} 
            href={`/${locale}/families_voices/${story.slug.current}`}
            className="group"
          >
            <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-stone-900">
              {story.image && (
                <img 
                  src={urlFor(story.image).url()} 
                  alt={story.name} 
                  className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700"
                />
              )}
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight group-hover:text-stone-400 transition-colors">
              {story.name}
            </h2>
            {story.introduction && (
              <p className="text-stone-500 font-serif font-light text-sm mt-2 line-clamp-2">
                {story.introduction}
              </p>
            )}
          </Link>
        ))}
      </div>

      {/* Empty state */}
      {stories.length === 0 && (
        <div className="text-center py-40">
          <p className="text-stone-500 font-serif text-xl">No stories yet in this category.</p>
        </div>
      )}
    </main>
  );
}