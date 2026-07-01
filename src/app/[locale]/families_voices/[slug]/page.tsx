import { client } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';
import Typewriter from '@/components/Typewriter';

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export default async function FamilyVoicePage({ params }: Props) {
  const { slug, locale } = await params;

  // 1. Fetch the data (including the new additionalChapters array)
  const query = `*[_type == "familyVoice" && slug.current == $slug][0]{
    name,
    category,
    image,
    "introduction": introduction[$locale],
    "testimony": testimony[$locale],
    "additionalChapters": additionalChapters[]{
      "title": chapterTitle[$locale],
      "content": chapterContent[$locale]
    }
  }`;

  const data = await client.fetch(query, { slug, locale });

  if (!data) notFound();

  return (
    <main className="min-h-screen bg-[#fcfaf7] text-black selection:bg-black selection:text-white relative overflow-x-hidden font-serif">
      
      {/* Cinematic Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* 1. NAVIGATION */}
      <Link 
        href={`/${locale}/families_voices`} 
        className="fixed top-8 left-8 md:top-12 md:left-12 z-[100] flex items-center gap-3 group mix-blend-difference"
      >
        <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center bg-white/20 backdrop-blur-md group-hover:bg-black group-hover:text-white transition-all duration-500">
          <span className="text-lg">←</span>
        </div>
      </Link>

      {/* 2. RESPONSIVE HERO SECTION */}
      <section className="min-h-screen w-full flex items-center justify-center px-6 md:px-20 py-24">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Side */}
          <div className="lg:col-span-7 z-20 order-2 lg:order-1">
            <h1 className="text-5xl sm:text-7xl md:text-[8vw] uppercase leading-[0.85] tracking-tighter mb-8">
              {data.name.split(' ')[0]} <br/>
              <span className="text-stone-400 font-light">{data.name.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="font-mono text-[9px] uppercase tracking-[0.6em] text-stone-400">
              {data.category} // Family Testimony
            </p>
          </div>

          {/* Portrait Side */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative w-full max-w-[300px] sm:max-w-md shadow-2xl rotate-1 p-2 bg-white">
              {data.image && (
                <img 
                  src={urlFor(data.image).url()} 
                  alt={data.name} 
                  className="w-full h-auto block grayscale-[0.2]" 
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. NARRATIVE CONTENT */}
      <div className="relative z-30 max-w-5xl mx-auto px-6 md:px-20 pb-40">
        
        {/* Intro Section */}
        <section className="mb-32">
          <span className="text-stone-400 font-mono text-[9px] uppercase tracking-[0.5em] font-bold block mb-8">01 // INTRODUCTION</span>
          <div className="text-2xl md:text-4xl font-light italic leading-[1.5] tracking-tight text-stone-800 border-l border-stone-200 pl-8 md:pl-16">
             <Typewriter text={data.introduction} speed={0.005} />
          </div>
        </section>

        {/* Full Testimony Section */}
        <section className="mb-32">
          <span className="text-stone-400 font-mono text-[9px] uppercase tracking-[0.5em] font-bold block mb-8">02 // THE TESTIMONY</span>
          <div className="text-xl md:text-2xl leading-relaxed text-stone-700 whitespace-pre-wrap">
             {data.testimony}
          </div>
        </section>

        {/* Dynamic Chapters (The "Boxes" Halima creates) */}
        {data.additionalChapters?.map((chapter: any, index: number) => (
          <section key={index} className="mb-32">
            <span className="text-stone-400 font-mono text-[9px] uppercase tracking-[0.5em] font-bold block mb-8">
              0{index + 3} // {chapter.title}
            </span>
            <div className="text-xl md:text-2xl leading-relaxed text-stone-700 whitespace-pre-wrap">
               {chapter.content}
            </div>
          </section>
        ))}
      </div>

      {/* 4. FOOTER */}
      <footer className="py-40 border-t border-stone-100 text-center">
        <Link 
          href={`/${locale}/families_voices`}
          className="group flex flex-col items-center gap-6"
        >
          <span className="font-sans text-[11px] uppercase tracking-[0.8em] text-stone-400 group-hover:text-black transition-all">
            Return to Archive
          </span>
          <div className="w-2 h-2 bg-stone-300 rounded-full group-hover:bg-black transition-colors animate-pulse" />
        </Link>
      </footer>
    </main>
  );
}
