"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function VoicesGallery({ voices, locale }: { voices: any[], locale: string }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
      {voices.map((voice, index) => {
        // Scattered rotations to keep the "memory archive" collage look
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
              {/* Image Box Container:
                Forces a modern 3:4 vertical frame and hides anything scaled past its edge.
              */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.9)] transition-all duration-700 group-hover:shadow-[0_40px_80px_rgba(0,0,0,1)] bg-stone-900">
                
                {/* The Dynamic Crop:
                  - 'object-cover' ensures the picture fills our 3:4 box.
                  - 'scale-[1.25]' zooms slightly into the asset, cutting off the outer white borders.
                  - 'object-center' ensures the polaroid stays perfectly composed.
                */}
                <img 
                  src={voice.imageUrl} 
                  alt={voice.author} 
                  className="w-full h-full object-cover object-center scale-[1.25] grayscale-[0.1] group-hover:grayscale-0 transition-all duration-700"
                />
                
                {/* Subtle Light Projector Overlay for depth */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>

              {/* Minimalist Hover Name */}
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