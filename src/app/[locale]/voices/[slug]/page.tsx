import { client } from '@/lib/sanity';
import Link from 'next/link';
import * as motion from "framer-motion/client";
import Typewriter from '@/components/Typewriter';

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export default async function VoiceDetail({ params }: Props) {
  const { slug, locale } = await params;

  const query = `*[_type == "voice" && (slug.current == $slug || _id == $slug)][0]{
    name,
    inmateNumber,
    facility,
    cityState,
    "about": about[$locale],
    "beliefQuote": beliefQuote[$locale],
    "skillsInterests": skillsInterests[$locale],
    "professionalBackground": professionalBackground[$locale],
    "personalLife": personalLife[$locale],
    "entertainmentSports": entertainmentSports[$locale],
    "legalSituation": legalSituation[$locale],
    "voiceExpression": voiceExpression[$locale],
    "supportAdvocacy": supportAdvocacy[$locale],
    "contactInfo": contactInfo[$locale],
    "imageUrl": photo.asset->url
  }`;

  const voice = await client.fetch(query, { slug, locale });

  if (!voice) return <div className="bg-[#050505] min-h-screen" />;

  const labels: Record<string, string> = {
    legal: locale === 'fr' ? 'SITUATION JURIDIQUE' : 'LEGAL SITUATION',
    skills: locale === 'fr' ? 'COMPÉTENCES & INTÉRÊTS' : 'SKILLS & INTERESTS',
    pro: locale === 'fr' ? 'PARCOURS PROFESSIONNEL' : 'PROFESSIONAL BACKGROUND',
    life: locale === 'fr' ? 'VIE PERSONNELLE' : 'PERSONAL LIFE',
    sports: locale === 'fr' ? 'DIVERTISSEMENT & SPORTS' : 'ENTERTAINMENT & SPORTS',
    voice: locale === 'fr' ? 'VOIX & EXPRESSION' : 'VOICE & EXPRESSION',
    support: locale === 'fr' ? 'SOUTIEN & PLAIDOYER' : 'SUPPORT & ADVOCACY',
    contact: locale === 'fr' ? 'COORDONNÉES' : 'CONTACT INFORMATION',
    back: locale === 'fr' ? 'RETOUR' : 'BACK'
  };

  const narrativeSections = [
    { label: labels.legal, content: voice.legalSituation },
    { label: labels.skills, content: voice.skillsInterests },
    { label: labels.pro, content: voice.professionalBackground },
    { label: labels.life, content: voice.personalLife },
    { label: labels.sports, content: voice.entertainmentSports },
    { label: labels.voice, content: voice.voiceExpression },
    { label: labels.support, content: voice.supportAdvocacy },
    { label: labels.contact, content: voice.contactInfo },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-12 pb-40 px-6 md:px-16 font-serif relative overflow-x-hidden">
      
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(20,20,20,1)_0%,_rgba(0,0,0,1)_100%)] pointer-events-none" />

      <Link 
        href={`/${locale}/voices`} 
        className="fixed top-12 left-8 z-50 text-white/30 hover:text-white transition-colors uppercase text-[10px] tracking-[0.5em] mix-blend-difference"
      >
        ← {labels.back}
      </Link>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative z-10">
        
        <div className="lg:col-span-5 lg:sticky lg:top-12 flex flex-col items-center lg:items-end pt-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative w-full max-w-md group"
          >
            {voice.inmateNumber && (
              <div className="absolute -top-6 left-0 z-20">
                 <p className="text-stone-500 text-[9px] font-mono uppercase tracking-[0.4em]">
                   Archive_Ref // #{voice.inmateNumber}
                 </p>
              </div>
            )}

            <div className="overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.9)] rotate-[-1deg] border border-white/5">
              <motion.img 
                src={voice.imageUrl} 
                alt={voice.name} 
                className="w-full h-auto block grayscale-[0.2] hover:grayscale-0 transition-all duration-[1.5s]"
                whileHover={{ scale: 1.03 }}
              />
            </div>

            <div className="mt-12 space-y-2 opacity-30 text-right font-sans text-[10px] uppercase tracking-[0.4em] leading-relaxed">
              <p>{voice.facility}</p>
              <p>{voice.cityState}</p>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-7 space-y-32 pt-4">
          
          <section className="space-y-12">
            <header className="overflow-hidden">
               <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-7xl md:text-[10vw] font-black italic tracking-tighter leading-[0.75] mb-8 uppercase"
               >
                {voice.name}
              </motion.h1>
              <div className="h-px w-24 bg-stone-800" />
            </header>

            <div className="text-2xl md:text-3xl leading-[1.4] text-stone-300 font-light italic tracking-tight">
              {voice.about && <Typewriter text={voice.about} speed={0.01} delay={0.2} />}
            </div>
          </section>

          {voice.beliefQuote && (
            <section className="py-24 border-y border-white/5">
              <div className="max-w-xl mx-auto text-center">
                <Typewriter 
                  text={`"${voice.beliefQuote}"`} 
                  speed={0.02} 
                  className="text-3xl md:text-5xl text-white font-black italic leading-tight tracking-tighter uppercase" 
                />
              </div>
            </section>
          )}

          <div className="space-y-32">
            {narrativeSections.map((section) => section.content && (
              <section key={section.label} className="space-y-10 group">
                <div className="flex items-center gap-6">
                  <div className="h-px w-12 bg-stone-900 group-hover:w-20 group-hover:bg-white transition-all duration-700" />
                  <h3 className="text-[10px] uppercase tracking-[0.6em] text-stone-600 font-bold font-sans">
                    {section.label}
                  </h3>
                </div>
                <div className="text-xl md:text-2xl leading-relaxed text-stone-400 font-light border-l border-stone-900 pl-10">
                  <Typewriter text={section.content} speed={0.005} />
                </div>
              </section>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}
