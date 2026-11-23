import { useRef } from 'react';
import { SectionHead } from '../../components/ui/SectionHead';
import { clients, testimonials } from '../../data';

export function Testimonials() {
  const track = useRef<HTMLUListElement>(null);
  const move = (dir: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector('li');
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 400) + 24), behavior: 'smooth' });
  };
  return (
    <section className="section voices" data-chapter="4" aria-labelledby="voices-title">
      <div className="container">
        <SectionHead eyebrow="Clients & testimonials" index="07" titleId="voices-title" title="What our *clients* say." />
      </div>
      <div className="marquee" aria-label="Clients">
        <div className="marquee__inner">
          {[0, 1].map((k) => (
            <ul key={k} aria-hidden={k === 1}>
              {[...clients, ...clients].map((c, i) => (
                <li key={`${c}-${i}`}>{c}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className="container">
        <ul ref={track} className="voices__track" tabIndex={0} aria-label="Testimonials — scroll horizontally">
          {testimonials.map((t) => (
            <li key={t.id} className="quote">
              <figure>
                <span className="quote__mark" aria-hidden>“</span>
                <blockquote>
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption>
                  <span className="quote__avatar" aria-hidden>{t.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
                  <span>
                    <strong>{t.name}</strong>
                    <span>{t.designation}, {t.company}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <div className="voices__nav">
          <button type="button" className="round-btn" onClick={() => move(-1)} aria-label="Previous testimonial">←</button>
          <button type="button" className="round-btn" onClick={() => move(1)} aria-label="Next testimonial">→</button>
        </div>
      </div>
    </section>
  );
}
