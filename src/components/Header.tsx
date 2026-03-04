"use client";
import LocalSwitcher from "./LocalSwitcher";
import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('Menu');

  return (
    <header className="fixed top-0 left-0 right-0 z-[90] border-b border-stone-200 py-4 px-8 bg-[#fcfaf7]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <a href="/" className="flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-full border border-stone-900 flex items-center justify-center overflow-hidden p-1 group-hover:scale-105 transition-transform bg-white">
             <img 
               src="/images/logo.png" 
               alt="Logo" 
               className="w-full h-full object-contain" 
             />
          </div>
          <span className="text-[10px] font-serif tracking-[0.2em] uppercase font-bold text-stone-800 hidden sm:block">
            Voices On Death Row
          </span>
        </a>
        
        <nav className="hidden lg:flex gap-6">
          <a href="/" className="nav-link text-[9px] font-bold tracking-widest">{t('home')}</a>
          <a href="/voices" className="nav-link text-[9px] font-bold tracking-widest">{t('voices')}</a>
          <a href="/letters" className="nav-link text-[9px] font-bold tracking-widest">{t('letters')}</a>
          <a href="/art" className="nav-link text-[9px] font-bold tracking-widest">{t('art')}</a>
          <a href="/documentary" className="nav-link text-[9px] font-bold tracking-widest">{t('documentary')}</a>
          <a href="/about" className="nav-link text-[9px] font-bold tracking-widest">{t('about')}</a>
          <a href="/contact" className="nav-link text-[9px] font-bold tracking-widest">{t('contact')}</a>
        </nav>

        <LocalSwitcher />
      </div>
    </header>
  );
}
