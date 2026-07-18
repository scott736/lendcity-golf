export const prerender = false;

import type { APIRoute } from 'astro';
import { sendEmail } from '../../lib/email';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, error: 'Name, email, and message are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const adminEmail =
      import.meta.env.ADMIN_EMAIL
      || (typeof process !== 'undefined' ? process.env.ADMIN_EMAIL : undefined)
      || 'events@lendcity.ca';

    await sendEmail({
      to: adminEmail,
      subject: `New Golf Website Contact Form Submission from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e8dfd0; border-radius: 8px; background-color: #faf8f4;">
          <h2 style="color: #0A3C26; border-bottom: 2px solid #C5A059; padding-bottom: 10px; margin-top: 0;">New Contact Form Submission</h2>
          <p style="margin: 15px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 15px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0A3C26; text-decoration: underline;">${email}</a></p>
          ${phone ? `<p style="margin: 15px 0;"><strong>Phone:</strong> ${phone}</p>` : ''}
          <div style="margin-top: 20px; padding: 15px; border-left: 4px solid #C5A059; background-color: #f3ece0; font-style: italic;">
            ${message.replace(/\n/g, '<br />')}
          </div>
          <hr style="border: none; border-top: 1px solid #e8dfd0; margin: 25px 0;" />
          <p style="color: #5C6661; font-size: 11px; margin-bottom: 0;">Sent from the LendCity<sup style="font-size: 8px;">TM</sup> Golf Tournament website contact form.</p>
        </div>
      `,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Contact API error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message || 'Failed to send message.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
