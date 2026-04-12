import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = 'Messina Technology Solutions <contact@messina-llc.com>';
const TO   = 'jakebmessina@gmail.com';

const INTENT_LABELS = {
  client:     'Client / Consulting Inquiry',
  consultant: 'Opportunity / Candidate Inquiry',
  other:      'General Inquiry',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, intent, message } = req.body ?? {};

  if (!name || !email || !intent || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const intentLabel = INTENT_LABELS[intent] ?? 'General Inquiry';

  try {
    // 1. Internal notification to the distribution list
    await resend.emails.send({
      from:    FROM,
      to:      TO,
      replyTo: email,
      subject: `[MTS Contact] ${intentLabel} — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #18181B;">
          <div style="background: #0A348A; padding: 24px 32px; border-radius: 12px 12px 0 0;">
            <p style="color: #1EC4F7; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; margin: 0 0 6px;">
              New Contact Form Submission
            </p>
            <h1 style="color: #ffffff; font-size: 22px; margin: 0;">${intentLabel}</h1>
          </div>

          <div style="background: #F7FAFF; padding: 32px; border: 1px solid #e5eaf5; border-top: none; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5eaf5; font-size: 12px; color: #6b7280; width: 120px; text-transform: uppercase; letter-spacing: 0.1em;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5eaf5; font-size: 15px; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5eaf5; font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5eaf5; font-size: 15px;">
                  ${email}
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em;">Intent</td>
                <td style="padding: 10px 0; font-size: 15px;">${intentLabel}</td>
              </tr>
            </table>

            <div style="background: #ffffff; border: 1px solid #e5eaf5; border-radius: 8px; padding: 20px;">
              <p style="font-size: 11px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.15em; margin: 0 0 10px;">Message</p>
              <p style="font-size: 15px; line-height: 1.7; margin: 0; color: #18181B;">${message.replace(/\n/g, '<br/>')}</p>
            </div>

            <p style="margin-top: 24px; font-size: 12px; color: #9ca3af;">
              Reply directly to this email to respond to ${name}.
            </p>
          </div>
        </div>
      `,
    });

    // 2. Auto-reply confirmation to the submitter
    await resend.emails.send({
      from:    FROM,
      to:      email,
      subject: `We received your message — Messina Technology Solutions`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #18181B;">
          <div style="background: #0A348A; padding: 24px 32px; border-radius: 12px 12px 0 0;">
            <p style="color: #1EC4F7; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; margin: 0 0 6px;">
              Messina Technology Solutions
            </p>
            <h1 style="color: #ffffff; font-size: 22px; margin: 0;">We got your message.</h1>
          </div>

          <div style="background: #F7FAFF; padding: 32px; border: 1px solid #e5eaf5; border-top: none; border-radius: 0 0 12px 12px;">
            <p style="font-size: 16px; line-height: 1.7; margin: 0 0 20px;">Hi ${name},</p>
            <p style="font-size: 15px; line-height: 1.7; color: #374151; margin: 0 0 20px;">
              Thanks for reaching out. Our team has received your inquiry and will be in touch shortly —
              typically within one business day.
            </p>
            <p style="font-size: 15px; line-height: 1.7; color: #374151; margin: 0 0 32px;">
              In the meantime, feel free to explore our
              <a href="https://messina-llc.com/case-studies" style="color: #0A348A;">case studies</a>
              or learn more about
              <a href="https://messina-llc.com/what-we-do" style="color: #0A348A;">what we do</a>.
            </p>

            <div style="border-top: 1px solid #e5eaf5; padding-top: 24px;">
              <p style="font-size: 13px; color: #6b7280; margin: 0 0 4px;">Messina Technology Solutions</p>
              <p style="font-size: 13px; color: #6b7280; margin: 0;">Newburyport, MA · messina-llc.com</p>
            </div>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
}
