/**
 * Shared responsive image breakpoints matching Tailwind defaults
 * mobile: <640px
 * tablet: 640px – 1024px
 * desktop: >1024px
 */
export const IMG_BREAKPOINTS = {
  mobileMax: 639,
  tabletMin: 640,
  tabletMax: 1024,
  desktopMin: 1025,
} as const;

export type ImageBreakpointKey = 'mobile' | 'tablet' | 'desktop';

/** Tailwind screen prefixes for per-breakpoint object-position */
export const BREAKPOINT_PREFIX: Record<ImageBreakpointKey, string> = {
  mobile: '',
  tablet: 'sm', // Tailwind sm = 640px
  desktop: 'lg', // Tailwind lg = 1024px
};

/**
 * Build Tailwind object-position class string from per-breakpoint values.
 * Values should be CSS like "50% 30%" or "center".
 */
export function buildObjectPositionClasses(pos: {
  mobile: string;
  tablet?: string;
  desktop?: string;
}) {
  const classes: string[] = [];
  const mobileVal = normalizeObjectPos(pos.mobile);
  if (mobileVal) classes.push(`object-[${mobileVal}]`);
  
  if (pos.tablet) {
    const tabletVal = normalizeObjectPos(pos.tablet);
    if (tabletVal) classes.push(`sm:object-[${tabletVal}]`);
  }
  if (pos.desktop) {
    const desktopVal = normalizeObjectPos(pos.desktop);
    if (desktopVal) classes.push(`lg:object-[${desktopVal}]`);
  }
  return classes.join(' ');
}

/** Ensure value is suitable for Tailwind arbitrary class */
function normalizeObjectPos(v: string) {
  // Convert space to underscore for arbitrary value
  return v.trim().replace(/\s+/g, '_');
}
