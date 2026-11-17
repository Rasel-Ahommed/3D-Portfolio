import { Fragment, useRef, type ElementType, type ReactNode } from 'react';
import { gsap } from '../../animations/gsap';
import { useGsap } from '../../hooks/useGsap';
import { useUi } from '../../scenes/store';
import { cn } from '../../utils/cn';

type Props = {
  as?: ElementType;
  /** Plain text; wrap words in *asterisks* to render them as serif-italic accents. */
  text: string;
  className?: string;
  /** scroll: reveal when entering viewport · intro: wait for the preloader · mount: immediately */
  trigger?: 'scroll' | 'intro' | 'mount';
  delay?: number;
  stagger?: number;
  id?: string;
  children?: ReactNode;
};

/** Word-by-word mask reveal. Real text stays in the DOM for SEO and screen readers. */
export function SplitText({ as: Tag = 'h2', text, className, trigger = 'scroll', delay = 0, stagger = 0.06, id }: Props) {
  const ref = useRef<HTMLElement>(null);
  const introDone = useUi((s) => s.introDone);
  const armed = trigger !== 'intro' || introDone;

  useGsap(
    ({ reduced, scope }) => {
      const words = scope.querySelectorAll<HTMLElement>('.split__inner');
      if (reduced) {
        gsap.set(words, { yPercent: 0, opacity: 1 });
        return;
      }
      if (!armed) {
        gsap.set(words, { yPercent: 70, opacity: 0 });
        return;
      }
      // Headlines must be readable fast: an h1 finishes in ≤ 0.8 s, other headings ≤ 1.2 s.
      const isH1 = scope.tagName === 'H1';
      const dur = isH1 ? 0.55 : 0.9;
      const budget = isH1 ? 0.8 : 1.2;
      const st = Math.min(stagger, Math.max(0, budget - dur - delay) / Math.max(1, words.length - 1));
      gsap.fromTo(
        words,
        { yPercent: isH1 ? 70 : 110, opacity: isH1 ? 0 : 1 },
        {
          yPercent: 0,
          opacity: 1,
          duration: dur,
          stagger: st,
          delay,
          ease: 'power3.out',
          scrollTrigger: trigger === 'scroll' ? { trigger: scope, start: 'top 88%', once: true } : undefined,
        },
      );
    },
    ref,
    [armed, text],
  );

  const words = text.split(' ');
  return (
    <Tag ref={ref} className={cn('split', className)} id={id}>
      {words.map((w, i) => {
        const accent = w.startsWith('*') && w.replace(/[.,!?]$/, '').endsWith('*');
        const clean = w.replace(/\*/g, '');
        return (
          <Fragment key={i}>
            <span className="split__word">
              <span className={cn('split__inner', accent && 'accent')}>{clean}</span>
            </span>
            {i < words.length - 1 ? ' ' : null}
          </Fragment>
        );
      })}
    </Tag>
  );
}
