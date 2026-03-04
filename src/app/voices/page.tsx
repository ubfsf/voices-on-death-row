"use client";

export default function AboutPage() {
  return (
    <main className="paper-texture min-h-screen pt-40 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        {/* Halima's Photo */}
        <div className="relative">
          <img src="/images/halima.jpg" className="w-full grayscale border border-stone-200 p-2 bg-white" alt="Halima Kilgore" />
          <div className="mt-6">
            <p className="font-bold text-stone-900">Halima Kilgore</p>
            <p className="text-xs uppercase tracking-widest text-stone-400">Founder of Voices On Death Row</p>
          </div>
        </div>

        {/* The Story */}
        <div>
          <h2 className="text-5xl font-artistic italic mb-8">The Story Behind the Project</h2>
          <article className="prose prose-stone font-serif italic opacity-80">
            <p>Voices On Death Row was born from correspondence and has grown into a broader initiative combining storytelling, education, and advocacy.</p>
          </article>
        </div>
      </div>
    </main>
  );
}
