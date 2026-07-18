const ELASTIC_EMAIL_API_KEY = import.meta.env.ELASTIC_EMAIL_API_KEY
  || (typeof process !== 'undefined' ? process.env.ELASTIC_EMAIL_API_KEY : undefined);
const ELASTIC_EMAIL_BASE_URL = 'https://api.elasticemail.com/v4';
const DEFAULT_FROM = 'LendCity™ Golf Classic <events@lendcity.ca>';

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

export async function sendEmail(options: SendEmailOptions) {
  if (!ELASTIC_EMAIL_API_KEY) {
    throw new Error('ELASTIC_EMAIL_API_KEY environment variable is not set');
  }

  const recipients = (Array.isArray(options.to) ? options.to : [options.to]).filter(Boolean);

  const bodyParts: { ContentType: string; Content: string; Charset: string }[] = [];
  if (options.html) {
    bodyParts.push({ ContentType: 'HTML', Content: options.html, Charset: 'UTF-8' });
  }
  if (options.text) {
    bodyParts.push({ ContentType: 'PlainText', Content: options.text, Charset: 'UTF-8' });
  }

  const payload = {
    Recipients: { To: recipients },
    Content: {
      Body: bodyParts,
      From: DEFAULT_FROM,
      Subject: options.subject,
      ...(options.replyTo && { ReplyTo: options.replyTo }),
    },
  };

  const response = await fetch(`${ELASTIC_EMAIL_BASE_URL}/emails/transactional`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-ElasticEmail-ApiKey': ELASTIC_EMAIL_API_KEY,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Elastic Email send error:', errorBody);
    throw new Error(`Elastic Email send failed: ${response.status} ${errorBody}`);
  }

  return await response.json();
}
