// src/app/layout.tsx
import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  icons: {
    icon: "/images/logo_transparent.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="min-h-screen flex flex-col antialiased bg-paper text-ink"
        suppressHydrationWarning
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}