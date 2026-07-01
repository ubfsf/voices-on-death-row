import FamiliesGallery from "@/components/FamiliesGallery";

export default async function FamiliesVoicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <main className="bg-[#fcfaf7] min-h-screen pt-48 pb-32 px-6 md:px-20 selection:bg-black selection:text-white">
      <header className="max-w-4xl mx-auto text-center mb-32">
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

      {/* This component will fetch and display the testimonies */}
      <FamiliesGallery locale={locale} />
    </main>
  );
}
