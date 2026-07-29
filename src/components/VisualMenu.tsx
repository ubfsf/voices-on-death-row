// src/components/VisualMenu.tsx
"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import HeroTitle from './HeroTitle';

interface MenuItem {
  title: string;
  subtitle: string;
  slug: string;
  image: string;
  align: 'left' | 'right';
  isActive: boolean;
}

const BRAND_HERO = {
  subtitle: 'An Introduction',
  mainTitle: 'Voices',
  prefix: 'ON',
  deathRowText: 'DEATH ROW',
  brushstrokeImage: '/images/stroke_light_background.png'
};

const DEFAULT_MENU_ITEMS: MenuItem[] = [
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
  // ✅ ADD ABOUT THE FOUNDER
  {
    title: "About the Founder",
    subtitle: 'Learn more about Halima Kilgore and her vision for Voices on Death Row.',
    slug: 'about',
    image: '/images/halimaKilgore.jpg',
    align: 'left',
    isActive: true
  }
];

interface VisualMenuProps {
  initialData?: any;
}

export default function VisualMenu({ initialData }: VisualMenuProps) {
  const params = useParams();
  const locale = params.locale || 'en';
  
  const [menuItems, setMenuItems] = useState<MenuItem[]>(DEFAULT_MENU_ITEMS);
  const [isLoading, setIsLoading] = useState(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    // ✅ If we have initialData from server, use it immediately
    if (initialData) {
      console.log('📦 Using initialData from server');
      const data = initialData;
      
      if (data && data.menuItems && data.menuItems.length > 0) {
        const activeItems = data.menuItems.filter((item: MenuItem) => item.isActive);
        setMenuItems(activeItems);
      }
      return;
    }

    // ✅ Prevent multiple fetches
    if (hasFetched.current) {
      console.log('⏭️ Skipping duplicate fetch');
      return;
    }

    // 🔄 Fetch from CMS (only once)
    const fetchFromCMS = async () => {
      hasFetched.current = true;
      setIsLoading(true);
      try {
        console.log(`🔄 Fetching from CMS for locale: ${locale}`);
        const res = await fetch(`/api/visual-menu?locale=${locale}`);
        
        if (!res.ok) {
          throw new Error('CMS not available');
        }
        
        const data = await res.json();
        
        if (data && data.menuItems && data.menuItems.length > 0) {
          console.log(`✅ Using CMS data - ${data.menuItems.length} items`);
          const activeItems = data.menuItems.filter((item: MenuItem) => item.isActive);
          setMenuItems(activeItems);
        } else {
          console.log('⚠️ CMS returned no data, using defaults');
          setMenuItems(DEFAULT_MENU_ITEMS);
        }
      } catch (error) {
        console.log('⚠️ CMS not available, using defaults');
        setMenuItems(DEFAULT_MENU_ITEMS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFromCMS();
  }, [locale, initialData]);

  if (isLoading) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
        <div className="animate-pulse text-stone-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white font-serif overflow-x-hidden selection:bg-white selection:text-black">
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

function MenuItem({ item }: { item: MenuItem }) {
  const params = useParams();
  const locale = params.locale || 'en';

  return (
    <motion.section 
      initial={{ opacity: 0 }} 
      whileInView={{ opacity: 1 }} 
      viewport={{ once: true }} 
      transition={{ duration: 1 }} 
      className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden group border-b border-white/10"
    >
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-105 grayscale" 
          draggable={false} 
        />
        <div className="absolute inset-0 bg-black/40 transition-opacity duration-700 group-hover:bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        <div className={`absolute inset-0 bg-gradient-to-${item.align === 'left' ? 'r' : 'l'} from-black via-black/20 to-transparent`} />
      </div>

      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-8 md:px-24 flex items-center">
        <motion.div 
          initial={{ opacity: 0, x: item.align === 'right' ? 50 : -50 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, delay: 0.2 }} 
          className={`w-full max-w-2xl flex flex-col gap-6 ${item.align === 'right' ? 'ml-auto text-right items-end' : 'mr-auto text-left items-start'}`}
        >
          <h2 className="text-6xl sm:text-8xl md:text-[120px] font-black italic uppercase leading-none tracking-tighter text-white">
            {item.title}
          </h2>
          <p className="text-stone-200 font-sans font-light text-lg md:text-xl max-w-md leading-relaxed tracking-wide">
            {item.subtitle}
          </p>
          <div className="pt-4">
            <Link 
              href={`/${locale}/${item.slug}`} 
              className="inline-block font-sans text-sm uppercase tracking-[0.4em] font-bold text-white border-b-2 border-white pb-2 hover:text-[#FFB81C] hover:border-[#FFB81C] transition-all duration-300"
            >
              Explore
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}