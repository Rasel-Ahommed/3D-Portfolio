import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Seo } from '../../components/common/Seo';
import { PageHero } from '../../components/common/PageHero';
import { FilterBar } from '../../components/ui/FilterBar';
import { ProductCard } from '../../components/cards/ProductCard';
import { CtaBand } from '../../components/common/CtaBand';
import { categoriesOf, products, type ProjectCategory } from '../../data';

export default function Products() {
  const [cat, setCat] = useState<ProjectCategory | 'All'>('All');
  const cats = useMemo(() => categoriesOf(products), []);
  const list = cat === 'All' ? products : products.filter((p) => p.category === cat);
  return (
    <>
      <Seo
        title="Products"
        description="CHTS-owned products and ready systems: ChatMili, AI PTE learning platform, LMS, institute management, diagnostic, POS, restaurant and e-commerce platforms."
        jsonLd={{ '@type': 'ItemList', itemListElement: products.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.name, url: `https://chtsltd.com/products/${p.slug}` })) }}
      />
      <PageHero
        eyebrow="Products"
        title="Software we *own*, run and improve."
        lead="Ready systems and SaaS products built by CHTS. Each can be deployed quickly and customised to your business — try the live demos."
        crumbs={[{ to: '/products', label: 'Products' }]}
      />
      <section className="section section--tight" aria-label="Product list">
        <div className="container">
          <div className="toolbar">
            <FilterBar id="products" label="Filter products by category" options={cats} value={cat} onChange={setCat} />
          </div>
          <motion.div layout className="grid-products">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <motion.div key={p.slug} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.5, delay: i * 0.03 }}>
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      <CtaBand title="Need it *customised*?" text="Every product can be tailored to your workflows, branding and integrations." />
    </>
  );
}
