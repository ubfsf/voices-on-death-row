import { client } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';

export default async function PrisonerProfile({ params }: { params: { slug: string } }) {
  const query = `*[_type == "voice" && slug.current == $slug][0]{
    name,
    "imageUrl": image.asset->url,
    bio,
    contact
  }`;
  const prisoner = await client.fetch(query, { slug: params.slug });

  if (!prisoner) return <div className="text-white p-20 text-center">Profile not found.</div>;

  return (
    <main className="min-h-screen bg-black text-white pt-32 px-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-start">
        {/* Photo Section - Clean Polaroid look with no extra text */}
        <div className="w-full md:w-2/5">
          <div className="bg-white p-3 pb-8 shadow-2xl">
            <img 
              src={prisoner.imageUrl} 
              alt={prisoner.name} 
              className="w-full h-auto object-contain" 
            />
          </div>
        </div>

        {/* Biography Section */}
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
