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

/** Interactive service showcase — list on one side, 3D illustration on a sticky stage. */
export function ServiceShowcase() {
  const [active, setActive] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const webgl = useUi((s) => s.webgl);
  const wide = useMediaQuery('(min-width: 961px)');
  // 3D on wide screens; a static glyph on the sticky mobile stage keeps phones light
  const use3D = webgl === 'on' && wide;
  const current = services[active];

  useEffect(() => {
    if (!use3D) return;
    const el = stage.current;
    sceneState.serviceAnchor = el;
    return () => {
      if (sceneState.serviceAnchor === el) sceneState.serviceAnchor = null;
      sceneState.activeService = -1;
    };
  }, [use3D]);

  useEffect(() => {
    sceneState.activeService = active;
  }, [active]);

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
          index="02"
          titleId="svc-title"
          title={`${services.length} disciplines. *One* engineering standard.`}
          lead="From custom software and AI automation to architecture, security and infrastructure — each discipline has its own craft, and every one is held to the same bar for quality and support."
          align="split"
        />
        <div className="svc__layout">
          <ol ref={list} className="svc__list">
            {services.map((s, i) => (
              <li key={s.slug} className={cn('svc-item', `svc-item--${s.visual}`, i === active && 'is-active')} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
                <span className="svc-item__index">{s.index}</span>
                <div className="svc-item__body">
                  <h3 className="svc-item__title">{s.title}</h3>
                  <p className="svc-item__short">{s.short}</p>
                  <Link to={`/services#${s.slug}`} className="svc-item__link">
                    Learn more<span className="sr-only"> about {s.title}</span> →
                  </Link>
                </div>
                <ServiceGlyph visual={s.visual} className="svc-item__glyph" />
              </li>
            ))}
          </ol>

          <div className="svc__stage-wrap">
            <div className={cn('svc__stage', `motif--${current.visual}`)}>
              <div ref={stage} className="svc__anchor" />
              {!use3D && <ServiceGlyph key={current.visual} visual={current.visual} className="svc__fallback" />}
              <div className="svc__stage-meta">
                <span className="svc__stage-count">
                  {current.index} <i>/ {String(services.length).padStart(2, '0')}</i>
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
