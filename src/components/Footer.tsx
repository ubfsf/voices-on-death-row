import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="relative z-20 w-full bg-black/40 backdrop-blur-lg border-t border-white/10 pt-20 pb-10 px-8 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Column 1: Mission */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-6 text-white/40">
            {t('about_title')}
          </h3>
          <p className="text-sm text-white/70 leading-relaxed max-w-sm italic font-serif">
            {t('about_desc')}
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-6 text-white/40">
            {t('navigate_title')}
          </h3>
          <ul className="space-y-4">
            <li>
              <Link href="/voices" className="text-xs text-white/60 hover:text-white transition-colors uppercase tracking-widest">
                Voices
              </Link>
            </li>
            <li>
              <Link href="/letters" className="text-xs text-white/60 hover:text-white transition-colors uppercase tracking-widest">
                Letters
              </Link>
            </li>
            <li>
              <Link href="/art" className="text-xs text-white/60 hover:text-white transition-colors uppercase tracking-widest">
                Art From Inside
              </Link>
            </li>
            <li>
              <Link href="/podcast" className="text-xs text-white/60 hover:text-white transition-colors uppercase tracking-widest">
                Podcast
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Project Info */}
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-6 text-white/40">
            {t('contact_title')}
          </h3>
          <address className="not-italic text-xs text-white/70 space-y-2">
            <p><strong className="text-white font-medium">Halima Kilgore</strong></p>
            <p className="text-white/50">{t('founder_title')}</p>
            
            <div className="pt-4">
              <a 
                href="mailto:halima@ubfsf.org" 
                className="text-white/80 hover:text-white border-b border-white/10 hover:border-white transition-all duration-300 pb-0.5"
              >
                halima@ubfsf.org
              </a>
            </div>
          </address>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto border-t border-white/5 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/20 text-[9px] uppercase tracking-[0.5em]">
        <p>{t('copyright')}</p>
        <p>{t('tagline')}</p>
      </div>
    </footer>
  );
}
