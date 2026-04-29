import { client } from '@/lib/sanity';
import Link from 'next/link';

export default async function VoicesPage() {
  const voices = await client.fetch(
    `*[_type == "voice"]{
      name,
      "slug": slug.current,
      "imageUrl": image.asset->url 
    }`,
    {},
    { next: { revalidate: 0 } }
  );

  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-8 relative">
      {/* Back to Menu Navigation */}
      <Link 
        href="/" 
        className="fixed top-10 left-10 z-50 text-white/40 hover:text-white uppercase tracking-[0.4em] text-[10px] transition-all duration-500 flex items-center gap-2 group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Menu
      </Link>

      <h1 className="text-white text-3xl uppercase tracking-[0.5em] text-center mb-24 font-light opacity-80">
        Voices
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 max-w-7xl mx-auto">
        {voices?.map((p: any) => (
          <Link key={p.slug} href={`/voices/${p.slug}`} className="group">
            <div className="bg-white p-3 pb-10 shadow-2xl transition-all duration-700 group-hover:scale-[1.02] group-hover:-rotate-1">
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                <img 
                  src={p.imageUrl} 
                  alt={p.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
