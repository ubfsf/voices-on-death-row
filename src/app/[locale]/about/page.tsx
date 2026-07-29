// src/app/[locale]/about/page.tsx
"use client";
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const params = useParams();
  const locale = params.locale || 'en';

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src="/images/about.jpg" 
          alt="About the Founder"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-wide">
            About the Founder
          </h1>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-20 px-6 md:px-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          
          {/* Left: Polaroid Portrait */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-5"
          >
            <div className="bg-white p-4 pb-16 shadow-2xl rotate-[-2deg]">
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <Image
                  src="/images/halimaKilgore.jpg"
                  alt="Halima Kilgore"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <p className="mt-6 text-center font-serif text-xl">Halima Kilgore</p>
            </div>
          </motion.div>

          {/* Right: Biography Text */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-7 space-y-8"
          >
            <div>
              <h2 className="text-4xl font-serif font-bold">Halima Kilgore</h2>
              <p className="text-[#A0A0A0] italic text-lg mt-1 font-serif">Founder of Voices on Death Row</p>
              <div className="w-16 h-px bg-black mt-4" />
            </div>
            
            <div className="text-gray-800 leading-relaxed space-y-6 font-light text-lg">
              <p>Halima Kilgore is the founder of Voices on Death Row. She is an ordinary French-Algerian woman driven by a deep curiosity about people, their life stories, and the experiences that shape them. She believes that every person deserves to be listened to with dignity, empathy, and respect.</p>
              <p>Her compassion extends beyond a single cause. Whether advocating for human rights, animal welfare, environmental protection, or giving a voice to those affected by the criminal legal system, Halima is guided by the same belief: every life has value, and every story deserves to be heard.</p>
            </div>

            <blockquote className="border-l-2 border-black pl-6 py-2 italic text-xl font-serif">
              "Giving voice to every side of the story, because humanity has no borders."
            </blockquote>

            {/* Core Values */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-gray-200">
              {['I LISTEN', 'I DOCUMENT', 'I SHARE', 'I BELIEVE'].map((val) => (
                <div key={val} className="text-center">
                  <p className="font-bold text-sm tracking-widest">{val}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="text-center pb-20">
        <Link href={`/${locale}`} className="text-gray-400 hover:text-black transition-colors uppercase tracking-widest text-sm">
          ← Back to Voices
        </Link>
      </div>
    </div>
  );
}
