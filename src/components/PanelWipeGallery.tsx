import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function PanelWipeGallery({ items }: { items: { src: string; alt: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.panel').forEach((el: any) => {
        gsap.fromTo(el, { xPercent: -100, opacity: 0 }, {
          xPercent: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
          }
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="space-y-24">
      {items.map((it, i) => (
        <div key={i} className="panel h-[60vh] bg-stone-900 flex items-center justify-center">
          <img src={it.src} alt={it.alt} className="max-h-full object-cover" />
        </div>
      ))}
    </section>
  );
}
