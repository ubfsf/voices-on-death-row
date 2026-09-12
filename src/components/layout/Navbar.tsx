// src/components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-40 p-6 flex justify-between items-center bg-black/50 backdrop-blur-md">
      <Link href="/" className="text-white tracking-widest uppercase text-sm">UBFSF</Link>
      <div className="flex gap-8">
        <Link href="/voices" className="nav-link">Voices</Link>
        <Link href="/letters" className="nav-link">Letters</Link>
        <Link href="/art" className="nav-link">Art</Link>
        <Link href="/about" className="nav-link">About</Link>
      </div>
    </nav>
  );
}
