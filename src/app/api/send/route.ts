import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { getClientIp, rateLimit, tooManyRequests } from '@/lib/utils';

export async function POST(request: Request) {
  const limit = rateLimit(`send:${getClientIp(request)}`, { windowMs: 10 * 60_000, max: 3 });
  if (!limit.allowed) return tooManyRequests(limit);

  // Moving this inside the function prevents the build-time crash
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { name, email, message } = await request.json();

    await resend.emails.send({
      from: 'Voices Archive <onboarding@resend.dev>',
      to: ['halima@ubfsf.org'],
      subject: `New Message from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
