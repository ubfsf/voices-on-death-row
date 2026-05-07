import { client } from '@/lib/sanity';
import ScrollyVoiceItem from '@/components/ScrollyVoiceItem';
import Link from 'next/link';

export default async function VoicesWall() {
  const query = `*[_type == "voice"] | order(_createdAt asc){
    _id,
    "author": name, 
    "imageUrl": photo.asset->url,
    "slug": slug.current
  }`;

  const voices = await client.fetch(query);

  return (
    <main className="min-h-screen overflow-x-hidden relative bg-[#1a1a1a]">
      {/* THE NEW BRICK WALL BACKGROUND */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-80"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/29678809/pexels-photo-29678809.jpeg?_gl=1*cuhj7p*_ga*MTc1OTgyMzQyOS4xNzc4MTEzNjA3*_ga_8JE65Q40S6*czE3NzgxMTM2MDckbzEkZzEkdDE3NzgxMTQxODMkajUyJGwwJGgw')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // Keeping it natural as requested, just a slight contrast boost
          filter: 'contrast(1.1)', 
        }}
      />

      {/* BACK TO MENU: mix-blend-difference ensures it stays visible on the brick */}
      <Link 
        href="/" 
        className="fixed top-10 left-10 z-50 text-white/60 hover:text-white transition-all duration-500 uppercase text-xs tracking-[0.4em] font-light mix-blend-difference group"
      >
        <span className="inline-block transition-transform group-hover:-translate-x-2 duration-500 mr-2">←</span>
        Menu
      </Link>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 pb-96">
        {voices?.length > 0 ? (
          voices.map((voice: any, index: number) => (
            <ScrollyVoiceItem 
              key={voice._id} 
              voice={voice} 
              index={index} 
            />
          ))
        ) : (
          <div className="h-[60vh] flex items-center justify-center">
            <p className="text-white/40 uppercase tracking-widest text-sm animate-pulse font-serif">
              Opening Archive...
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
