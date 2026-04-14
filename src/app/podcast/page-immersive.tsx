"use client";
import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const metadata: Metadata = {
  title: 'Podcast - Audio Testimonies | Voices On Death Row',
  description: 'Listen to firsthand accounts and audio testimonies from individuals sentenced to death. These powerful voices preserve stories for researchers, families, and the public.',
  openGraph: {
    title: 'Podcast - Audio Testimonies | Voices On Death Row',
    description: 'Listen to firsthand accounts and audio testimonies from individuals sentenced to death. These powerful voices preserve stories for researchers, families, and the public.',
    type: 'website',
    url: 'https://www.voicesondeathrow.com/podcast',
  },
};

export default function PodcastPage() {
  const t = useTranslations('PodcastPage');
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Parallax effect for background
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  // Fade in effect for title
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  
  // Scale effect for player
  const playerScale = useTransform(scrollYProgress, [0.1, 0.3], [0.8, 1]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-paper">
      {/* Hero Section with Parallax */}
      <motion.div 
        style={{ y }}
        className="relative h-96 bg-gradient-to-b from-stone-900 to-stone-800 overflow-hidden"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-artistic italic text-white text-center"
          >
            {t('title')}
          </motion.h1>
        </div>
      </motion.div>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-8 py-24">
        
        {/* Description Section */}
        <motion.article 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="prose prose-stone lg:prose-xl font-serif italic opacity-80 leading-relaxed mb-16"
        >
          <p>{t('description')}</p>
        </motion.article>

        {/* Audio Player Section */}
        <motion.div
          style={{ scale: playerScale }}
          className="sticky top-32 bg-white border-2 border-stone-800 p-8 mb-16 shadow-lg"
        >
          <div className="space-y-4">
            <h3 className="text-2xl font-artistic italic text-stone-900">Listen</h3>
            <p className="text-sm text-stone-600">Featured Episode</p>
            <div className="bg-stone-100 rounded-lg p-4 h-12 flex items-center justify-center text-stone-400">
              [Audio Player Placeholder]
            </div>
            <p className="text-xs text-stone-500 italic">
              Audio will load from Sanity CMS when episodes are added
            </p>
          </div>
        </motion.div>

        {/* Testimonial Cards - Staggered Animation */}
        <div className="space-y-12">
          {[
            {
              name: "Episode 1",
              location: "California",
              excerpt: "Stories from inside the walls. Coming soon with Halima's voices.",
              time: "Coming Soon"
            },
            {
              name: "Episode 2", 
              location: "Pennsylvania",
              excerpt: "Testimonies of resilience and humanity. More voices to follow.",
              time: "Coming Soon"
            },
            {
              name: "Episode 3",
              location: "Texas",
              excerpt: "Letters read aloud. Correspondence that changed perspectives.",
              time: "Coming Soon"
            }
          ].map((episode, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="border-l-4 border-stone-800 pl-8 py-4 hover:bg-stone-50 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-artistic italic text-stone-900">{episode.name}</h4>
                  <p className="text-sm uppercase tracking-widest text-stone-600">{episode.location}</p>
                </div>
                <span className="text-xs text-stone-400">{episode.time}</span>
              </div>
              <p className="text-stone-700 leading-relaxed italic">"{episode.excerpt}"</p>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24 text-center border-t-2 border-stone-200 pt-12"
        >
          <p className="text-stone-600 italic max-w-2xl mx-auto">
            The podcast section will be populated with real audio testimonies and interviews as Halima continues her documentation work. 
            Each episode will feature voices directly from those on death row and their stories.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
