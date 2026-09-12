import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface Card {
  slug: string;
  title: string;
}

export default function StoryTrack({ cards }: { cards: Card[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current || typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=2000',
          scrub: true,
          pin: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      <div ref={trackRef} className="flex h-full gap-8">
        {cards.map(c => (
          <div key={c.slug} className="min-w-[80vw] h-full bg-stone-900 flex items-center justify-center">
            <h3 className="text-4xl font-bold">{c.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
