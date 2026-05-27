import { client } from '@/lib/sanity';
import VoicesGallery from '@/components/VoicesGallery';
import Link from 'next/link';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function VoicesPage({ params }: Props) {
  const { locale } = await params;

  // Optimized query fetching the necessary fields for rendering
  const query = `*[_type == "voice"] | order(_createdAt asc){
    _id,
    "author": name, 
    "imageUrl": photo.asset->url,
    "slug": slug.current
  }`;

  const voices = await client.fetch(query);

  return (
    <main className="bg-[#050505] min-h-screen relative overflow-x-hidden selection:bg-white selection:text-black">
      
      {/* Cinematic Background Overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(15,15,15,1)_0%,_rgba(0,0,0,1)_100%)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* Fixed Menu Link */}
      <Link 
        href={`/${locale}`} 
        className="fixed top-12 left-12 z-50 text-white/20 hover:text-white transition-all duration-700 uppercase text-[10px] tracking-[1em] font-black mix-blend-difference"
      >
        ← {locale === 'fr' ? 'MENU' : 'MENU'}
      </Link>

      {/* Header Section */}
      <div className="relative z-10 max-w-7xl mx-auto pt-32 px-6 md:px-16">
        <div className="border-b border-white/5 pb-12">
          <p className="text-stone-700 font-mono text-[10px] uppercase tracking-[1em] mb-4">Archive_Vol.01</p>
          <h1 className="text-6xl md:text-[8vw] font-black italic uppercase tracking-tighter leading-none text-white">
            The <span className="text-stone-800 font-black">Voices</span>
          </h1>
        </div>
      </div>

      {/* The Collage Gallery */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 pb-40">
        {voices?.length > 0 ? (
          <VoicesGallery voices={voices} locale={locale} />
        ) : (
          <div className="h-[60vh] flex items-center justify-center">
            <p className="text-stone-600 uppercase tracking-[1em] text-[10px] animate-pulse font-sans">
              Retrieving Archive...
            </p>
          </div>
        )}
      </div>

      {/* Bottom Visual Spacer */}
      <div className="relative z-10 py-40 flex flex-col items-center justify-center text-center">
        <div className="w-px h-24 bg-gradient-to-b from-stone-800 to-transparent mb-8" />
        <p className="text-stone-800 font-mono text-[9px] uppercase tracking-[1.5em]">
          End of Archive
        </p>
      </div>
    </main>
  );
}