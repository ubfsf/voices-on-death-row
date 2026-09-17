// src/components/AboutHero.tsx
'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import HeroFrame from '@/components/HeroFrame';
import ResponsiveHeroImage from '@/components/ResponsiveHeroImage';

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

  // SAFE ZONE: Halima's face + book + museum exhibit must stay visible.
  // Mobile keeps center lower, tablet/desktop anchor right for exhibit.
  return (
    <section ref={heroRef} className="relative w-full overflow-hidden">
      <HeroFrame>
        <motion.div style={{ y: imageY }} className="absolute inset-x-0 top-0 h-[180%]">
          <ResponsiveHeroImage
            src={src}
            alt={title}
            mobilePos="60% 40%"
            tabletPos="70% 30%"
            desktopPos="85% 30%"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative h-full flex items-center justify-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white tracking-wide text-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] max-w-4xl">
            {title}
          </h1>
        </div>
      </HeroFrame>
    </section>
  );
}
