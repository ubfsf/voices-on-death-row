"use client";
import { motion, Variants } from "framer-motion";

export default function Typewriter({ text, speed = 0.008, delay = 0, className = "" }: any) {
  // FIX: Safety check to prevent the 'split' error if text is missing in Sanity
  if (!text) return null;

  const elements = text.split(/(\s+)/);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: speed, delayChildren: delay, duration: 0.2 },
    },
  };

  const child: Variants = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.1, ease: "easeOut" } },
    hidden: { opacity: 0, y: 2 },
  };

  return (
    <motion.div
      style={{ whiteSpace: "pre-wrap", display: "inline" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {elements.map((el: string, index: number) => (
        <motion.span variants={child} key={index} style={{ display: "inline-block" }}>
          {el}
        </motion.span>
      ))}
    </motion.div>
  );
}
