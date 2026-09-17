"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { urlFor } from "@/lib/sanity";
import PolaroidCard from "@/components/PolaroidCard";

export default function VoicesGallery({
  voices,
  locale,
}: {
  voices: any[];
  locale: string;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const getPosition = (index: number) => {
    // Adjusted layouts to push photos further from the center title
    const layouts = [
      { x: "-28vw", y: "-25vh", rotate: -6 },
      { x: "28vw", y: "-22vh", rotate: 5 },
      { x: "-25vw", y: "25vh", rotate: -4 },
      { x: "25vw", y: "22vh", rotate: 7 },
      { x: "-10vw", y: "-35vh", rotate: 3 },
      { x: "10vw", y: "35vh", rotate: -5 },
      { x: "-32vw", y: "5vh", rotate: 8 },
      { x: "32vw", y: "2vh", rotate: -9 },
    ];

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const pos = layouts[index % layouts.length];

    if (isMobile) {
      return {
        x: parseFloat(pos.x) * 0.5 + "vw",
        y: parseFloat(pos.y) * 0.7 + "vh",
        rotate: pos.rotate,
      };
    }
    return pos;
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center py-10 overflow-hidden bg-[#fcfaf7]">
      
      {/* 1. THE TITLE: Centered and High Contrast */}
      <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none select-none text-center px-4">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="text-5xl sm:text-7xl md:text-[10vw] font-black italic uppercase leading-[0.8] tracking-tighter text-black drop-shadow-[0_0_80px_rgba(252,250,247,1)]"
        >
          THE <span className="text-black">VOICES</span>
        </motion.h1>
      </div>

      {/* 2. THE SCATTERED IMAGES (Polaroids Taped to Wall) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {voices.map((voice, index) => {
          const pos = getPosition(index);

          return (
            <motion.div
              key={voice._id}
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{
                opacity: 1,
                x: pos.x,
                y: pos.y,
                rotate: pos.rotate,
              }}
              transition={{
                duration: 1.5,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
            >
              <PolaroidCard
                href={`/${locale}/voices/${voice.slug}`}
                src={urlFor(voice.photo).url()}
                alt={voice.author}
                name={voice.author}
                caseId={voice.caseId}
                date={voice.recordedDate}
                location={voice.archiveLocation}
                rotate={pos.rotate}
                className="w-40 sm:w-56 md:w-72"
              />
            </motion.div>
          );
        })}
      </div>

      {/* Wall Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('/textures/noise.svg')]" />
    </div>
  );
}