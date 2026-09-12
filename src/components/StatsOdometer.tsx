import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

interface Stat {
  label: string;
  value: number;
}

export default function StatsOdometer({ stats }: { stats: Stat[] }) {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    refs.current.forEach((el, i) => {
      if (!el) return;
      const target = stats[i]?.value || 0;
      gsap.fromTo(el, { innerText: 0 }, {
        innerText: target,
        duration: 1.5,
        ease: 'power1.out',
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        }
      });
    });
  }, [stats]);

  return (
    <section className="grid md:grid-cols-3 gap-12 py-24">
      {stats.map((s, i) => (
        <div key={i} className="text-center">
          <span ref={el => { refs.current[i] = el; }} className="text-6xl font-black">{0}</span>
          <p className="mt-2 text-stone-400">{s.label}</p>
        </div>
      ))}
    </section>
  );
}
