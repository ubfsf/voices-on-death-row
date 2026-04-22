"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import IntroSequence from "./IntroSequence";
import Navbar from "./Navbar"; // The Persistent Nav
import VisualMenu from "./VisualMenu";

export default function InteractiveStoryteller() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-black">
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          // STAGE 1: The Video Intro
          <IntroSequence key="intro" onEnter={() => setHasEntered(true)} />
        ) : (
          // STAGE 2: The Real Website
          <div key="site" className="flex flex-col">
            <Navbar /> {/* This stays at the top of every page */}
            <main>
              <VisualMenu /> {/* This is the big image grid Halima wants */}
            </main>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
