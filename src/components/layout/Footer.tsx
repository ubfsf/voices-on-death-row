// src/components/Footer.tsx
//
// Site-wide footer including the primary "Navigate" menu.
// All strings come from the next-intl catalogs (messages/{locale}.json,
// namespace "Footer") so the menu translates with the active locale on
// the server render — no hardcoded English, no client-side API calls.
"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

/**
 * Footer - Dark theme using design tokens
 * Stays dark on ALL pages (light or dark)
 * Tokens defined in globals.css
 */
export default function Footer() {
  const t = useTranslations('Footer');

  // Nav labels are translation keys resolved through the Footer namespace.
  const navItems = [
    { labelKey: 'nav_voices', path: '/voices' },
    { labelKey: 'nav_letters', path: '/letters' },
    { labelKey: 'nav_podcast', path: '/podcast' },
    { labelKey: 'nav_families', path: '/families_voices' },
  ] as const;

  return (
    <footer className="footer-dark pt-24 pb-12 px-8 font-serif overflow-hidden relative z-20">
      {/* Background atmosphere - subtle dark effects */}
      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-1 md:col-span-2 space-y-5"
          >
            <h3 className="footer-text-faint text-xs font-light uppercase tracking-[0.3em]">
              {t('about_title')}
            </h3>
            <p className="footer-text-muted text-sm leading-relaxed max-w-2xl font-light">
              {t('about_desc')}
            </p>
            <div className="w-16 h-px footer-divider" />
          </motion.div>

          {/* Navigate Section */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            aria-label={t('navigate_title')}
            className="space-y-5"
          >
            <h3 className="footer-text-faint text-xs font-light uppercase tracking-[0.3em]">
              {t('navigate_title')}
            </h3>
            <ul className="space-y-4 text-sm">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={`/${item.path}`}
                    className="footer-text-muted hover:text-white focus-visible:text-white transition-all duration-300 text-sm font-light tracking-wider hover:tracking-widest"
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-t border-footer-border pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          <p className="footer-text-faint text-xs font-light tracking-[0.2em]">
            {t('founder_role')}:{' '}
            <span className="text-stone-300 hover:text-white transition-colors duration-300">
              Halima Kilgore
            </span>
          </p>

          <div className="text-right space-y-1">
            <p className="footer-text-faint text-xs tracking-[0.2em]">
              © {new Date().getFullYear()} VOICES ON DEATH ROW
            </p>
            <p className="footer-text-faint text-[10px] tracking-[0.3em] font-light opacity-60">
              {t('tagline')}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}