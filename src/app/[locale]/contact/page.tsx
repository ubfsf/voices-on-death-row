import { useTranslations } from 'next-intl';
import Link from 'next/link';
import * as motion from "framer-motion/client";
import ContactForm from "@/components/ContactForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = useTranslations('ContactPage');

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-12 pb-40 px-6 md:px-16 font-serif relative overflow-x-hidden selection:bg-white selection:text-black">
      
      {/* CINEMATIC OVERLAYS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(20,20,20,1)_0%,_rgba(0,0,0,1)_100%)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* FIXED NAVIGATION */}
      <Link 
        href={`/${locale}`} 
        className="fixed top-12 left-12 z-50 text-white/20 hover:text-white transition-all duration-700 uppercase text-[10px] tracking-[1em] font-black mix-blend-difference"
      >
        ← MENU
      </Link>

      {/* ARCHIVAL HEADER */}
      <div className="relative z-10 max-w-7xl mx-auto pt-32 px-6 md:px-16">
        <div className="border-b border-white/5 pb-12">
          <p className="text-stone-700 font-mono text-[10px] uppercase tracking-[1em] mb-4">Connection // Vol. 04</p>
          <h1 className="text-6xl md:text-[8vw] font-black italic uppercase tracking-tighter leading-none text-white">
            The <span className="text-stone-800 font-black">Contact</span>
          </h1>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 py-20 grid grid-cols-1 lg:grid-cols-12 gap-20">
        
        {/* LEFT COLUMN: Project Info & Description */}
        <div className="lg:col-span-5 space-y-16">
          <motion.article 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <p className="text-xl md:text-2xl leading-relaxed text-stone-400 font-light italic">
              {t('form_description')}
            </p>
            
            <div className="pt-12 space-y-4 border-t border-white/5">
              <p className="text-2xl text-white font-black uppercase tracking-tight italic">
                {t('founder_name')}
              </p>
              <div className="flex flex-col gap-2">
                <span className="text-stone-600 font-mono text-[10px] uppercase tracking-widest font-bold">
                  Direct Correspondence
                </span>
                <a 
                  href={`mailto:${t('founder_email')}`}
                  className="text-stone-300 hover:text-white transition-colors text-lg border-b border-stone-900 hover:border-stone-500 w-fit pb-1"
                >
                  {t('founder_email')}
                </a>
              </div>
            </div>
          </motion.article>

          {/* MAILING ADDRESS - "The Envelope" Style */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-stone-900/20 backdrop-blur-md p-10 border border-white/5 shadow-2xl relative overflow-hidden group"
          >
            {/* Archival Stamp Effect */}
            <div className="absolute top-4 right-4 w-12 h-12 border border-stone-800 rounded-full flex items-center justify-center text-stone-800 font-mono text-[8px] rotate-12 group-hover:border-stone-500 group-hover:text-stone-500 transition-colors">
              USA
            </div>

            <h3 className="text-stone-600 font-mono text-[10px] uppercase tracking-[0.4em] font-bold mb-8">
              {t('mailing_address_title')}
            </h3>
            <p className="text-lg text-stone-300 leading-relaxed font-serif italic">
              {t('mailing_address_line1')}<br />
              {t('mailing_address_line2')}<br />
              {t('mailing_address_line3')}
            </p>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: The Form */}
        <div className="lg:col-span-7">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="bg-transparent"
          >
            {/* Note: Ensure your ContactForm component uses dark theme inputs */}
            <ContactForm />
          </motion.div>
        </div>

      </div>

      {/* FOOTER TRANSITION */}
      <div className="relative z-10 py-40 flex flex-col items-center justify-center text-center">
        <div className="w-px h-24 bg-gradient-to-b from-stone-800 to-transparent mb-8" />
        <p className="text-stone-800 font-mono text-[9px] uppercase tracking-[1.5em]">
          End of Dossier
        </p>
      </div>
    </main>
  );
}
