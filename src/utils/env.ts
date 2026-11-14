export const isBrowser = typeof window !== 'undefined';

export function prefersReducedMotion() {
  return isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function hasWebGL() {
  if (!isBrowser) return false;
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export type Quality = 'high' | 'medium' | 'low';

/** Rough device tier used to scale particles, DPR and post-processing. */
export function detectQuality(): Quality {
  if (!isBrowser) return 'low';
  const w = window.innerWidth;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const cores = navigator.hardwareConcurrency ?? 4;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  if (w < 768 || (coarse && cores <= 6) || mem <= 3) return 'low';
  if (w < 1200 || coarse || cores <= 4) return 'medium';
  return 'high';
}

export const isTouch = () => isBrowser && window.matchMedia('(hover: none)').matches;
