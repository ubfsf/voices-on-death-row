"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
  { title: 'Families of Murder Victims', slug: 'victims' },
  { title: 'Families of Death Row Prisoners', slug: 'prisoners' },
  { title: 'Families of Incarcerated People', slug: 'incarcerated' },
  { title: 'Survivors and Community Voices', slug: 'community' },
];

export default function FamiliesGallery({ locale }: { locale: string }) {
  return (
    <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
      {categories.map((cat, index) => (
        <motion.div 
          key={cat.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group border border-stone-200 p-12 hover:bg-black hover:text-white transition-all duration-700"
        >
          <Link href={`/${locale}/families-voices/${cat.slug}`} className="space-y-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-stone-400">Category // 0{index + 1}</span>
            <h2 className="text-4xl font-serif italic leading-tight">{cat.title}</h2>
            <div className="w-12 h-px bg-stone-300 group-hover:w-full group-hover:bg-white transition-all duration-700" />
            <p className="text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">View Testimonies →</p>
          </Link>
        </motion.div>
      ))}
    </section>
  );
}
