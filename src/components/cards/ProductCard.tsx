import { Link } from 'react-router';
import { SmartImage } from '../common/SmartImage';
import { DraftBadge } from '../common/Pending';
import type { Product } from '../../data';
import { cn } from '../../utils/cn';

export function ProductCard({ product, className, featured }: { product: Product; className?: string; featured?: boolean }) {
  return (
    <article className={cn('prod', featured && 'prod--featured', className)}>
      <Link to={`/products/${product.slug}`} className="prod__media" tabIndex={-1} aria-hidden>
        <div className="prod__chrome"><i /><i /><i />{product.demoUrl && <span>{product.demoUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>}</div>
        <SmartImage src={product.screenshot} alt={`${product.name} screenshot`} seed={product.slug} />
      </Link>
      <div className="prod__body">
        <p className="prod__cat">{product.category}</p>
        <h3 className="prod__name">
          <Link to={`/products/${product.slug}`}>{product.name}</Link> <DraftBadge draft={product.draft} />
        </h3>
        <p className="prod__tag">{product.tagline}</p>
        <div className="prod__links">
          <Link to={`/products/${product.slug}`} className="link-arrow">Details</Link>
          {product.demoUrl && (
            <a href={product.demoUrl} target="_blank" rel="noopener noreferrer" className="link-arrow">
              Visit product<span className="sr-only"> (opens in a new tab)</span> ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
