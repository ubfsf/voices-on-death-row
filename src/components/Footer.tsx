"use client";
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Footer() {
  const t = useTranslations('Footer');
  const params = useParams();
  const locale = params.locale || 'en';

  return (
    <footer className="relative z-20 w-full bg-[#050505] border-t border-white/5 pt-32 pb-16 px-8 mt-20 font-serif">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
        
        {/* Column 1: Mission */}
        <div className="md:col-span-5 space-y-8">
          <h3 className="text-stone-500 uppercase tracking-[0.4em] text-[10px] font-sans font-bold">
            {t('about_title')}
          </h3>
          <p className="text-stone-300 text-sm leading-relaxed max-w-sm italic">
            {t('about_desc')}
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="md:col-span-3 space-y-8">
          <h3 className="text-stone-500 uppercase tracking-[0.4em] text-[10px] font-sans font-bold">
            {t('navigate_title')}
          </h3>
          <ul className="space-y-4 font-sans">
            <li><Link href={`/${locale}/voices`} className="text-xs text-stone-200 hover:text-white transition-colors uppercase tracking-[0.2em] font-medium">Voices</Link></li>
            <li><Link href={`/${locale}/letters`} className="text-xs text-stone-200 hover:text-white transition-colors uppercase tracking-[0.2em] font-medium">Letters</Link></li>
            <li><Link href={`/${locale}/art`} className="text-xs text-stone-200 hover:text-white transition-colors uppercase tracking-[0.2em] font-medium">Art From Inside</Link></li>
            <li><Link href={`/${locale}/podcast`} className="text-xs text-stone-200 hover:text-white transition-colors uppercase tracking-[0.2em] font-medium">Podcast</Link></li>
          </ul>
        </div>

        {/* Column 3: Founder Section (Linked to About) */}
        <div className="md:col-span-4 space-y-8">
          <h3 className="text-stone-500 uppercase tracking-[0.4em] text-[10px] font-sans font-bold">
            {t('contact_title')}
          </h3>
          <Link href={`/${locale}/about`} className="group block space-y-2">
            <p className="text-lg text-white font-black uppercase tracking-tight italic group-hover:text-stone-400 transition-colors">
              Halima Kilgore
            </p>
            <p className="text-stone-600 text-[10px] uppercase tracking-widest font-bold font-sans group-hover:text-white transition-colors">
              {t('founder_title')} // View Bio
            </p>
          </Link>
          
          <div className="pt-6">
            <a 
              href="mailto:halima@ubfsf.org" 
              className="text-white hover:text-stone-400 border-b border-white/10 hover:border-white transition-all duration-500 pb-1 text-sm font-sans tracking-wide"
            >
              halima@ubfsf.org
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-white/5 mt-24 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full border border-stone-800 flex items-center justify-center text-[10px] font-sans text-stone-500 italic">V</div>
          <p className="text-stone-500 text-[9px] uppercase tracking-[0.5em] font-sans">{t('copyright')}</p>
        </div>
        <p className="text-stone-700 text-[9px] uppercase tracking-[0.6em] font-sans italic font-medium">{t('tagline')}</p>
      </div>
    </footer>
  );
}
