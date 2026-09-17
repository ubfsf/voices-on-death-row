import { client } from '@/lib/sanity';
import VoicesGallery from '@/components/VoicesGallery';
import Link from 'next/link';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function VoicesPage({ params }: Props) {
  const { locale } = await params;

  const query = `*[_type == "voice"] | order(_createdAt asc){
    _id,
    "author": name, 
    photo, // Fetch the full object to get crop/hotspot data
    "slug": slug.current
  }`;


  const voices = await client.fetch(query);

  return (
    <main className="page-paper">
      
      {/* Cinematic Overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(252,250,247,1)_0%,_rgba(240,238,235,1)_100%)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/textures/noise.svg')]" />
      </div>

      {/* Navigation */}
      <Link 
        href={`/${locale}`} 
        className="fixed top-12 left-12 z-50 text-black hover:text-black transition-all duration-700 uppercase text-[10px] tracking-[1em] font-black mix-blend-difference"
      >
        ← MENU
      </Link>

      {/* 
          REMOVED: The <header> block that was here.
          The title is now inside the VoicesGallery component below.
      */}

      <div className="relative z-10 w-full min-h-screen">
        {voices?.length > 0 ? (
          <VoicesGallery voices={voices} locale={locale} />
        ) : (
          <div className="h-screen flex items-center justify-center">
            <p className="text-black uppercase tracking-[1em] text-[10px] animate-pulse">
              Retrieving Archive...
            </p>
          </div>
        )}
      </div>
    </main>
  );
}