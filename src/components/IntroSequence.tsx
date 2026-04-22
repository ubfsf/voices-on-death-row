// src/components/IntroSequence.tsx
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
    return () => soundRef.current?.unload();
  }, []);

  const handleInteraction = () => {
    if (!isPlaying) {
      // FIRST CLICK: Starts the sound
      setIsPlaying(true);
      soundRef.current?.play();
    } else {
      // SECOND CLICK: Fades sound and triggers the transition to the Visual Menu
      if (soundRef.current) {
        soundRef.current.fade(0.5, 0, 2000);
        setTimeout(() => soundRef.current?.stop(), 2000);
      }
      onEnter(); // THIS IS THE LINE THAT MAKES THE CLICK WORK
    }
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black cursor-pointer"
      onClick={handleInteraction} // This listens for the click
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
      
      {/* Optional: Add a small hint at the bottom so the user knows to click */}
      {!isPlaying && (
        <div className="absolute bottom-10 w-full text-center text-white/50 text-xs uppercase tracking-widest">
          Click to start
        </div>
      )}
    </motion.div>
  );
}
