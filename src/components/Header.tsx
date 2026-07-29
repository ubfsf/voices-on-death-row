"use client";
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import LocalSwitcher from "./LocalSwitcher";
import { useTranslation } from '@/hooks/useTranslation';

export default function Header() {
  const params = useParams();
  const locale = params.locale || 'en';
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  const sourceTexts = {
    home: "Home",
    voices: "Voices",
    letters: "Letters",
    art: "Art",
    podcast: "Podcast",
    about: "About",
    contact: "Contact",
    siteTitle: "Voices On Death Row"
  };

  const { t } = useTranslation(sourceTexts);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navItems = [
    { key: 'home', href: `/${locale}` },
    { key: 'voices', href: `/${locale}/voices` },
    { key: 'letters', href: `/${locale}/letters` },
    { key: 'art', href: `/${locale}/art` },
    { key: 'podcast', href: `/${locale}/podcast` },
    { key: 'about', href: `/${locale}/about` },
    { key: 'contact', href: `/${locale}/contact` },
  ];

  return (
    <motion.header 
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-90 border-b border-stone-200 py-4 px-8 bg-paper/80 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <a href={`/${locale}`} className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden p-1">
             <img src="/images/logo_transparent.ico" alt="Voices on Death Row Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-[10px] font-sans tracking-[0.2em] uppercase font-bold text-stone-800 hidden sm:block">
            {t.siteTitle}
          </span>
        </a>
        
        <nav className="hidden lg:flex gap-4">
          {navItems.map((item) => (
            <a key={item.key} href={item.href} className="nav-link">
              {t[item.key as keyof typeof t]}
            </a>
          ))}
        </nav>

        <LocalSwitcher />
      </div>
    </motion.header>
  );
}