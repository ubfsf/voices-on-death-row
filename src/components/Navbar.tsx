"use client";
import LocalSwitcher from "./LocalSwitcher";

export default function Header() {
  return (
    <header className="border-b border-stone-200 py-6 px-8 bg-paper/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-sm font-serif tracking-[0.2em] uppercase font-semibold text-stone-800">
          Voices On Death Row
        </div>
        
        <nav className="hidden md:flex gap-6">
          <a href="/" className="nav-link">Home</a>
          <a href="/stories" className="nav-link">Stories</a>
          <a href="/archive" className="nav-link">Archive</a>
          <a href="/podcast" className="nav-link">Podcast</a>
        </nav>

        <LocalSwitcher />
      </div>
    </header>
  );
}
