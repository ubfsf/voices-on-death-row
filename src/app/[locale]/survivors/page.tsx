import { getFamilyVoices } from '@/lib/sanityQueries';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';

export const revalidate = 60;

export const metadata = {
  title: 'Victims & Survivors Against the Death Penalty | Voices On Death Row',
  description: 'Stories of survivors of violent crime and family members of murder victims who chose to speak out against the death penalty, sharing their journey toward healing, resilience, and hope.',
};

export default async function SurvivorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const stories = await getFamilyVoices(locale, 'survivors');

  return (
    <main className="bg-black min-h-screen text-white font-serif relative overflow-x-hidden selection:bg-white selection:text-black">
      {/* Back Navigation */}
      <Link
        href={`/${locale}`}
        className="fixed top-8 left-8 z-[100] w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-md hover:bg-white hover:text-black transition-all duration-500 font-sans"
      >
        <span className="text-lg">←</span>
      </Link>

      {/* Hero */}
      <section className="relative w-full h-svh flex items-end overflow-hidden">
        <Image
          src="/images/silhouettes_toward_light.jpg"
          alt="Two silhouettes walking toward the light"
          fill
          className="object-cover object-[50%_30%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-8 md:px-20 pb-24">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-[1.05] tracking-tight max-w-3xl mb-8">
            Victims &amp; Survivors Against the Death Penalty
          </h1>
          <div className="w-24 h-[1px] bg-white/30 mb-8" />
          <p className="text-lg md:text-xl font-light text-stone-300 max-w-2xl mb-10 leading-relaxed">
            Stories of survivors of violent crime and family members of murder
            victims who chose to speak out against the death penalty, sharing
            their journey toward healing, resilience, and hope.
          </p>
          <Link
            href="#stories"
            className="inline-block border border-white/30 px-8 py-3 uppercase text-[10px] tracking-widest font-mono hover:bg-white hover:text-black transition-all duration-500"
          >
            Explore Their Stories →
          </Link>
        </div>
      </section>

      {/* Intro quote */}
      <section className="max-w-3xl mx-auto text-center py-24 px-6">
        <p className="text-xl md:text-2xl font-light leading-relaxed text-stone-300">
          They have lived through what no one should endure — and still they
          believe justice can exist without another execution. Their voices
          remind us that healing and hope can grow where vengeance ends.
        </p>
      </section>

      {/* Stories grid */}
      <section id="stories" className="max-w-7xl mx-auto px-6 md:px-20 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {stories && stories.map((story: any) => (
            <Link
              key={story.slug?.current || story._id}
              href={`/${locale}/families_voices/${story.slug?.current}`}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-stone-900">
                {story.image && (
                  <img
                    src={urlFor(story.image).url()}
                    alt={story.name}
                    className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700"
                  />
                )}
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight group-hover:text-stone-400 transition-colors">
                {story.name}
              </h2>
              {story.introduction && (
                <p className="text-stone-500 font-light text-sm mt-2 line-clamp-2">
                  {story.introduction}
                </p>
              )}
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {(!stories || stories.length === 0) && (
          <div className="text-center py-32 max-w-2xl mx-auto">
            <p className="text-stone-400 text-xl font-light leading-relaxed mb-4">
              The first stories are being gathered with care.
            </p>
            <p className="text-stone-600 text-base font-light">
              Survivors and family members are sharing their journeys with us.
              Their voices will appear here soon.
            </p>
          </div>
        )}
      </section>

      {/* Share your story */}
      <section className="bg-stone-950 px-6 md:px-20 py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="max-w-2xl">
            <span className="text-5xl text-stone-800 block mb-4">&ldquo;</span>
            <p className="text-xl md:text-2xl italic font-light text-stone-300 leading-snug">
              Justice can exist without another execution.
            </p>
            <p className="mt-6 uppercase text-[10px] tracking-[0.2em] font-mono text-stone-600">
              — A Survivor
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
