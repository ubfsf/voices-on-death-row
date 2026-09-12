// src/app/[locale]/page.tsx
//
// Homepage — "curtain unveil" experience with server-rendered VisualMenu initial data.
import { getVisualMenu } from '@/lib/sanityQueries';
import HomeCurtain from '@/components/HomeCurtain';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  let initialMenuData = null;
  try {
    const data = await getVisualMenu(locale);
    if (data?.menuItems?.length) {
      initialMenuData = { menuItems: data.menuItems };
    }
  } catch {
    // Fallback to defaults in client
  }

  return <HomeCurtain initialMenuData={initialMenuData} />;
}