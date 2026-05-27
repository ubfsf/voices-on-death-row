"use client";
import { motion, Variants } from "framer-motion";

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

export default function Typewriter({ text, speed = 0.008, delay = 0, className = "" }: TypewriterProps) {
  // Keeps all whitespace (spaces AND newlines) as individual elements in the array
  const elements = text.split(/(\s+)/);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: speed, 
        delayChildren: delay,
        // short duration for the container fade-in itself
        duration: 0.1 
      },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.15,
        ease: "easeOut"
      },
    },
    hidden: {
      opacity: 0,
      y: 3
    },
  };

  return (
    <motion.p
      // Using "pre-wrap" ensures \n renders as a line break.
      style={{ whiteSpace: "pre-wrap" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {elements.map((el, index) => {
        // Check if the current element is purely whitespace
        const isWhitespace = /^\s+$/.test(el);

        return (
          <motion.span 
            variants={child} 
            key={index}
            style={{ 
              // CRITICAL: Only use inline-block for text so spaces wrap natively
              display: isWhitespace ? "inline" : "inline-block" 
            }}
          >
            {el}
          </motion.span>
        );
      })}
    </motion.p>
  );
}