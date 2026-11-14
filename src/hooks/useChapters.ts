import { useLayoutEffect, type RefObject } from 'react';
import { ScrollTrigger } from '../animations/gsap';
import { sceneState } from '../scenes/store';

/**
 * Maps homepage sections ([data-chapter]) to the continuous scene chapter value.
 * Each section interpolates from its own chapter to the next section's.
 */
export function useChapters(root: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const sections = Array.from(el.querySelectorAll<HTMLElement>('[data-chapter]'));
    const triggers = sections.map((s, i) => {
      const from = Number(s.dataset.chapter);
      const to = i < sections.length - 1 ? Number(sections[i + 1].dataset.chapter) : from;
      const update = (p: number) => (sceneState.chapter = from + (to - from) * p);
      return ScrollTrigger.create({
        trigger: s,
        start: i === 0 ? 'top top' : 'top center',
        end: 'bottom center',
        onUpdate: (self) => update(self.progress),
        onEnter: (self) => update(self.progress),
        onEnterBack: (self) => update(self.progress),
      });
    });
    sceneState.chapter = 0;
    const id = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      clearTimeout(id);
      triggers.forEach((t) => t.kill());
    };
  }, [root]);
}
