import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  // This check prevents the build from crashing if the key is missing
  if (!apiKey) {
    console.error("RESEND_API_KEY is not defined");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  const resend = new Resend(apiKey);

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
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
