import { client } from '@/lib/sanity';
import Link from 'next/link';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function VoiceDetail({ params }: Props) {
  const { slug } = await params;

  // This query is "Smart": It checks if the URL is an ID OR a Slug
  // It only pulls the fields you want: name, bio, photo, and contactInfo
  const query = `*[_type == "voice" && (_id == $slug || slug.current == $slug)][0]{
    name,
    bio,
    contactInfo,
    "imageUrl": photo.asset->url
  }`;

  const voice = await client.fetch(query, { slug });

  if (!voice) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center font-serif">
        <p className="text-xl uppercase tracking-widest opacity-50">Story not found</p>
        <Link href="/voices" className="mt-4 text-xs border-b border-white/20 pb-1">Return to Voices</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20 px-8 font-serif relative">
      <Link 
        href="/voices" 
        className="fixed top-10 left-10 z-50 text-white/30 hover:text-white transition-all duration-500 uppercase text-xs tracking-[0.4em] font-light mix-blend-difference group"
      >
        <span className="inline-block transition-transform group-hover:-translate-x-2 duration-500 mr-2">←</span>
        Voices
      </Link>

      <div className="max-w-4xl mx-auto">
        {/* PHOTO */}
        <div className="bg-white p-4 pb-12 shadow-2xl mb-16 mx-auto max-w-lg rotate-[-1deg]">
          <img src={voice.imageUrl} alt={voice.name} className="w-full h-auto" />
        </div>

        {/* BIO & CONTACT */}
        <div className="max-w-2xl mx-auto">          
          <div className="text-xl leading-relaxed text-white/70 whitespace-pre-wrap font-light mb-20">
            {voice.bio}
          </div>

          {voice.contactInfo && (
            <div className="border-t border-white/10 pt-10">
              <h3 className="text-xs uppercase tracking-[0.4em] text-white/40 mb-4">Contact Information</h3>
              <p className="text-lg text-white/60 font-mono leading-relaxed bg-white/5 p-6 rounded">
                {voice.contactInfo}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
