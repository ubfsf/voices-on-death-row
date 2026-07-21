// src/app/layout.tsx
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat"; // 1. Import your new component

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();

  return (
    <html lang="en">
      <body 
        className="min-h-screen flex flex-col antialiased bg-paper" 
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <main className="grow">
            {children}
          </main>
          
          <Footer />
          
          {/* 2. Add the component here. 
              Because it's fixed-positioned in your AIChat.tsx, 
              it will float above everything else. */}
          {/* <AIChat />  */}
          
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
