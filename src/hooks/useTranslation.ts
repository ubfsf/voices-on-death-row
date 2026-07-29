// src/hooks/useTranslation.ts
"use client";
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';

const clientCache = new Map<string, string>();

export function useTranslation<T extends Record<string, string>>(sourceTexts: T) {
  const params = useParams();
  const locale = params.locale || 'en';
  const hasTranslated = useRef(false);
  const isMounted = useRef(true);
  
  const [translated, setTranslated] = useState<T>(sourceTexts);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    isMounted.current = true;
    
    if (locale === 'en' || hasTranslated.current) {
      if (locale === 'en') setTranslated(sourceTexts);
      return;
    }

    const translateAll = async () => {
      setIsTranslating(true);
      
      try {
        const translatedObj = { ...sourceTexts } as T;
        const entries = Object.entries(sourceTexts);
        
        // Check what's already cached
        const toTranslate: [string, string][] = [];
        
        for (const [key, value] of entries) {
          const cacheKey = `${value}|${locale}`;
          const cached = clientCache.get(cacheKey);
          
          if (cached) {
            (translatedObj as any)[key] = cached;
          } else {
            toTranslate.push([key, value]);
          }
        }

        // Batch translate all at once
        if (toTranslate.length > 0) {
          // Translate one by one but with delay between them
          for (let i = 0; i < toTranslate.length; i++) {
            const [key, value] = toTranslate[i];
            
            // Add delay between requests to avoid rate limiting
            if (i > 0) {
              await new Promise(resolve => setTimeout(resolve, 500));
            }
            
            try {
              const res = await fetch('/api/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: value, targetLanguage: locale })
              });
              
              const data = await res.json();
              
              if (data.translatedText) {
                (translatedObj as any)[key] = data.translatedText;
                clientCache.set(`${value}|${locale}`, data.translatedText);
              } else {
                (translatedObj as any)[key] = value;
              }
            } catch (err) {
              console.error(`Error translating ${key}:`, err);
              (translatedObj as any)[key] = value;
            }
          }
        }

        if (isMounted.current) {
          setTranslated(translatedObj);
          hasTranslated.current = true;
        }
      } catch (error) {
        console.error('Translation error:', error);
        if (isMounted.current) {
          setTranslated(sourceTexts);
        }
      } finally {
        if (isMounted.current) {
          setIsTranslating(false);
        }
      }
    };

    translateAll();

    return () => {
      isMounted.current = false;
    };
  }, [locale]);

  return { t: translated, isTranslating, locale };
}