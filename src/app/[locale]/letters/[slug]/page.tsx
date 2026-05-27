import { client } from '@/lib/sanity';
import Link from 'next/link';
import * as motion from "framer-motion/client";
import Typewriter from '@/components/Typewriter';

export default async function LetterDetail({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;

  const query = `*[_type == "letters" && (slug.current == $slug || _id == $slug)][0]{
    title,
    author,
    writtenDate,
    "content": content[$locale],
    "imageUrl": image.asset->url
  }`;

  const letter = await client.fetch(query, { slug, locale });

  if (!letter) return <div className="bg-black min-h-screen" />;

  return (
    <main className="min-h-screen bg-[#050505] text-white font-serif selection:bg-white selection:text-black overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <Link href={`/${locale}/letters`} className="fixed top-12 left-12 z-50 text-white/20 hover:text-white transition-all duration-500 uppercase text-[10px] tracking-[0.8em] font-bold mix-blend-difference">
        ← BACK
      </Link>

      <div className="max-w-4xl mx-auto px-6 md:px-16 py-32 md:py-48 relative z-10">
        
        {/* 1. TITLE */}
        <header className="mb-16 md:mb-24">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] mb-8"
          >
            {letter.title}
          </motion.h1>

          {/* 2. DATE (Conditional) */}
          {letter.writtenDate && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              className="font-mono text-[10px] uppercase tracking-[0.4em] mb-12"
            >
              {letter.writtenDate}
            </motion.p>
          )}
          <div className="h-px w-24 bg-stone-800" />
        </header>

        {/* 3. OPTIONAL IMAGE */}
        {letter.imageUrl && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-24 shadow-2xl border border-white/5"
          >
            <img src={letter.imageUrl} className="w-full h-auto grayscale brightness-75" alt="Archive Scan" />
          </motion.div>
        )}

        {/* 4. POEM CONTENT */}
        <div className="text-xl md:text-3xl leading-[1.6] text-stone-300 font-light italic tracking-tight mb-24">
          {letter.content && (
            <Typewriter 
              text={letter.content} 
              speed={0.005} 
            />
          )}
        </div>

        {/* 5. SIGNATURE (At the end) */}
        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-12 border-t border-stone-900 flex flex-col items-end"
        >
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
            — {letter.author || 'Anonymous'}
          </h2>
        </motion.footer>
      </div>
    </main>
  );
}
