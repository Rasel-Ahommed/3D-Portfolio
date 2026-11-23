import { useMemo } from 'react';
import { Link, useParams } from 'react-router';
import { motion, useScroll, useSpring } from 'motion/react';
import { Seo } from '../../components/common/Seo';
import { SplitText } from '../../components/animations/SplitText';
import { RevealImage } from '../../components/animations/RevealImage';
import { Reveal } from '../../components/animations/Reveal';
import { Eyebrow } from '../../components/ui/Eyebrow';
import { Button } from '../../components/ui/Button';
import { BlogCard } from '../../components/cards/BlogCard';
import { ArticleBody } from '../../components/blog/ArticleBody';
import { TableOfContents } from '../../components/blog/TableOfContents';
import { ShareLinks } from '../../components/blog/ShareLinks';
import { usePortalDim } from '../../hooks/usePortalDim';
import { CtaBand } from '../../components/common/CtaBand';
import { DETAIL_POST, SITE_URL, company, formatDate, posts, type BlogPost } from '../../data';

/**
 * Resolves the post for a slug.
 * TODAY: every slug shows DETAIL_POST (the only article with a body).
 * TO MAKE DYNAMIC: return posts.find((p) => p.slug === slug && p.body) — or fetch
 * from your CMS/API — and render <NotFound /> when nothing matches.
 */
function getPost(_slug: string | undefined): BlogPost {
  return DETAIL_POST;
}

export default function BlogDetails() {
  usePortalDim(0.9);
  const { slug } = useParams();
  const post = getPost(slug);
  const body = post.body ?? [];
  const toc = useMemo(() => body.flatMap((b) => (b.type === 'h2' ? [{ id: b.id, text: b.text }] : [])), [body]);
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const url = `${SITE_URL}/blog/${post.slug}`;

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        canonicalPath={`/blog/${post.slug}`}
        type="article"
        jsonLd={{
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          author: { '@type': 'Organization', name: post.author },
          publisher: { '@type': 'Organization', name: company.name, logo: { '@type': 'ImageObject', url: `${SITE_URL}/brand/logo-light-theme.png` } },
          mainEntityOfPage: url,
          keywords: post.tags?.join(', '),
        }}
      />
      <motion.div className="read-progress" style={{ scaleX: progress }} aria-hidden />

      <header className="post-hero">
        <div className="container post-hero__inner">
          <nav aria-label="Breadcrumb" className="crumbs">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><span aria-current="page">{post.category}</span></li>
            </ol>
          </nav>
          <Eyebrow>{post.category}</Eyebrow>
          <SplitText as="h1" text={post.title} trigger="intro" className="post-hero__title" stagger={0.04} />
          <Reveal className="post-meta">
            <span className="post-meta__avatar" aria-hidden>CH</span>
            <span>
              <strong>{post.author}</strong>
              <span>
                <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readMinutes} min read
              </span>
            </span>
            {post.tags && (
              <ul className="tags post-meta__tags">
                {post.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            )}
          </Reveal>
        </div>
      </header>

      <div className="container post-cover">
        <RevealImage src={post.cover} alt={post.title} seed={`blog-${post.slug}`} ratio="21 / 9" priority />
      </div>

      <section className="section section--tight">
        <div className="container post-layout">
          <aside className="post-aside">
            <TableOfContents items={toc} />
            <ShareLinks url={url} title={post.title} />
          </aside>
          <div className="post-main">
            <ArticleBody blocks={body} />
            <div className="post-author">
              <span className="post-meta__avatar post-meta__avatar--lg" aria-hidden>CH</span>
              <div>
                <p className="post-author__label">Written by</p>
                <p className="post-author__name">{post.author}</p>
                <p>Engineers and designers at {company.name}, building custom software, automation and digital products from Dhaka for clients worldwide.</p>
              </div>
            </div>
            <div className="post-actions">
              <Button to="/blog" variant="ghost">All articles</Button>
              <Button to="/contact">Talk to our team</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="more-reading">
        <div className="container">
          <h2 id="more-reading" className="h-sub">Keep reading</h2>
          <div className="grid-blog">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
