import { client } from '@/lib/sanity';
import Link from 'next/link';
import * as motion from "framer-motion/client";
import Typewriter from '@/components/Typewriter';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;

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
    { label: locale === 'fr' ? "01 // VIE PERSONNELLE" : "01 // PERSONAL LIFE", content: data.personalLife },
    { label: locale === 'fr' ? "02 // VOIX & EXPRESSION" : "02 // VOICE & EXPRESSION", content: data.voiceExpression },
    { label: locale === 'fr' ? "03 // SOUTIEN & PLAIDOYER" : "03 // SUPPORT & ADVOCACY", content: data.supportAdvocacy },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-12 pb-60 px-6 md:px-16 font-serif relative overflow-x-hidden selection:bg-white selection:text-black">
      
      {/* 1. FIXED NAVIGATION */}
      <Link 
        href={`/${locale}`} 
        className="fixed top-12 left-8 z-50 text-white/30 hover:text-white transition-colors uppercase text-[10px] tracking-[0.5em] font-sans mix-blend-difference"
      >
        ← {locale === 'fr' ? 'RETOUR' : 'BACK'}
      </Link>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative z-10">
        
        {/* 2. LEFT COLUMN: THE IDENTITY (Sticky Graphic Novel Element) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col items-center lg:items-end pt-24">
          
          {/* VERTICAL BACKGROUND TEXT */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 2 }}
            className="hidden lg:block absolute -left-20 top-0 h-full"
          >
            <h2 
              className="text-stone-500 text-[12vw] font-black uppercase tracking-tighter vertical-text select-none pointer-events-none italic" 
              style={{ writingMode: 'vertical-rl' }}
            >
              {data.name.split(' ').pop()}
            </h2>
          </motion.div>

          {/* THE "POLAROID" DOCUMENT */}
          <motion.div 
            initial={{ opacity: 0, rotate: -5, scale: 0.9 }}
            animate={{ opacity: 1, rotate: -2, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-transparent p-2 shadow-[0_50px_100px_rgba(0,0,0,0.9)] w-full max-w-md relative group"
          >
            <div className="overflow-hidden border border-white/5 aspect-[4/5] relative">
              <motion.img 
                src={data.imageUrl} 
                alt={data.name} 
                className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[1.5s]"
                whileHover={{ scale: 1.05 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>
            
            <div className="mt-10 text-center lg:text-right">
               <h2 className="text-white text-5xl font-black italic tracking-tighter uppercase leading-none">
                 {data.name}
               </h2>
               <p className="text-stone-500 text-[10px] uppercase tracking-[0.5em] font-sans mt-4 font-bold">
                 {data.role}
               </p>
            </div>
          </motion.div>
        </div>

        {/* 3. RIGHT COLUMN: THE NARRATIVE (Scroll Revealed) */}
        <div className="lg:col-span-7 space-y-40 pt-12">
          
          {/* INTRO SECTION */}
          <motion.section 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-12"
          >
            <header className="relative">
               <span className="text-stone-600 font-sans text-[10px] uppercase tracking-[0.8em] block mb-4 font-bold">The Story Behind</span>
               <h1 className="text-7xl md:text-[9vw] font-black italic tracking-tighter uppercase leading-[0.75] mb-12">
                {locale === 'fr' ? 'À Propos' : 'About'}
              </h1>
              <div className="h-px w-full bg-white/5" />
            </header>

            <div className="text-2xl md:text-3xl leading-[1.4] text-stone-300 font-light italic tracking-tight whitespace-pre-wrap">
              {data.about && <Typewriter text={data.about} speed={0.008} />}
            </div>
          </motion.section>

          {/* BELIEF QUOTE - Cinematic Break */}
          {data.beliefQuote && (
            <motion.section 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="py-32 border-y border-white/5 relative"
            >
              <div className="absolute top-0 left-0 w-12 h-px bg-white/40" />
              <blockquote className="text-4xl md:text-6xl text-white font-black italic leading-[1.1] text-center max-w-2xl mx-auto tracking-tighter uppercase">
                "{data.beliefQuote}"
              </blockquote>
              <div className="absolute bottom-0 right-0 w-12 h-px bg-white/40" />
            </motion.section>
          )}

          {/* DYNAMIC NARRATIVE CHAPTERS */}
          <div className="space-y-40">
            {narrativeSections.map((section, index) => section.content && (
              <motion.section 
                key={section.label} 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, delay: 0.2 }}
                className="space-y-10 group"
              >
                <div className="flex items-center gap-6">
                  <div className="h-px w-12 bg-stone-900 group-hover:w-24 group-hover:bg-white transition-all duration-700" />
                  <h3 className="text-[10px] uppercase tracking-[0.6em] text-stone-600 font-bold font-sans">
                    {section.label}
                  </h3>
                </div>
                <div className="text-xl md:text-2xl leading-relaxed text-stone-400 font-light border-l border-stone-900 pl-10 group-hover:border-stone-500 transition-colors duration-700">
                  <Typewriter text={section.content} speed={0.005} />
                </div>
              </motion.section>
            ))}
          </div>

          {/* FOOTER TRANSITION */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="pt-40 flex flex-col items-center gap-8"
          >
            <div className="w-px h-32 bg-gradient-to-b from-stone-800 to-transparent" />
            <Link 
              href={`/${locale}/voices`}
              className="font-sans text-[10px] uppercase tracking-[0.8em] text-stone-600 hover:text-white transition-colors"
            >
              {locale === 'fr' ? 'Entrer dans les voix' : 'Enter the Voices'}
            </Link>
          </motion.div>
        </div>

      </div>
    </main>
  );
}
