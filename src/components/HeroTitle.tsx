"use client";

import React from "react";
import { motion, TargetAndTransition, Transition } from "framer-motion";

/**
 * BRUSHSTROKE CONTROLS
 * Adjust these values to position and scale the white stroke around DEATH ROW.
 */
export const BRUSHSTROKE_CONFIG = {
  // 1. STRETCH THE STROKE (Increase these to make the white background bigger)
  imageScaleX: "scale-x-[1.4]", // Stretch horizontal width
  imageScaleY: "scale-y-[4.2]",  // Stretch vertical height (Covers top & bottom of DEATH ROW)
  rotate: "-rotate-1",

  // 2. MOVE THE WHITE STROKE PNG ONLY (Without moving the black text)
  // Positive Y = move stroke DOWN | Negative Y = move stroke UP
  // Positive X = move stroke RIGHT | Negative X = move stroke LEFT
  strokeOffsetX: "10px",  // Shifts stroke slightly right away from "ON"
  strokeOffsetY: "-1px",   // Vertically aligns stroke with text center

  // 3. MOVE THE "DEATH ROW" TEXT ONLY (If needed)
  textOffsetX: "0px",
  textOffsetY: "0px",
};

export interface HeroTitleProps {
  subtitleText?: string;
  mainTitleText?: string;
  prefixText?: string;
  deathRowText?: string;
  brushstrokeSrc?: string;
  brushstrokeAlt?: string;

  subtitleStyles?: string;
  mainTitleStyles?: string;
  prefixStyles?: string;
  deathRowStyles?: string;
  containerStyles?: string;

  animationInitial?: TargetAndTransition;
  animationInView?: TargetAndTransition;
  transitionConfig?: Transition;
}

export default function HeroTitle({
  subtitleText = "An Introduction",
  mainTitleText = "Voices",
  prefixText = "ON",
  deathRowText = "DEATH ROW",
  brushstrokeSrc = "/images/stroke_light_background.png",
  brushstrokeAlt = "",

  // Base Typography Styles
  subtitleStyles = "mb-8 text-[10px] font-bold uppercase tracking-[0.8em] text-stone-400",
  mainTitleStyles = "text-white italic font-black leading-[0.82] tracking-[-0.06em] text-[5rem] sm:text-[6.5rem] md:text-[8rem] lg:text-[10rem]",
  
  // "ON" text styling with proper spacing to keep it clear of the stroke
  prefixStyles = "text-white relative z-30 mr-4 sm:mr-6 select-none shrink-0",
  
  // "DEATH ROW" text sits at z-20 above the stroke (z-10)
  deathRowStyles = "relative z-20 text-black font-black italic uppercase leading-none tracking-[-0.04em] whitespace-nowrap px-2 py-1",
  containerStyles = "relative mt-3 sm:mt-4 md:mt-5 flex items-center flex-nowrap",

  animationInitial = { opacity: 0, y: 30 },
  animationInView = { opacity: 1, y: 0 },
  transitionConfig = {
    duration: 1.2,
    ease: [0.16, 1, 0.3, 1],
  },
}: HeroTitleProps): React.ReactElement {
  return (
    <motion.div
      initial={animationInitial}
      whileInView={animationInView}
      viewport={{ once: true }}
      transition={transitionConfig}
    >
      {/* Subtitle */}
      {subtitleText && <p className={subtitleStyles}>{subtitleText}</p>}

      {/* Main Title Header */}
      <h1 className="flex flex-col items-start uppercase">
        <span className={mainTitleStyles}>{mainTitleText}</span>

        {/* Subtitle Row (ON + Brushstroke + DEATH ROW) */}
        <div className={containerStyles}>
          {/* Prefix "ON" */}
          {prefixText && (
            <span
              className={`text-[2rem] sm:text-[2.8rem] md:text-[3.8rem] lg:text-[4.6rem] ${prefixStyles}`}
            >
              {prefixText}
            </span>
          )}

          {/* Anchor Container for Brushstroke + DEATH ROW */}
          <span className="relative inline-flex items-center justify-center">
            {/* Brushstroke PNG - Scaled up and shifted independently */}
            {brushstrokeSrc && (
              <img
                src={brushstrokeSrc}
                alt={brushstrokeAlt}
                aria-hidden={!brushstrokeAlt}
                className={`absolute inset-0 w-full h-full object-fill pointer-events-none select-none z-10 origin-center ${BRUSHSTROKE_CONFIG.imageScaleX} ${BRUSHSTROKE_CONFIG.imageScaleY} ${BRUSHSTROKE_CONFIG.rotate}`}
                style={{
                  transform: `translate(${BRUSHSTROKE_CONFIG.strokeOffsetX}, ${BRUSHSTROKE_CONFIG.strokeOffsetY})`,
                }}
              />
            )}

            {/* "DEATH ROW" Text */}
            <span
              className={`text-[2rem] sm:text-[2.8rem] md:text-[3.8rem] lg:text-[4.6rem] ${deathRowStyles}`}
              style={{
                transform: `translate(${BRUSHSTROKE_CONFIG.textOffsetX}, ${BRUSHSTROKE_CONFIG.textOffsetY})`,
              }}
            >
              {deathRowText}
            </span>
          </span>
        </div>
      </h1>
    </motion.div>
  );
}