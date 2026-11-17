import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router';
import { Seo } from '../../components/common/Seo';
import { PageHero } from '../../components/common/PageHero';
import { Reveal } from '../../components/animations/Reveal';
import { ServiceGlyph } from '../../components/ui/ServiceGlyph';
import { Button } from '../../components/ui/Button';
import { ProductCard } from '../../components/cards/ProductCard';
import { ProjectCard } from '../../components/cards/ProjectCard';
import { Faq } from '../../components/blocks/Faq';
import { CtaBand } from '../../components/common/CtaBand';
import { sceneState, useUi } from '../../scenes/store';
import NotFound from '../NotFound/NotFound';
import { SITE_URL, company, products, projects, services, servicesFaq } from '../../data';
import { cn } from '../../utils/cn';

export default function ServiceDetails() {
  const { slug } = useParams();
  const i = services.findIndex((s) => s.slug === slug);
  const s = services[i];
  const anchor = useRef<HTMLDivElement>(null);
  const webgl = useUi((st) => st.webgl);

  // hand the shared 3D stage to this page's illustration
  useEffect(() => {
    if (!s) return;
    sceneState.serviceAnchor = anchor.current;
    sceneState.activeService = i;
    return () => {
      sceneState.serviceAnchor = null;
      sceneState.activeService = -1;
    };
  }, [s, i]);

  if (!s) return <NotFound />;
  const relProducts = products.filter((p) => s.relatedProducts?.includes(p.slug));
  const relProjects = projects.filter((p) => s.relatedProjects?.includes(p.slug));
  const prev = services[(i - 1 + services.length) % services.length];
  const next = services[(i + 1) % services.length];

  return (
    <>
      <Seo
        title={`${s.title} — Services`}
        description={`${s.short} ${s.description}`.slice(0, 300)}
        jsonLd={{ '@type': 'Service', name: s.title, description: s.description, serviceType: s.title, provider: { '@type': 'Organization', name: company.name, url: SITE_URL }, areaServed: company.markets }}
      />
      <PageHero eyebrow={`Service ${s.index} / ${String(services.length).padStart(2, '0')}`} title={s.title} lead={s.short} crumbs={[{ to: '/services', label: 'Services' }, { to: `/services/${s.slug}`, label: s.title }]}>
        <div className="hero-actions">
          <Button to="/contact" size="lg">Discuss your project</Button>
          {s.proof && <span className="proof-chip">{s.proof}</span>}
        </div>
      </PageHero>

      <section className="section section--tight" aria-label="Service details">
        <div className="container svc-detail">
          <div className="svc-detail__text">
            <Reveal>
              <p className="svc-detail__desc">{s.description}</p>
              <div className="svc-block__cols">
                <div>
                  <h2 className="label-h">Capabilities</h2>
                  <ul className="checklist">
                    {s.capabilities.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="label-h">What you get</h2>
                  <ul className="checklist checklist--muted">
                    {s.benefits.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
          <div className={cn('svc-detail__visual', `motif--${s.visual}`)}>
            <div ref={anchor} className="svc-block__anchor" />
            {webgl !== 'on' && <ServiceGlyph visual={s.visual} className="svc__fallback" />}
          </div>
        </div>
      </section>

      {(relProjects.length > 0 || relProducts.length > 0) && (
        <section className="section section--tight" aria-labelledby="rel-work">
          <div className="container">
            <h2 id="rel-work" className="h-sub">Related work</h2>
            <div className="related__grid">
              {relProjects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
              {relProducts.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Faq items={s.faq ?? servicesFaq.slice(0, 3)} id="svc-faq" />

      <nav className="container svc-pager" aria-label="More services">
        <Link to={`/services/${prev.slug}`} className="svc-pager__link">
          <span>← Previous</span>
          {prev.title}
        </Link>
        <Link to="/services" className="svc-pager__all">All services</Link>
        <Link to={`/services/${next.slug}`} className="svc-pager__link svc-pager__link--next">
          <span>Next →</span>
          {next.title}
        </Link>
      </nav>
      <CtaBand />
    </>
  );
}
