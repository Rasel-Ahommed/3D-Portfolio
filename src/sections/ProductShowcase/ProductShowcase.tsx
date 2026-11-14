import { SectionHead } from '../../components/ui/SectionHead';
import { ProductCard } from '../../components/cards/ProductCard';
import { Reveal } from '../../components/animations/Reveal';
import { Button } from '../../components/ui/Button';
import { products } from '../../data';

export function ProductShowcase() {
  const featured = products.slice(0, 5);
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
        <Reveal className="prods__grid" stagger={0.1}>
          {featured.map((p, i) => (
            <div key={p.slug} data-reveal className={i === 0 ? 'prods__lead' : undefined}>
              <ProductCard product={p} featured={i === 0} />
            </div>
          ))}
        </Reveal>
        <div className="center-cta">
          <Button to="/products">All {products.length} products</Button>
        </div>
      </div>
    </section>
  );
}
