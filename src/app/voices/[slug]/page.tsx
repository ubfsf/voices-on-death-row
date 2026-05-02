import { client } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';

export default async function VoiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const query = `*[_type == "archive" && slug.current == $slug][0]{
    title,
    author,
    content,
    "imageUrl": image.asset->url
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
    <main className="min-h-screen bg-black text-white pt-32 px-8 font-serif">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-start">
        <div className="w-full md:w-2/5">
          <div className="bg-white p-3 pb-12 shadow-2xl rotate-[-1deg]">
            {voice.imageUrl && (
              <img 
                src={voice.imageUrl} 
                alt={voice.author} 
                className="w-full h-auto grayscale"
              />
            )}
            <p className="text-black text-center mt-6 text-2xl italic">{voice.author}</p>
          </div>
        </div>

        <div className="w-full md:w-3/5">
          <h1 className="text-5xl uppercase tracking-widest mb-4 font-light">{voice.author}</h1>
          <h2 className="text-xl mb-12 opacity-60 tracking-widest uppercase">{voice.title}</h2>
          
          <div className="prose prose-invert text-xl leading-relaxed opacity-90 whitespace-pre-wrap">
            {voice.content}
          </div>
        </div>
      </div>
    </main>
  );
}
