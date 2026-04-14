"use client";
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import LocalSwitcher from "./LocalSwitcher";

export default function Header() {
  const t = useTranslations('Menu');
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  // Engineering logic: Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

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
        
        <a href="/" className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden p-1">
             <img src="/images/logo_transparent.ico" alt="Voices on Death Row Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-[10px] font-sans tracking-[0.2em] uppercase font-bold text-stone-800 hidden sm:block">
            Voices On Death Row
          </span>
        </a>
        
        <nav className="hidden lg:flex gap-4">
          {['home', 'voices', 'letters', 'art', 'podcast', 'about', 'contact'].map((item) => (
            <a key={item} href={`/${item === 'home' ? '' : item}`} className="nav-link">
              {t(item)}
            </a>
          ))}
        </nav>

        <LocalSwitcher />
      </div>
    </motion.header>
  );
}
