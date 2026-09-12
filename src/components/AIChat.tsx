// src/components/AIChat.tsx
//
// Floating "Research Assistant" chat panel.
//  - Accessible dialog semantics (role="dialog", labelled, Escape to close)
//  - Focus moves into the panel when opened and returns to the trigger
//    when closed
//  - All controls have accessible names
"use client";
import { useEffect, useRef, useState } from 'react';

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Escape closes the dialog; focus returns to the trigger on close.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const open = () => {
    setIsOpen(true);
    // Move focus into the dialog once it mounts.
    requestAnimationFrame(() => textareaRef.current?.focus());
  };

  const close = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999]">
      {/* Editorial Trigger Button */}
      {!isOpen && (
        <button
          ref={triggerRef}
          type="button"
          onClick={open}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className="bg-black/80 backdrop-blur-md border border-white/20 text-white px-6 py-3
                     uppercase text-[9px] tracking-[0.3em] font-bold hover:bg-white hover:text-black
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70
                     transition-all duration-500 shadow-xl"
        >
          Research Assistant
        </button>
      )}

      {/* The "Dossier" Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Research Assistant — Archival Query"
          className="bg-[#050505] border border-white/10 p-8 w-96 shadow-2xl animate-in fade-in zoom-in duration-300"
        >
          <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
            <h3 className="text-stone-500 font-mono text-[9px] uppercase tracking-[0.3em]">
              Archival Query
            </h3>
            <button
              type="button"
              onClick={close}
              aria-label="Close research assistant"
              className="text-stone-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded"
            >
              ✕
            </button>
          </div>

          <textarea
            ref={textareaRef}
            aria-label="Search the archive"
            className="w-full bg-transparent text-stone-300 placeholder-stone-700 p-0 mb-6 text-sm font-serif italic focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
            placeholder="Search the archive..."
            rows={3}
          />

          <button
            type="button"
            className="w-full border border-white/20 text-white py-3 uppercase text-[9px] tracking-[0.3em] font-bold hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 transition-all"
          >
            Execute Query
          </button>
        </div>
      )}
    </div>
  );
}