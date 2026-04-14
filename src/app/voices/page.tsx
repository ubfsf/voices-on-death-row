'use client';

import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('VoicesPage');
  return (
    <main className="paper-texture min-h-screen pt-40 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        {/* Halima's Photo */}
        <div className="relative">
          <img src="/images/halima.jpg" className="w-full grayscale border border-stone-200 p-2 bg-white" alt={t('founder_name')} />
          <div className="mt-6">
            <p className="font-bold text-stone-900">{t('founder_name')}</p>
            <p className="text-xs uppercase tracking-widest text-stone-400">{t('founder_title')}</p>
          </div>
        </div>

        {/* The Story */}
        <div>
          <h2 className="text-5xl font-artistic italic mb-8">{t('title')}</h2>
          <article className="prose prose-stone font-serif italic opacity-80">
            <p>{t('description')}</p>
          </article>
        </div>
      </div>
    </main>
  );
}
