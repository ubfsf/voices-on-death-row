// src/app/[locale]/layout.tsx
import "@/app/globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/Footer";

// ✅ NO Header import
// ✅ NO duplicate VisualMenu imports

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

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased bg-black" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <main className="grow">
            {children}
          </main>
          <Footer />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}