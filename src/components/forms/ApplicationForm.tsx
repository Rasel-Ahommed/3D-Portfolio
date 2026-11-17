import { useId, useState, type FormEvent } from 'react';
import { Button } from '../ui/Button';
import { contact, jobs } from '../../data';
import { contactConfigured, mailtoFor, submitContact, type ContactPayload } from '../../utils/submitContact';
import { cn } from '../../utils/cn';

type Errors = Partial<Record<'name' | 'email' | 'role' | 'portfolio' | 'message', string>>;

/** Job application form. Sends through the same backend as the contact form. */
export function ApplicationForm() {
  const uid = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error' | 'unconfigured'>('idle');
  const [last, setLast] = useState<ContactPayload | null>(null);

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const fd = new FormData(form);
    if (fd.get('website')) return;
    const v = (k: string) => String(fd.get(k) ?? '').trim();
    const e: Errors = {};
    if (v('name').length < 2) e.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v('email'))) e.email = 'Please enter a valid email address.';
    if (!v('role')) e.role = 'Please choose a role.';
    if (!/^https?:\/\/\S+\.\S+/.test(v('portfolio'))) e.portfolio = 'Please add a link to your CV or portfolio (Google Drive, LinkedIn, GitHub…).';
    if (v('message').length < 20) e.message = 'Tell us a little about yourself — at least 20 characters.';
    setErrors(e);
    if (Object.keys(e).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(e)[0]}"]`)?.focus();
      return;
    }
    const data: ContactPayload = {
      name: v('name'),
      email: v('email'),
      phone: v('phone') || undefined,
      service: `Job application — ${v('role')}`,
      details: `CV / portfolio: ${v('portfolio')}\n\n${v('message')}`,
    };
    setLast(data);
    setStatus('sending');
    const r = await submitContact(data);
    if (r.ok) {
      setStatus('sent');
      form.reset();
    } else setStatus(r.reason === 'not-configured' ? 'unconfigured' : 'error');
  };

  const err = (k: keyof Errors) => errors[k] && <p className="field__err" id={`${uid}-${k}-err`}>{errors[k]}</p>;
  const a11y = (k: keyof Errors) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${uid}-${k}-err` : undefined });

  return (
    <form className="cform" onSubmit={onSubmit} noValidate>
      <div className="cform__grid">
        <div className={cn('field', errors.name && 'has-error')}>
          <input id={`${uid}-name`} name="name" placeholder=" " autoComplete="name" {...a11y('name')} />
          <label htmlFor={`${uid}-name`}>Full name</label>
          {err('name')}
        </div>
        <div className={cn('field', errors.email && 'has-error')}>
          <input id={`${uid}-email`} name="email" type="email" placeholder=" " autoComplete="email" {...a11y('email')} />
          <label htmlFor={`${uid}-email`}>Email</label>
          {err('email')}
        </div>
        <div className="field">
          <input id={`${uid}-phone`} name="phone" type="tel" placeholder=" " autoComplete="tel" />
          <label htmlFor={`${uid}-phone`}>Phone <span className="field__opt">(optional)</span></label>
        </div>
        <div className={cn('field field--select', errors.role && 'has-error')}>
          <select id={`${uid}-role`} name="role" defaultValue="" {...a11y('role')}>
            <option value="">Select a role</option>
            {jobs.map((j) => (
              <option key={j.slug}>{j.title}</option>
            ))}
            <option>Open application</option>
            <option>Internship</option>
          </select>
          <label htmlFor={`${uid}-role`}>Role</label>
          {err('role')}
        </div>
        <div className={cn('field field--area', errors.portfolio && 'has-error')} style={{ gridColumn: '1 / -1' }}>
          <input id={`${uid}-portfolio`} name="portfolio" type="url" placeholder=" " {...a11y('portfolio')} />
          <label htmlFor={`${uid}-portfolio`}>Link to CV / portfolio / GitHub</label>
          {err('portfolio')}
        </div>
        <div className={cn('field field--area', errors.message && 'has-error')}>
          <textarea id={`${uid}-message`} name="message" rows={5} placeholder=" " {...a11y('message')} />
          <label htmlFor={`${uid}-message`}>About you and the work you want to do</label>
          {err('message')}
        </div>
        <div className="hp" aria-hidden>
          <label>
            Website <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
      </div>
      <div className="cform__foot">
        <Button type="submit" size="lg" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send application'}</Button>
        <p className="cform__note">We read every application and reply to shortlisted candidates.</p>
      </div>
      <div role="status" aria-live="polite">
        {status === 'sent' && <p className="cform__msg cform__msg--ok">Thank you — your application has been sent.</p>}
        {status === 'error' && (
          <p className="cform__msg cform__msg--err">
            Something went wrong. Please email <a href={last ? mailtoFor(last, contact.email) : `mailto:${contact.email}`}>{contact.email}</a> instead.
          </p>
        )}
        {status === 'unconfigured' && last && (
          <div className="cform__msg cform__msg--warn">
            <p>Online applications aren’t connected on this deployment yet, so nothing has been sent.</p>
            <a className="link-arrow" href={mailtoFor(last, contact.email)}>Send it by email instead →</a>
          </div>
        )}
        {!contactConfigured && import.meta.env.DEV && <p className="cform__dev">Dev note: configure VITE_CONTACT_ENDPOINT or VITE_WEB3FORMS_KEY to enable submissions.</p>}
      </div>
    </form>
  );
}
