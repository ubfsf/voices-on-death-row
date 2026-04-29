import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity'; // Make sure this is exported from your lib/sanity.ts
import Link from 'next/link';

export default async function VoicesPage() {
  // Update query to get the full image object instead of just the URL string
  const query = `*[_type == "voice"] | order(_createdAt desc) {
    name,
    slug,
    image
  }`;

  const voices = await client.fetch(query);

  return (
    <main className="min-h-screen bg-black text-white pt-24 px-8">
      <h1 className="text-center text-4xl tracking-[0.5em] uppercase mb-20 font-light">Voices</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {voices.map((voice: any) => (
          <Link key={voice.slug.current} href={`/voices/${voice.slug.current}`}>
            <div className="group cursor-pointer">
              <div className="bg-white p-3 pb-10 shadow-xl transition-transform group-hover:scale-[1.02]">
                {voice.image ? (
                  <img 
                    src={urlFor(voice.image).width(600).url()} 
                    alt={voice.name}
                    className="w-full aspect-[4/5] object-cover"
                  />
                ) : (
                  <div className="w-full aspect-[4/5] bg-gray-200 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
                <h2 className="text-black mt-4 text-sm tracking-widest uppercase font-medium text-center">
                  {voice.name}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
