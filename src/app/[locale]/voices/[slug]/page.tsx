import { client } from '@/lib/sanity';
import Link from 'next/link';
import * as motion from "framer-motion/client";

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

  if (!voice) return <div className="bg-[#121212] min-h-screen" />;

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
    <main className="min-h-screen bg-[#121212] text-white pt-12 pb-40 px-6 md:px-16 font-serif relative">
      
      {/* MINIMALIST NAVIGATION */}
      <Link 
        href={`/${locale}/voices`} 
        className="fixed top-12 left-8 z-50 text-white/30 hover:text-white transition-colors uppercase text-[10px] tracking-[0.5em] mix-blend-difference"
      >
        ← {labels.back}
      </Link>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* LEFT COLUMN: Visual Identity */}
        <div className="lg:col-span-5 lg:sticky lg:top-12 flex flex-col items-center lg:items-end pt-24">
          
          {/* VERTICAL BACKGROUND NAME - Lighter for visibility */}
          {voice.name && (
            <div className="hidden lg:block absolute -left-16 top-24 h-full">
              <h2 
                className="text-stone-500 text-8xl font-bold uppercase tracking-tighter vertical-text opacity-20 select-none pointer-events-none italic" 
                style={{ writingMode: 'vertical-rl' }}
              >
                {voice.name?.split(' ').pop()}
              </h2>
            </div>
          )}

          {/* THE IMAGE: Floating directly, no white background */}
          <div className="relative w-full max-w-md group">
            {/* INMATE NUMBER OVERLAY */}
            {voice.inmateNumber && (
              <div className="absolute top-4 left-4 z-20">
                 <p className="text-white text-[10px] uppercase tracking-[0.4em] font-sans bg-black/60 backdrop-blur-md px-3 py-1 rounded-sm border border-white/10">
                   #{voice.inmateNumber}
                 </p>
              </div>
            )}

            <div className="overflow-hidden aspect-[4/5] shadow-2xl">
              <motion.img 
                src={voice.imageUrl} 
                alt={voice.name} 
                className="w-full h-full object-cover block cursor-zoom-in"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
          
          {/* FACILITY METADATA */}
          <div className="mt-12 space-y-2 opacity-50 text-center lg:text-right font-sans text-xs uppercase tracking-[0.3em]">
            <p>{voice.facility}</p>
            <p>{voice.cityState}</p>
          </div>
        </div>

        {/* RIGHT COLUMN: Narrative Content */}
        <div className="lg:col-span-7 space-y-24 pt-4">
          
          {/* PRIMARY SECTION: Name header */}
          <section className="space-y-12">
            <header>
               <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.8] mb-6 italic">
                {voice.name}
              </h1>
              <div className="h-px w-32 bg-white/20" />
            </header>

            <div className="text-xl md:text-2xl leading-relaxed text-white/80 font-light whitespace-pre-wrap">
              {voice.about}
            </div>
          </section>

          {/* BELIEF QUOTE */}
          {voice.beliefQuote && (
            <section className="py-16 border-y border-white/5">
              <p className="text-2xl md:text-4xl text-white/90 font-serif italic font-light leading-tight text-center max-w-xl mx-auto tracking-tight">
                "{voice.beliefQuote}"
              </p>
            </section>
          )}

          {/* DYNAMIC NARRATIVE SECTIONS */}
          {narrativeSections.map((section) => section.content && (
            <section key={section.label} className="space-y-8 border-t border-white/5 pt-12">
              <h3 className="text-[10px] uppercase tracking-[0.6em] text-white/40 font-bold font-sans">
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
