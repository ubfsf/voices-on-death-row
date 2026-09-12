// src/components/VisualMenu.tsx
//
// Presentational menu: hero title + full-bleed menu sections.
// All CMS data fetching lives in `useVisualMenuData`; this component only
// renders what it is given.
"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import HeroTitle from './HeroTitle';
import { useVisualMenuData, type VisualMenuItem } from '@/hooks/useVisualMenuData';

const BRAND_HERO = {
  subtitle: 'An Introduction',
  mainTitle: 'Voices',
  prefix: 'ON',
  deathRowText: 'DEATH ROW',
  brushstrokeImage: '/images/stroke_light_background.png'
};

const DEFAULT_MENU_ITEMS: VisualMenuItem[] = [
  {
    title: 'Voices',
    subtitle: 'Firsthand testimonies and personal narratives from death row.',
    slug: 'voices',
    image: '/images/eyes.jpg',
    align: 'left',
    isActive: true
  },
  {
    title: 'Letters',
    subtitle: 'Correspondence from inside prison.',
    slug: 'letters',
    image: '/images/writing_another.jpg',
    align: 'right',
    isActive: true
  },
  {
    title: 'Podcast',
    subtitle: 'Conversations that explore justice, memory, trauma, and humanity.',
    slug: 'podcast',
    image: '/images/person_back.jpg',
    align: 'left',
    isActive: true
  },
  {
    title: "Families' Voices",
    subtitle: 'The deep impacts and stories from loved ones and communities.',
    slug: 'families_voices',
    image: '/images/rockingChair.png',
    align: 'right',
    isActive: true
  },
  {
    title: 'Victims & Survivors Against the Death Penalty',
    subtitle: 'Stories of survivors of violent crime and family members of murder victims who chose to speak out against the death penalty, sharing their journey toward healing, resilience, and hope.',
    slug: 'survivors',
    image: '/images/silhouettes_toward_light.jpg',
    align: 'left',
    isActive: true
  },
  {
    title: "About the Founder",
    subtitle: 'Learn more about Halima Kilgore and her vision for Voices on Death Row.',
    slug: 'about',
    image: '/images/about.jpg',
    align: 'right',
    isActive: true,
    imagePosition: 'object-right-top',
    textShift: 'md:mr-48'
  }
];

interface VisualMenuProps {
  initialData?: any;
}

export default function VisualMenu({ initialData }: VisualMenuProps) {
  const locale = useLocale();

  const { menuItems } = useVisualMenuData({
    initialData,
    locale,
    defaults: DEFAULT_MENU_ITEMS,
  });

  return (
    <div className="page-night">
      <header className="max-w-7xl mx-auto pt-24 pb-16 md:pt-32 md:pb-20 px-6 md:px-16">
        <HeroTitle
          subtitleText={BRAND_HERO.subtitle}
          mainTitleText={BRAND_HERO.mainTitle}
          prefixText={BRAND_HERO.prefix}
          deathRowText={BRAND_HERO.deathRowText}
          brushstrokeSrc={BRAND_HERO.brushstrokeImage}
        />
      </header>

      <main className="w-full space-y-0">
        {menuItems.map((item) => (
          <MenuItem key={item.slug} item={item} />
        ))}
      </main>
    </div>
  );
}

function MenuItem({ item }: { item: VisualMenuItem }) {
  const locale = useLocale();

  const isLongTitle = item.title.length > 24;

  return (
    <section
      className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden group border-b border-white/10"
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="100vw"
          className={`object-cover transition-transform duration-[5s] group-hover:scale-105 grayscale ${item.imagePosition || 'object-center'}`}
          style={item.hotspot ? { objectPosition: `${item.hotspot.x * 100}% ${item.hotspot.y * 100}%` } : undefined}
        />
        <div className="absolute inset-0 bg-black/30 md:bg-black/35 transition-opacity duration-700 group-hover:bg-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <div className={`absolute inset-0 bg-gradient-to-${item.align === 'left' ? 'r' : 'l'} from-black/20 via-black/5 to-transparent`} />
      </div>

      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 sm:px-8 md:px-24 flex items-end pb-8 md:pb-16">
        <div
          className={`w-full max-w-2xl flex flex-col gap-4 md:gap-6 ${item.align === 'right' ? 'ml-auto text-right items-end' : 'mr-auto text-left items-start'} ${item.textShift || ''}`}
        >
          <h2 className={`font-black italic uppercase tracking-tighter text-white break-words ${isLongTitle ? 'text-[clamp(1.75rem,6.5vw,3.5rem)] leading-[1.05]' : 'text-[clamp(2.5rem,10vw,7.5rem)] leading-[0.9]'}`}>
            {item.title}
          </h2>
          <p className="text-stone-200 font-sans font-light text-[clamp(0.875rem,1.8vw,1.125rem)] max-w-[22ch] md:max-w-md leading-relaxed tracking-wide line-clamp-3 md:line-clamp-4">
            {item.subtitle}
          </p>
          <div className="pt-2 md:pt-4">
            <Link
              href={`/${locale}/${item.slug}`}
              className="inline-block font-sans text-xs sm:text-sm uppercase tracking-[0.4em] font-bold text-white border-b-2 border-white pb-2 hover:text-accent hover:border-accent focus-visible:text-accent focus-visible:border-accent focus-visible:outline-none transition-all duration-300"
            >
              Explore
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}