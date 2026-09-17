'use client';

import { ReactNode } from 'react';

/**
 * Standardized hero container with fixed aspect-ratio per breakpoint.
 * Mobile: 4/5, Tablet: 3/4, Desktop: 16/9
 * Wrap any hero image inside to make cropping predictable site-wide.
 */
export default function HeroFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative w-full overflow-hidden aspect-[4/5] sm:aspect-[3/4] lg:aspect-[16/9] ${className}`}
    >
      {children}
    </div>
  );
}
