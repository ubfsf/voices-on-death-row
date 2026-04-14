"use client";
import { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';

interface IntroSequenceProps {
  onEnter: () => void;
}

export default function IntroSequence({ onEnter }: IntroSequenceProps) {
  const t = useTranslations('IntroSequence');
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: ["/sounds/writing.mp3"],
      loop: true,
      volume: 0.5,
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, []);

  const handleStartInteraction = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      if (soundRef.current && !soundRef.current.playing()) {
        soundRef.current.play();
      }
    }
  };

  const handleEnterClick = () => {
    // Fade out audio over 2 seconds
    if (soundRef.current) {
      soundRef.current.fade(0.5, 0, 2000);
      setTimeout(() => {
        if (soundRef.current) {
          soundRef.current.stop();
        }
      }, 2000);
    }
    onEnter();
  };

  return (
    <motion.div
      key="intro-sequence"
      exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
      onClick={handleStartInteraction}
    >
      {/* Background Video */}
      <div className="absolute inset-0 opacity-40">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover grayscale brightness-75"
        >
          <source src="/videos/writing-hand.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 text-center px-4 md:px-8 max-w-4xl mx-auto flex flex-col items-center justify-center h-full">
        {/* Title Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3, delay: 1, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-6xl uppercase tracking-[0.3em] font-light mb-6">
            {t('title')}
          </h1>
          <p className="text-sm md:text-lg tracking-[0.5em] text-stone-300 font-sans uppercase">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Enter Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 4.5 }}
          className="mt-24"
        >
          <button
            onClick={handleEnterClick}
            className="group relative px-8 py-3 overflow-hidden rounded-sm border border-white/30 bg-transparent text-sm tracking-[0.2em] uppercase transition-all hover:bg-white hover:text-black duration-700"
          >
            <span className="relative z-10 transition-colors duration-700">{t('enter_button')}</span>
          </button>
        </motion.div>
      </div>

      {/* Audio Play Warning/Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isPlaying ? 0 : 0.5 }}
        transition={{ duration: 1, delay: 6 }}
        className="absolute bottom-8 left-0 right-0 text-center text-[10px] tracking-widest uppercase font-sans text-white/50"
      >
        {t('audio_hint')}
      </motion.div>
    </motion.div>
  );
}
