"use client";
import { motion } from 'framer-motion';

interface SplitHeroProps {
  title: string;
  text: string;
  imageSide?: "left" | "right";
}

export default function SplitHero({ title, text, imageSide = "right" }: SplitHeroProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh] border-y border-stone-200 bg-[#fcfaf7]">
      {/* Text Side */}
      <div className={`p-12 md:p-24 flex flex-col justify-center ${imageSide === "right" ? "order-1" : "order-2"}`}>
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-serif italic mb-8 text-stone-900"
        >
          {title}
        </motion.h2>
        <div className="prose prose-stone italic opacity-70 leading-relaxed font-serif text-lg text-stone-700">
          <p>{text}</p>
        </div>
      </div>

      {/* Image Side */}
      <div className={`relative bg-stone-200 overflow-hidden min-h-[400px] ${imageSide === "right" ? "order-2" : "order-1"}`}>
        <img 
          src="/images/hero-illustration.png"  /* MATCHES YOUR FILENAME */
          className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-1000"
          alt="Portrait of friend on death row"
        />
        {/* The "Split" overlay effect */}
        <div className={`absolute inset-y-0 bg-gradient-to-r from-[#fcfaf7] to-transparent w-32 hidden md:block ${imageSide === "right" ? "left-0" : "right-0 rotate-180"}`} />
      </div>
    </div>
  );
}
