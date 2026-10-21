import { Resend } from 'resend';
import { checkBotId } from 'botid/server';

const escapeHtml = value => value.replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);

const FROM = 'Messina Technology Solutions <contact@mail.messina-llc.com>';
const TO   = 'recruiting@messina-llc.com';

const INTENT_LABELS = {
  client:     'Client / Consulting Inquiry',
  consultant: 'Opportunity / Candidate Inquiry',
  other:      'General Inquiry',
};

export function createHandler({ verifyBot, sendEmail }) {
  return async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const body = req.body;
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return res.status(400).json({ error: 'Invalid submission.' });
    }
    // Autofill trap: excluded from keyboard navigation and assistive technology.
    if (body.website) {
      console.info('Contact blocked: honeypot');
      return res.status(403).json({ error: 'Unable to verify your submission. Please reload and try again.' });
    }
    const limits = { name: 150, email: 254, intent: 20, message: 10000 };
    for (const [field, max] of Object.entries(limits)) {
      if (typeof body[field] !== 'string' || !body[field].trim() || body[field].length > max) {
        return res.status(400).json({ error: 'Please check the required fields and their lengths.' });
      }
    }
    const { intent } = body;
    const email = body.email.trim();
    if (!Object.hasOwn(INTENT_LABELS, intent) || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)
        || /[\r\n\x00-\x1f\x7f]/.test(body.name)) {
      return res.status(400).json({ error: 'Please check your name, email address, and inquiry type.' });
    }

    try {
      const verification = await verifyBot(req);
      if (!verification.isHuman || verification.isBot || verification.isVerifiedBot) {
        console.info('Contact blocked: bot verification');
        return res.status(403).json({ error: 'Unable to verify your submission. Please reload and try again, or email recruiting@messina-llc.com.' });
      }
    } catch {
      console.error('Contact bot verification unavailable');
      return res.status(503).json({ error: 'Verification is temporarily unavailable. Please try again or email recruiting@messina-llc.com.' });
    }

    const name = escapeHtml(body.name.trim());
    const message = escapeHtml(body.message.trim());
    const safeEmail = escapeHtml(email);
    const intentLabel = INTENT_LABELS[intent];

    try {
      // 1. Internal notification to the distribution list
      const notification = await sendEmail({
        from:    FROM,
        to:      TO,
        cc:      'jakebmessina@gmail.com',
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
                    ${safeEmail}
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

      if (notification.error || !notification.data?.id) {
        throw new Error('Internal notification was not accepted');
      }

      // A confirmation failure must not encourage resending an already delivered inquiry.
      try {
        const confirmation = await sendEmail({
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

        if (confirmation.error || !confirmation.data?.id) console.error('Contact confirmation failed');
      } catch {
        console.error('Contact confirmation failed');
      }

      return res.status(200).json({ success: true });

    } catch (err) {
      console.error('Contact notification failed:', err.name);
      return res.status(500).json({ error: 'Failed to send email. Please try again.' });
    }
  };
}

export default createHandler({
  verifyBot: req => checkBotId({
    // Never use BotID's automatic development bypass in a deployed function.
    developmentOptions: { isDevelopment: false },
    advancedOptions: { headers: req.headers, checkLevel: 'basic' },
  }),
  sendEmail: payload => new Resend(process.env.RESEND_API_KEY).emails.send(payload),
});
