import { getAboutPage } from '@/lib/sanityQueries';
import AboutHero from './AboutHero';
import FounderSection from './FounderSection';
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

  return (
    <div className="page-paper bg-paper-alt relative">
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply" style={{backgroundImage:"url('/textures/noise.svg')"}} />
      <AboutHero src={heroImage} title={pageTitle} />
      <FounderSection
        founderName={founderName}
        founderTitle={founderTitle}
        portraitImage={portraitImage}
        biography={biography}
        quote={quote}
        values={values.map((v: any) => ({
          label: v.label || v?.label?.en || v?.label,
          description: v.description || v?.description?.en || v?.description,
        }))}
      />
    </div>
  );
}