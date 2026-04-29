import { client } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';

export default async function PrisonerProfile({ params }: { params: Promise<{ slug: string }> }) {
  // 1. You must await params in Next.js 15+
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug || slug === 'null') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl font-light tracking-widest uppercase">Invalid Profile Link</p>
      </div>
    );
  }

  const query = `*[_type == "voice" && slug.current == $slug][0]{
    name,
    "imageUrl": image.asset->url,
    bio,
    contact
  }`;

  const prisoner = await client.fetch(query, { slug });

  if (!prisoner) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl font-light tracking-widest uppercase">Profile not found</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pt-32 px-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-start">
        <div className="w-full md:w-2/5">
          <div className="bg-white p-3 pb-8 shadow-2xl">
            {prisoner.imageUrl ? (
              <img 
                src={prisoner.imageUrl} 
                alt={prisoner.name} 
                className="w-full h-auto object-contain" 
              />
            ) : (
              <div className="w-full aspect-[4/5] bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-3/5">
          <h1 className="text-5xl uppercase tracking-widest mb-8 font-light">
            {prisoner.name}
          </h1>
          <div className="prose prose-invert font-serif text-lg leading-relaxed opacity-90">
            <PortableText value={prisoner.bio} />
          </div>
          
          <div className="mt-16 border-t border-white/10 pt-8">
            <h3 className="text-xs uppercase tracking-[0.4em] text-stone-500 mb-4">
              Contact Information
            </h3>
            <p className="font-mono text-sm tracking-wider leading-loose">
              {prisoner.contact}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
