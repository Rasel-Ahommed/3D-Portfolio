import { SectionHead } from '../../components/ui/SectionHead';
import { Reveal } from '../../components/animations/Reveal';
import { clients, testimonials } from '../../data';

const initials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

export function Testimonials() {
  return (
    <section className="section voices" data-chapter="4" aria-labelledby="voices-title">
      <div className="container">
        <SectionHead
          eyebrow="Clients & testimonials"
          index="07"
          titleId="voices-title"
          title="What our *clients* say."
          lead="Feedback from the teams we build for and support — in their own words."
          align="split"
        />
      </div>

      {/* partner names, continuously scrolling */}
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
        {/* every testimonial visible at once — no cut-off cards */}
        <Reveal as="ul" className="voices__grid" stagger={0.1}>
          {testimonials.map((t) => (
            <li key={t.id} className="quote" data-reveal>
              <figure>
                <div className="quote__top">
                  <span className="quote__mark" aria-hidden>
                    “
                  </span>
                  <span className="quote__company">{t.company}</span>
                </div>
                <blockquote>
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption>
                  <span className="quote__avatar" aria-hidden>
                    {initials(t.name)}
                  </span>
                  <span className="quote__who">
                    <strong>{t.name}</strong>
                    <span>
                      {t.designation}, {t.company}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
