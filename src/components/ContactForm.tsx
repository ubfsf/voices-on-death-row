"use client";
import React, { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('ContactForm');
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameRef.current || !emailRef.current || !messageRef.current) return;
    setStatus('sending');

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameRef.current.value,
          email: emailRef.current.value,
          message: messageRef.current.value,
        }),
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
      setStatus('error');
    }
  };

  return (
    <form onSubmit={sendEmail} className="w-full space-y-6">
      <div>
        <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-2 block">{t('name_label')}</label>
        <input ref={nameRef} type="text" required className="w-full bg-white border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-400 transition-colors" placeholder={t('name_placeholder')} />
      </div>
      <div>
        <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-2 block">{t('email_label')}</label>
        <input ref={emailRef} type="email" required className="w-full bg-white border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-400 transition-colors" placeholder={t('email_placeholder')} />
      </div>
      <div>
        <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-2 block">{t('message_label')}</label>
        <textarea ref={messageRef} required className="w-full bg-white border border-stone-200 p-3 text-sm h-32 resize-none focus:outline-none focus:border-stone-400 transition-colors" placeholder={t('message_placeholder')} />
      </div>
      <button type="submit" disabled={status === 'sending'} className="w-full bg-stone-900 text-stone-50 py-4 text-[10px] uppercase tracking-[0.2em] hover:bg-stone-800 transition-colors disabled:opacity-50">
        {status === 'sending' ? t('button_sending') : t('button_idle')}
      </button>
      {status === 'success' && <p className="text-green-600 text-xs italic mt-2">{t('success')}</p>}
      {status === 'error' && <p className="text-red-600 text-xs italic mt-2">{t('error')}</p>}
    </form>
  );
}
