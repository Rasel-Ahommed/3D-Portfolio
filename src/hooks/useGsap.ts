import { useLayoutEffect, type DependencyList, type RefObject } from 'react';
import { gsap } from '../animations/gsap';
import { prefersReducedMotion } from '../utils/env';

/**
 * Runs GSAP code inside a gsap.context scoped to `scope`, reverting every
 * tween / ScrollTrigger on unmount. The callback receives `reduced` so it can
 * skip motion for users who prefer reduced motion.
 */
export function useGsap(
  fn: (ctx: { reduced: boolean; scope: HTMLElement }) => void | (() => void),
  scope: RefObject<HTMLElement | null>,
  deps: DependencyList = [],
) {
  useLayoutEffect(() => {
    const el = scope.current;
    if (!el) return;
    let cleanup: void | (() => void);
    const ctx = gsap.context(() => {
      cleanup = fn({ reduced: prefersReducedMotion(), scope: el });
    }, el);
    return () => {
      if (typeof cleanup === 'function') cleanup();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
