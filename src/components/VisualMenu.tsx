"use client";
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface VisualMenuProps {
  sections?: any[];
}

export default function VisualMenu({ sections }: VisualMenuProps) {
  // 1. Get the current language (en or fr) from the URL
  const params = useParams();
  const locale = params.locale || 'en';

  const MENU_CONFIG = [
    { title: "Voices", image: "/images/eyes.jpg", link: "/voices", span: "md:col-span-2 md:row-span-2" },
    { title: "Letters", image: "/images/writing_another.jpg", link: "/letters", span: "col-span-1" },
    { title: "Art From Inside", image: "/images/art_from_inside.jpg", link: "/art", span: "col-span-1" },
    { title: "Podcast", image: "/images/person_back.jpg", link: "/podcast", span: "col-span-1" },
    { title: "About", image: "/images/about.jpg", link: "/about", span: "col-span-1", hideText: true }, 
  ];

  return (
    <div className="bg-[#fcfcfc] min-h-screen py-24 px-6 md:px-16 font-serif">
      {/* Editorial Header */}
      <header className="max-w-7xl mx-auto mb-20 text-center md:text-left">
        <p className="text-stone-400 uppercase tracking-[0.6em] text-[10px] mb-4 font-sans">
          {locale === 'fr' ? 'Navigation de la série' : 'Series Navigation'}
        </p>
        <h1 className="text-stone-900 text-6xl md:text-8xl font-light tracking-tighter italic">
          {locale === 'fr' ? 'Les Archives' : 'The Archive'}
        </h1>
      </header>

      {/* Asymmetrical Bento Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {MENU_CONFIG.map((item) => (
          <Link 
            // 2. THE FIX: Prefix the link with the current locale
            href={`/${locale}${item.link}`} 
            key={item.title} 
            className={`relative group overflow-hidden bg-stone-100 shadow-sm ${item.span} aspect-square md:aspect-auto`}
          >
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" 
            />
            
            {!item.hideText && (
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-700 flex items-center justify-center">
                <h2 className="text-white text-2xl md:text-3xl tracking-[0.2em] uppercase font-light drop-shadow-md text-center px-4">
                  {item.title}
                </h2>
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* Hero Image Section */}
      <div className="max-w-7xl mx-auto mt-32 border-t border-stone-200 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h3 className="text-4xl md:text-5xl text-stone-900 leading-[1.1] font-light tracking-tight">
              {locale === 'fr' 
                ? "Donner visibilité et dignité à ceux qui sont souvent laissés dans l'ombre."
                : "Giving visibility and dignity to those often left in the shadows."}
            </h3>
            <div className="h-px w-24 bg-stone-300" />
            <p className="text-stone-500 text-lg leading-relaxed max-w-md font-sans">
              {locale === 'fr'
                ? "À travers des lettres, de l'art et des témoignages, nous documentons les histoires humaines au sein du système judiciaire."
                : "Through letters, art, and testimonies, we document the human stories within the justice system to spark meaningful conversation."}
            </p>
          </div>
          
          <div className="relative overflow-hidden shadow-2xl rounded-sm">
             <img 
              src="/images/hero-illustration.png" 
              alt="Main Project Visual"
              className="w-full h-auto grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
