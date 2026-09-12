import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function TimelineRope({ events }: { events: any[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.rope-path', { strokeDashoffset: 1000 }, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
        }
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24">
      <svg viewBox="0 0 1000 20" className="w-full h-20">
        <path className="rope-path" d="M0 10 H1000" stroke="white" fill="none" strokeWidth="2" />
      </svg>
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {events.map((e, i) => (
          <div key={i} className="p-4 border border-white/10">
            <h4>{e.title}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
