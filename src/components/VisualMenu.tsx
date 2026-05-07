"use client";
import Link from 'next/link';

interface VisualMenuProps {
  sections: any[];
}

export default function VisualMenu({ sections }: VisualMenuProps) {
  const MENU_CONFIG = [
    { title: "Voices", image: "/images/eyes.jpg", link: "/voices" },
    { title: "Letters", image: "/images/writing_another.jpg", link: "/letters" },
    { title: "Art From Inside", image: "/images/art_from_inside.jpg", link: "/art" },
    { title: "Podcast", image: "/images/person_back.jpg", link: "/podcast" }, 
    { title: "About", image: "/images/about.jpg", link: "/about" }, // Fixed: Added title here
  ];

  return (
    <div className="bg-white min-h-screen py-20 px-6 md:px-16">
      <header className="mb-16 text-center">
        <h1 className="text-gray-400 text-3xl md:text-4xl tracking-[0.3em] uppercase font-serif font-light">
          Featured Collections
        </h1>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {MENU_CONFIG.map((item) => (
          <Link 
            href={item.link} 
            key={item.title} 
            className="relative group overflow-hidden aspect-[4/3] bg-gray-100"
          >
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" 
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/40 transition-all">
              <h2 className="text-white text-2xl tracking-[0.2em] uppercase font-serif font-medium drop-shadow-md">
                {item.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>

      <div className="max-w-7xl mx-auto mt-8">
        <div className="relative w-full h-[300px] md:h-[450px] overflow-hidden">
          <img 
            src="/images/hero-illustration.png" 
            alt="Main Project Banner"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
