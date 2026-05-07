"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ScrollyVoiceItem({ voice, index }: { voice: any, index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, x: isEven ? -200 : 200 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className={`flex w-full mb-64 ${isEven ? 'justify-start' : 'justify-end'}`}
    >
      <Link href={`/voices/${voice._id}`} className="relative group">
        <div className="relative transition-transform duration-700 group-hover:scale-105">
          {/* Only the original image with its own Polaroid style and a deep shadow */}
          <div className="shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
            <img 
              src={voice.imageUrl} 
              alt={voice.author} 
              className="w-full max-w-md block h-auto"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
