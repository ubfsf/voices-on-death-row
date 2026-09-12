// src/components/AboutHero.tsx
'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

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

  return (
    <section ref={heroRef} className="relative h-[60vh] w-full overflow-hidden">
      <motion.div style={{ y: imageY }} className="absolute inset-x-0 top-0 h-[180%]">
        <Image
          src={src}
          alt={title}
          fill
          sizes="100vw"
          className="object-cover object-[100%_30%]"
          priority
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative h-full flex items-center justify-center">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-wide">{title}</h1>
      </div>
    </section>
  );
}
