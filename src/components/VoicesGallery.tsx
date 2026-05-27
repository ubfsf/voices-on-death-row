"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VoicesGallery({ voices, locale }: { voices: any[], locale: string }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  // Tighter coordinates to keep images clustered around the center title
  // Adjusted for responsiveness to ensure they don't go off-screen on mobile
  const getPosition = (index: number) => {
    const layouts = [
      { x: "-25vw", y: "-20vh", rotate: -8 },
      { x: "25vw", y: "-15vh", rotate: 6 },
      { x: "-20vw", y: "25vh", rotate: -4 },
      { x: "22vw", y: "20vh", rotate: 10 },
      { x: "-10vw", y: "-35vh", rotate: 5 },
      { x: "12vw", y: "30vh", rotate: -7 },
      { x: "-30vw", y: "5vh", rotate: 9 },
      { x: "28vw", y: "0vh", rotate: -12 },
    ];
    
    // For mobile, we reduce the spread
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const pos = layouts[index % layouts.length];
    
    if (isMobile) {
      return {
        x: (parseFloat(pos.x) * 0.6) + "vw",
        y: (parseFloat(pos.y) * 0.8) + "vh",
        rotate: pos.rotate
      };
    }
    return pos;
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center py-20 overflow-visible">
      
      {/* 1. THE CENTERPIECE TITLE
          Consistent with the "Letters" font style: font-black italic uppercase
      */}
      <div className="relative z-0 pointer-events-none select-none text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="text-6xl sm:text-7xl md:text-[10vw] font-black italic uppercase tracking-tighter leading-none text-white whitespace-nowrap"
        >
          The <span className="text-stone-800 font-black">Voices</span>
        </motion.h1>
      </div>

      {/* 2. SCATTERED POLAROIDS (Clustered around the text, No overlapping) */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {voices.map((voice, index) => {
          const pos = getPosition(index);

          return (
            <motion.div
              key={voice._id}
              initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                x: pos.x, 
                y: pos.y,
                rotate: pos.rotate
              }}
              transition={{ duration: 1.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
            >
              <Link 
                href={`/${locale}/voices/${voice.slug}`} 
                className="block relative group"
              >
                {/* THE PIN (White Dot) - Artistic detail requested */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-40 w-3 h-3 bg-stone-100 rounded-full shadow-md border border-stone-400 group-hover:bg-red-500 group-hover:border-red-700 transition-colors duration-500">
                  <div className="absolute inset-0.5 bg-white/40 rounded-full" />
                </div>

                {/* THE IMAGE BOX: Pure asset focus */}
                <div className="relative aspect-[3/4] w-24 sm:w-36 md:w-52 overflow-hidden rounded-sm shadow-[0_15px_35px_rgba(0,0,0,0.8)] bg-stone-900 border border-white/5 transition-all duration-700 group-hover:shadow-[0_40px_80px_rgba(0,0,0,1)] group-hover:scale-110 group-hover:rotate-0 group-hover:z-50">
                  <img 
                    src={voice.imageUrl} 
                    alt={voice.author} 
                    className="w-full h-full object-cover object-center scale-[1.25] grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
                    draggable={false}
                  />
                  {/* Cinematic Projection Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/5 opacity-60 pointer-events-none" />
                </div>

                {/* NAME REVEAL ON HOVER (Francis Harris Style) */}
                <div className="absolute -bottom-10 left-0 w-full text-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <span className="font-black italic text-[10px] md:text-sm text-white tracking-tighter uppercase drop-shadow-2xl whitespace-nowrap bg-black/40 px-2 py-1 backdrop-blur-sm">
                    {voice.author.split(' ').pop()}
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
