import { client } from '@/lib/sanity';
import Link from 'next/link';
import * as motion from "framer-motion/client";
import Typewriter from '@/components/Typewriter';

export default async function LetterDetail({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;

  const query = `*[_type == "letters" && slug.current == $slug][0]{
    title,
    "content": content[$locale],
    "imageUrl": image.asset->url
  }`;

  const letter = await client.fetch(query, { slug, locale });

  if (!letter) return <div className="bg-black min-h-screen" />;

  return (
    <main className="min-h-screen bg-[#050505] text-white font-serif selection:bg-white selection:text-black">
      
      {/* 1. Cinematic Background Overlays */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Navigation */}
      <Link href={`/${locale}/letters`} className="fixed top-12 left-12 z-50 text-white/20 hover:text-white transition-colors uppercase text-[10px] tracking-[1em]">
        ← Back to Archive
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        
        {/* LEFT: The "Physical" Document (Sticky) */}
        <div className="relative h-[60vh] lg:h-screen lg:sticky lg:top-0 overflow-hidden border-r border-white/5 bg-stone-900/20">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="w-full h-full"
          >
            {letter.imageUrl ? (
              <img 
                src={letter.imageUrl} 
                className="w-full h-full object-cover grayscale brightness-50"
                alt="Original Letter Scan"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-stone-800 font-mono text-[10px] uppercase tracking-[1em]">
                No Image Archive
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050505]" />
          </motion.div>
        </div>

        {/* RIGHT: The Narrative Reveal */}
        <div className="relative z-10 px-8 md:px-20 py-32 lg:py-60 space-y-20">
          <header className="space-y-8">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              className="font-mono text-[10px] uppercase tracking-[0.8em]"
            >
              Document // Transcribed
            </motion.p>
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.85]"
            >
              {letter.title}
            </motion.h1>
            <div className="h-px w-24 bg-stone-800" />
          </header>

          {/* The Content: Word-by-word reveal */}
          <div className="text-xl md:text-2xl leading-[1.6] text-stone-300 font-light italic tracking-tight max-w-2xl">
            {letter.content && (
              <Typewriter 
                text={letter.content} 
                speed={0.008} 
                delay={1.2} 
              />
            )}
          </div>

          {/* Archival Sign-off */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            className="pt-20 border-t border-white/5"
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.5em]">
              End of Transcription // Ref. {slug}
            </p>
          </motion.div>
        </div>

      </div>
    </main>
  );
}
