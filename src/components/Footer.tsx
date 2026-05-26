import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="relative z-20 w-full bg-[#050505] border-t border-white/5 pt-32 pb-16 px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
        
        {/* Column 1: Mission - High visibility text */}
        <div className="md:col-span-5 space-y-8">
          <h3 className="text-stone-500 uppercase tracking-[0.4em] text-[10px] font-sans font-bold">
            {t('about_title')}
          </h3>
          <p className="text-stone-300 text-sm leading-relaxed max-w-sm italic font-serif">
            {t('about_desc')}
          </p>
        </div>

        {/* Column 2: Quick Links - Fixed visibility for navigation */}
        <div className="md:col-span-3 space-y-8">
          <h3 className="text-stone-500 uppercase tracking-[0.4em] text-[10px] font-sans font-bold">
            {t('navigate_title')}
          </h3>
          <ul className="space-y-4">
            <li>
              <Link href="/voices" className="text-xs text-stone-200 hover:text-white transition-colors uppercase tracking-[0.2em] font-sans font-medium">
                Voices
              </Link>
            </li>
            <li>
              <Link href="/letters" className="text-xs text-stone-200 hover:text-white transition-colors uppercase tracking-[0.2em] font-sans font-medium">
                Letters
              </Link>
            </li>
            <li>
              <Link href="/art" className="text-xs text-stone-200 hover:text-white transition-colors uppercase tracking-[0.2em] font-sans font-medium">
                Art From Inside
              </Link>
            </li>
            <li>
              <Link href="/podcast" className="text-xs text-stone-200 hover:text-white transition-colors uppercase tracking-[0.2em] font-sans font-medium">
                Podcast
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Info - Strong visibility */}
        <div className="md:col-span-4 space-y-8">
          <h3 className="text-stone-500 uppercase tracking-[0.4em] text-[10px] font-sans font-bold">
            {t('contact_title')}
          </h3>
          <address className="not-italic space-y-2 font-sans">
            <p className="text-lg text-white font-black uppercase tracking-tight italic font-serif">Halima Kilgore</p>
            <p className="text-stone-500 text-[10px] uppercase tracking-widest font-bold">{t('founder_title')}</p>
            
            <div className="pt-6">
              <a 
                href="mailto:halima@ubfsf.org" 
                className="text-white hover:text-stone-400 border-b border-white/20 hover:border-white transition-all duration-500 pb-1 text-sm tracking-wide"
              >
                halima@ubfsf.org
              </a>
            </div>
          </address>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-white/5 mt-24 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full border border-stone-800 flex items-center justify-center text-[10px] font-sans text-stone-500">V</div>
          <p className="text-stone-500 text-[9px] uppercase tracking-[0.5em] font-sans">
            {t('copyright')}
          </p>
        </div>
        <p className="text-stone-600 text-[9px] uppercase tracking-[0.6em] font-sans italic font-medium">
          {t('tagline')}
        </p>
      </div>
    </footer>
  );
}
