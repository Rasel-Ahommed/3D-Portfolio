import { useRef } from 'react';
import { SectionHead } from '../../components/ui/SectionHead';
import { SmartImage } from '../../components/common/SmartImage';
import { clientLogos, clients, testimonials, type Testimonial } from '../../data';

function Stars({ value }: { value: number }) {
  return (
    <p className="quote__stars" aria-label={`Rated ${value} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} aria-hidden className={i < Math.round(value) ? 'is-on' : ''}>★</span>
      ))}
    </p>
  );
}

function QuoteCard({ t }: { t: Testimonial }) {
  return (
    <figure>
      <div className="quote__head">
        {t.rating ? <Stars value={t.rating} /> : <span className="quote__mark" aria-hidden>“</span>}
        {t.logo && <img className="quote__logo" src={t.logo} alt={`${t.company} logo`} loading="lazy" decoding="async" />}
      </div>
      <blockquote>
        <p>{t.quote}</p>
      </blockquote>
      {t.result && <p className="quote__result">{t.result}</p>}
      <figcaption>
        {t.photo ? (
          <span className="quote__photo">
            <SmartImage src={t.photo} alt={`Photo of ${t.name}`} seed={`t-${t.id}`} ratio={1} sizes="56px" />
          </span>
        ) : (
          <span className="quote__avatar" aria-hidden>{t.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
        )}
        <span>
          <strong>{t.name}</strong>
          <span>
            {t.designation}, {t.company}
            {t.country && ` · ${t.country}`}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

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
        {clientLogos.length > 0 ? (
          <ul className="logos" aria-label="Clients">
            {clientLogos.map((l) => (
              <li key={l.name}>
                {l.href ? (
                  <a href={l.href} target="_blank" rel="noopener noreferrer">
                    <img src={l.src} alt={`${l.name} logo`} loading="lazy" decoding="async" />
                  </a>
                ) : (
                  <img src={l.src} alt={`${l.name} logo`} loading="lazy" decoding="async" />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <ul className="client-names" aria-label="Clients">
            {clients.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        )}
        <ul ref={track} className="voices__track" tabIndex={0} aria-label="Testimonials — scroll horizontally">
          {testimonials.map((t) => (
            <li key={t.id} className="quote">
              <QuoteCard t={t} />
            </li>
          ))}
        </ul>
        {testimonials.length > 2 && (
          <div className="voices__nav">
            <button type="button" className="round-btn" onClick={() => move(-1)} aria-label="Previous testimonial">←</button>
            <button type="button" className="round-btn" onClick={() => move(1)} aria-label="Next testimonial">→</button>
          </div>
        )}
      </div>
    </section>
  );
}
