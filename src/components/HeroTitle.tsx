"use client";

import React from "react";
import { motion, TargetAndTransition, Transition } from "framer-motion";
import { useTranslations } from "next-intl";

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
  textOffsetY: "4px",
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
  const t = useTranslations("HomePage");

  const resolvedSubtitle = subtitleText || t("hero_subtitle");
  const resolvedMainTitle = mainTitleText || t("hero_title");
  const resolvedPrefix = prefixText || t("prefix");
  const resolvedDeathRow = deathRowText || t("deathRowText");

  return (
    <motion.div
      initial={animationInitial}
      whileInView={animationInView}
      viewport={{ once: true }}
      transition={transitionConfig}
    >
      {subtitleText && <p className={subtitleStyles}>{resolvedSubtitle}</p>}

      <h1 className="flex flex-col items-start uppercase">
        <span className={mainTitleStyles}>{resolvedMainTitle}</span>

        <div className={containerStyles}>
          <span className={`text-[2rem] sm:text-[2.8rem] md:text-[3.8rem] lg:text-[4.6rem] ${prefixStyles}`}>
            {resolvedPrefix}
          </span>

          <span className="relative inline-flex items-center ml-2">
            {brushstrokeSrc && (
              <img
                src={brushstrokeSrc}
                alt={brushstrokeAlt}
                aria-hidden={!brushstrokeAlt}
                className={`absolute inset-0 w-full h-full object-fill pointer-events-none select-none z-0 origin-center ${BRUSHSTROKE_CONFIG.imageScaleX} ${BRUSHSTROKE_CONFIG.imageScaleY} ${BRUSHSTROKE_CONFIG.rotate}`}
                style={{ transform: `translate(${BRUSHSTROKE_CONFIG.strokeOffsetX}, ${BRUSHSTROKE_CONFIG.strokeOffsetY})` }}
              />
            )}
            <span className={`relative z-10 text-[2rem] sm:text-[2.8rem] md:text-[3.8rem] lg:text-[4.6rem] ${deathRowStyles}`} style={{ transform: `translate(${BRUSHSTROKE_CONFIG.textOffsetX}, ${BRUSHSTROKE_CONFIG.textOffsetY})` }}>
              {resolvedDeathRow}
            </span>
          </span>
        </div>
      </h1>
    </motion.div>
  );
}
