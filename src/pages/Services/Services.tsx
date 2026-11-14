import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { Seo } from '../../components/common/Seo';
import { PageHero } from '../../components/common/PageHero';
import { Reveal } from '../../components/animations/Reveal';
import { SplitText } from '../../components/animations/SplitText';
import { ServiceGlyph } from '../../components/ui/ServiceGlyph';
import { Button } from '../../components/ui/Button';
import { ProductCard } from '../../components/cards/ProductCard';
import { ProjectCard } from '../../components/cards/ProjectCard';
import { CtaBand } from '../../components/common/CtaBand';
import { ScrollTrigger } from '../../animations/gsap';
import { sceneState, useUi } from '../../scenes/store';
import { useHashScroll } from '../../hooks/useHashScroll';
import { products, projects, services, type Service } from '../../data';
import { cn } from '../../utils/cn';

function ServiceBlock({ s, i }: { s: Service; i: number }) {
  const webgl = useUi((st) => st.webgl);
  const relProducts = products.filter((p) => s.relatedProducts?.includes(p.slug));
  const relProjects = projects.filter((p) => s.relatedProjects?.includes(p.slug));
  return (
    <section id={s.slug} className={cn('svc-block', i % 2 === 1 && 'svc-block--flip')} aria-labelledby={`${s.slug}-title`} data-index={i}>
      <div className="container">
        <div className="svc-block__grid">
          <div className="svc-block__text">
            <span className="svc-block__index">{s.index} / 08</span>
            <SplitText id={`${s.slug}-title`} text={s.title} className="svc-block__title" />
            <Reveal>
              <p className="svc-block__desc">{s.description}</p>
              <div className="svc-block__cols">
                <div>
                  <h3>Capabilities</h3>
                  <ul className="checklist">
                    {s.capabilities.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>Benefits</h3>
                  <ul className="checklist checklist--muted">
                    {s.benefits.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <Button to="/contact" variant="ghost">Discuss {s.title.split(' ')[0]} project</Button>
            </Reveal>
          </div>
          <div className={cn('svc-block__visual', `motif--${s.visual}`)}>
            <div className="svc-block__anchor" data-anchor />
            {webgl !== 'on' && <ServiceGlyph visual={s.visual} className="svc__fallback" />}
          </div>
        </div>
        {(relProducts.length > 0 || relProjects.length > 0) && (
          <div className="related">
            <h3 className="related__title">Related work</h3>
            <div className="related__grid">
              {relProjects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
              {relProducts.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function Services() {
  useHashScroll();
  const root = useRef<HTMLDivElement>(null);

  // hand the shared 3D service stage to whichever service is in view
  useEffect(() => {
    const blocks = root.current?.querySelectorAll<HTMLElement>('.svc-block');
    if (!blocks) return;
    sceneState.portalDim = 1;
    const triggers = Array.from(blocks).map((b) =>
      ScrollTrigger.create({
        trigger: b,
        start: 'top 60%',
        end: 'bottom 40%',
        onToggle: (self) => {
          if (!self.isActive) return;
          sceneState.serviceAnchor = b.querySelector('[data-anchor]');
          sceneState.activeService = Number(b.dataset.index);
        },
      }),
    );
    return () => {
      triggers.forEach((t) => t.kill());
      sceneState.portalDim = 0;
      sceneState.serviceAnchor = null;
      sceneState.activeService = -1;
    };
  }, []);

  return (
    <div ref={root}>
      <Seo title="Services" description="Software & web development, AI & automation, mobile apps, UI/UX, SaaS, game development, AI media production and IT infrastructure from CHTS." />
      <PageHero eyebrow="Services" title="Capabilities that *move* businesses forward." lead="Eight disciplines under one roof — each with its own craft, all delivered with the same commitment to clean code, elegant design and dependable support." crumbs={[{ to: '/services', label: 'Services' }]}>
        <nav aria-label="Services on this page" className="jumpnav">
          {services.map((s) => (
            <Link key={s.slug} to={`/services#${s.slug}`}>
              <span>{s.index}</span> {s.title}
            </Link>
          ))}
        </nav>
      </PageHero>
      {services.map((s, i) => (
        <ServiceBlock key={s.slug} s={s} i={i} />
      ))}
      <CtaBand />
    </div>
  );
}
