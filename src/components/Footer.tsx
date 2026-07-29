// src/components/Footer.tsx (Artistic Version)
"use client";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Footer() {
  const params = useParams();
  const locale = params.locale || 'en';

  return (
    <footer className="relative z-20 w-full bg-gradient-to-b from-[#050505] to-black border-t border-white/5 pt-24 pb-12 px-8 font-serif overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FFB81C] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* About Section - Artistic */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-1 md:col-span-2 space-y-5"
          >
            <h3 className="text-white/60 text-xs font-light uppercase tracking-[0.3em]">
              About This Project
            </h3>
            <p className="text-white/40 text-sm leading-relaxed max-w-2xl font-light italic">
              Voices on Death Row is a Franco-American advocacy platform founded by Halima Kilgore 
              to amplify voices often left unheard. Through letters, interviews, podcasts, photography, 
              artwork, and personal testimonies, we share the experiences of people sentenced to death, 
              incarcerated individuals, their families, and the families of victims.
            </p>
            <div className="w-12 h-px bg-[#FFB81C]/30" />
          </motion.div>

          {/* Navigate - Artistic */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5"
          >
            <h3 className="text-white/60 text-xs font-light uppercase tracking-[0.3em]">
              Navigate
            </h3>
            <ul className="space-y-4 text-sm">
              {[
                { label: 'Voices', path: '/voices' },
                { label: 'Letters', path: '/letters' },
                { label: 'Podcast', path: '/podcast' },
                { label: "Families' Voices", path: '/families_voices' },
              ].map((item) => (
                <li key={item.path}>
                  <Link 
                    href={`/${locale}${item.path}`} 
                    className="text-white/30 hover:text-[#FFB81C] transition-all duration-300 text-sm font-light tracking-wider hover:tracking-widest"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar - Artistic */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          <div className="space-y-2">
            <p className="text-white/20 text-xs font-light tracking-[0.2em]">
              Co-Founder & Executive Director: <span className="text-white/40">Halima Kilgore</span>
            </p>
          </div>
          
          <div className="text-right space-y-1">
            <p className="text-white/20 text-xs tracking-[0.2em]">
              © {new Date().getFullYear()} VOICES ON DEATH ROW
            </p>
            <p className="text-white/10 text-[10px] tracking-[0.3em] font-light italic">
              Giving Voice to Every Side of the Story
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}