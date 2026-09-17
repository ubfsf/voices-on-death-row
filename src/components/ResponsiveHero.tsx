'use client';

import Image from 'next/image';
import { buildObjectPositionClasses } from '@/lib/imageBreakpoints';

interface ResponsiveHeroProps {
  src: string;
  alt: string;
  title?: string;
  /** Per-breakpoint object position, e.g. "50% 30%" */
  objectPosition?: {
    mobile: string;
    tablet?: string;
    desktop?: string;
  };
  /** Art-directed sources for extreme aspect ratios */
  sources?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
  heightClass?: string;
  priority?: boolean;
  overlayOpacity?: number;
  /** Optional class for title positioning to avoid overlap */
  titleClassName?: string;
}

/**
 * Reusable hero with per-breakpoint object-position and optional art-direction.
 * Uses object-position for focal point tuning and <picture> fallback when different crops are required.
 */
export default function ResponsiveHero({
  src,
  alt,
  title,
  objectPosition,
  sources,
  heightClass = 'h-[60vh]',
  priority = false,
  overlayOpacity = 0.3,
  titleClassName = 'text-5xl md:text-7xl font-serif font-bold text-white tracking-wide',
}: ResponsiveHeroProps) {
  const posClasses = objectPosition ? buildObjectPositionClasses(objectPosition) : 'object-center';
  const hasArtDirection = sources && (sources.mobile || sources.tablet || sources.desktop);

  // If art-directed sources are provided, render <picture> with Next.js Image via fill
  // We fallback to src for missing breakpoints
  const finalSrc = src;

  return (
    <section className={`relative ${heightClass} w-full overflow-hidden`}>
      {/* Image layer */}
      <div className="absolute inset-0">
        {hasArtDirection ? (
          <picture>
            {sources.desktop && (
              <source media="(min-width: 1025px)" srcSet={sources.desktop} />
            )}
            {sources.tablet && (
              <source media="(min-width: 640px)" srcSet={sources.tablet} />
            )}
            {sources.mobile && (
              <source media="(max-width: 639px)" srcSet={sources.mobile} />
            )}
            <Image
              src={finalSrc}
              alt={alt}
              fill
              sizes="100vw"
              priority={priority}
              className={`object-cover ${posClasses}`}
            />
          </picture>
        ) : (
          <Image
            src={finalSrc}
            alt={alt}
            fill
            sizes="100vw"
            priority={priority}
            className={`object-cover ${posClasses}`}
          />
        )}
      </div>

      {/* Dark overlay for legibility */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* Title – centered, but with safe padding to avoid key objects */}
      {title && (
        <div className="relative h-full flex items-center justify-center px-6">
          <h1 className={`${titleClassName} text-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]`}>
            {title}
          </h1>
        </div>
      )}
    </section>
  );
}
