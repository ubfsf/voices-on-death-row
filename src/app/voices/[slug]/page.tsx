'use client';

import Link from 'next/link';
import Image from 'next/image';

const VOICES = [
  { name: 'Francis', slug: 'francis', img: '/images/francis_harris.jpg' },
  { name: 'Borgela', slug: 'borgela', img: '/images/borgel.jpg' },
  { name: 'Paul', slug: 'paul', img: '/images/paulgt.jpg' },
  { name: 'Ojore', slug: 'ojore', img: '/images/ojore.jpg' },
];

export default function VoicesPage() {
  return (
    <main className="min-h-screen bg-[#121212] pt-32 pb-20 px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-white text-5xl uppercase tracking-[0.5em] text-center mb-24 font-light">
          Voices
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {VOICES.map((person) => (
            <Link key={person.slug} href={`/voices/${person.slug}`} className="group">
              {/* Polaroid Frame */}
              <div className="bg-white p-4 pb-16 shadow-2xl transform transition-all duration-500 group-hover:-rotate-2 group-hover:scale-105">
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={person.img}
                    alt={person.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                {/* Name at the bottom of Polaroid */}
                <div className="mt-8 text-center">
                  <span className="font-serif text-2xl text-stone-800 italic">
                    {person.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
