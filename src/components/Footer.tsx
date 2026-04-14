export default function Footer() {
  const { useTranslations } = require('next-intl');
  const t = useTranslations('Footer');

  return (
    <footer className="bg-stone-100 border-t border-stone-200 pt-20 pb-10 px-8 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Column 1: Mission */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-stone-400">{t('about_title')}</h3>
          <p className="text-sm text-stone-600 leading-relaxed max-w-sm italic font-serif">
            {t('about_desc')}
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-stone-400">{t('navigate_title')}</h3>
          <ul className="space-y-4">
            <li><a href="/voices" className="text-xs hover:text-stone-900 transition-colors">Voices</a></li>
            <li><a href="/letters" className="text-xs hover:text-stone-900 transition-colors">Letters</a></li>
            <li><a href="/art" className="text-xs hover:text-stone-900 transition-colors">Art From Inside</a></li>
            <li><a href="/podcast" className="text-xs hover:text-stone-900 transition-colors">Podcast</a></li>
          </ul>
        </div>

        {/* Column 3: Project Info */}
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-stone-400">{t('contact_title')}</h3>
          <address className="not-italic text-xs text-stone-600 space-y-2">
            <p><strong>Halima Kilgore</strong></p>
            <p>{t('founder_title')}</p>
            <p className="pt-2">halima@ubfsf.org</p>
          </address>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-stone-200 mt-20 pt-8 flex justify-between items-center opacity-40 text-[9px] uppercase tracking-widest">
        <p>{t('copyright')}</p>
        <p>{t('tagline')}</p>
      </div>
    </footer>
  );
}
