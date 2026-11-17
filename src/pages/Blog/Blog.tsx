import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Seo } from '../../components/common/Seo';
import { PageHero } from '../../components/common/PageHero';
import { FilterBar } from '../../components/ui/FilterBar';
import { BlogCard } from '../../components/cards/BlogCard';
import { Reveal } from '../../components/animations/Reveal';
import { CtaBand } from '../../components/common/CtaBand';
import { SITE_URL, blogCategories, posts } from '../../data';

export default function Blog() {
  const [cat, setCat] = useState<string>('All');
  const featured = useMemo(() => posts.find((p) => p.featured) ?? posts[0], []);
  const rest = posts.filter((p) => p !== featured);
  const list = cat === 'All' ? rest : posts.filter((p) => p.category === cat);

  return (
    <>
      <Seo
        title="Blog"
        description="Insights from CHTS on software strategy, AI and automation, system architecture, cyber security and mobile development."
        jsonLd={{
          '@type': 'Blog',
          name: 'CHTS Blog',
          url: `${SITE_URL}/blog`,
          blogPost: posts.map((p) => ({ '@type': 'BlogPosting', headline: p.title, datePublished: p.date, url: `${SITE_URL}/blog/${p.slug}` })),
        }}
      />
      <PageHero
        eyebrow="Blog"
        title="Notes from the *engineering* floor."
        lead="Practical thinking on software, automation, architecture and security — written for the people who have to make the decisions."
        crumbs={[{ to: '/blog', label: 'Blog' }]}
      />

      <section className="section section--tight" aria-label="Featured article">
        <div className="container">
          <Reveal>
            <BlogCard post={featured} variant="featured" headingLevel="h2" />
          </Reveal>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="all-posts">
        <div className="container">
          <div className="toolbar">
            <h2 id="all-posts" className="h-sub" style={{ margin: 0 }}>Latest articles</h2>
            <FilterBar id="blog" label="Filter articles by topic" options={blogCategories} value={cat} onChange={setCat} />
          </div>
          <motion.div layout className="grid-blog">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <motion.div key={p.slug} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.5, delay: i * 0.04 }}>
                  <BlogCard post={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      <CtaBand title="Have a question we *should* write about?" text="Tell us what you’re working on — we’re happy to share how we’d approach it." />
    </>
  );
}
