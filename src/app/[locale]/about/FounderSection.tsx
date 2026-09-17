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
          <div className="bg-white p-4 pb-16 shadow-2xl rotate-[-3deg]">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image src={portraitImage} alt={founderName} fill className="object-cover" sizes="(max-width: 768px) 100vw, 420px" />
            </div>
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
            <p className="font-serif italic text-[22px] md:text-[26px] leading-snug mt-3 text-[#333]">{founderTitle}</p>
          </div>

          <div className="font-sans leading-[1.6] text-[16px] md:text-[17px] text-[#1E1E1E] space-y-6">
            {biography.split('\n\n').map((p, i) => (
              <p key={i}>{p.trim()}</p>
            ))}
          </div>

          <blockquote className="border-l-4 border-black pl-6 italic text-[22px] font-serif">
            {quote}
          </blockquote>

          <div className="mt-12 pt-8 border-t border-black/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v, i) => {
                const Icon = iconMap[i];
                return (
                  <div key={i} className="text-left">
                    <div className="flex items-center gap-3 mb-2">
                      {Icon && <Icon size={18} strokeWidth={1.5} className="opacity-60" />}
                    </div>
                    <p className="font-sans font-semibold uppercase tracking-[0.14em] text-[13px]">{v.label}</p>
                    <p className="text-[14px] mt-1 text-[#444] font-sans leading-snug">{v.description}</p>
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
