'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function ArtPage() {
  const t = useTranslations('ArtPage');
  return (
    <div className="max-w-4xl mx-auto px-8 py-24">
      <h1 className="hero-title">{t('title')}</h1>
      <article className="prose-archive">
        <p>{t('description')}</p>
      </article>
      <div className="mt-12 mb-8">
        <img 
          src="/images/art_from_inside.jpg" 
          alt="Art From Inside - Haiti Drawing" 
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
