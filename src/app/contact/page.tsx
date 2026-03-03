"use client";
import { useTranslations } from 'next-intl';
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-24">
      <h1 className="hero-title">Contact & Participation</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-12">
        <article className="prose-archive">
          <p>
            We welcome correspondence from researchers, journalists, and families. 
            If you are interested in contributing to the archive or participating in the podcast, please reach out.
          </p>
          <div className="mt-8 space-y-2 not-italic">
            <p className="font-bold text-stone-900">Halima Kilgore</p>
            <p className="text-stone-500">halima@ubfsf.org</p>
          </div>
        </article>

        <div className="bg-stone-100 p-8 rounded-sm border border-stone-200">
          <h3 className="text-[10px] uppercase tracking-widest font-bold mb-4">Mailing Address</h3>
          <p className="text-sm text-stone-600 leading-relaxed font-serif italic">
            United Black Family Scholarship Foundation<br />
            P.O. BOX 862<br />
            Bristow, OK 74010
          </p>
        </div>
      </div>
    </div>
  );
}
