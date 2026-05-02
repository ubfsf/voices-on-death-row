import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity'; // Make sure this is exported from your lib/sanity.ts
import Link from 'next/link';

export default async function VoicesPage() {
  const query = `*[_type == "archive"] | order(_createdAt desc) {
    title,
    author,
    "slug": slug.current,
    "imageUrl": image.asset->url
  }`;

  const voices = await client.fetch(query);

  return (
    <main className="min-h-screen bg-black text-white pt-24 px-8">
      <h1 className="text-center text-4xl tracking-[0.5em] uppercase mb-20 font-light">Voices</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {voices.map((voice: any) => (
          <Link href={`/voices/${voice.slug}`} key={voice.slug}>
             {/* Render your Polaroid here using voice.imageUrl and voice.author */}
          </Link>
        ))}
      </div>
    </main>
  );
}
