"use client";
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mic, ScrollText } from 'lucide-react';
import ContactForm from "@/components/ContactForm";

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <div className="max-w-4xl mx-auto px-8 pt-32 pb-32">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* HERO SECTION */}
        <h1 className="hero-title text-5xl md:text-7xl font-serif italic mb-12 leading-tight text-stone-900">
          {t('title')}
        </h1>

        <article className="prose prose-stone lg:prose-xl font-serif italic opacity-80 mb-32">
          <p>{t('mission')}</p>
        </article>
        
        {/* GRID SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-stone-200 pt-16">
          <div className="group cursor-pointer">
            <ScrollText className="w-5 h-5 mb-6 opacity-30 group-hover:opacity-100 transition-opacity text-stone-900" />
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4 text-stone-400">{t('archive_label')}</h3>
            <p className="text-stone-600 text-sm italic leading-relaxed">{t('archive_desc')}</p>
          </div>
          <div className="group cursor-pointer">
            <Mic className="w-5 h-5 mb-6 opacity-30 group-hover:opacity-100 transition-opacity text-stone-900" />
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4 text-stone-400">{t('podcast_label')}</h3>
            <p className="text-stone-600 text-sm italic leading-relaxed">{t('podcast_desc')}</p>
          </div>
        </div>

        {/* INTERACTIVE CONTACT SECTION */}
        <div className="mt-32 bg-stone-100 p-12 rounded-sm border border-stone-200 flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="max-w-sm">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4 text-stone-400">{t('contact_label')}</h3>
            <h2 className="text-3xl font-serif italic text-stone-900 mb-6">{t('contact_title')}</h2>
            <p className="text-sm text-stone-500 leading-relaxed font-serif mb-10">
              {t('contact_desc')}
            </p>
            <div className="pt-6 border-t border-stone-200">
              <p className="text-sm font-bold text-stone-900 tracking-tight">Halima Kilgore</p>
              <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] mt-1">Executive Admin, UBFSF</p>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <ContactForm />
          </div>
        </div>
      </motion.section>
    </div>
  );
}
