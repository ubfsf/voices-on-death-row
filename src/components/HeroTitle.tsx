"use client";

import React from "react";
import { motion, TargetAndTransition, Transition } from "framer-motion";
import { useTranslation } from '@/hooks/useTranslation';

/**
 * BRUSHSTROKE CONTROLS
 * Adjust these values to position and scale the white stroke around DEATH ROW.
 */
export const BRUSHSTROKE_CONFIG = {
  imageScaleX: "scale-x-[1.4]",
  imageScaleY: "scale-y-[4.2]",
  rotate: "-rotate-1",
  strokeOffsetX: "10px",
  strokeOffsetY: "-1px",
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
  subtitleStyles = "mb-8 text-[10px] font-bold uppercase tracking-[0.8em] text-stone-400",
  mainTitleStyles = "text-white italic font-black leading-[0.82] tracking-[-0.06em] text-[5rem] sm:text-[6.5rem] md:text-[8rem] lg:text-[10rem]",
  prefixStyles = "text-white relative z-30 mr-4 sm:mr-6 select-none shrink-0",
  deathRowStyles = "relative z-20 text-black font-black italic uppercase leading-none tracking-[-0.04em] whitespace-nowrap px-2 py-1",
  containerStyles = "relative mt-3 sm:mt-4 md:mt-5 flex items-center flex-nowrap",
  animationInitial = { opacity: 0, y: 30 },
  animationInView = { opacity: 1, y: 0 },
  transitionConfig = {
    duration: 1.2,
    ease: [0.16, 1, 0.3, 1],
  },
}: HeroTitleProps): React.ReactElement {
  // Source texts for translation - with proper defaults
  const sourceTexts = {
    subtitle: subtitleText,
    mainTitle: mainTitleText,
    prefix: prefixText,
    deathRow: deathRowText
  };

  const { t } = useTranslation(sourceTexts);

  return (
    <motion.div
      initial={animationInitial}
      whileInView={animationInView}
      viewport={{ once: true }}
      transition={transitionConfig}
    >
      {/* Subtitle - This will translate to "Une Introduction" in French */}
      {subtitleText && <p className={subtitleStyles}>{t.subtitle}</p>}

      {/* Main Title Header */}
      <h1 className="flex flex-col items-start uppercase">
        <span className={mainTitleStyles}>{t.mainTitle}</span>

        {/* Subtitle Row (ON + Brushstroke + DEATH ROW) */}
        <div className={containerStyles}>
          {/* Prefix "ON" - This will translate to "SUR" in French */}
          {prefixText && (
            <span
              className={`text-[2rem] sm:text-[2.8rem] md:text-[3.8rem] lg:text-[4.6rem] ${prefixStyles}`}
            >
              {t.prefix}
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

            {/* "DEATH ROW" Text - This will translate to "COULOIR DE LA MORT" in French */}
            <span
              className={`text-[2rem] sm:text-[2.8rem] md:text-[3.8rem] lg:text-[4.6rem] ${deathRowStyles}`}
              style={{
                transform: `translate(${BRUSHSTROKE_CONFIG.textOffsetX}, ${BRUSHSTROKE_CONFIG.textOffsetY})`,
              }}
            >
              {t.deathRow}
            </span>
          </span>
        </div>
      </h1>
    </motion.div>
  );
}