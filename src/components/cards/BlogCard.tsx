import { Link } from 'react-router';
import { SmartImage } from '../common/SmartImage';
import { formatDate, type BlogPost } from '../../data';
import { cn } from '../../utils/cn';

/** Blog card. Every card links to /blog/:slug (see src/data/blog.ts for how the detail page resolves posts). */
export function BlogCard({ post, variant = 'grid', headingLevel = 'h3' }: { post: BlogPost; variant?: 'grid' | 'featured' | 'compact'; headingLevel?: 'h2' | 'h3' }) {
  const H = headingLevel;
  return (
    <article className={cn('bcard', `bcard--${variant}`)}>
      <Link to={`/blog/${post.slug}`} className="bcard__link">
        <div className="bcard__media">
          <SmartImage src={post.cover} alt={post.title} seed={`blog-${post.slug}`} />
          <span className="bcard__cat">{post.category}</span>
        </div>
        <div className="bcard__body">
          <p className="bcard__meta">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>{post.readMinutes} min read</span>
          </p>
          <H className="bcard__title">{post.title}</H>
          {variant !== 'compact' && <p className="bcard__excerpt">{post.excerpt}</p>}
          <span className="bcard__more" aria-hidden>
            Read article <i>→</i>
          </span>
        </div>
      </Link>
    </article>
  );
}
