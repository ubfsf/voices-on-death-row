'use client';
import Link from 'next/link';

const PRISONERS = [
  { name: 'Francis', slug: 'francis', img: '/images/francis_harris.jpg' },
  { name: 'Borgela', slug: 'borgela', img: '/images/borgel.jpg' },
  { name: 'Paul', slug: 'paul', img: '/images/paulgt.jpg' },
  { name: 'Ojore', slug: 'ojore', img: '/images/ojore.jpg' },
];

export default function VoicesGallery() {
  return (
    <main className="min-h-screen bg-[#121212] pt-32 pb-20 px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-white text-4xl uppercase tracking-[0.5em] text-center mb-24 font-light">
          Voices
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {PRISONERS.map((p) => (
            <Link key={p.slug} href={`/voices/${p.slug}`} className="group">
              {/* White frame remains, but text below image is gone */}
              <div className="bg-white p-4 pb-6 shadow-2xl transform transition-all duration-500 hover:scale-105">
                <div className="relative w-full h-auto">
                  <img 
                    src={p.img} 
                    alt={p.name} 
                    className="w-full h-auto object-contain" 
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
