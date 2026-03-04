"use client";
import { motion, Variants } from 'framer-motion';

interface TypewriterProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function Typewriter({ text, className = "", delay = 0 }: TypewriterProps) {
  const words = text.split(" ");
  
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.02, 
        delayChildren: delay 
      },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", damping: 12, stiffness: 200 },
    },
    hidden: {
      opacity: 0,
      y: 10,
      filter: "blur(4px)",
    },
  };

  return (
    <motion.p
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ whiteSpace: "nowrap", display: "inline-block" }}>
          {word.split("").map((char, charIndex) => (
            <motion.span key={charIndex} variants={child}>
              {char}
            </motion.span>
          ))}
          {/* Add space after each word */}
          <span style={{ display: "inline-block" }}>&nbsp;</span>
        </span>
      ))}
    </motion.p>
  );
}
