// src/components/PolaroidPhoto.tsx
"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';

interface PolaroidPhotoProps {
  src: string;
  alt: string;
  caption?: string;
  subCaption?: string;
  rotation?: number;
  className?: string;
}

export default function PolaroidPhoto({
  src,
  alt,
  caption,
  subCaption,
  rotation = -2,
  className = ""
}: PolaroidPhotoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative bg-white p-3 pb-12 shadow-2xl ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover grayscale"
        />
      </div>
      {caption && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center w-full">
          <p className="text-xs text-gray-700 tracking-widest font-light">
            {caption}
          </p>
          {subCaption && (
            <p className="text-[10px] text-gray-400 tracking-wider">
              {subCaption}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
}