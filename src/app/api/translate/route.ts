import { NextResponse } from 'next/server';
import translate from 'google-translate-api-next';

export async function POST(req: Request) {
  try {
    const { text, targetLanguage } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    // targetLanguage should be 'en' or 'fr'
    const res = await translate(text, { to: targetLanguage });
    
    return NextResponse.json({ translatedText: res.text });
  } catch (error) {
    console.error('Translation Error:', error);
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}
