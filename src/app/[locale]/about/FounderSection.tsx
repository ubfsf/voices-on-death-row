'use client';

import Image from 'next/image';
import { Mic, BookOpen } from 'lucide-react';

export interface FounderSectionProps {
  founderName: string;
  founderTitle: string;
  portraitImage: string;
  biography: string;
  quote: string;
  values: {
    label: string;
    description: string;
  }[];
}

function CameraIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 48 48" fill="none">
      <rect x="6" y="14" width="36" height="26" rx="5" stroke="currentColor" strokeWidth="2.5" />
      <path d="M16 14L18 9H30L32 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="12" y1="11" x2="16" y2="11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="27" r="7" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="24" cy="27" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="36" cy="20" r="1.5" fill="currentColor" />
    </svg>
  );
}

function GlobeLeafIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 52 52" fill="none">
      <circle cx="22" cy="24" r="16" stroke="currentColor" strokeWidth="2.2" />
      <path d="M12 14C14 12 17 13 18 16C19 18 16 20 18 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10 26C13 25 15 28 14 31C13 33 16 36 18 37" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M28 32C28 32 32 23 42 24C42 24 43 33 34 35C30 36 28 32 28 32Z" stroke="currentColor" strokeWidth="2" />
      <path d="M38 24C38 24 41 16 49 19C49 19 48 27 41 27" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function InkDivider({ className = 'h-3 w-20 mx-auto' }: { className?: string }) {
  return (
    <span className={className} aria-hidden>
      <svg viewBox="0 0 200 12" className="w-full h-full block" preserveAspectRatio="none">
        <path d="M8 6 H192" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.85" />
      </svg>
    </span>
  );
}

export default function FounderSection({
  founderName,
  founderTitle,
  portraitImage,
  biography,
  quote,
  values,
}: FounderSectionProps) {
  const paragraphs = biography ? biography.split('\n\n').map(p => p.trim()).filter(Boolean) : [];
  const titleParts = founderTitle.split(/(Death\s+Row)/i);

  return (
    <section className="relative w-full bg-[#F9F8F3] px-4 py-12 md:px-12 md:py-16 text-[#111111]">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12 items-start">
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[360px]">
              <div 
                className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 h-6 w-28 bg-[#E6E2D8]/80 rotate-[3deg] pointer-events-none"
                style={{
                  maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                }}
              />
              <div className="hidden md:block absolute -left-32 top-1/2 -translate-y-1/2 -rotate-90 origin-center z-10 font-script text-2xl text-[#111111] whitespace-nowrap select-none pointer-events-none">
                Voices on Death Row ♡
              </div>
              <div className="relative bg-white p-4 pb-16 shadow-xl border border-black/5">
                <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={portraitImage}
                    alt={founderName}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover object-top"
                    priority
                  />
                </div>
                <div className="absolute bottom-4 left-0 right-0 text-center font-script text-3xl text-[#111111] rotate-[-1deg] select-none">
                  {founderName} ♡
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="mb-2">
              <span className="font-sans text-[11px] font-semibold tracking-[0.2em] text-[#444444] uppercase">
                About The Founder
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-[#111111] mb-2">
              {founderName}
            </h1>
                        <div className="mb-6">
              <div className="font-script text-3xl md:text-4xl text-[#111111] leading-snug">
                {titleParts.map((part, i) => {
                  if (/Death\s+Row/i.test(part)) {
                    return (
                      <span key={i} className="relative inline-block align-baseline">
                        {part}
                        <span className="block mt-1 -mb-1">
                          <InkDivider className="h-3 w-full text-[#111111]" />
                        </span>
                      </span>
                    );
                  }
                  return <span key={i}>{part}</span>;
                })}
              </div>
            </div>
            <div className="space-y-4 font-sans text-sm leading-relaxed text-[#333333] mb-6">
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
            {quote && (
              <blockquote className="border-l-2 border-[#111111] pl-4 py-1 my-2">
                <p className="font-serif italic text-base md:text-lg font-semibold text-[#111111] leading-snug">
                  {quote}
                </p>
              </blockquote>
            )}
          </div>
        </div>
        {values && values.length > 0 && (
          <div className="mt-16 relative">
            <img src="/images/stroke_light_background.png" alt="" className="absolute inset-x-0 top-1/2 -translate-y-1/2 -z-10 w-[110%] max-w-none mx-auto h-auto pointer-events-none select-none" aria-hidden="true" />
            <div className="hidden lg:block absolute inset-0 pointer-events-none">
              <span className="absolute top-[22%] bottom-[22%] left-[24.5%] w-[1px] text-[#111111]/40" aria-hidden="true"><svg viewBox="0 0 2 100" className="w-full h-full"><line x1="1" y1="0" x2="1" y2="100" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/></svg></span>
              <span className="absolute top-[22%] bottom-[22%] left-[49.5%] w-[1px] text-[#111111]/40" aria-hidden="true"><svg viewBox="0 0 2 100" className="w-full h-full"><line x1="1" y1="0" x2="1" y2="100" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/></svg></span>
              <span className="absolute top-[22%] bottom-[22%] left-[74.5%] w-[1px] text-[#111111]/40" aria-hidden="true"><svg viewBox="0 0 2 100" className="w-full h-full"><line x1="1" y1="0" x2="1" y2="100" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/></svg></span>
            </div>
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-8 md:py-12">
              <div className="flex flex-col items-center text-center px-4">
                <div className="text-[#111111] mb-3"><Mic size={48} strokeWidth={1.8} /></div>
                <h3 className="font-sans text-xs font-bold uppercase tracking-[0.12em] text-[#111111] mb-2">
                  {values[0]?.label || 'I LISTEN'}
                </h3>
                <p className="font-sans text-xs text-[#444444] leading-snug">
                  {values[0]?.description || 'Because every voice matters.'}
                </p>
              </div>
              <div className="flex flex-col items-center text-center px-4">
                <div className="text-[#111111] mb-3"><CameraIcon /></div>
                <h3 className="font-sans text-xs font-bold uppercase tracking-[0.12em] text-[#111111] mb-2">
                  {values[1]?.label || 'I DOCUMENT'}
                </h3>
                <p className="font-sans text-xs text-[#444444] leading-snug">
                  {values[1]?.description || 'With honesty and respect.'}
                </p>
              </div>
              <div className="flex flex-col items-center text-center px-4">
                <div className="text-[#111111] mb-3"><BookOpen size={48} strokeWidth={1.8} /></div>
                <h3 className="font-sans text-xs font-bold uppercase tracking-[0.12em] text-[#111111] mb-2">
                  {values[2]?.label || 'I SHARE'}
                </h3>
                <p className="font-sans text-xs text-[#444444] leading-snug">
                  {values[2]?.description || 'To bring understanding and change.'}
                </p>
              </div>
              <div className="flex flex-col items-center text-center px-4">
                <div className="text-[#111111] mb-3"><GlobeLeafIcon /></div>
                <h3 className="font-sans text-xs font-bold uppercase tracking-[0.12em] text-[#111111] mb-2">
                  {values[3]?.label || 'I BELIEVE'}
                </h3>
                <p className="font-sans text-xs text-[#444444] leading-snug">
                  {values[3]?.description || 'In the power of human stories.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
