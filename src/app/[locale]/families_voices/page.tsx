import FamiliesGallery from "@/components/FamiliesGallery";
import Link from "next/link";

export default async function FamiliesVoicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <main className="bg-[#fcfaf7] min-h-screen pt-48 pb-32 px-6 md:px-20 selection:bg-black selection:text-white relative overflow-x-hidden">
      
      {/* Cinematic Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* 1. NAVIGATION */}
      <Link 
        href={`/${locale}`} 
        className="fixed top-8 left-8 md:top-12 md:left-12 z-[100] flex items-center gap-3 group mix-blend-difference"
      >
        <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center bg-white/20 backdrop-blur-md group-hover:bg-black group-hover:text-white transition-all duration-500">
          <span className="text-lg">←</span>
        </div>
      </Link>

      <header className="max-w-4xl mx-auto text-center mb-32 relative z-10">
        <h1 className="text-6xl md:text-[8vw] font-serif uppercase tracking-tighter mb-12">
          Families' <br/> <span className="text-stone-400 font-light italic">Voices</span>
        </h1>
        
        {/* MANDATORY INTRO QUOTE FROM EMAIL */}
        <div className="border-y border-stone-200 py-12">
          <p className="text-2xl md:text-3xl font-serif italic text-stone-800 leading-relaxed max-w-3xl mx-auto">
            "Behind every crime, there are many lives forever changed. This section gives space to the voices of victims' families, prisoners' families, and others affected by the criminal justice system. Their experiences deserve to be heard with dignity and respect."
          </p>
        </div>
      </header>

      {/* 2. CATEGORY GRID */}
      <div className="relative z-10">
        <FamiliesGallery locale={locale} />
      </div>
    </main>
  );
}
