"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import IntroSequence from "./IntroSequence";
import VisualMenu from "./VisualMenu";

// This tells TypeScript that this component now accepts 'sanitySections'
interface InteractiveStorytellerProps {
  sanitySections: any[];
}

export default function InteractiveStoryteller({ sanitySections }: InteractiveStorytellerProps) {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-black">
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <IntroSequence key="intro" onEnter={() => setHasEntered(true)} />
        ) : (
          <main key="site">
            {/* We pass the Sanity data down to the Visual Menu */}
            <VisualMenu sections={sanitySections} />
          </main>
        )}
      </AnimatePresence>
    </div>
  );
}
