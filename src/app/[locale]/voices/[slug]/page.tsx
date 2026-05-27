import VoiceDetailClient from '@/components/VoiceDetailClient';
import { client } from '@/lib/sanity';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export default async function VoicePage({ params }: Props) {
  const { slug, locale } = await params;

  const query = `*[_type == "voice" && (slug.current == $slug || _id == $slug)][0]{
    name,
    inmateNumber,
    facility,
    cityState,
    "about": about[$locale],
    "beliefQuote": beliefQuote[$locale],
    "skillsInterests": skillsInterests[$locale],
    "professionalBackground": professionalBackground[$locale],
    "personalLife": personalLife[$locale],
    "entertainmentSports": entertainmentSports[$locale],
    "legalSituation": legalSituation[$locale],
    "voiceExpression": voiceExpression[$locale],
    "supportAdvocacy": supportAdvocacy[$locale],
    "contactInfo": contactInfo[$locale],
    "imageUrl": photo.asset->url
  }`;

  const voice = await client.fetch(query, { slug, locale });

  if (!voice) notFound();

  return <VoiceDetailClient voice={voice} locale={locale} slug={slug} />;
}
