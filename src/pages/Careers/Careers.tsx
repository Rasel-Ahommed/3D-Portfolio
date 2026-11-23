import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Seo } from '../../components/common/Seo';
import { PageHero } from '../../components/common/PageHero';
import { SectionHead } from '../../components/ui/SectionHead';
import { Reveal } from '../../components/animations/Reveal';
import { Button } from '../../components/ui/Button';
import { Pending } from '../../components/common/Pending';
import { company, contact, jobs } from '../../data';

export default function Careers() {
  const [open, setOpen] = useState<string | null>(null);
  const applyHref = (title: string) => `mailto:${contact.email}?subject=${encodeURIComponent(`Application — ${title}`)}`;
  return (
    <>
      <Seo
        title="Careers"
        description="Careers at Classical Hunter Tech Solutions — open positions and open applications for engineers and designers in Dhaka, Bangladesh."
        jsonLd={
          jobs.length
            ? { '@type': 'ItemList', itemListElement: jobs.map((j, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'JobPosting', title: j.title, description: j.description, employmentType: j.type.toUpperCase().replace('-', '_'), hiringOrganization: { '@type': 'Organization', name: company.name }, jobLocation: { '@type': 'Place', address: j.location } } })) }
            : undefined
        }
      />
      <PageHero eyebrow="Careers" title="Do the best work *of your career.*" lead="Join a team that cares about clean code, elegant design and dependable support — and about the people who use what we build." crumbs={[{ to: '/careers', label: 'Careers' }]} />

      <section className="section section--tight" aria-labelledby="culture-title">
        <div className="container">
          <SectionHead eyebrow="Culture" titleId="culture-title" title="How we *work* together." />
          <Reveal as="ul" className="values">
            {company.values.map((v, i) => (
              <li key={v.title} data-reveal>
                <span className="values__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </li>
            ))}
          </Reveal>
          <Pending file="src/pages/Careers/Careers.tsx">Employee benefits (leave, learning budget, hybrid policy, etc.) — not published yet.</Pending>
        </div>
      </section>

      <section className="section" aria-labelledby="open-title">
        <div className="container">
          <SectionHead eyebrow="Open positions" titleId="open-title" title={jobs.length ? 'Current *openings.*' : 'Open *applications.*'} />
          {jobs.length > 0 ? (
            <ul className="jobs">
              {jobs.map((j) => (
                <li key={j.slug} className="job">
                  <button type="button" className="job__head" aria-expanded={open === j.slug} aria-controls={`job-${j.slug}`} onClick={() => setOpen(open === j.slug ? null : j.slug)}>
                    <span className="job__title">{j.title}</span>
                    <span className="job__meta">{j.type} · {j.location}</span>
                    <span className="job__toggle" aria-hidden>{open === j.slug ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open === j.slug && (
                      <motion.div id={`job-${j.slug}`} className="job__body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                        <div className="job__inner">
                          <p>{j.description}</p>
                          <h3>Requirements</h3>
                          <ul className="checklist">{j.requirements.map((r) => <li key={r}>{r}</li>)}</ul>
                          <Button href={applyHref(j.title)}>Apply for this role</Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          ) : (
            <Reveal className="open-app">
              <p className="open-app__lead">There are no open positions right now — but great people are always welcome.</p>
              <p>Send your CV, portfolio or GitHub and a short note about the kind of work you want to do. We’ll keep it on file and reach out when a matching role opens.</p>
              <div className="hero-actions">
                <Button href={applyHref('Open application')}>Send an open application</Button>
                <Button href={contact.whatsapp} external variant="ghost">Message on WhatsApp</Button>
              </div>
            </Reveal>
          )}
          <Reveal className="apply-steps">
            <h3 className="h-sub">How to apply</h3>
            <ol>
              <li>Email <a href={`mailto:${contact.email}`}>{contact.email}</a> with the role title in the subject line.</li>
              <li>Attach your CV and links to relevant work (portfolio, GitHub, live projects).</li>
              <li>We review every application and reply to shortlisted candidates.</li>
            </ol>
          </Reveal>
        </div>
      </section>
    </>
  );
}
