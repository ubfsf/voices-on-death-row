import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased bg-[#fcfaf7]">
        <NextIntlClientProvider messages={messages}>
          <Header />
          {/* This 'flex-grow' pushes the footer to the very bottom */}
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
