'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mic, Camera, BookOpen, Globe } from 'lucide-react';

interface ValueItem {
  label: string;
  description: string;
}

interface FounderSectionProps {
  founderName: string;
  founderTitle: string;
  portraitImage: string;
  biography: string;
  quote: string;
  values: ValueItem[];
}

export default function FounderSection({
  founderName,
  founderTitle,
  portraitImage,
  biography,
  quote,
  values,
}: FounderSectionProps) {
  const iconMap = [Mic, Camera, BookOpen, Globe];

  return (
    <section className="py-20 px-6 md:px-24 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[420px_1fr] gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative"
        >
          <div
            className="absolute -top-6 left-4 w-28 h-10 bg-[#DCC89D]/80 rotate-[-8deg] z-20 shadow-sm"
            style={{ backgroundImage: "url('/textures/noise.svg')", backgroundBlendMode: 'multiply' }}
          />
          <div className="absolute -left-20 top-1/2 -translate-y-1/2 rotate-[-90deg] text-[#1E1E1E] font-[var(--font-script)] text-[28px] whitespace-nowrap hidden md:block">
            Voices on Death Row ♡
          </div>
          <div className="bg-white p-4 pb-20 shadow-2xl rotate-[-3deg]">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image src={portraitImage} alt={founderName} fill className="object-cover" sizes="(max-width: 768px) 100vw, 420px" />
            </div>
            <p className="mt-10 text-center font-[var(--font-script)] text-[40px] text-[#1E1E1E] rotate-[-4deg]">
              {founderName} ♡
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="space-y-8"
        >
          <div>
            <p className="font-sans font-bold uppercase tracking-[0.15em] text-[11px]">About the Founder</p>
            <div className="w-32 h-px bg-black my-3" />
            <h2 className="font-serif font-bold text-[48px] md:text-[56px] leading-[1.05]">{founderName}</h2>
            <div className="relative inline-block mt-2">
              <p className="font-[var(--font-script)] text-[32px] md:text-[36px] leading-none">{founderTitle}</p>
              <div
                className="absolute -bottom-3 left-0 w-[105%] h-[14px] opacity-90"
                style={{
                  backgroundImage: "url('/images/stroke_dark_background.png')",
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'left center',
                }}
              />
            </div>
          </div>

          <div className="font-sans leading-[1.6] text-[16px] md:text-[17px] text-[#1E1E1E] space-y-6">
            {biography.split('\n\n').map((p, i) => (
              <p key={i}>{p.trim()}</p>
            ))}
          </div>

          <blockquote className="border-l-4 border-black pl-6 italic text-[22px] font-serif">
            {quote}
          </blockquote>

          <div className="mt-12 relative py-12 overflow-hidden">
            <div
              className="absolute inset-0 -z-10 opacity-[0.9] mix-blend-multiply"
              style={{
                backgroundImage: "url('/images/stroke_light_background.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
              {values.map((v, i) => {
                const Icon = iconMap[i];
                return (
                  <div key={i} className="text-center px-6 py-6">
                    <div className="flex justify-center mb-3">
                      <div className="rounded-full border border-black/10 p-3">
                        {Icon && <Icon size={36} strokeWidth={2.5} />}
                      </div>
                    </div>
                    <p className="font-sans font-bold uppercase tracking-wide whitespace-nowrap">{v.label}</p>
                    <p className="text-sm mt-1 opacity-80 font-sans">{v.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
