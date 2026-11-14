import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useSmoothScroll } from '../components/common/SmoothScroll';

/** Scrolls to `#hash` targets after route transitions settle. */
export function useHashScroll() {
  const { hash } = useLocation();
  const { scrollTo } = useSmoothScroll();
  useEffect(() => {
    if (!hash) return;
    const id = setTimeout(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        scrollTo(el);
        el.setAttribute('tabindex', '-1');
        el.focus({ preventScroll: true });
      }
    }, 900);
    return () => clearTimeout(id);
  }, [hash, scrollTo]);
}
