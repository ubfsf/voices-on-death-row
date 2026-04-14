"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import IntroSequence from "./IntroSequence";
import StoryArchive from "./StoryArchive";

export default function InteractiveStoryteller() {
  const [stage, setStage] = useState<"intro" | "archive">("intro");

  const handleEnterStory = () => {
    setStage("archive");
    // Scroll to top immediately to ensure archive starts clean
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative w-full h-full bg-black">
      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <IntroSequence onEnter={handleEnterStory} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === "archive" && (
          <StoryArchive />
        )}
      </AnimatePresence>
    </div>
  );
}
