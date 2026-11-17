import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Seo } from '../../components/common/Seo';
import { PageHero } from '../../components/common/PageHero';
import { Reveal } from '../../components/animations/Reveal';
import { ServiceGlyph } from '../../components/ui/ServiceGlyph';
import { HeroCollage } from '../../components/blocks/HeroCollage';
import { EngagementModels } from '../../components/blocks/EngagementModels';
import { TimeZones } from '../../components/blocks/TimeZones';
import { Faq } from '../../components/blocks/Faq';
import { CtaBand } from '../../components/common/CtaBand';
import { SITE_URL, services, servicesFaq } from '../../data';
import { cn } from '../../utils/cn';

/** Services overview. Each service has its own page at /services/:slug (better for SEO). */
export default function Services() {
  const { hash } = useLocation();
  const navigate = useNavigate();

  // old /services#slug links → /services/slug
  useEffect(() => {
    const slug = decodeURIComponent(hash.slice(1));
    if (slug && services.some((s) => s.slug === slug)) navigate(`/services/${slug}`, { replace: true });
  }, [hash, navigate]);

  return (
    <>
      <Seo
        title="Services"
        description="Custom software, AI automation, mobile apps, UI/UX, SaaS, system architecture, cyber security and IT infrastructure — from CHTS, Dhaka, for clients in the UK, Australia and the Middle East."
        jsonLd={{
          '@type': 'ItemList',
          itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.title, url: `${SITE_URL}/services/${s.slug}` })),
        }}
      />
      <PageHero
        eyebrow="Services"
        title="Everything you need to *build* and run software."
        lead={`${services.length} disciplines under one roof — from the first architecture sketch to the server it runs on, delivered by one accountable team.`}
        crumbs={[{ to: '/services', label: 'Services' }]}
        visual={<HeroCollage variant="glyphs" glyphs={services.map((s) => s.visual)} />}
      />

      <section className="section section--tight" aria-label="All services">
        <div className="container">
          <Reveal as="ul" className="svc-grid" stagger={0.05}>
            {services.map((s) => (
              <li key={s.slug} data-reveal>
                <Link to={`/services/${s.slug}`} className={cn('svc-card', `motif--${s.visual}`)}>
                  <span className="svc-card__top">
                    <span className="svc-card__index">{s.index}</span>
                    <ServiceGlyph visual={s.visual} className="svc-card__glyph" />
                  </span>
                  <h2 className="svc-card__title">{s.title}</h2>
                  <p className="svc-card__text">{s.short}</p>
                  {s.proof && <p className="svc-card__proof">{s.proof}</p>}
                  <span className="svc-card__more">
                    Explore<span className="sr-only"> {s.title}</span> <i aria-hidden>→</i>
                  </span>
                </Link>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <EngagementModels />
      <TimeZones />
      <Faq items={servicesFaq} />
      <CtaBand />
    </>
  );
}
