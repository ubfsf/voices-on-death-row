"use client";
import { motion } from "framer-motion";

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

export default function Typewriter({ text, speed = 0.008, delay = 0, className = "" }: TypewriterProps) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: speed, 
        delayChildren: delay,
        // This ensures the animation finishes quickly for skimmers
        duration: 0.2 
      },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      transition: {
        duration: 0.1,
        ease: "easeOut"
      },
    },
    hidden: {
      opacity: 0,
    },
  };

  return (
    <motion.div
      style={{ display: "flex", flexWrap: "wrap", gap: "0.25em" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
