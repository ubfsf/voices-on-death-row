"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import IntroSequence from "./IntroSequence";
import VisualMenu from "./VisualMenu";
import Navbar from "./Navbar"; 

export default function InteractiveStoryteller() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-black">
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          // Only show the video. No Header yet.
          <IntroSequence key="intro" onEnter={() => setHasEntered(true)} />
        ) : (
          // Show the actual site after they click
          <div key="site" className="flex flex-col">
            <Navbar /> 
            <main>
              <VisualMenu />
            </main>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
