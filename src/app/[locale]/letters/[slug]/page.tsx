import { client } from '@/lib/sanity';
import Link from 'next/link';
import * as motion from "framer-motion/client";
import Typewriter from '@/components/Typewriter';

export default async function LetterDetail({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;

  const query = `*[_type == "letters" && slug.current == $slug][0]{
    title,
    author,
    writtenDate,
    facility,
    category,
    "content": content[$locale],
    "imageUrl": image.asset->url
  }`;

  const letter = await client.fetch(query, { slug, locale });

  if (!letter) return <div className="bg-black min-h-screen" />;

  return (
    <main className="min-h-screen bg-[#050505] text-white font-serif selection:bg-white selection:text-black overflow-x-hidden">
      
      {/* Background Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Navigation */}
      <Link href={`/${locale}/letters`} className="fixed top-8 left-8 md:top-12 md:left-12 z-50 text-white/20 hover:text-white transition-all duration-500 uppercase text-[10px] tracking-[0.8em] font-bold mix-blend-difference">
        ← Archive
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        
        {/* LEFT: The Physical Scan (Sticky) */}
        <div className="relative h-[50vh] lg:h-screen lg:sticky lg:top-0 overflow-hidden border-r border-white/5 bg-stone-900/10">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2 }}
            className="w-full h-full"
          >
            {letter.imageUrl ? (
              <img 
                src={letter.imageUrl} 
                className="w-full h-full object-cover grayscale brightness-[0.4] hover:brightness-[0.6] transition-all duration-1000"
                alt="Document Scan"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-stone-800 font-mono text-[10px] uppercase tracking-[1em]">
                No Visual Archive
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-[#050505]" />
          </motion.div>

          {/* Floating Metadata on Image */}
          <div className="absolute bottom-12 left-12 z-20 space-y-2 hidden md:block">
            <p className="text-stone-500 font-mono text-[9px] uppercase tracking-[0.4em]">Section // {letter.category || 'Letters'}</p>
            <p className="text-white font-black italic text-2xl uppercase tracking-tighter">{letter.author}</p>
          </div>
        </div>

        {/* RIGHT: The Transcription Reveal */}
        <div className="relative z-10 px-6 md:px-20 py-24 lg:py-48 space-y-24">
          
          {/* Dossier Header */}
          <header className="space-y-12">
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4"
              >
                <div className="h-px w-12 bg-stone-800" />
                <span className="font-mono text-[10px] uppercase tracking-[0.6em] text-stone-600 font-bold">
                  File Entry // 002
                </span>
              </motion.div>
              <motion.h1 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.85] text-white"
              >
                {letter.title}
              </motion.h1>
            </div>

            {/* Quick Metadata Table */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 gap-8 border-y border-white/5 py-10"
            >
              <div className="space-y-1">
                <p className="text-stone-600 font-mono text-[8px] uppercase tracking-widest">Author</p>
                <p className="text-stone-300 text-sm italic">{letter.author || 'Anonymous'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-stone-600 font-mono text-[8px] uppercase tracking-widest">Date</p>
                <p className="text-stone-300 text-sm italic">{letter.writtenDate || 'Undated'}</p>
              </div>
              <div className="col-span-2 space-y-1">
                <p className="text-stone-600 font-mono text-[8px] uppercase tracking-widest">Location</p>
                <p className="text-stone-300 text-sm italic uppercase tracking-wider">{letter.facility || 'Internal Archive'}</p>
              </div>
            </motion.div>
          </header>

          {/* Main Content Reveal */}
          <div className="text-lg md:text-2xl leading-[1.7] text-stone-300 font-light italic tracking-tight max-w-2xl border-l border-stone-900 pl-8 md:pl-12 group-hover:border-stone-700 transition-colors">
            {letter.content && (
              <Typewriter 
                text={letter.content} 
                speed={0.005} 
                delay={1.5} 
              />
            )}
          </div>

          {/* Footer Sign-off */}
          <motion.footer 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.2 }}
            className="pt-32"
          >
            <div className="w-12 h-px bg-stone-800 mb-8" />
            <p className="font-mono text-[9px] uppercase tracking-[0.8em] leading-relaxed">
              End of Transmission <br/>
              Ref. {slug.toUpperCase()} // VOICES_INTL
            </p>
          </motion.footer>
        </div>

      </div>
    </main>
  );
}
