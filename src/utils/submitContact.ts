export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  details: string;
};

export type SubmitResult = { ok: true } | { ok: false; reason: 'not-configured' | 'error'; message?: string };

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;

export const contactConfigured = Boolean(WEB3FORMS_KEY || ENDPOINT);

/**
 * Sends an enquiry. Supported back-ends (configure ONE in .env):
 *  - VITE_CONTACT_ENDPOINT : any JSON endpoint — the bundled server/contact.php, Formspree, etc.
 *  - VITE_WEB3FORMS_KEY    : Web3Forms access key
 * Success is only reported when the endpoint responds with 2xx.
 */
export async function submitContact(data: ContactPayload): Promise<SubmitResult> {
  if (!contactConfigured) return { ok: false, reason: 'not-configured' };
  try {
    const res = WEB3FORMS_KEY
      ? await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: `New enquiry from ${data.name}`, from_name: 'chtsltd.com', ...data }),
        })
      : await fetch(ENDPOINT!, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        });
    const body = await res.json().catch(() => ({}));
    if (!res.ok || body.success === false) return { ok: false, reason: 'error', message: body.message };
    return { ok: true };
  } catch {
    return { ok: false, reason: 'error' };
  }
}

export function mailtoFor(data: ContactPayload, to: string) {
  const lines = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone && `Phone: ${data.phone}`,
    data.company && `Company: ${data.company}`,
    data.service && `Service: ${data.service}`,
    data.budget && `Budget: ${data.budget}`,
    data.timeline && `Timeline: ${data.timeline}`,
    '',
    data.details,
  ].filter((l): l is string => typeof l === 'string');
  return `mailto:${to}?subject=${encodeURIComponent(`Project enquiry — ${data.name}`)}&body=${encodeURIComponent(lines.join('\n'))}`;
}
