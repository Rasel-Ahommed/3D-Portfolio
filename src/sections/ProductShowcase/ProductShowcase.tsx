import { SectionHead } from '../../components/ui/SectionHead';
import { ProductCard } from '../../components/cards/ProductCard';
import { Reveal } from '../../components/animations/Reveal';
import { Button } from '../../components/ui/Button';
import { products } from '../../data';

/** Uniform 3-up grid of products in dark device frames (no orphans, no empty featured card). */
export function ProductShowcase() {
  const shown = products.slice(0, 3);
  return (
    <section className="section prods" data-chapter="3" aria-labelledby="prods-title">
      <div className="container">
        <SectionHead
          eyebrow="Our products"
          index="06"
          titleId="prods-title"
          title="Platforms we *own*, ready to deploy."
          lead="Ready systems you can try live today — deploy as-is or have them customised to your workflow."
          align="split"
        />
        <Reveal className="grid-products" stagger={0.08}>
          {shown.map((p) => (
            <div key={p.slug} data-reveal>
              <ProductCard product={p} />
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
