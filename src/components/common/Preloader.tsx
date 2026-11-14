import { useEffect, useRef, useState } from 'react';
import { gsap } from '../../animations/gsap';
import { sceneState, uiStore } from '../../scenes/store';
import { prefersReducedMotion } from '../../utils/env';

/**
 * Minimal first-visit preloader. Waits for fonts and (if available) the 3D chunk,
 * then hands over to the intro: portal fades in → energy reveals → typography.
 */
export function Preloader({ ready }: { ready: Promise<unknown> }) {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const counter = { v: 0 };
    let done = false;
    const minTime = new Promise((r) => setTimeout(r, reduced ? 200 : 1300));
    const fonts = document.fonts?.ready ?? Promise.resolve();
    const set = () => {
      if (num.current) num.current.textContent = String(Math.round(counter.v)).padStart(3, '0');
      if (bar.current) bar.current.style.transform = `scaleX(${counter.v / 100})`;
    };
    const crawl = gsap.to(counter, { v: 82, duration: 2.4, ease: 'power2.out', onUpdate: set });

    Promise.all([minTime, fonts, ready.catch(() => null)]).then(() => {
      if (done) return;
      done = true;
      crawl.kill();
      const tl = gsap.timeline({ onComplete: () => setGone(true) });
      tl.to(counter, { v: 100, duration: reduced ? 0.1 : 0.5, ease: 'power2.inOut', onUpdate: set })
        .to(root.current, { autoAlpha: 0, duration: reduced ? 0.2 : 0.9, ease: 'power2.inOut' }, '+=0.15')
        .add(() => {
          if (reduced) {
            sceneState.reveal = 1;
            uiStore.set({ introDone: true });
            return;
          }
          // 1. fade in portal  2. reveal energy  3. particles  4. typography
          gsap.to(sceneState, { reveal: 1, duration: 3.2, ease: 'power2.inOut' });
          gsap.delayedCall(1.1, () => uiStore.set({ introDone: true }));
        }, '-=0.5');
    });
    return () => {
      done = true;
      crawl.kill();
    };
  }, [ready]);

  if (gone) return null;
  return (
    <div ref={root} className="preloader" role="status" aria-live="polite" aria-label="Loading">
      <div className="preloader__inner">
        <span className="preloader__label">Classical Hunter Tech Solutions</span>
        <span ref={num} className="preloader__num">000</span>
        <span className="preloader__track"><span ref={bar} className="preloader__bar" /></span>
      </div>
    </div>
  );
}
