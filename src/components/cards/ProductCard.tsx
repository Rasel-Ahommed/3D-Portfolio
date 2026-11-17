import { Link } from 'react-router';
import { SmartImage } from '../common/SmartImage';
import { DraftBadge } from '../common/Pending';
import { DeviceFrame } from '../blocks/DeviceFrame';
import type { Product } from '../../data';
import { cn } from '../../utils/cn';

/**
 * Product card. Screenshots sit in a dark browser frame with a navy grade so
 * light, differently-styled banners all read as one family on the dark site.
 */
export function ProductCard({ product, className, featured }: { product: Product; className?: string; featured?: boolean }) {
  return (
    <article className={cn('prod', featured && 'prod--featured', className)}>
      <Link to={`/products/${product.slug}`} className="prod__media" tabIndex={-1} aria-hidden>
        <DeviceFrame url={product.demoUrl} className="device--graded">
          <SmartImage
            src={product.screenshot}
            alt={`${product.name} — product screenshot`}
            seed={product.slug}
            ratio={16 / 10}
            sizes={featured ? '(max-width: 900px) 100vw, 55vw' : '(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw'}
          />
        </DeviceFrame>
      </Link>
      <div className="prod__body">
        <p className="prod__cat">
          {product.category}
          {product.price && <span className="prod__price">{product.price}</span>}
        </p>
        <h3 className="prod__name">
          <Link to={`/products/${product.slug}`}>{product.name}</Link> <DraftBadge draft={product.draft} />
        </h3>
        <p className="prod__tag">{product.tagline}</p>
        {featured && product.description && <p className="prod__desc">{product.description}</p>}
        <div className="prod__links">
          <Link to={`/products/${product.slug}`} className="link-arrow">Details</Link>
          {product.demoUrl && (
            <a href={product.demoUrl} target="_blank" rel="noopener noreferrer" className="link-arrow">
              Live demo<span className="sr-only"> of {product.name} (opens in a new tab)</span> ↗
            </a>
          )}
          {product.marketplaceUrl && (
            <a href={product.marketplaceUrl} target="_blank" rel="noopener noreferrer" className="link-arrow">
              {product.marketplaceName ?? 'Buy'}<span className="sr-only"> (opens in a new tab)</span> ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
