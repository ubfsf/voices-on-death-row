"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';

// This tells TypeScript what a "Section" looks like from Sanity
interface Section {
  title: string;
  imageUrl: string;
  link: string;
}

interface VisualMenuProps {
  sections: Section[];
}

export default function VisualMenu({ sections }: VisualMenuProps) {
  // If Sanity is empty, we show nothing or a loading state
  if (!sections) return <div className="bg-black h-screen" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 min-h-screen bg-black pt-20">
      {sections.map((s, i) => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          key={s.title}
        >
          <Link href={s.link} className="relative group block h-full overflow-hidden border border-white/5">
            <img 
              src={s.imageUrl} 
              alt={s.title}
              className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" 
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
              <h2 className="text-white text-2xl tracking-[0.4em] uppercase font-light">
                {s.title}
              </h2>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
