import { useDeferredValue, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Seo } from '../../components/common/Seo';
import { PageHero } from '../../components/common/PageHero';
import { FilterBar } from '../../components/ui/FilterBar';
import { ProjectCard } from '../../components/cards/ProjectCard';
import { CtaBand } from '../../components/common/CtaBand';
import { Button } from '../../components/ui/Button';
import { categoriesOf, projects, type ProjectCategory } from '../../data';

export default function Projects() {
  const [cat, setCat] = useState<ProjectCategory | 'All'>('All');
  const [q, setQ] = useState('');
  const query = useDeferredValue(q.trim().toLowerCase());
  const cats = useMemo(() => categoriesOf(projects), []);
  const list = projects.filter(
    (p) => (cat === 'All' || p.category === cat) && (!query || [p.title, p.client, p.summary, p.category, ...(p.technologies ?? [])].join(' ').toLowerCase().includes(query)),
  );

  return (
    <>
      <Seo title="Projects" description="Client projects delivered by CHTS — web platforms, education technology, AI solutions and mobile applications." />
      <PageHero eyebrow="Projects" title="Selected *client* work." lead="Platforms we’ve designed, built and supported for our clients. Looking for software you can deploy today? See our products." crumbs={[{ to: '/projects', label: 'Projects' }]} />
      <section className="section section--tight" aria-label="Project list">
        <div className="container">
          <div className="toolbar">
            <FilterBar id="projects" label="Filter by category" options={cats} value={cat} onChange={setCat} />
            <label className="search">
              <span className="sr-only">Search projects</span>
              <input type="search" placeholder="Search projects…" value={q} onChange={(e) => setQ(e.target.value)} />
            </label>
          </div>
          <p className="result-count" aria-live="polite">{list.length} project{list.length === 1 ? '' : 's'}</p>
          <motion.div layout className="grid-projects">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <motion.div key={p.slug} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.5, delay: i * 0.04 }}>
                  <ProjectCard project={p} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {list.length === 0 && (
            <div className="empty">
              <p>No projects match your search.</p>
              <Button variant="ghost" onClick={() => (setQ(''), setCat('All'))} arrow={false}>Clear filters</Button>
            </div>
          )}
          <div className="center-cta">
            <Button to="/products" variant="ghost">Explore our products</Button>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
