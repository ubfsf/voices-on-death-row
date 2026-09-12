import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface Chapter {
  title: string;
  subtitle?: string;
  videoUrl?: string;
}

interface StoryHeroProps {
  chapters: Chapter[];
}

export default function StoryHero({ chapters }: StoryHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const container = containerRef.current!;
      gsap.to(container, {
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=3000',
          scrub: true,
          pin: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative">
      {chapters.map((ch, i) => (
        <div key={i} className="h-screen flex items-center justify-center">
          <h2 className="text-6xl font-black">{ch.title}</h2>
        </div>
      ))}
    </section>
  );
}
