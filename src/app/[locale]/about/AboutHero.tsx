// src/components/AboutHero.tsx
'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { buildObjectPositionClasses } from '@/lib/imageBreakpoints';

interface AboutHeroProps {
  src: string;
  title: string;
}

export default function AboutHero({ src, title }: AboutHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', prefersReducedMotion ? '0%' : '-42%']
  );

  // About hero focal point tuning per breakpoint
  // Mobile: keep Halima + book visible, avoid top crop
  // Tablet/Desktop: anchor right for exhibit, keep face in frame
  const objectPositionClasses = buildObjectPositionClasses({
    mobile: '60% 40%',
    tablet: '70% 30%',
    desktop: '85% 30%',
  });

  return (
    <section ref={heroRef} className="relative h-[60vh] w-full overflow-hidden">
      <motion.div style={{ y: imageY }} className="absolute inset-x-0 top-0 h-[180%]">
        <Image
          src={src}
          alt={title}
          fill
          sizes="100vw"
          className={`object-cover ${objectPositionClasses}`}
          priority
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative h-full flex items-center justify-center px-4">
        {/* Title centered but with safe margins so it never overlaps Halima/book/exhibit */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white tracking-wide text-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] max-w-4xl">
          {title}
        </h1>
      </div>
    </section>
  );
}
