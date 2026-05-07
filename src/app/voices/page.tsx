import { client } from '@/lib/sanity';
import ScrollyVoiceItem from '@/components/ScrollyVoiceItem';
import Link from 'next/link';

export default async function VoicesWall() {
  // CHANGE: 'desc' to 'asc' - newest will appear at the bottom
  const query = `*[_type == "voice"] | order(_createdAt asc){
    _id,
    "author": name, 
    "imageUrl": photo.asset->url,
    "slug": slug.current
  }`;

  const voices = await client.fetch(query);

  return (
    <main className="min-h-screen overflow-x-hidden relative bg-white">
  <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.05)]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
        }}
      />
      
      {/* Subtle vignette effect */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-black/50" />
      
      <Link 
        href="/" 
        className="fixed top-10 left-10 z-50 text-white/30 hover:text-white transition-all duration-500 uppercase text-xs tracking-[0.4em] font-light mix-blend-difference group"
      >
        <span className="inline-block transition-transform group-hover:-translate-x-2 duration-500 mr-2">←</span>
        Menu
      </Link>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 pb-96">
        {voices?.map((voice: any, index: number) => (
          <ScrollyVoiceItem 
            key={voice._id} 
            voice={voice} 
            index={index} 
          />
        ))}
      </div>
    </main>
  );
}