import { client } from '@/lib/sanity';
import Link from 'next/link';
import * as motion from "framer-motion/client";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;

  // 1. Fetch Localized Data: This query grabs the specific language based on the URL
  const data = await client.fetch(`*[_type == "about"][0]{
    name,
    role,
    "imageUrl": bioImage.asset->url,
    "about": about[$locale],
    "personalLife": personalLife[$locale],
    "voiceExpression": voiceExpression[$locale],
    "supportAdvocacy": supportAdvocacy[$locale],
    "beliefQuote": beliefQuote[$locale]
  }`, { locale });

  if (!data) return <div className="bg-black min-h-screen" />;

  const narrativeSections = [
    { label: locale === 'fr' ? "VIE PERSONNELLE" : "PERSONAL LIFE", content: data.personalLife },
    { label: locale === 'fr' ? "VOIX & EXPRESSION" : "VOICE & EXPRESSION", content: data.voiceExpression },
    { label: locale === 'fr' ? "SOUTIEN & PLAIDOYER" : "SUPPORT & ADVOCACY", content: data.supportAdvocacy },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-12 pb-40 px-6 md:px-16 font-serif relative">
      
      {/* MINIMALIST NAVIGATION */}
      <Link 
        href={`/${locale}`} 
        className="fixed top-12 left-8 z-50 text-white/30 hover:text-white transition-colors uppercase text-[10px] tracking-[0.5em]"
      >
        ← {locale === 'fr' ? 'MENU' : 'MENU'}
      </Link>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* LEFT COLUMN: The Polaroid Identity */}
        <div className="lg:col-span-5 lg:sticky lg:top-12 flex flex-col items-center lg:items-end pt-24">
          
          {/* VERTICAL BACKGROUND NAME */}
          <div className="hidden lg:block absolute -left-16 top-24 h-full">
            <h2 
              className="text-stone-800 text-8xl font-light uppercase tracking-tighter vertical-text opacity-40 select-none pointer-events-none" 
              style={{ writingMode: 'vertical-rl' }}
            >
              {data.name.split(' ').pop()}
            </h2>
          </div>

          {/* THE POLAROID */}
          <div className="bg-white p-4 pb-12 shadow-2xl rotate-[-1deg] w-full max-w-md transition-transform hover:rotate-0 duration-700">
            <div className="overflow-hidden bg-gray-900 aspect-[4/5]">
              <motion.img 
                src={data.imageUrl} 
                alt={data.name} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 cursor-zoom-in"
                whileHover={{ scale: 1.05 }}
              />
            </div>
            <div className="mt-8 text-center">
               <p className="text-black text-3xl italic tracking-tighter">{data.name}</p>
               <p className="text-stone-400 text-[10px] uppercase tracking-[0.4em] font-sans mt-1">
                 {data.role}
               </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Narrative Content */}
        <div className="lg:col-span-7 space-y-24 pt-4">
          
          {/* PRIMARY MISSION SECTION */}
          <section className="space-y-12">
            <header>
               <h1 className="text-6xl md:text-9xl font-light tracking-tighter leading-none mb-6">
                {locale === 'fr' ? 'À Propos' : 'About'}
              </h1>
              <div className="h-px w-32 bg-white/20" />
            </header>

            <div className="text-xl md:text-2xl leading-relaxed text-white/80 font-light whitespace-pre-wrap">
              {data.about}
            </div>
          </section>

          {/* BELIEF QUOTE */}
          {data.beliefQuote && (
            <section className="py-16 border-y border-white/5">
              <p className="text-2xl md:text-4xl text-white/90 font-serif italic leading-tight text-center max-w-xl mx-auto tracking-tight">
                "{data.beliefQuote}"
              </p>
            </section>
          )}

          {/* DYNAMIC NARRATIVE SECTIONS */}
          {narrativeSections.map((section) => section.content && (
            <section key={section.label} className="space-y-8 border-t border-white/5 pt-12">
              <h3 className="text-[10px] uppercase tracking-[0.6em] text-white/30 font-bold font-sans">
                {section.label}
              </h3>
              <div className="text-lg md:text-xl leading-relaxed text-white/60 font-light whitespace-pre-wrap">
                {section.content}
              </div>
            </section>
          ))}
        </div>

      </div>
    </main>
  );
}
