import { getAboutPage } from '@/lib/sanityQueries';
import Image from 'next/image';
import { Mic, Camera, BookOpen, Globe } from 'lucide-react';
import AboutHero from './AboutHero';
import type { Metadata } from 'next';

export const revalidate = 60;

const FALLBACK_EN = {
  title: 'About the Founder',
  founderName: 'Halima Kilgore',
  founderTitle: 'Founder of Voices on Death Row',
  biography: `Halima Kilgore is the founder of Voices on Death Row. She is an ordinary French-Algerian woman driven by a deep curiosity about people, their life stories, and the experiences that shape them. She believes that every person deserves to be listened to with dignity, empathy, and respect.

Her compassion extends beyond a single cause. Whether advocating for human rights, animal welfare, environmental protection, or giving a voice to those affected by the criminal legal system, Halima is guided by the same belief every life has value, and every story deserves to be heard.

Through Voices on Death Row, she shares the experiences of people sentenced to death, incarcerated individuals, their families, and the families of victims through interviews, letters, podcasts, photography, artwork, and personal testimonies. Her goal is not to judge, but to listen, understand, and encourage meaningful conversations that recognize the humanity of everyone involved.`,
  quote: '“Giving voice to every side of the story, because humanity has no borders.”',
  values: [
    { label: 'I LISTEN', description: 'Because every voice matters.' },
    { label: 'I DOCUMENT', description: 'With honesty and respect.' },
    { label: 'I SHARE', description: 'To bring understanding and change.' },
    { label: 'I BELIEVE', description: 'In the power of human stories.' }
  ]
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const data = await getAboutPage(locale);
  const title = data?.title || FALLBACK_EN.title;
  return { title: `${title} | Voices On Death Row`, description: 'Learn more about Halima Kilgore and her vision for Voices on Death Row.' };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const data = await getAboutPage(locale);

  const heroImage = typeof data?.heroImage === 'string' ? data.heroImage : data?.heroImage?.url || '/images/about.jpg';
  const portraitImage = typeof data?.portraitImage === 'string' ? data.portraitImage : data?.portraitImage?.url || '/images/halimaKilgore.jpg';

  const pageTitle = data?.title || FALLBACK_EN.title;
  const founderName = data?.founderName || FALLBACK_EN.founderName;
  const founderTitle = data?.founderTitle || FALLBACK_EN.founderTitle;
  const biography = data?.biography || FALLBACK_EN.biography;
  const quote = data?.quote || FALLBACK_EN.quote;
  const values = Array.isArray(data?.values) && data.values.length ? data.values : FALLBACK_EN.values;

  const iconMap = [Mic, Camera, BookOpen, Globe];

  return (
    <div className="page-paper bg-paper-alt">
      <AboutHero src={heroImage} title={pageTitle} />
      <section className="py-20 px-6 md:px-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[420px_1fr] gap-20 items-start">
          <div className="relative">
            <div className="absolute -top-6 left-4 w-28 h-10 bg-[#DCC89D]/80 rotate-[-8deg] z-20 shadow-sm" />
            <div className="absolute -left-20 top-1/2 -translate-y-1/2 rotate-[-90deg] text-[#1E1E1E] font-[var(--font-script)] text-[28px] whitespace-nowrap hidden md:block">Voices on Death Row ♡</div>
            <div className="bg-white p-4 pb-20 shadow-2xl rotate-[-3deg]">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image src={portraitImage} alt={founderName} fill className="object-cover" sizes="(max-width: 768px) 100vw, 420px" />
              </div>
              <p className="mt-10 text-center font-[var(--font-script)] text-[40px] text-[#1E1E1E] rotate-[-4deg]">{founderName} ♡</p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase">About the Founder</p>
              <div className="w-32 h-px bg-black my-3" />
              <h2 className="text-5xl md:text-6xl font-serif leading-tight">{founderName}</h2>
              <p className="font-[var(--font-script)] text-[32px] italic mt-2">{founderTitle}</p>
              <div className="w-48 h-px bg-gradient-to-r from-black to-transparent mt-2" />
            </div>

            <div className="text-[17px] leading-[1.8] text-[#1E1E1E] space-y-6">
              {biography.split('\n\n').map((p, i) => (
                <p key={i}>{p.trim()}</p>
              ))}
            </div>

            <blockquote className="border-l-4 border-black pl-6 italic text-[22px] font-serif">
              {quote}
            </blockquote>

            <div className="mt-12 bg-[#f5f2ee] py-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
                {values.map((v: any, i: number) => {
                  const Icon = iconMap[i];
                  return (
                    <div key={i} className="text-center px-6 py-6">
                      <div className="flex justify-center mb-3">
                        <div className="rounded-full border border-black/10 p-3">
                          {Icon && <Icon size={36} strokeWidth={1.5} />}
                        </div>
                      </div>
                      <p className="font-semibold tracking-wide">{v.label || v?.label?.en || v?.label}</p>
                      <p className="text-sm mt-1 opacity-80">{v.description || v?.description?.en || v?.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}