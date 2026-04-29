import { client } from '@/lib/sanity';
import InteractiveStoryteller from '@/components/InteractiveStoryteller';

export default async function MainPage() {
  // 1. Fetch the sections Halima uploaded to Sanity
  const mockSections = [
    { title: "Voices", imageUrl: "/images/hero-illustration.png", link: "/voices" },
    { title: "Letters", imageUrl: "/images/writing_another.jpg", link: "/letters" },
    { title: "Art From Inside", imageUrl: "/images/art_from_inside.jpg", link: "/art" },
    { title: "Podcast", imageUrl: "/images/hero-illustration.jpg", link: "/podcast" },
    { title: "About", imageUrl: "/images/person_back.jpg", link: "/about" },
    { title: "Contact", imageUrl: "/images/eyes.jpg", link: "/contact" },
  ];

  return (
    <main className="bg-black min-h-screen">
      {/* Replace data?.sections with mockSections to test */}
      <InteractiveStoryteller sanitySections={mockSections} />
    </main>
  );
}
