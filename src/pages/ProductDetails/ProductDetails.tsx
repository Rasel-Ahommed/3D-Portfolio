import { Link, useParams } from 'react-router';
import { Seo } from '../../components/common/Seo';
import { PageHero } from '../../components/common/PageHero';
import { RevealImage } from '../../components/animations/RevealImage';
import { Reveal } from '../../components/animations/Reveal';
import { Pending, DraftBadge } from '../../components/common/Pending';
import { ProductCard } from '../../components/cards/ProductCard';
import { Button } from '../../components/ui/Button';
import { CtaBand } from '../../components/common/CtaBand';
import NotFound from '../NotFound/NotFound';
import { products } from '../../data';

export default function ProductDetails() {
  const { slug } = useParams();
  const p = products.find((x) => x.slug === slug);
  if (!p) return <NotFound />;
  const related = products.filter((x) => x.slug !== p.slug && x.category === p.category).slice(0, 3);
  const others = related.length ? related : products.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <Seo
        title={p.name}
        description={`${p.name}: ${p.tagline} ${p.description ?? ''}`.trim()}
        image={p.screenshot}
        jsonLd={{ '@type': 'SoftwareApplication', name: p.name, applicationCategory: 'BusinessApplication', operatingSystem: 'Web', description: p.description ?? p.tagline, ...(p.demoUrl ? { url: p.demoUrl } : {}), publisher: { '@type': 'Organization', name: 'Classical Hunter Tech Solutions LTD' } }}
      />
      <PageHero eyebrow={`Product · ${p.category}`} title={p.name} lead={p.tagline} crumbs={[{ to: '/products', label: 'Products' }, { to: `/products/${p.slug}`, label: p.name }]}>
        <div className="hero-actions">
          {p.demoUrl && <Button href={p.demoUrl} external size="lg">Visit product</Button>}
          <Button to="/contact" variant="ghost" size="lg">Request a demo</Button>
          <DraftBadge draft={p.draft} />
        </div>
      </PageHero>

      <section className="container detail-hero">
        <div className="browser">
          <div className="prod__chrome"><i /><i /><i /><span>{p.demoUrl?.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span></div>
          <RevealImage src={p.screenshot} alt={`${p.name} interface`} seed={p.slug} ratio="16 / 9" priority />
        </div>
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
              {p.technologies && (
                <div>
                  <dt>Technologies</dt>
                  <dd><ul className="tags">{p.technologies.map((t) => <li key={t}>{t}</li>)}</ul></dd>
                </div>
              )}
              {p.demoUrl && (
                <div>
                  <dt>Live demo</dt>
                  <dd><a href={p.demoUrl} target="_blank" rel="noopener noreferrer">{p.demoUrl.replace(/^https?:\/\//, '')} ↗</a></dd>
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
                <ul className="checklist checklist--2">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
              </Reveal>
            ) : (
              <Pending file="src/data/products.ts">Feature list for {p.name}.</Pending>
            )}
            {p.benefits && p.benefits.length > 0 ? (
              <Reveal>
                <h2 className="detail__h">Benefits</h2>
                <ul className="checklist">{p.benefits.map((f) => <li key={f}>{f}</li>)}</ul>
              </Reveal>
            ) : (
              <Pending file="src/data/products.ts">Benefits and technologies for {p.name}.</Pending>
            )}
            <Reveal className="detail__note">
              <p>
                Want this for your organisation? We can deploy it as-is or tailor modules, branding and integrations. <Link to="/contact">Talk to us →</Link>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {p.screenshots && p.screenshots.length > 0 && (
        <section className="section section--tight" aria-label="Screenshots">
          <div className="container gallery">
            {p.screenshots.map((g, i) => (
              <RevealImage key={g} src={g} alt={`${p.name} screenshot ${i + 1}`} ratio="16 / 10" />
            ))}
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="more-title">
        <div className="container">
          <h2 id="more-title" className="h-sub">More products</h2>
          <div className="grid-products">
            {others.map((o) => (
              <ProductCard key={o.slug} product={o} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
