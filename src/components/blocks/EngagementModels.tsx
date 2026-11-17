import { SectionHead } from '../ui/SectionHead';
import { Reveal } from '../animations/Reveal';
import { Button } from '../ui/Button';
import { engagementModels } from '../../data';

/** "How we charge" — engagement models; prices appear only when set in proof.ts. */
export function EngagementModels() {
  return (
    <section className="section section--tight" aria-labelledby="engage-title">
      <div className="container">
        <SectionHead eyebrow="How we charge" titleId="engage-title" title="Three ways to *work* with us." align="split" lead="Pick the model that fits your stage. Every engagement starts with a free call and a written roadmap." />
        <Reveal as="ul" className="engage">
          {engagementModels.map((m) => (
            <li key={m.name} data-reveal className="engage__card">
              <p className="engage__best">{m.best}</p>
              <h3>{m.name}</h3>
              {m.from && <p className="engage__price">{m.from}</p>}
              <ul className="checklist">
                {m.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </li>
          ))}
        </Reveal>
        <div className="center-cta">
          <Button to="/contact">Get a free estimate</Button>
        </div>
      </div>
    </section>
  );
}
