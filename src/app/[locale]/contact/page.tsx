'use client';

import { useTranslations } from 'next-intl';
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  const t = useTranslations('ContactPage');
  return (
    <div className="max-w-4xl mx-auto px-8 py-24">
      <h1 className="hero-title">{t('title')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-12">
        <article className="prose-archive">
          <p>
            {t('form_description')}
          </p>
          <div className="mt-8 space-y-2 not-italic">
            <p className="font-bold text-stone-900">{t('founder_name')}</p>
            <p className="text-stone-500">{t('founder_email')}</p>
          </div>
        </article>

        <div className="bg-stone-100 p-8 rounded-sm border border-stone-200">
          <h3 className="text-[10px] uppercase tracking-widest font-bold mb-4">{t('mailing_address_title')}</h3>
          <p className="text-sm text-stone-600 leading-relaxed font-serif italic">
            {t('mailing_address_line1')}<br />
            {t('mailing_address_line2')}<br />
            {t('mailing_address_line3')}
          </p>
        </div>
      </div>
    </div>
  );
}
