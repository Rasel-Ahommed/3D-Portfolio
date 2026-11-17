import { useId, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from '../ui/Button';
import { contact, services } from '../../data';
import { contactConfigured, mailtoFor, submitContact, type ContactPayload } from '../../utils/submitContact';
import { cn } from '../../utils/cn';

type Errors = Partial<Record<keyof ContactPayload, string>>;
type Status = 'idle' | 'sending' | 'sent' | 'error' | 'unconfigured';

const BUDGETS = ['Under $1,000', '$1,000 – $5,000', '$5,000 – $15,000', '$15,000+', 'Not sure yet'];
const TIMELINES = ['As soon as possible', 'Within 1 month', '1–3 months', '3+ months', 'Just exploring'];

function validate(d: ContactPayload): Errors {
  const e: Errors = {};
  if (d.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = 'Please enter a valid email address.';
  if (d.phone && !/^[+()\-\s\d]{6,20}$/.test(d.phone.trim())) e.phone = 'Please enter a valid phone number.';
  if (d.details.trim().length < 20) e.details = 'Tell us a little more — at least 20 characters.';
  return e;
}

export function ContactForm({ showBudget = true, compact = false }: { showBudget?: boolean; compact?: boolean }) {
  const uid = useId();
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [last, setLast] = useState<ContactPayload | null>(null);
  const [errMsg, setErrMsg] = useState<string>();

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const fd = new FormData(form);
    if (fd.get('website')) return; // honeypot
    const data: ContactPayload = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      phone: String(fd.get('phone') ?? '') || undefined,
      company: String(fd.get('company') ?? '') || undefined,
      service: String(fd.get('service') ?? '') || undefined,
      budget: String(fd.get('budget') ?? '') || undefined,
      timeline: String(fd.get('timeline') ?? '') || undefined,
      details: String(fd.get('details') ?? ''),
    };
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(e)[0]}"]`)?.focus();
      return;
    }
    setLast(data);
    setStatus('sending');
    const r = await submitContact(data);
    if (r.ok) {
      setStatus('sent');
      form.reset();
    } else if (r.reason === 'not-configured') setStatus('unconfigured');
    else {
      setErrMsg(r.message);
      setStatus('error');
    }
  };

  const field = (name: keyof ContactPayload, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}, optional = false) => (
    <div className={cn('field', errors[name] && 'has-error')}>
      <input id={`${uid}-${name}`} name={name} placeholder=" " aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${uid}-${name}-err` : undefined} {...props} />
      <label htmlFor={`${uid}-${name}`}>
        {label}
        {optional && <span className="field__opt"> (optional)</span>}
      </label>
      {errors[name] && (
        <p className="field__err" id={`${uid}-${name}-err`}>{errors[name]}</p>
      )}
    </div>
  );

  return (
    <form className={cn('cform', compact && 'cform--compact')} onSubmit={onSubmit} noValidate aria-describedby={`${uid}-status`}>
      <div className="cform__grid">
        {field('name', 'Full name', { autoComplete: 'name', required: true })}
        {field('email', 'Email', { type: 'email', autoComplete: 'email', required: true })}
        {field('phone', 'Phone', { type: 'tel', autoComplete: 'tel' }, true)}
        {field('company', 'Company', { autoComplete: 'organization' }, true)}
        <div className="field field--select">
          <select id={`${uid}-service`} name="service" defaultValue="">
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>{s.title}</option>
            ))}
            <option value="Other">Something else</option>
          </select>
          <label htmlFor={`${uid}-service`}>Service interest</label>
        </div>
        {showBudget && (
          <div className="field field--select">
            <select id={`${uid}-budget`} name="budget" defaultValue="">
              <option value="">Prefer not to say</option>
              {BUDGETS.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
            <label htmlFor={`${uid}-budget`}>Project budget <span className="field__opt">(optional)</span></label>
          </div>
        )}
        <div className="field field--select">
          <select id={`${uid}-timeline`} name="timeline" defaultValue="">
            <option value="">Not decided</option>
            {TIMELINES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <label htmlFor={`${uid}-timeline`}>Timeline <span className="field__opt">(optional)</span></label>
        </div>
        <div className={cn('field field--area', errors.details && 'has-error')}>
          <textarea id={`${uid}-details`} name="details" rows={5} placeholder=" " required aria-invalid={!!errors.details} aria-describedby={errors.details ? `${uid}-details-err` : undefined} />
          <label htmlFor={`${uid}-details`}>Project details</label>
          {errors.details && <p className="field__err" id={`${uid}-details-err`}>{errors.details}</p>}
        </div>
        <div className="hp" aria-hidden>
          <label>
            Website <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
      </div>

      <div className="cform__foot">
        <Button type="submit" size="lg" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send enquiry'}
        </Button>
        <p className="cform__note">We reply within one business day. By sending, you agree to our privacy policy.</p>
      </div>

      <div id={`${uid}-status`} role="status" aria-live="polite">
        <AnimatePresence>
          {status === 'sent' && (
            <motion.p className="cform__msg cform__msg--ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              Thank you — your enquiry has been sent. We’ll be in touch shortly.
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p className="cform__msg cform__msg--err" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {errMsg ?? 'Something went wrong while sending.'} Please try again, or email us at{' '}
              <a href={last ? mailtoFor(last, contact.email) : `mailto:${contact.email}`}>{contact.email}</a>.
            </motion.p>
          )}
          {status === 'unconfigured' && last && (
            <motion.div className="cform__msg cform__msg--warn" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <p>Online submission isn’t connected on this deployment yet, so nothing has been sent. You can send the same message by email:</p>
              <a className="link-arrow" href={mailtoFor(last, contact.email)}>Open in your email app →</a>
            </motion.div>
          )}
        </AnimatePresence>
        {!contactConfigured && import.meta.env.DEV && (
          <p className="cform__dev">Dev note: set VITE_CONTACT_ENDPOINT or VITE_WEB3FORMS_KEY in .env to enable submissions (see README).</p>
        )}
      </div>
    </form>
  );
}
