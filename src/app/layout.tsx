import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata = {
  title: 'Voices On Death Row - Franco-American Storytelling Platform',
  description: 'An advocacy platform giving visibility and dignity to people sentenced to death through letters, art, and testimonies.',
  icons: {
    icon: '/images/logo_transparent.ico',
  },
  verification: {
    google: 'googleca11324af841a36e',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();

  return (
    <html lang="en">
      {/* Added suppressHydrationWarning to body to fix the Grammarly/browser extension errors you were seeing */}
      <body 
        className="min-h-screen flex flex-col antialiased bg-paper" 
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          {/* <Header /> */}
          <main className="grow">
            {/* children is correctly placed here - it renders your page content */}
            {children}
          </main>
          <Footer />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
