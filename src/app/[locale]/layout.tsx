// src/app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Footer from "@/components/layout/Footer";
import LocaleLangSetter from "@/components/LocaleLangSetter";
import ScrollUpToHome from "@/components/ScrollUpToHome";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return {
    title: locale === 'fr'
      ? 'Voices On Death Row - Plateforme Franco-Américaine'
      : 'Voices On Death Row - Franco-American Storytelling Platform',
    description: locale === 'fr'
      ? 'Une plateforme de plaidoyer donnant visibilité et dignité aux personnes condamnées à mort.'
      : 'An advocacy platform giving visibility and dignity to people sentenced to death.',
    icons: {
      icon: '/images/logo_transparent.ico',
    },
  };
}

// ❗ This layout intentionally does NOT render <html>/<body>.
// The root layout (src/app/layout.tsx) owns those tags with
// suppressHydrationWarning. Nested <html>/<body> tags here were the
// root cause of the SSR/client hydration mismatch on <body> classList.
export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <LocaleLangSetter locale={locale} />
      <main className="grow">
        {children}
        <ScrollUpToHome />
      </main>
      <Footer />
    </NextIntlClientProvider>
  );
}