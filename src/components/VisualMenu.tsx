// src/components/VisualMenu.tsx
import Link from 'next/link';

const SECTIONS = [
  { name: 'Voices', href: '/voices', img: '/images/eyes.jpg' },
  { name: 'Letters', href: '/letters', img: '/images/writing_another.jpg' },
  { name: 'Art From Inside', href: '/art', img: '/images/art_from_inside.jpg' },
  { name: 'Podcast', href: '/podcast', img: '/images/hero-illustration.png' },
  { name: 'About', href: '/about', img: '/images/person_back.jpg' },
  { name: 'Contact', href: '/contact', img: '/images/writing.png' },
];

export default function VisualMenu() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 min-h-screen pt-20"> 
      {SECTIONS.map((s) => (
        <Link href={s.href} key={s.name} className="relative group overflow-hidden border border-white/5 h-[50vh] md:h-auto">
          <img 
            src={s.img} 
            className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" 
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
            <h2 className="text-white text-2xl tracking-[0.4em] uppercase font-light pointer-events-none">
              {s.name}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
}
