"use client";
import Link from 'next/link';

export default function VisualMenu() {
  const MENU_CONFIG = [
    { title: "Voices", image: "/images/eyes.jpg", link: "/voices", size: "md:col-span-2 md:row-span-2" },
    { title: "Letters", image: "/images/writing_another.jpg", link: "/letters", size: "col-span-1" },
    { title: "Art From Inside", image: "/images/art_from_inside.jpg", link: "/art", size: "col-span-1" },
    { title: "Podcast", image: "/images/person_back.jpg", link: "/podcast", size: "col-span-1"}, // No "Documentary" text, just the image
    { title: "About", image: "/images/about.jpg", link: "/about", size: "col-span-1", hideText: true }, 
  ];

  return (
    <div className="bg-[#fcfcfc] min-h-screen py-24 px-6 md:px-16 font-serif">
      <header className="max-w-7xl mx-auto mb-20">
        <p className="text-stone-400 uppercase tracking-[0.5em] text-[10px] mb-4">Navigation</p>
        <h1 className="text-stone-800 text-5xl md:text-7xl font-light tracking-tighter italic">
          The Archive
        </h1>
      </header>

      {/* Asymmetrical Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-2">
        {MENU_CONFIG.map((item) => (
          <Link 
            href={item.link} 
            key={item.title} 
            className={`relative group overflow-hidden bg-stone-200 ${item.size} aspect-square md:aspect-auto`}
          >
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover transition-all duration-[1.5s] ease-out group-hover:scale-110" 
            />
            
            {/* Overlay: Only shows text if hideText is NOT true */}
            {!item.hideText && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-700 flex items-end p-8">
                <h2 className="text-white text-3xl tracking-tighter font-light opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                  {item.title}
                </h2>
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* Hero Image / Closing Statement */}
      <div className="max-w-7xl mx-auto mt-32 border-t border-stone-200 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl text-stone-800 leading-tight font-light">
              Giving visibility and dignity to those often left in the shadows.
            </h3>
            <p className="text-stone-500 text-sm leading-relaxed max-w-sm">
              Through letters, art, and testimonies, we document the human stories 
              within the justice system.
            </p>
          </div>
          <div className="relative overflow-hidden shadow-2xl">
             <img 
              src="/images/hero-illustration.png" 
              alt="Main Project Visual"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
