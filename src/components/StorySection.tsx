"use client";
import { motion } from 'framer-motion';

interface StorySectionProps {
  children: React.ReactNode;
  image: string;
  side?: "left" | "right";
}

export default function StorySection({ children, image, side = "left" }: StorySectionProps) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      viewport={{ once: true, margin: "-20%" }}
      className="min-h-screen flex items-center py-24 px-8"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className={side === "right" ? "md:order-2" : ""}>
          <img 
            src={image} 
            className="w-full grayscale contrast-125 border border-stone-200 p-2 bg-white shadow-2xl" 
            alt="Archive visual" 
          />
        </div>
        <div className="prose prose-stone lg:prose-xl font-artistic italic text-stone-800">
          {children}
        </div>
      </div>
    </motion.section>
  );
}
