import { client } from '@/lib/sanity';
import Link from 'next/link';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function VoiceDetail({ params }: Props) {
  const { slug } = await params;

  const query = `*[_type == "voice" && _id == $slug][0]{
  "author": name,
  "content": bio,
  "imageUrl": photo.asset->url
  }`;

  const voice = await client.fetch(query, { slug });

  if (!voice) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl font-light tracking-widest uppercase">Story not found</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-8 font-serif">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-4 pb-12 shadow-2xl mb-16 mx-auto max-w-lg rotate-[-1deg]">
          <img src={voice.imageUrl} alt={voice.name} className="w-full h-auto grayscale" />
          <p className="text-black text-center mt-6 text-2xl italic">{voice.name}</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl uppercase tracking-tighter font-light mb-12 text-center">{voice.name}</h1>
          <div className="text-xl leading-relaxed text-gray-300 whitespace-pre-wrap font-light mb-20">
            {voice.bio}
          </div>

          {voice.contactInfo && (
            <div className="border-t border-white/10 pt-10">
              <h3 className="text-xs uppercase tracking-widest text-white/40 mb-4">Contact Info</h3>
              <p className="text-sm font-mono opacity-60">{voice.contactInfo}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
