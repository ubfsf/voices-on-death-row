"use client";
import { useState } from 'react';

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  // ... (handleSend logic remains the same)

  return (
    <div className="fixed bottom-8 right-8 z-[9999]">
      {/* Editorial Trigger Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-black/80 backdrop-blur-md border border-white/20 text-white px-6 py-3 
                     uppercase text-[9px] tracking-[0.3em] font-bold hover:bg-white hover:text-black 
                     transition-all duration-500 shadow-xl"
        >
          Research Assistant
        </button>
      )}

      {/* The "Dossier" Window */}
      {isOpen && (
        <div className="bg-[#050505] border border-white/10 p-8 w-96 shadow-2xl animate-in fade-in zoom-in duration-300">
          <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
            <h3 className="text-stone-500 font-mono text-[9px] uppercase tracking-[0.3em]">
              Archival Query
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-stone-700 hover:text-white">✕</button>
          </div>
          
          <textarea 
            className="w-full bg-transparent text-stone-300 placeholder-stone-700 p-0 mb-6 text-sm font-serif italic focus:outline-none"
            placeholder="Search the archive..."
            rows={3}
          />
          
          <button className="w-full border border-white/20 text-white py-3 uppercase text-[9px] tracking-[0.3em] font-bold hover:bg-white hover:text-black transition-all">
            Execute Query
          </button>
        </div>
      )}
    </div>
  );
}
