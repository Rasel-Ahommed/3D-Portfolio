import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Seo } from '../../components/common/Seo';
import { PageHero } from '../../components/common/PageHero';
import { SectionHead } from '../../components/ui/SectionHead';
import { Reveal } from '../../components/animations/Reveal';
import { Button } from '../../components/ui/Button';
import { Pending } from '../../components/common/Pending';
import { SmartImage } from '../../components/common/SmartImage';
import { HeroCollage } from '../../components/blocks/HeroCollage';
import { ApplicationForm } from '../../components/forms/ApplicationForm';
import { useSmoothScroll } from '../../components/common/SmoothScroll';
import { careers, company, jobs, team, technologies } from '../../data';

export default function Careers() {
  const [open, setOpen] = useState<string | null>(null);
  const { scrollTo } = useSmoothScroll();
  const toForm = () => scrollTo('#apply');

  return (
    <>
      <Seo
        title="Careers"
        description={`Careers at ${company.name} in ${careers.location} — open roles, how we hire and how to apply.`}
        jsonLd={
          jobs.length
            ? { '@type': 'ItemList', itemListElement: jobs.map((j, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'JobPosting', title: j.title, description: j.description, employmentType: j.type.toUpperCase().replace('-', '_'), hiringOrganization: { '@type': 'Organization', name: company.name }, jobLocation: { '@type': 'Place', address: j.location } } })) }
            : undefined
        }
      />
      <PageHero
        eyebrow="Careers"
        title="Do the best work *of your career.*"
        lead={`Build software for clients in ${company.markets.join(', ')} — with a small team where your work ships and gets used.`}
        crumbs={[{ to: '/careers', label: 'Careers' }]}
        visual={
          <HeroCollage
            variant="strip"
            images={(careers.photos.length ? careers.photos.map((p, i) => ({ src: p.src, alt: p.alt, seed: `life-${i}` })) : team.map((m) => ({ src: m.portrait, alt: `Portrait of ${m.name}, ${m.role}`, seed: `team-${m.slug}` })))}
          />
        }
      >
        <div className="hero-actions">
          <Button onClick={toForm} size="lg">Apply now</Button>
          <span className="proof-chip">{careers.workMode ?? careers.location}</span>
        </div>
      </PageHero>

      <section className="section section--tight" aria-labelledby="life-title">
        <div className="container life">
          <SectionHead eyebrow="Life at CHTS" titleId="life-title" title="Real products, real *clients*, real ownership." />
          <div className="life__grid">
            <Reveal className="life__text">
              <p>You’ll work on platforms people use every day — learning systems, e-commerce, AI chat automation and business software — for clients in Bangladesh and abroad.</p>
              <p>Small teams mean your work is visible: you’ll talk to clients, make technical decisions and see your features go live.</p>
            </Reveal>
            <Reveal className="life__stack">
              <p className="label-h">What you’ll work with</p>
              <ul className="tags">
                {technologies.map((t) => (
                  <li key={t.name}>{t.name}</li>
                ))}
              </ul>
            </Reveal>
          </div>
          {careers.photos.length > 0 && (
            <div className="photo-grid">
              {careers.photos.map((ph, i) => (
                <figure key={ph.src} className={i === 0 ? 'photo-grid__lead' : undefined}>
                  <SmartImage src={ph.src} alt={ph.alt} seed={`life-${i}`} ratio={i === 0 ? 16 / 10 : 4 / 3} sizes={i === 0 ? '(max-width: 900px) 100vw, 66vw' : '(max-width: 900px) 100vw, 33vw'} />
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="benefits-title">
        <div className="container">
          <SectionHead eyebrow="Benefits" titleId="benefits-title" title="What we *offer.*" />
          {careers.benefits.length > 0 ? (
            <Reveal as="ul" className="values">
              {careers.benefits.map((b, i) => (
                <li key={b.title} data-reveal>
                  <span className="values__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </li>
              ))}
            </Reveal>
          ) : (
            <Pending file="src/data/proof.ts → careers.benefits">salary review, leave, learning budget, work mode, equipment, etc.</Pending>
          )}
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="open-title">
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
                          <Button onClick={toForm}>Apply for this role</Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          ) : (
            <Reveal className="open-app">
              <p className="open-app__lead">No open positions right now — but great people are always welcome.</p>
              <p>Send an open application below. We keep every application on file and reach out when a matching role opens.</p>
            </Reveal>
          )}
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="hire-title">
        <div className="container">
          <SectionHead eyebrow="How we hire" titleId="hire-title" title="A clear, *quick* process." />
          <Reveal as="ol" className="hire-steps">
            {careers.hiringSteps.map((s, i) => (
              <li key={s.title} data-reveal>
                <span className="hire-steps__n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--tight" id="apply" aria-labelledby="apply-title">
        <div className="container contact-grid">
          <div>
            <SectionHead eyebrow="Apply" titleId="apply-title" title="Tell us *about* you." />
            <p className="muted-p">Location: {careers.location}{careers.workMode ? ` · ${careers.workMode}` : ''}</p>
          </div>
          <div className="cta__form-card">
            <ApplicationForm />
          </div>
        </div>
      </section>
    </>
  );
}
