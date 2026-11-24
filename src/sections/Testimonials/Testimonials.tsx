import { Fragment, useRef, type CSSProperties } from 'react';
import { SectionHead } from '../../components/ui/SectionHead';
import { gsap } from '../../animations/gsap';
import { useGsap } from '../../hooks/useGsap';
import { clients, testimonials } from '../../data';

const pad = (n: number) => String(n).padStart(2, '0');
const initials = (name: string) =>
  name
    .split(/[\s-]+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

/** Monogram for the visual panel: short names in full (e.g. PTE), otherwise initials. */
const monogram = (company: string) => (company.length <= 4 ? company.toUpperCase() : initials(company));

/** The sticky offset each card pins at (its CSS `top`). */
const pinTop = (el: HTMLElement) => parseFloat(getComputedStyle(el).top) || 0;

/** Per-card tint (kept low so it sits inside the dark gold palette). */
const TINTS = ['244 180 0', '139 122 255', '45 212 191', '244 114 182'];

export function Testimonials() {
  const ref = useRef<HTMLElement>(null);

  // Stacking deck: each card pins, the next slides over it, and the one underneath shrinks and tilts (never dims).
  useGsap(
    ({ reduced, scope }) => {
      if (reduced) return;
      const mm = gsap.matchMedia();
      mm.add('(min-width: 901px)', () => {
        const items = Array.from(scope.querySelectorAll<HTMLElement>('.vstack'));
        items.forEach((item, i) => {
          const next = items[i + 1];
          const card = item.querySelector<HTMLElement>('.vcard');
          if (!next || !card) return;
          // starts only once the next card reaches this card's bottom edge (i.e. actually begins to cover it),
          // so every card stays at full brightness while it is being read
          gsap.to(card, {
            scale: 0.93,
            rotate: i % 2 ? 1.4 : -1.4,
            ease: 'none',
            scrollTrigger: {
              trigger: next,
              // pinTop = where cards stick (CSS `top`); offsetHeight ignores the scale transform
              start: () => `top ${Math.round(pinTop(item) + card.offsetHeight)}px`,
              end: () => `top ${Math.round(pinTop(item) + 40)}px`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        });
      });
      return () => mm.revert();
    },
    ref,
  );

  return (
    <section ref={ref} className="section voices" data-chapter="4" aria-labelledby="voices-title">
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
        <ul className="voices__stack">
          {testimonials.map((t, i) => (
            <Fragment key={t.id}>
              {/* scroll space between cards: each card sits alone for a moment before the next rises in */}
              {i > 0 && <li className="vspacer" aria-hidden />}
              <li className="vstack">
                <article className="vcard" style={{ '--tint': TINTS[i % TINTS.length] } as CSSProperties}>
                  <div className="vcard__body">
                    <div className="vcard__top">
                      <span className="vcard__count">
                        {pad(i + 1)} <i>/ {pad(testimonials.length)}</i>
                      </span>
                      <span className="vcard__company">{t.company}</span>
                    </div>
                    <span className="vcard__mark" aria-hidden>
                      “
                    </span>
                    <blockquote className="vcard__quote">
                      <p>{t.quote}</p>
                    </blockquote>
                    <div className="vcard__author">
                      <span className="vcard__avatar" aria-hidden>
                        {initials(t.name)}
                      </span>
                      <span className="vcard__who">
                        <strong>{t.name}</strong>
                        <span>{t.designation}</span>
                      </span>
                    </div>
                  </div>
                  <div className="vcard__visual" aria-hidden>
                    <span className="vcard__monogram">{monogram(t.company)}</span>
                    <span className="vcard__visual-name">{t.company}</span>
                    <span className="vcard__visual-label">Client partner</span>
                  </div>
                </article>
              </li>
            </Fragment>
          ))}
        </ul>
      </div>
    </section>
  );
}
