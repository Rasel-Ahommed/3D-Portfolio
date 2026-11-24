import { Link } from 'react-router';
import { SectionHead } from '../../components/ui/SectionHead';
import { ProductCard } from '../../components/cards/ProductCard';
import { Reveal } from '../../components/animations/Reveal';
import { Button } from '../../components/ui/Button';
import { SmartImage } from '../../components/common/SmartImage';
import { products } from '../../data';

const host = (url?: string) => url?.replace(/^https?:\/\//, '').replace(/\/$/, '');

export function ProductShowcase() {
  const [lead, ...rest] = products.slice(0, 5);
  return (
    <section className="section prods" data-chapter="3" aria-labelledby="prods-title">
      <div className="container">
        <SectionHead
          eyebrow="Our products"
          index="06"
          titleId="prods-title"
          title="Platforms we *own*, ready to deploy."
          lead="Alongside client work, CHTS builds and runs its own products — AI automation, learning platforms and business systems you can try live today."
          align="split"
        />

        {/* Spotlight: the lead product, image and story side by side.
            The entrance animation moves the wrapper; the hover lift stays on the card
            (sharing `transform` on one element leaves GSAP stuck mid-way). */}
        <Reveal>
          <div data-reveal>
            <article className="prods__spot">
              <Link to={`/products/${lead.slug}`} className="prods__spot-media" tabIndex={-1} aria-hidden>
                <div className="prod__chrome">
                  <i />
                  <i />
                  <i />
                  {lead.demoUrl && <span>{host(lead.demoUrl)}</span>}
                </div>
                <SmartImage src={lead.screenshot} alt={`${lead.name} screenshot`} seed={lead.slug} />
              </Link>
              <div className="prods__spot-body">
                <div className="prods__spot-top">
                  <span className="prods__badge">Featured product</span>
                  {lead.demoUrl && (
                    <span className="prods__live">
                      <i aria-hidden /> Live
                    </span>
                  )}
                </div>
                <p className="prod__cat">{lead.category}</p>
                <h3 className="prods__spot-name">
                  <Link to={`/products/${lead.slug}`}>{lead.name}</Link>
                </h3>
                <p className="prods__spot-desc">{lead.description ?? lead.tagline}</p>
                <div className="prods__spot-actions">
                  {lead.demoUrl && (
                    <Button href={lead.demoUrl} external>
                      Visit product
                    </Button>
                  )}
                  <Button to={`/products/${lead.slug}`} variant="ghost">
                    Details
                  </Button>
                </div>
              </div>
            </article>
          </div>
        </Reveal>

        <Reveal className="prods__grid" stagger={0.08}>
          {rest.map((p) => (
            <div key={p.slug} data-reveal>
              <ProductCard product={p} />
            </div>
          ))}
        </Reveal>

        <div className="prods__foot">
          <p>
            {products.length} ready systems across AI, education, e-commerce and operations — deploy one fast, or go custom when you outgrow it.
          </p>
          <Button to="/products" variant="ghost">
            View all {products.length} products
          </Button>
        </div>
      </div>
    </section>
  );
}
