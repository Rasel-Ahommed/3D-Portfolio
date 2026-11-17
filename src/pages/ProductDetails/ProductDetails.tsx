import { Link, useParams } from 'react-router';
import { Seo } from '../../components/common/Seo';
import { PageHero } from '../../components/common/PageHero';
import { Reveal } from '../../components/animations/Reveal';
import { SmartImage } from '../../components/common/SmartImage';
import { Pending, DraftBadge } from '../../components/common/Pending';
import { DeviceFrame } from '../../components/blocks/DeviceFrame';
import { Faq } from '../../components/blocks/Faq';
import { ProductCard } from '../../components/cards/ProductCard';
import { Button } from '../../components/ui/Button';
import { CtaBand } from '../../components/common/CtaBand';
import NotFound from '../NotFound/NotFound';
import { company, products } from '../../data';

export default function ProductDetails() {
  const { slug } = useParams();
  const p = products.find((x) => x.slug === slug);
  if (!p) return <NotFound />;
  // always 3 related: same category first, then the rest
  const related = products
    .filter((x) => x.slug !== p.slug)
    .sort((a, b) => Number(b.category === p.category) - Number(a.category === p.category))
    .slice(0, 3);
  const shots = p.screenshots ?? [];

  return (
    <>
      <Seo
        title={p.name}
        description={`${p.name}: ${p.tagline} ${p.description ?? ''}`.trim()}
        image={p.screenshot}
        jsonLd={{
          '@type': 'SoftwareApplication',
          name: p.name,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          description: p.description ?? p.tagline,
          ...(p.demoUrl ? { url: p.demoUrl } : {}),
          publisher: { '@type': 'Organization', name: company.name },
        }}
      />
      <PageHero eyebrow={`Product · ${p.category}`} title={p.name} lead={p.tagline} crumbs={[{ to: '/products', label: 'Products' }, { to: `/products/${p.slug}`, label: p.name }]}>
        <div className="hero-actions">
          {p.demoUrl && <Button href={p.demoUrl} external size="lg">Live demo</Button>}
          {p.marketplaceUrl && <Button href={p.marketplaceUrl} external size="lg" variant="ghost">{p.marketplaceName ?? 'Buy now'}</Button>}
          <Button to="/contact" variant="ghost" size="lg">Request a demo</Button>
          {p.price && <span className="proof-chip">{p.price}</span>}
          <DraftBadge draft={p.draft} />
        </div>
      </PageHero>

      <section className="container detail-hero">
        <Reveal>
          <DeviceFrame url={p.demoUrl} className="device--hero device--graded">
            <SmartImage src={p.screenshot} alt={`${p.name} — main screen`} seed={p.slug} ratio={16 / 9} sizes="(max-width: 1440px) 100vw, 1440px" priority />
          </DeviceFrame>
        </Reveal>
      </section>

      <section className="section section--tight">
        <div className="container detail">
          <aside className="detail__meta" aria-label="Product facts">
            <dl>
              <div>
                <dt>Category</dt>
                <dd>{p.category}</dd>
              </div>
              <div>
                <dt>Delivery</dt>
                <dd>Web-based · customisable</dd>
              </div>
              {p.price && (
                <div>
                  <dt>Price / licence</dt>
                  <dd>{p.price}</dd>
                </div>
              )}
              {p.technologies && (
                <div>
                  <dt>Stack</dt>
                  <dd><ul className="tags">{p.technologies.map((t) => <li key={t}>{t}</li>)}</ul></dd>
                </div>
              )}
              {p.demoUrl && (
                <div>
                  <dt>Live demo</dt>
                  <dd><a href={p.demoUrl} target="_blank" rel="noopener noreferrer">{p.demoUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')} ↗</a></dd>
                </div>
              )}
            </dl>
          </aside>
          <div className="detail__body">
            <Reveal>
              <h2 className="detail__h">Overview</h2>
              <p className="detail__lead">{p.description ?? p.tagline}</p>
            </Reveal>
            {p.features && p.features.length > 0 ? (
              <Reveal>
                <h2 className="detail__h">Features</h2>
                <ul className="feature-grid">
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </Reveal>
            ) : (
              <Pending file="src/data/products.ts">features (6–9 short items) for {p.name}.</Pending>
            )}
            {p.benefits && p.benefits.length > 0 ? (
              <Reveal>
                <h2 className="detail__h">Why teams choose it</h2>
                <ul className="checklist">{p.benefits.map((f) => <li key={f}>{f}</li>)}</ul>
              </Reveal>
            ) : (
              <Pending file="src/data/products.ts">benefits, technologies, price and marketplace link for {p.name}.</Pending>
            )}
            <Reveal className="detail__note">
              <p>
                Want this for your organisation? We can deploy it as-is or tailor modules, branding and integrations. <Link to="/contact">Talk to us →</Link>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {shots.length > 0 ? (
        <section className="section section--tight" aria-labelledby="pshots">
          <div className="container">
            <h2 id="pshots" className="h-sub">Screens</h2>
            <div className="gallery">
              {shots.map((g, i) => (
                <Reveal key={g}>
                  <DeviceFrame className="device--graded">
                    <SmartImage src={g} alt={`${p.name} — screen ${i + 1}`} seed={`${p.slug}-${i}`} ratio={16 / 10} sizes="(max-width: 900px) 100vw, 50vw" />
                  </DeviceFrame>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <div className="container">
          <Pending file="src/data/products.ts">3–5 screenshots (`screenshots`) for the gallery.</Pending>
        </div>
      )}

      {p.faq && p.faq.length > 0 && <Faq items={p.faq} id="product-faq" />}

      <section className="section" aria-labelledby="more-title">
        <div className="container">
          <h2 id="more-title" className="h-sub">Related products</h2>
          <div className="grid-products">
            {related.map((o) => (
              <ProductCard key={o.slug} product={o} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
