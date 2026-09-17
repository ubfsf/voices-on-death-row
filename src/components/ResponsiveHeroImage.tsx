'use client';

import Image from 'next/image';
import { ReactNode } from 'react';

interface ResponsiveHeroImageProps {
  src: string;
  alt: string;
  mobilePos?: string;
  tabletPos?: string;
  desktopPos?: string;
  priority?: boolean;
  children?: ReactNode;
  className?: string;
}

/**
 * Image with per-breakpoint object-position via CSS custom properties.
 * Use inside HeroFrame for predictable cropping.
 */
export default function ResponsiveHeroImage({
  src,
  alt,
  mobilePos = 'center',
  tabletPos = 'center',
  desktopPos = 'center',
  priority = false,
  children,
  className = '',
}: ResponsiveHeroImageProps) {
  return (
    <div className={`absolute inset-0 ${className}`} style={{ 
      '--pos-mobile': mobilePos,
      '--pos-tablet': tabletPos,
      '--pos-desktop': desktopPos,
    } as React.CSSProperties}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: 'var(--pos-mobile)' } as React.CSSProperties}
      />
      <style jsx>{`
        img {
          object-position: var(--pos-mobile);
        }
        @media (min-width: 640px) {
          img {
            object-position: var(--pos-tablet);
          }
        }
        @media (min-width: 1024px) {
          img {
            object-position: var(--pos-desktop);
          }
        }
      `}</style>
      {children}
    </div>
  );
}
