import { useRef } from 'react';
import { motion } from 'motion/react';
import { SplitText } from '../../components/animations/SplitText';
import { Button } from '../../components/ui/Button';
import { gsap } from '../../animations/gsap';
import { useGsap } from '../../hooks/useGsap';
import { useUi } from '../../scenes/store';
import { company } from '../../data';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const introDone = useUi((s) => s.introDone);

  useGsap(
    ({ reduced, scope }) => {
      if (reduced) return;
      // content drifts and fades as the camera moves toward the portal
      gsap.to(scope.querySelector('.hero__content'), {
        yPercent: -18,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom 30%', scrub: true },
      });
    },
    ref,
  );

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section ref={ref} className="hero" data-chapter="0" aria-labelledby="hero-title">
      <div className="container hero__content">
        <motion.p className="hero__kicker" {...fade(0)}>
          {/* <span className="eyebrow__dot" aria-hidden />  */}
          {company.name}
        </motion.p>
        <SplitText as="h1" id="hero-title" className="hero__title" text="Beyond *Digital* Possibilities." trigger="intro" stagger={0.09} />
        <div className="hero__row">
          <motion.p className="hero__lead" {...fade(0.5)}>
            We engineer intelligent digital experiences, innovative software and technology solutions that move businesses forward.
          </motion.p>
          <motion.div className="hero__ctas" {...fade(0.7)}>
            <Button to="/projects" size="lg">Explore Our Work</Button>
            <Button to="/contact" variant="ghost" size="lg">Let’s Talk</Button>
          </motion.div>
        </div>
      </div>
      <motion.div className="hero__meta container" {...fade(1)}>
        <span>Dhaka · Bangladesh</span>
        <span className="hero__scroll" aria-hidden>
          <i />
          Scroll
        </span>
        <span>Software · Automation · AI</span>
      </motion.div>
    </section>
  );
}
