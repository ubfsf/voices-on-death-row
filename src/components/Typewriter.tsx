"use client";

import { motion, Variants } from "framer-motion";

interface TypewriterProps {
  text?: string;
  speed?: number;
  delay?: number;
  className?: string;
}

export default function Typewriter({
  text,
  speed = 0.008,
  delay = 0,
  className = "",
}: TypewriterProps) {
  // Safety check to prevent 'split' error if text is missing or null from Sanity
  if (!text) return null;

  // Splits by words and preserves spaces cleanly
  const elements = text.split(/(\s+)/);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: speed, 
        delayChildren: delay, 
        duration: 0.2 
      },
    },
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 2 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.1, ease: "easeOut" } 
    },
  };

  return (
    <motion.span
      style={{ whiteSpace: "pre-wrap", display: "inline" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {elements.map((el: string, index: number) => {
        // If it's pure whitespace, render it directly to keep spacing perfectly natural
        if (/^\s+$/.test(el)) {
          return <span key={index}>{el}</span>;
        }

        return (
          <motion.span
            variants={child}
            key={index}
            style={{ display: "inline-block" }}
          >
            {el}
          </motion.span>
        );
      })}
    </motion.span>
  );
}