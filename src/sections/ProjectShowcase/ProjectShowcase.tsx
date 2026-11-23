import { useRef } from 'react';
import { Eyebrow } from '../../components/ui/Eyebrow';
import { SplitText } from '../../components/animations/SplitText';
import { ProjectCard } from '../../components/cards/ProjectCard';
import { Button } from '../../components/ui/Button';
import { gsap, ScrollTrigger } from '../../animations/gsap';
import { useGsap } from '../../hooks/useGsap';
import { projects } from '../../data';

/** Featured client work — horizontal, scroll-driven track on desktop; swipeable on touch. */
export function ProjectShowcase() {
  const ref = useRef<HTMLElement>(null);

  useGsap(
    ({ reduced, scope }) => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        if (reduced) return;

        const track = scope.querySelector<HTMLElement>('.work__track');
        const pin = scope.querySelector<HTMLElement>('.work__pin');

        if (!track || !pin) return;

        const dist = () =>
          Math.max(0, track.scrollWidth - window.innerWidth + 80);

        gsap.to(track, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        gsap.from(scope.querySelectorAll('.work__track > *'), {
          opacity: 0,
          xPercent: 12,
          duration: 1.4,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: pin,
            start: 'top 70%',
            once: true,
          },
        });
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => mm.revert();
    },
    ref,
  );

  return (
    <section
      ref={ref}
      className="section work"
      data-chapter="3"
      aria-labelledby="work-title"
    >
      <div className="work__pin">
        <div className="container">
          <div>
            <Eyebrow index="03">Featured projects</Eyebrow>
            <SplitText id="work-title" text="Work built *with* our clients." />
          </div>
        </div>

        <div className="work__viewport">
          <div className="work__track">
            {projects.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                index={i}
                size="lg"
              />
            ))}

            <div className="work__end">
              <p>
                Explore every case study, plus the products we build and run
                ourselves.
              </p>

              <Button to="/projects">All projects</Button>
              <Button to="/products" variant="ghost">
                Our products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
