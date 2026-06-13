import VoiceDetailClient from '@/components/VoiceDetailClient';
import { client } from '@/lib/sanity';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

/**
 * Helper function to handle the Auto-Translation logic.
 * If the target language is empty, it fetches the alternate language and 
 * calls our internal translation API.
 */
async function getTranslatedContent(field: any, targetLocale: string) {
  if (!field) return "";
  
  const currentText = field[targetLocale];
  const otherLocale = targetLocale === 'en' ? 'fr' : 'en';
  const sourceText = field[otherLocale];

  // 1. If the current locale already has content, return it.
  if (currentText && currentText.trim() !== "") {
    return currentText;
  }

  // 2. If current is empty but the other locale has content, auto-translate.
  if (sourceText && sourceText.trim() !== "") {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${baseUrl}/api/translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: sourceText, 
          targetLanguage: targetLocale 
        }),
        cache: 'force-cache', // Cache the translation for performance
      });

      const data = await res.json();
      return data.translatedText || sourceText;
    } catch (error) {
      console.error("Auto-translate failed, falling back to raw source:", error);
      return sourceText;
    }
  }

  return "";
}

export default async function VoicePage({ params }: Props) {
  const { slug, locale } = await params;

  // 1. Fetch the FULL localized objects from Sanity
  const query = `*[_type == "voice" && (slug.current == $slug || _id == $slug)][0]{
    name,
    inmateNumber,
    facility,
    cityState,
    about,
    beliefQuote,
    skillsInterests,
    professionalBackground,
    personalLife,
    entertainmentSports,
    legalSituation,
    voiceExpression,
    supportAdvocacy,
    contactInfo,
    photo,
    caseLink
  }`;

  const rawVoice = await client.fetch(query, { slug });

  if (!rawVoice) notFound();

  // 2. Process all narrative fields through the translation logic
  const voice = {
    ...rawVoice,
    about: await getTranslatedContent(rawVoice.about, locale),
    beliefQuote: await getTranslatedContent(rawVoice.beliefQuote, locale),
    skillsInterests: await getTranslatedContent(rawVoice.skillsInterests, locale),
    professionalBackground: await getTranslatedContent(rawVoice.professionalBackground, locale),
    personalLife: await getTranslatedContent(rawVoice.personalLife, locale),
    entertainmentSports: await getTranslatedContent(rawVoice.entertainmentSports, locale),
    legalSituation: await getTranslatedContent(rawVoice.legalSituation, locale),
    voiceExpression: await getTranslatedContent(rawVoice.voiceExpression, locale),
    supportAdvocacy: await getTranslatedContent(rawVoice.supportAdvocacy, locale),
    contactInfo: await getTranslatedContent(rawVoice.contactInfo, locale),
  };

  return <VoiceDetailClient voice={voice} locale={locale} slug={slug} />;
}
