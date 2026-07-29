import { NextResponse } from 'next/server';
import translate from 'google-translate-api-next';

// Server-side cache
const translationCache = new Map<string, { text: string; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

function getCacheKey(text: string, targetLanguage: string): string {
  return `${text}|${targetLanguage}`;
}

// Retry with exponential backoff
async function translateWithRetry(text: string, targetLanguage: string, retries = 3): Promise<string> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await translate(text, { to: targetLanguage });
      return res.text;
    } catch (error: any) {
      // If it's a 429 (Too Many Requests), wait and retry
      if (error.response?.status === 429 || error.status === 429) {
        const waitTime = Math.pow(2, i) * 1000; // 1s, 2s, 4s
        console.log(`Rate limited. Retrying in ${waitTime}ms... (Attempt ${i + 1}/${retries})`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
      // If it's a different error, throw immediately
      throw error;
    }
  }
  throw new Error(`Failed to translate after ${retries} attempts`);
}

export async function POST(req: Request) {
  try {
    const { text, targetLanguage } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    // Check cache first
    const cacheKey = getCacheKey(text, targetLanguage);
    const cached = translationCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return NextResponse.json({ 
        translatedText: cached.text,
        cached: true 
      });
    }

    // If language is English, return original text
    if (targetLanguage === 'en') {
      return NextResponse.json({ 
        translatedText: text,
        cached: false 
      });
    }

    // Translate with retry
    const translatedText = await translateWithRetry(text, targetLanguage);

    // Store in cache
    translationCache.set(cacheKey, {
      text: translatedText,
      timestamp: Date.now()
    });

    return NextResponse.json({ 
      translatedText,
      cached: false 
    });
  } catch (error: any) {
    console.error('Translation Error:', error.message || error);
    
    // Return a more user-friendly error
    return NextResponse.json(
      { 
        error: 'Translation failed',
        translatedText: null // Let client know translation failed
      }, 
      { status: error.response?.status || 500 }
    );
  }
}

// Clear cache endpoint
export async function DELETE() {
  translationCache.clear();
  return NextResponse.json({ message: 'Cache cleared' });
}