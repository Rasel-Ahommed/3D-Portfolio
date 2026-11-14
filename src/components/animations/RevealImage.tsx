import { useRef } from 'react';
import { gsap } from '../../animations/gsap';
import { useGsap } from '../../hooks/useGsap';
import { SmartImage } from '../common/SmartImage';
import { cn } from '../../utils/cn';

type Props = { src?: string; alt: string; className?: string; ratio?: string; seed?: string; priority?: boolean };

/** Clip-path wipe + subtle scale settle on scroll. */
export function RevealImage({ src, alt, className, ratio = '16 / 10', seed, priority }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useGsap(
    ({ reduced, scope }) => {
      if (reduced) return;
      const img = scope.querySelector('.smart-img');
      const tl = gsap.timeline({ scrollTrigger: { trigger: scope, start: 'top 85%', once: true } });
      tl.fromTo(scope, { clipPath: 'inset(18% 10% 18% 10% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 20px)', duration: 1.6, ease: 'expo.inOut' });
      if (img) tl.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.8, ease: 'expo.out' }, 0);
    },
    ref,
  );
  return (
    <div ref={ref} className={cn('reveal-img', className)} style={{ aspectRatio: ratio }}>
      <SmartImage src={src} alt={alt} seed={seed ?? alt} priority={priority} />
    </div>
  );
}
