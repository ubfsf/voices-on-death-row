"use client";
import { useTranslations } from 'next-intl';

export default function ArtPage() {
  const t = useTranslations('ArtPage');
  return (
    <div className="max-w-4xl mx-auto px-8 py-24">
      <h1 className="hero-title">{t('title')}</h1>
      <article className="prose-archive">
        <p>{t('description')}</p>
      </article>
    </div>
  );
}
