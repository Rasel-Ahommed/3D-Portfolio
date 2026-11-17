import { Seo } from '../../components/common/Seo';
import { PageHero } from '../../components/common/PageHero';
import { SectionHead } from '../../components/ui/SectionHead';
import { Reveal } from '../../components/animations/Reveal';
import { SplitText } from '../../components/animations/SplitText';
import { Logo } from '../../components/ui/Logo';
import { Pending } from '../../components/common/Pending';
import { CtaBand } from '../../components/common/CtaBand';
import { SmartImage } from '../../components/common/SmartImage';
import { StatsBar } from '../../components/blocks/StatsBar';
import { HeroCollage } from '../../components/blocks/HeroCollage';
import { TeamCard } from '../../components/cards/TeamCard';
import { useHashScroll } from '../../hooks/useHashScroll';
import { about, company, profiles, team } from '../../data';

/**
 * The company story. Deliberately does NOT repeat homepage blocks
 * (Why CHTS, Plan/Build/Deliver, services list) — those live on Home/Services.
 */
export default function About() {
  useHashScroll();
  const founder = team[0];
  const leaders = team.slice(0, 2);

  return (
    <>
      <Seo title="About CHTS" description={`${company.description} ${company.mission}`} jsonLd={{ '@type': 'AboutPage', name: 'About CHTS', ...(about.foundedYear ? { foundingDate: String(about.foundedYear) } : {}) }} />
      <PageHero
        eyebrow="About CHTS"
        title="A technology partner *built* on quality."
        lead={company.description}
        crumbs={[{ to: '/about', label: 'About' }]}
        visual={<HeroCollage variant="strip" images={(about.officePhotos.length ? about.officePhotos.map((o, i) => ({ src: o.src, alt: o.alt, seed: `office-${i}` })) : team.map((m) => ({ src: m.portrait, alt: `Portrait of ${m.name}, ${m.role}`, seed: `team-${m.slug}` })))} />}
      />

      {/* Our story — light editorial band uses the light-theme logo on white */}
      <section className="story" aria-labelledby="story-title">
        <div className="container story__grid">
          <div className="story__brand">
            <Logo theme="light" link={false} width={220} />
            {about.foundedYear && <p className="story__founded">Founded {about.foundedYear} · Dhaka</p>}
          </div>
          <div>
            <p className="eyebrow eyebrow--dark"><span className="eyebrow__dot" aria-hidden />Our story</p>
            <SplitText id="story-title" text="Founded on a promise of *quality* and long-term relationships." className="story__title" />
            <Reveal className="story__body">
              <p>
                Classical Hunter Tech Solutions LTD is a software consultancy based in Dhaka, Bangladesh. Led by founder {founder?.name ?? 'our founder'}, the company builds custom software, automation systems, SaaS platforms and websites — from e-commerce marketplaces and AI-powered chatbots to bespoke business management tools.
              </p>
              <p>
                We work with businesses in {company.markets.slice(0, -1).join(', ')} and {company.markets.at(-1)}, combining technical expertise with an understanding of real-world business problems.
              </p>
              {about.founderNote ? (
                <figure className="founder-note">
                  <blockquote><p>“{about.founderNote}”</p></blockquote>
                  <figcaption>— {founder?.name}, {founder?.role}</figcaption>
                </figure>
              ) : (
                <Pending file="src/data/proof.ts → about.founderNote">a short note from the founder, in their own words, and the founding year.</Pending>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-label="CHTS in numbers">
        <div className="container">
          <StatsBar />
        </div>
      </section>

      {about.milestones.length > 0 ? (
        <section className="section section--tight" aria-labelledby="ms-title">
          <div className="container">
            <SectionHead eyebrow="Milestones" titleId="ms-title" title="How we *got* here." />
            <Reveal as="ol" className="timeline">
              {about.milestones.map((m) => (
                <li key={m.year + m.title} data-reveal>
                  <span className="timeline__year">{m.year}</span>
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                </li>
              ))}
            </Reveal>
          </div>
        </section>
      ) : (
        <div className="container">
          <Pending file="src/data/proof.ts → about.milestones">milestones — founding, first international client, product launches, team growth.</Pending>
        </div>
      )}

      <section className="section section--tight" aria-label="Mission and vision">
        <div className="container mv__grid">
          <Reveal className="mv__item" id="mission">
            <p className="eyebrow"><span className="eyebrow__dot" aria-hidden />Mission</p>
            <p className="mv__text">{company.mission}</p>
          </Reveal>
          <Reveal className="mv__item" id="vision">
            <p className="eyebrow"><span className="eyebrow__dot" aria-hidden />Vision</p>
            <p className="mv__text">{company.vision}</p>
          </Reveal>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="values-title">
        <div className="container">
          <SectionHead eyebrow="Core values" titleId="values-title" title={company.slogan.replace('Together.', '*Together.*')} />
          <Reveal as="ul" className="values">
            {company.values.map((v, i) => (
              <li key={v.title} data-reveal>
                <span className="values__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {leaders.length > 0 && (
        <section className="section section--tight" aria-labelledby="lead-title">
          <div className="container">
            <SectionHead eyebrow="Leadership" titleId="lead-title" title="The people *accountable* for your project." />
            <div className="team-grid team-grid--lead">
              {leaders.map((m) => (
                <TeamCard key={m.slug} member={m} />
              ))}
            </div>
          </div>
        </section>
      )}

      {about.officePhotos.length > 0 ? (
        <section className="section section--tight" aria-labelledby="office-title">
          <div className="container">
            <SectionHead eyebrow="Our office" titleId="office-title" title="Where the *work* happens." />
            <div className="photo-grid">
              {about.officePhotos.map((ph, i) => (
                <figure key={ph.src} className={i === 0 ? 'photo-grid__lead' : undefined}>
                  <SmartImage src={ph.src} alt={ph.alt} seed={`office-${i}`} ratio={i === 0 ? 16 / 10 : 4 / 3} sizes={i === 0 ? '(max-width: 900px) 100vw, 66vw' : '(max-width: 900px) 100vw, 33vw'} />
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <div className="container">
          <Pending file="src/data/proof.ts → about.officePhotos">3–5 office / team photos.</Pending>
        </div>
      )}

      {profiles.length > 0 && (
        <section className="section section--tight" aria-label="Find us on">
          <div className="container">
            <ul className="profiles">
              {profiles.map((p) => (
                <li key={p.href}><a href={p.href} target="_blank" rel="noopener noreferrer">{p.label} ↗</a></li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
