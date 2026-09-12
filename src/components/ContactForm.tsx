// src/components/ContactForm.tsx
//
// Presentational contact form.
//  - Idempotent submit: a ref lock ignores duplicate submissions (double
//    click / Enter key) from the very first frame — the disabled button
//    alone can't stop Enter-key resubmits before re-render.
//  - In-flight request is aborted on unmount (no setState after unmount).
//  - Labels are programmatically associated with inputs; status messages
//    are announced via aria-live.
"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('ContactForm');
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // Idempotency lock: blocks duplicate submissions across renders/ticks.
  const isSubmittingRef = useRef(false);
  // AbortController for the in-flight request, aborted on unmount.
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    // Lock immediately on the first submit; identical follow-ups are no-ops.
    if (isSubmittingRef.current) return;
    if (!nameRef.current || !emailRef.current || !messageRef.current) return;

    isSubmittingRef.current = true;
    setStatus('sending');

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameRef.current.value,
          email: emailRef.current.value,
          message: messageRef.current.value,
        }),
        signal: controller.signal,
      });

      if (response.ok) {
        setStatus('success');
        nameRef.current.value = "";
        emailRef.current.value = "";
        messageRef.current.value = "";
      } else {
        setStatus('error');
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setStatus('error');
      }
    } finally {
      isSubmittingRef.current = false;
      if (abortRef.current === controller) {
        abortRef.current = null;
      }
    }
  };

  return (
    <form onSubmit={sendEmail} className="w-full space-y-6">
      <div>
        <label htmlFor="contact-name" className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-2 block">{t('name_label')}</label>
        <input ref={nameRef} id="contact-name" name="name" type="text" required autoComplete="name" className="w-full bg-white border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-400 transition-colors" placeholder={t('name_placeholder')} />
      </div>
      <div>
        <label htmlFor="contact-email" className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-2 block">{t('email_label')}</label>
        <input ref={emailRef} id="contact-email" name="email" type="email" required autoComplete="email" className="w-full bg-white border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-400 transition-colors" placeholder={t('email_placeholder')} />
      </div>
      <div>
        <label htmlFor="contact-message" className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-2 block">{t('message_label')}</label>
        <textarea ref={messageRef} id="contact-message" name="message" required className="w-full bg-white border border-stone-200 p-3 text-sm h-32 resize-none focus:outline-none focus:border-stone-400 transition-colors" placeholder={t('message_placeholder')} />
      </div>
      <button type="submit" disabled={status === 'sending'} className="w-full bg-stone-900 text-stone-50 py-4 text-[10px] uppercase tracking-[0.2em] hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 transition-colors disabled:opacity-50">
        {status === 'sending' ? t('button_sending') : t('button_idle')}
      </button>
      {/* aria-live region so screen readers announce success/error */}
      <p role="status" aria-live="polite">
        {status === 'success' && <span className="text-green-600 text-xs italic mt-2 block">{t('success')}</span>}
        {status === 'error' && <span className="text-red-600 text-xs italic mt-2 block">{t('error')}</span>}
      </p>
    </form>
  );
}