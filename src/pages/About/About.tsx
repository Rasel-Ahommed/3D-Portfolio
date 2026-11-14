import { Link } from 'react-router';
import { Seo } from '../../components/common/Seo';
import { PageHero } from '../../components/common/PageHero';
import { SectionHead } from '../../components/ui/SectionHead';
import { Reveal } from '../../components/animations/Reveal';
import { SplitText } from '../../components/animations/SplitText';
import { Logo } from '../../components/ui/Logo';
import { Pending } from '../../components/common/Pending';
import { CtaBand } from '../../components/common/CtaBand';
import { ServiceGlyph } from '../../components/ui/ServiceGlyph';
import { useHashScroll } from '../../hooks/useHashScroll';
import { advantages, company, services, team } from '../../data';

export default function About() {
  useHashScroll();
  const founder = team[0];
  return (
    <>
      <Seo title="About CHTS" description={`${company.description} ${company.mission}`} />
      <PageHero eyebrow="About CHTS" title="A technology partner *built* on quality." lead={company.description} crumbs={[{ to: '/about', label: 'About' }]} />

      {/* Our story — light editorial band uses the light-theme logo on white */}
      <section className="story" aria-labelledby="story-title">
        <div className="container story__grid">
          <div className="story__brand">
            <Logo theme="light" link={false} width={220} />
          </div>
          <div>
            <p className="eyebrow eyebrow--dark"><span className="eyebrow__dot" aria-hidden />Our story</p>
            <SplitText id="story-title" text="Founded on a promise of *quality* and long-term relationships." className="story__title" />
            <Reveal className="story__body">
              <p>
                Classical Hunter Tech Solutions LTD is a software consultancy based in Dhaka, Bangladesh. Led by founder {founder.name}, the company builds custom software, automation systems, SaaS platforms and websites — from e-commerce marketplaces and AI-powered chatbots to bespoke business management tools.
              </p>
              <p>
                We work with businesses in Bangladesh and internationally, including Malaysia, Australia and the United Kingdom, combining technical expertise with an understanding of real-world business problems.
              </p>
              <Pending file="src/pages/About/About.tsx">Founding year and key milestones (not published on chtsltd.com).</Pending>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section mv" aria-label="Mission and vision">
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

      <section className="section" aria-labelledby="values-title">
        <div className="container">
          <SectionHead eyebrow="Core values" titleId="values-title" title={`${company.slogan.replace('Together.', '*Together.*')}`} />
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

      <section className="section" aria-labelledby="diff-title">
        <div className="container">
          <SectionHead eyebrow="What makes us different" titleId="diff-title" title="Engineering with a *business* lens." align="split" lead="Six commitments that shape every engagement." />
          <Reveal as="ol" className="why__list why__list--wide">
            {advantages.map((a, i) => (
              <li key={a.title} data-reveal>
                <span className="why__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="approach-title">
        <div className="container">
          <SectionHead eyebrow="Our approach" titleId="approach-title" title="Plan. Build. *Deliver.*" />
          <Reveal as="ol" className="process">
            {company.process.map((p) => (
              <li key={p.step} data-reveal>
                <span className="process__step">{p.step}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="cap-title">
        <div className="container">
          <SectionHead eyebrow="Capabilities" titleId="cap-title" title="What we can *build* for you." />
          <Reveal as="ul" className="caps">
            {services.map((s) => (
              <li key={s.slug} data-reveal>
                <Link to={`/services#${s.slug}`}>
                  <ServiceGlyph visual={s.visual} className="caps__glyph" />
                  <span className="caps__index">{s.index}</span>
                  <span className="caps__title">{s.title}</span>
                  <span className="caps__arrow" aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
