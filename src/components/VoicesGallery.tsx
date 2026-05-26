"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function VoicesGallery({ voices, locale }: { voices: any[], locale: string }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-12">
      {voices.map((voice, index) => {
        // Subtle scattered rotations for the collage look
        const rotation = (index % 4 === 0 ? -3 : index % 3 === 0 ? 2 : index % 2 === 0 ? -1 : 4);
        
        return (
          <motion.div
            key={voice._id}
            initial={{ opacity: 0, scale: 0.9, rotate: rotation }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.05, 
              zIndex: 20, 
              rotate: 0,
              transition: { duration: 0.4 } 
            }}
            className="relative"
          >
            <Link 
              href={`/${locale}/voices/${voice.slug}`} 
              className="block cursor-pointer group"
            >
              <div className="shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-transparent transition-all duration-700 group-hover:shadow-[0_40px_80px_rgba(0,0,0,1)]">
                <img 
                  src={voice.imageUrl} 
                  alt={voice.author} 
                  className="w-full h-auto block grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                />
                
                {/* Subtle Hover Indicator */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>

              {/* Optional: Hidden name that appears on hover */}
              <div className="absolute -bottom-6 left-0 w-full text-center opacity-0 group-hover:opacity-40 transition-opacity duration-700">
                <span className="font-serif italic text-[10px] text-white tracking-widest uppercase">
                  {voice.author}
                </span>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
