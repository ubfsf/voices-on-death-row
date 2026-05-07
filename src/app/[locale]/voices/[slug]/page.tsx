import { client } from '@/lib/sanity';
import Link from 'next/link';
import * as motion from "framer-motion/client";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export default async function VoiceDetail({ params }: Props) {
  // 1. Await params to get both the person (slug) and the language (locale)
  const { slug, locale } = await params;

  // 2. The Query: about[$locale] grabs either the 'en' or 'fr' text automatically
  const query = `*[_type == "voice" && (slug.current == $slug || _id == $slug)][0]{
    name,
    inmateNumber,
    facility,
    cityState,
    "about": about[$locale],
    "legalSituation": legalSituation[$locale],
    "voiceExpression": voiceExpression[$locale],
    "supportAdvocacy": supportAdvocacy[$locale],
    "contactInfo": contactInfo[$locale],
    "imageUrl": photo.asset->url
  }`;

  // 3. Pass BOTH slug and locale as parameters to the fetch
  const voice = await client.fetch(query, { slug, locale });

  if (!voice) return <div className="bg-black min-h-screen" />;

  // Translated labels for the UI
  const labels = {
    back: locale === 'fr' ? 'Retour' : 'Back',
    inmate: locale === 'fr' ? 'Détenu' : 'Inmate'
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-12 pb-40 px-6 md:px-16 font-serif relative">
      {/* BACK BUTTON with correct locale path */}
      <Link 
        href={`/${locale}/voices`} 
        className="fixed top-12 left-8 z-50 text-white/30 hover:text-white transition-colors uppercase text-[10px] tracking-[0.5em] mix-blend-difference"
      >
        ← {labels.back}
      </Link>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* LEFT COLUMN: Visual Identity */}
        <div className="lg:col-span-5 lg:sticky lg:top-12 flex flex-col items-center lg:items-end pt-24">
          <div className="relative shadow-2xl rotate-[-1deg] w-full max-w-md overflow-hidden">
            {voice.inmateNumber && (
              <div className="absolute top-4 left-4 z-20">
                 <p className="text-white text-[10px] uppercase tracking-[0.4em] font-sans bg-black/40 backdrop-blur-md px-3 py-1">
                   {labels.inmate} {voice.inmateNumber}
                 </p>
              </div>
            )}
            <div className="overflow-hidden bg-gray-900 aspect-[4/5]">
              <motion.img 
                src={voice.imageUrl} 
                alt={voice.name} 
                className="w-full h-full object-cover block cursor-zoom-in"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
          <div className="mt-12 space-y-2 opacity-40 text-center lg:text-right">
            <p className="text-xs uppercase tracking-[0.3em] font-sans">{voice.facility}</p>
            <p className="text-xs uppercase tracking-[0.3em] font-sans">{voice.cityState}</p>
          </div>
        </div>

        {/* RIGHT COLUMN: Localized Narrative */}
        <div className="lg:col-span-7 space-y-24 pt-4">
          <section className="space-y-12">
            <header>
               <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-none mb-6">
                {voice.name}
              </h1>
              <div className="h-px w-32 bg-white/20" />
            </header>
            <div className="text-xl md:text-2xl leading-relaxed text-white/80 font-light whitespace-pre-wrap">
              {voice.about}
            </div>
          </section>

          {/* Granular Sections (Bilingual) */}
          {[
            { label: locale === 'fr' ? "SITUATION JURIDIQUE" : "LEGAL SITUATION", content: voice.legalSituation },
            { label: locale === 'fr' ? "VOIX & EXPRESSION" : "VOICE & EXPRESSION", content: voice.voiceExpression },
            { label: locale === 'fr' ? "SOUTIEN & PLAIDOYER" : "SUPPORT & ADVOCACY", content: voice.supportAdvocacy },
            { label: locale === 'fr' ? "CONTACT" : "CONTACT", content: voice.contactInfo },
          ].map((section) => section.content && (
            <section key={section.label} className="space-y-6 border-t border-white/5 pt-12">
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
