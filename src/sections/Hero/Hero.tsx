import { useRef } from 'react';
import { motion } from 'motion/react';
import { SplitText } from '../../components/animations/SplitText';
import { Button } from '../../components/ui/Button';
import { gsap } from '../../animations/gsap';
import { useGsap } from '../../hooks/useGsap';
import { useUi } from '../../scenes/store';
import { industries } from '../../data';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const introDone = useUi((s) => s.introDone);

  useGsap(
    ({ reduced, scope }) => {
      if (reduced) return;
      gsap.to(scope.querySelector('.hero__content'), {
        yPercent: -14,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom 25%', scrub: true },
      });
    },
    ref,
  );

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section ref={ref} className="hero" data-chapter="0" aria-labelledby="hero-title">
      <div className="container hero__content">
        <motion.p className="hero__kicker" {...fade(0)}>
          {/* <span className="eyebrow__dot" aria-hidden />  */}
          Software studio · Dhaka → UK, Australia &amp; Middle East
        </motion.p>
        <SplitText as="h1" id="hero-title" className="hero__title" text="Custom software that *grows* your business." trigger="intro" stagger={0.05} />
        <motion.p className="hero__lead" {...fade(0.25)}>
          Web platforms, AI automation and mobile apps for businesses in the UK, Australia and the Middle East — designed, built and supported by our team in Dhaka.
        </motion.p>
        <motion.div className="hero__ctas" {...fade(0.35)}>
          <Button to="/projects" size="lg">Explore our work</Button>
          <Button to="/services" variant="ghost" size="lg">Our services</Button>
        </motion.div>
        <motion.ul className="hero__industries" aria-label="Industries we serve" {...fade(0.45)}>
          {industries.map((i) => (
            <li key={i.name}>{i.name}</li>
          ))}
        </motion.ul>
      </div>
      <motion.div className="hero__meta container" {...fade(0.6)}>
        <span className="hero__scroll" aria-hidden>
          <i />
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
