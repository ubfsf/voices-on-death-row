import { client } from '@/lib/sanity';
import Link from 'next/link';
import * as motion from "framer-motion/client";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function VoiceDetail({ params }: Props) {
  const { slug } = await params;

  // Optimized query: Uses 'about' to match your updated Sanity Studio field
  const query = `*[_type == "voice" && (slug.current == $slug || _id == $slug)][0]{
    name,
    inmateNumber,
    facility,
    cityState,
    about,
    legalSituation,
    voiceExpression,
    supportAdvocacy,
    contactInfo,
    "imageUrl": photo.asset->url
  }`;

  const voice = await client.fetch(query, { slug });

  if (!voice) return <div className="bg-black min-h-screen" />;

  const narrativeSections = [
    { label: "Legal Situation", content: voice.legalSituation },
    { label: "Voice & Expression", content: voice.voiceExpression },
    { label: "Support & Advocacy", content: voice.supportAdvocacy },
    { label: "Contact", content: voice.contactInfo },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-12 pb-40 px-6 md:px-16 font-serif relative">
      {/* MINIMALIST NAVIGATION */}
      <Link 
        href="/voices" 
        className="fixed top-12 left-8 z-50 text-white/30 hover:text-white transition-colors uppercase text-[10px] tracking-[0.5em]"
      >
        ← Back
      </Link>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* LEFT COLUMN: Sticky Visual Identity */}
        <div className="lg:col-span-5 lg:sticky lg:top-12 flex flex-col items-center lg:items-end pt-24">
          
          {/* VERTICAL NAME DISPLAY (SIDE) */}
          {voice.name && (
            <div className="hidden lg:block absolute -left-16 top-24 h-full">
              <h2 
                className="text-stone-800 text-8xl font-light uppercase tracking-tighter vertical-text opacity-40 select-none pointer-events-none" 
                style={{ writingMode: 'vertical-rl' }}
              >
                {voice.name.split(' ').pop()}
              </h2>
            </div>
          )}

          {/* IMAGE CONTAINER: Pushed down with no bottom block */}
          {voice.imageUrl && (
            <div className="relative shadow-2xl rotate-[-1deg] w-full max-w-md overflow-hidden group">
              
              {/* INMATE NUMBER OVERLAY */}
              {voice.inmateNumber && (
                <div className="absolute top-4 left-4 z-20">
                   <p className="text-white text-[10px] uppercase tracking-[0.4em] font-sans bg-black/40 backdrop-blur-md px-3 py-1 rounded-sm">
                     #{voice.inmateNumber}
                   </p>
                </div>
              )}

              {/* HOVER ZOOM EFFECT */}
              <div className="overflow-hidden bg-gray-900">
                <motion.img 
                  src={voice.imageUrl} 
                  alt={voice.name || "Voice Photo"} 
                  className="w-full h-auto block cursor-zoom-in"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          )}
          
          {/* LOCATION METADATA */}
          <div className="mt-12 space-y-2 opacity-40 text-center lg:text-right">
            {voice.facility && <p className="text-xs uppercase tracking-[0.3em] font-sans">{voice.facility}</p>}
            {voice.cityState && <p className="text-xs uppercase tracking-[0.3em] font-sans">{voice.cityState}</p>}
          </div>
        </div>

        {/* RIGHT COLUMN: Name on Top + Narrative */}
        <div className="lg:col-span-7 space-y-24 pt-4">
          
          {/* PRIMARY SECTION */}
          <section className="space-y-12">
            {voice.name && (
              <header>
                 <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-none mb-6">
                  {voice.name}
                </h1>
                <div className="h-px w-32 bg-white/20" />
              </header>
            )}

            {voice.about && (
              <div className="text-xl md:text-2xl leading-relaxed text-white/80 font-light whitespace-pre-wrap">
                {voice.about}
              </div>
            )}
          </section>

          {/* DYNAMIC NARRATIVE SECTIONS */}
          {narrativeSections.map((section) => section.content && (
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
