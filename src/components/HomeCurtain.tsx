"use client";
import VideoCurtainHero from './VideoCurtainHero';
import VisualMenu from './VisualMenu';
import { useCurtainTrigger } from '@/hooks/useCurtainTrigger';

interface HomeCurtainProps {
  initialMenuData?: any;
}

export default function HomeCurtain({ initialMenuData }: HomeCurtainProps) {
  const { unveiled, settled, handleTransitionEnd } = useCurtainTrigger({ transitionDuration: 800 });

  return (
    <>
      {!settled && <VideoCurtainHero />}
      <div
        onTransitionEnd={handleTransitionEnd}
        aria-hidden={!unveiled}
        className={
          settled
            ? 'relative z-10 bg-stone-950'
            : `fixed inset-0 z-[110] bg-stone-950 overflow-hidden transform transition-transform duration-[800ms] ease-[cubic-bezier(0.77,0,0.175,1)] motion-reduce:transition-none ${
                unveiled ? 'translate-y-0' : 'translate-y-full'
              }`
        }
      >
        <VisualMenu initialData={initialMenuData} />
      </div>
    </>
  );
}
