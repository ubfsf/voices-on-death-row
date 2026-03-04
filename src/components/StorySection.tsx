"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface StorySectionProps {
  children: React.ReactNode;
  image: string;
  side?: "left" | "right";
}

export default function StorySection({ children, image, side = "left" }: StorySectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="min-h-screen flex items-center py-20 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <motion.div style={{ opacity, y }} className={side === "right" ? "md:order-2" : ""}>
          <img 
            src={image} 
            className="w-full grayscale contrast-125 border border-stone-200 p-2 bg-white shadow-2xl" 
            alt="Documentary visual" 
          />
        </motion.div>
        <motion.div style={{ opacity }} className="prose-archive">
          {children}
        </motion.div>
      </div>
    </section>
  );
}
