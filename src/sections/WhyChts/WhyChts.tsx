import { Eyebrow } from '../../components/ui/Eyebrow';
import { SplitText } from '../../components/animations/SplitText';
import { Reveal } from '../../components/animations/Reveal';
import { advantages, company, products } from '../../data';

export function WhyChts() {
  return (
    <section className="section why" data-chapter="4" aria-labelledby="why-title">
      <div className="container why__grid">
        <div className="why__aside">
          <Eyebrow index="05">Why CHTS</Eyebrow>
          <SplitText id="why-title" text="Built for business. *Supported* for the long run." />
          <Reveal as="dl" className="facts">
            <div data-reveal>
              <dt>Roadmap delivered</dt>
              <dd>48<small>hrs</small></dd>
            </div>
            <div data-reveal>
              <dt>Ready products</dt>
              <dd>{products.length}</dd>
            </div>
            <div data-reveal>
              <dt>Markets served</dt>
              <dd className="facts__text">{company.markets.join(' · ')}</dd>
            </div>
          </Reveal>
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
              <p>{p.text}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
