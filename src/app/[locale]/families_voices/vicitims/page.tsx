// src/app/[locale]/families_voices/victims/page.tsx
import { client } from '@/lib/sanity';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function VictimsPage({ params }: Props) {
  const { locale } = await params;

  // Query only items that match this category
  const query = `*[_type == "familyVoice" && category == "victims"]{
    name,
    slug,
    image,
    "introduction": introduction[$locale]
  }`;

  const stories = await client.fetch(query, { locale });

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 px-6 md:px-16 font-serif">
      <h1 className="text-6xl md:text-8xl font-black italic uppercase mb-20">
        Murder Victims
      </h1>

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
            <h2 className="text-2xl font-black uppercase tracking-tight">{story.name}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}
