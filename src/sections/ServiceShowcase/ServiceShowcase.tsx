import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { SectionHead } from '../../components/ui/SectionHead';
import { ServiceGlyph } from '../../components/ui/ServiceGlyph';
import { ScrollTrigger } from '../../animations/gsap';
import { sceneState, useUi } from '../../scenes/store';
import { services } from '../../data';
import { cn } from '../../utils/cn';
import { useMediaQuery } from '../../hooks/useMediaQuery';

/** Services left off the homepage showcase (they stay on the full Services page). */
const HIDDEN_ON_HOME = new Set(['game-development', 'ai-image-video-production']);
const featured = services.filter((s) => !HIDDEN_ON_HOME.has(s.slug));
const pad = (n: number) => String(n).padStart(2, '0');
const TOTAL = pad(featured.length);

/** Interactive service showcase — refined list on one side, 3D illustration on a sticky stage. */
export function ServiceShowcase() {
  const [active, setActive] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const webgl = useUi((s) => s.webgl);
  const wide = useMediaQuery('(min-width: 961px)');
  // 3D on wide screens; a static glyph on the sticky mobile stage keeps phones light
  const use3D = webgl === 'on' && wide;
  const current = featured[active];

  useEffect(() => {
    if (!use3D) return;
    const el = stage.current;
    sceneState.serviceAnchor = el;
    return () => {
      if (sceneState.serviceAnchor === el) sceneState.serviceAnchor = null;
      sceneState.activeService = -1;
    };
  }, [use3D]);

  // the 3D stage indexes the full services list, so translate from this shorter list
  useEffect(() => {
    sceneState.activeService = services.indexOf(current);
  }, [current]);

  // scrolling through the list activates each service (works for touch too)
  useEffect(() => {
    const items = list.current?.querySelectorAll<HTMLElement>('.svc-item');
    if (!items) return;
    const triggers = Array.from(items).map((el, i) =>
      ScrollTrigger.create({ trigger: el, start: 'top 58%', end: 'bottom 58%', onToggle: (s) => s.isActive && setActive(i) }),
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section className="section svc" data-chapter="2" aria-labelledby="svc-title">
      <div className="container">
        <SectionHead
          eyebrow="What we do"
          index="03"
          titleId="svc-title"
          title={`${featured.length} disciplines. *One* engineering standard.`}
          lead="Each discipline has its own craft. Every one is held to the same bar for quality, security and long-term support."
          align="split"
        />
        <div className="svc__layout">
          <ol ref={list} className="svc__list">
            {featured.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.slug} className={cn('svc-item', on && 'is-active')} onMouseEnter={() => setActive(i)}>
                  <h3 className="svc-item__heading">
                    <button type="button" className="svc-item__head" aria-expanded={on} onClick={() => setActive(i)} onFocus={() => setActive(i)}>
                      <span className="svc-item__index">{pad(i + 1)}</span>
                      <span className="svc-item__icon" aria-hidden>
                        <ServiceGlyph visual={s.visual} />
                      </span>
                      <span className="svc-item__title">{s.title}</span>
                      <span className="svc-item__arrow" aria-hidden>
                        ↗
                      </span>
                    </button>
                  </h3>
                  <div className="svc-item__body">
                    <div className="svc-item__inner">
                      <p className="svc-item__short">{s.short}</p>
                      <Link to={`/services#${s.slug}`} className="svc-item__link" tabIndex={on ? 0 : -1}>
                        Explore service<span className="sr-only">: {s.title}</span>
                        <span aria-hidden> →</span>
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="svc__stage-wrap">
            <div className={cn('svc__stage', `motif--${current.visual}`)}>
              <div ref={stage} className="svc__anchor" />
              {!use3D && <ServiceGlyph key={current.visual} visual={current.visual} className="svc__fallback" />}
              <div className="svc__stage-meta">
                <span className="svc__stage-count">
                  {pad(active + 1)} <i>/ {TOTAL}</i>
                </span>
                <AnimatePresence mode="wait">
                  <motion.div key={current.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
                    <p className="svc__stage-title">{current.title}</p>
                    <ul className="tags">
                      {current.capabilities.slice(0, 3).map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
