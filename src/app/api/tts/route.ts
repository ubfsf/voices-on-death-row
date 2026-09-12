import { NextResponse } from 'next/server';
import { getClientIp, rateLimit, tooManyRequests } from '@/lib/utils';

export async function POST(request: Request) {
  const limit = rateLimit(`tts:${getClientIp(request)}`, { windowMs: 60_000, max: 6 });
  if (!limit.allowed) return tooManyRequests(limit);

  try {
    const { text, voice } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const response = await fetch('https://integrate.api.nvidia.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NVIDIA_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'nvidia/tts-riva',
        input: text,
        voice: voice || 'en-US.Female-1', 
        response_format: 'mp3',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: errorText }, { status: response.status });
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
