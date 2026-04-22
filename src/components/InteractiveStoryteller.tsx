"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import IntroSequence from "./IntroSequence";
import VisualMenu from "./VisualMenu";
import Navbar from "./Navbar";

export default function InteractiveStoryteller({ sanitySections }: { sanitySections: any[] }) {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-black">
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <IntroSequence key="intro" onEnter={() => setHasEntered(true)} />
        ) : (
          <div key="site" className="flex flex-col">
            <Navbar />
            <VisualMenu sections={sanitySections} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
