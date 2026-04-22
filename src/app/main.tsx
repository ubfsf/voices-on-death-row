import { client } from '@/lib/sanity';
import InteractiveStoryteller from '@/components/InteractiveStoryteller';

export default async function MainPage() {
  // 1. Fetch the sections Halima uploaded to Sanity
  const data = await client.fetch(
    `*[_type == "homePage"][0]{
      sections[]{
        title,
        "imageUrl": image.asset->url,
        "link": link
      }
    }`,
    {},
    { next: { revalidate: 0 } }
  );

  // 2. Pass the Sanity data into your Storyteller
  // This component will handle showing the Intro first, then the Menu
  return (
    <main className="bg-black min-h-screen">
      <InteractiveStoryteller sanitySections={data?.sections || []} />
    </main>
  );
}
