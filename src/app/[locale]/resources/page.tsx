import { client } from '@/lib/sanity';
import Link from 'next/link';

export default async function ResourcesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const resources = await client.fetch(`*[_type == "resource"] | order(category asc)`);

  return (
    <main className="bg-[#fcfaf7] min-h-screen pt-48 pb-32 px-6 md:px-20 font-serif selection:bg-black selection:text-white">
      {/* Navigation */}
      <Link href={`/${locale}`} className="fixed top-12 left-12 z-50 text-stone-400 hover:text-black transition-colors uppercase text-[10px] tracking-[1em] font-black">
        ← MENU
      </Link>

      <header className="max-w-4xl mx-auto mb-32">
        <h1 className="text-6xl md:text-[8vw] font-black uppercase tracking-tighter leading-none mb-8">
          Archive <br/> <span className="text-stone-400 font-light italic">Resources</span>
        </h1>
        <p className="text-xl md:text-2xl text-stone-600 italic leading-relaxed max-w-2xl">
          Materials provided for researchers, families, and those seeking to understand the complexities of the justice system.
        </p>
      </header>

      <section className="max-w-5xl mx-auto space-y-24">
        {/* We group resources by category */}
        {['legal', 'support', 'education', 'advocacy'].map((cat) => (
          <div key={cat} className="space-y-12">
            <h2 className="text-stone-400 font-mono text-[10px] uppercase tracking-[0.5em] font-black border-b border-stone-200 pb-4">
              {cat} // Archive
            </h2>
            
            <div className="grid grid-cols-1 gap-12">
              {resources.filter((r: any) => r.category === cat).map((item: any) => (
                <div key={item._id} className="group">
                  <a href={item.link || '#'} target="_blank" className="block space-y-4">
                    <h3 className="text-3xl font-bold hover:text-stone-500 transition-colors uppercase tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-lg text-stone-600 leading-relaxed max-w-2xl">
                      {item.description?.[locale]}
                    </p>
                    <span className="inline-block text-[10px] uppercase tracking-widest font-sans font-bold border-b border-black pb-1">
                      Access Resource →
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
