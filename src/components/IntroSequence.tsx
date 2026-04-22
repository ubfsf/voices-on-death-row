"use client";
import { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import { motion } from "framer-motion";

export default function IntroSequence({ onEnter }: { onEnter: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: ["/sounds/writing.mp3"],
      loop: true,
      volume: 0.5,
    });
    return () => { soundRef.current?.unload(); };
  }, []);

  const handleInteraction = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      soundRef.current?.play();
    } else {
      // Second click triggers the transition
      if (soundRef.current) {
        soundRef.current.fade(0.5, 0, 1500);
      }
      onEnter(); 
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // This ensures it covers the whole screen and catches clicks
      className="fixed inset-0 z-[100] bg-black cursor-pointer" 
      onClick={handleInteraction}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/videos/writing-hand.mp4" type="video/mp4" />
      </video>

      {!isPlaying && (
        <div className="absolute inset-0 flex items-end justify-center pb-20">
          <p className="text-white/50 text-[10px] uppercase tracking-[0.5em] animate-pulse">
            Click to Enter
          </p>
        </div>
      )}
    </motion.div>
  );
}
