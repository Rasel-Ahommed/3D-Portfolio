import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../../animations/gsap';
import { prefersReducedMotion } from '../../utils/env';

type Ctx = { lenis: Lenis | null; scrollTo: (target: string | number | HTMLElement, immediate?: boolean) => void };
const ScrollCtx = createContext<Ctx>({ lenis: null, scrollTo: () => {} });

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger
 * and Lenis stay perfectly in sync. Disabled for reduced-motion users.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const ref = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const l = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 1 });
    ref.current = l;
    setLenis(l);
    l.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => l.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      l.destroy();
      ref.current = null;
    };
  }, []);

  const scrollTo = useCallback<Ctx['scrollTo']>((target, immediate = false) => {
    const off = -90;
    if (ref.current) {
      ref.current.scrollTo(target as never, { immediate, offset: typeof target === 'number' ? 0 : off, force: true });
      return;
    }
    if (typeof target === 'number') window.scrollTo({ top: target, behavior: immediate ? 'auto' : 'smooth' });
    else {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + off, behavior: immediate ? 'auto' : 'smooth' });
    }
  }, []);
  const value = useMemo(() => ({ lenis, scrollTo }), [lenis, scrollTo]);

  return <ScrollCtx.Provider value={value}>{children}</ScrollCtx.Provider>;
}

export const useSmoothScroll = () => useContext(ScrollCtx);
