import { client } from '@/lib/sanity';

export default async function VoicesPage() {
  // This line tells the website to go get the "stuff" you just published
  const voices = await client.fetch(
    `*[_type == "voice"]{
      name,
      "slug": slug.current,
      "img": image.asset->url
    }`,
    {},
    { next: { revalidate: 0 } } // This forces the site to show new data immediately
  );

  return (
    <main className="min-h-screen bg-black pt-32">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 p-10">
        {voices.map((p: any) => (
          <div key={p.slug} className="bg-white p-4 pb-12 shadow-2xl">
            <img src={p.img} className="w-full aspect-square object-cover" />
            <p className="mt-4 text-center font-serif text-black italic">{p.name}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
