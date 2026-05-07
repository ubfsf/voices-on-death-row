"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export default function ScrollyVoiceItem({ voice, index }: { voice: any, index: number }) {
  const containerRef = useRef(null);

  // 1. Track scroll progress for this specific section
  // offset: ["start end", "end start"] means from when it enters bottom to when it leaves top
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 2. Define the exit directions based on index (Left, Right, Up-Left, Up-Right)
  const directions = [
    { x: -400, y: -200, rotate: -15 }, // Up-Left
    { x: 400, y: -200, rotate: 15 },   // Up-Right
    { x: -500, y: 100, rotate: -25 },  // Wide-Left
    { x: 500, y: 100, rotate: 25 },   // Wide-Right
  ];
  const dir = directions[index % directions.length];

  // 3. Map the scroll progress to visual changes
  // As scroll goes from 0 to 1, scale goes from 0.5 -> 1 (middle) -> 0.3 (exit)
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.4]);
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, dir.x]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, dir.y]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, dir.rotate]);

  return (
    <section ref={containerRef} className="h-[150vh] w-full flex items-center justify-center relative">
      <motion.div
        style={{
          scale,
          x,
          y,
          opacity,
          rotate,
          position: "sticky",
          top: "25%", // Keeps it in the middle-ish while scrolling
        }}
        className="z-10"
      >
        <Link href={`/voices/${voice.slug || voice._id}`} className="block">
          <div className="shadow-[0_50px_100px_rgba(0,0,0,0.8)] bg-white p-2 transition-transform duration-500 hover:scale-105">
            <img 
              src={voice.imageUrl} 
              alt={voice.author} 
              className="w-full max-w-[85vw] md:max-w-lg block h-auto"
            />
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
