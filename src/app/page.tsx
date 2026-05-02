import { client } from '@/lib/sanity';
import InteractiveStoryteller from '@/components/InteractiveStoryteller';

// Keep the query here or in a separate lib/queries.ts
const voicesQuery = `*[_type == "archive"]{ 
  _id,
  title,
  "imageUrl": image.asset->url,
  "link": "/letters/" + title 
}`;

export default async function Page() {
  // Fetch data on the server for SEO and speed
  const sanitySections = await client.fetch(voicesQuery);

  return (
    <main className="bg-black min-h-screen">
      {/* Pass data directly to the experience manager */}
      <InteractiveStoryteller sanitySections={sanitySections} />
    </main>
  );
}
