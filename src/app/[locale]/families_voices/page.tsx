import Link from "next/link";
import Image from "next/image";

export default async function FamiliesVoicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <main className="bg-black min-h-screen text-white font-serif relative overflow-x-hidden selection:bg-white selection:text-black">
      
      {/* 1. BACK NAVIGATION */}
      <Link 
        href={`/${locale}`} 
        className="fixed top-8 left-8 z-[100] w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-md hover:bg-white hover:text-black transition-all duration-500 font-sans"
      >
        <span className="text-lg">←</span>
      </Link>

      {/* 2. HERO SECTION */}
      <section className="relative w-full h-screen flex flex-col justify-center px-8 md:px-20">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12">
          {/* Left Text Column */}
          <div className="w-full md:w-1/2">
            <h1 className="text-6xl md:text-[8vw] font-serif uppercase tracking-tighter leading-[0.9] mb-8">
              Families&apos; <br />
              <span className="italic font-normal">Voices</span>
            </h1>
            <div className="w-24 h-[1px] bg-white/30 mb-8" />
            <p className="text-lg md:text-xl font-light font-serif text-stone-400 max-w-sm mb-8">
              The profound impacts on loved ones and communities.
            </p>
            <Link 
              href="#gallery"
              className="inline-block border border-white/30 px-8 py-3 uppercase text-[10px] tracking-widest font-mono hover:bg-white hover:text-black transition-all duration-500"
            >
              Explore Their Stories →
            </Link>
          </div>

          {/* Right Image Column */}
          <div className="w-full md:w-1/2 relative h-[50vh] md:h-[60vh]">
            <Image
              src="/images/middleChair.png"
              alt="Empty Chair at Table"
              fill
              className="object-cover grayscale opacity-90"
              priority
            />
          </div>
        </div>
      </section>

      {/* 3. CENTERED INTRO QUOTE */}
      <section className="max-w-3xl mx-auto text-center py-24 px-6">
        <p className="text-xl md:text-2xl font-serif font-light leading-relaxed text-stone-300">
          Behind every death penalty case are families forever changed. <br />
          Here, loved ones share their stories of loss, love, separation, resilience, <br />
          and the search for healing and hope.
        </p>
      </section>

      {/* 4. CATEGORY GRID */}
      <section id="gallery" className="max-w-7xl mx-auto px-6 md:px-20 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Category 1: Families of Murder Victims */}
          <Link 
            href={`/${locale}/families_voices?category=victims`}
            className="group block cursor-pointer"
          >
            <div className="relative aspect-[4/3] overflow-hidden mb-8">
              <Image
                src="/images/familesOfMur.jpg"
                alt="Families of Murder Victims"
                fill
                className="object-cover grayscale group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <h3 className="text-2xl font-serif mb-4 text-white group-hover:text-stone-300 transition-colors">
              Families of Murder Victims
            </h3>
            <p className="text-stone-400 font-serif font-light text-base mb-6 max-w-sm">
              Stories of profound loss, remembrance, and the search for justice, healing, and peace.
            </p>
            <span className="uppercase text-[10px] tracking-widest font-mono flex items-center gap-2 group-hover:gap-4 transition-all text-white">
              Explore →
            </span>
          </Link>

          {/* Category 2: Families of the Condemned */}
          <Link 
            href={`/${locale}/families_voices?category=condemned`}
            className="group block cursor-pointer"
          >
            <div className="relative aspect-[4/3] overflow-hidden mb-8">
              <Image
                src="/images/familiesTheCond.jpg"
                alt="Families of the Condemned"
                fill
                className="object-cover grayscale group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <h3 className="text-2xl font-serif mb-4 text-white group-hover:text-stone-300 transition-colors">
              Families of the Condemned
            </h3>
            <p className="text-stone-400 font-serif font-light text-base mb-6 max-w-sm">
              Stories of love, separation, uncertainty, and families living in the shadow of a death sentence.
            </p>
            <span className="uppercase text-[10px] tracking-widest font-mono flex items-center gap-2 group-hover:gap-4 transition-all text-white">
              Explore →
            </span>
          </Link>

        </div>
      </section>

      {/* 5. FOOTER QUOTE & SHARE STORY */}
      <section className="bg-stone-950 px-6 md:px-20 py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="max-w-2xl">
            <span className="text-5xl text-stone-800 block mb-4 font-serif">“</span>
            <p className="text-xl md:text-2xl italic font-serif font-light text-stone-300 leading-snug">
              Our stories are different, but our pain is real. <br />
              Sharing is how we heal. Listening is how we change.
            </p>
            <p className="mt-6 uppercase text-[10px] tracking-[0.2em] font-mono text-stone-600">
              — A Family Member
            </p>
          </div>
          <Link 
            href={`/${locale}/contact`}
            className="border border-white/20 px-8 py-3 uppercase text-[10px] tracking-widest font-mono hover:bg-white hover:text-black transition-all duration-500"
          >
            Share Your Story →
          </Link>
        </div>
      </section>

    </main>
  );
}