import { useDeferredValue, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { Seo } from '../../components/common/Seo';
import { PageHero } from '../../components/common/PageHero';
import { FilterBar } from '../../components/ui/FilterBar';
import { usePortalDim } from '../../hooks/usePortalDim';
import { ProjectOrbit } from '../../components/projects/ProjectOrbit';
import { CtaBand } from '../../components/common/CtaBand';
import { Button } from '../../components/ui/Button';
import { categoriesOf, projects, type ProjectCategory } from '../../data';

export default function Projects() {
  usePortalDim(0.85);
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
          {list.length > 0 && <ProjectOrbit projects={list} />}

          {list.length > 0 && (
            <ol className="orbit-index" aria-label="Project index">
              {list.map((p, i) => (
                <li key={p.slug}>
                  <Link to={`/projects/${p.slug}`}>
                    <span className="orbit-index__num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="orbit-index__title">{p.title}</span>
                    <span className="orbit-index__meta">{p.category}</span>
                    <span className="orbit-index__meta">{p.client ?? '—'}</span>
                    <span className="orbit-index__arrow" aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ol>
          )}
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
