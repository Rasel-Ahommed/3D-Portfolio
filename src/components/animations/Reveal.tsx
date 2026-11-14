import { useRef, type ElementType, type ReactNode } from 'react';
import { gsap } from '../../animations/gsap';
import { useGsap } from '../../hooks/useGsap';
import { cn } from '../../utils/cn';

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Animate direct children marked [data-reveal] (or all direct children) in sequence. */
  stagger?: number;
  y?: number;
  delay?: number;
  start?: string;
} & Record<string, unknown>;

/** Fade-and-rise entrance on scroll. */
export function Reveal({ as: Tag = 'div', children, className, stagger = 0.09, y = 48, delay = 0, start = 'top 85%', ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);
  useGsap(
    ({ reduced, scope }) => {
      const marked = scope.querySelectorAll<HTMLElement>('[data-reveal]');
      const targets = marked.length ? marked : scope.children;
      if (reduced || !targets.length) return;
      gsap.from(targets, {
        y,
        opacity: 0,
        duration: 1.2,
        stagger,
        delay,
        ease: 'expo.out',
        scrollTrigger: { trigger: scope, start, once: true },
      });
    },
    ref,
  );
  return (
    <Tag ref={ref} className={cn(className)} {...rest}>
      {children}
    </Tag>
  );
}
