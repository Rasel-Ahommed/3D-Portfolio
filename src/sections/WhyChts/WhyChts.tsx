import { Eyebrow } from '../../components/ui/Eyebrow';
import { SplitText } from '../../components/animations/SplitText';
import { Reveal } from '../../components/animations/Reveal';
import { StatsBar } from '../../components/blocks/StatsBar';
import { advantages, company, processTimelines, visibleStats } from '../../data';

export function WhyChts() {
  return (
    <section className="section why" data-chapter="4" aria-labelledby="why-title">
      <div className="container why__grid">
        <div className="why__aside">
          <Eyebrow index="05">Why CHTS</Eyebrow>
          <SplitText id="why-title" text="Built for business. *Supported* for the long run." />
          <div className="why__card">
            <p className="label-h">Where we work</p>
            <ul className="why__markets">
              {company.markets.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            {visibleStats.length > 4 && <StatsBar offset={4} className="stats--stack" />}
          </div>
        </div>
        <Reveal as="ol" className="why__list" stagger={0.08}>
          {advantages.map((a, i) => (
            <li key={a.title} data-reveal>
              <span className="why__num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </li>
          ))}
        </Reveal>
      </div>
      <div className="container">
        <Reveal as="ol" className="process" aria-label="How we work">
          {company.process.map((p) => (
            <li key={p.step} data-reveal>
              <span className="process__step">{p.step}</span>
              <h3>{p.title}</h3>
              {processTimelines[p.title] && <p className="process__time">{processTimelines[p.title]}</p>}
              <p>{p.text}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
