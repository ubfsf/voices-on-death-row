"use client";
import Link from 'next/link';

interface VisualMenuProps {
  sections: any[];
}

export default function VisualMenu({ sections }: VisualMenuProps) {
  // If Halima hasn't uploaded anything yet, show a fallback or empty div
  if (!sections || sections.length === 0) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white/20">Menu items coming soon...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 min-h-screen w-full bg-black">
      {sections.map((s: any) => (
        <Link href={s.link || "#"} key={s.title} className="relative group overflow-hidden border border-white/5 h-[50vh] md:h-auto">
          <img 
            src={s.imageUrl} 
            alt={s.title}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000" 
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
            <h2 className="text-white text-2xl tracking-[0.4em] uppercase font-light">
              {s.title}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
}
