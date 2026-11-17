import { useDeferredValue, useMemo, useState } from 'react';
import { Seo } from '../../components/common/Seo';
import { PageHero } from '../../components/common/PageHero';
import { FilterBar } from '../../components/ui/FilterBar';
import { HeroCollage } from '../../components/blocks/HeroCollage';
import { ProjectOrbit } from '../../components/projects/ProjectOrbit';
import { CaseCard } from '../../components/cards/CaseCard';
import { Reveal } from '../../components/animations/Reveal';
import { CtaBand } from '../../components/common/CtaBand';
import { Button } from '../../components/ui/Button';
import { categoriesOf, projects, type ProjectCategory } from '../../data';

/** Filters appear from 6 projects, search from 10 — so a small portfolio never looks empty. */
const FILTERS_FROM = 6;
const SEARCH_FROM = 10;

export default function Projects() {
  const [cat, setCat] = useState<ProjectCategory | 'All'>('All');
  const [q, setQ] = useState('');
  const query = useDeferredValue(q.trim().toLowerCase());
  const cats = useMemo(() => categoriesOf(projects), []);
  const showFilters = projects.length >= FILTERS_FROM && cats.length > 1;
  const showSearch = projects.length >= SEARCH_FROM;
  const list = projects.filter(
    (p) => (cat === 'All' || p.category === cat) && (!query || [p.title, p.client, p.summary, p.category, ...(p.technologies ?? [])].join(' ').toLowerCase().includes(query)),
  );

  return (
    <>
      <Seo title="Projects" description="Case studies from CHTS — web platforms, education technology, AI solutions and mobile apps built for clients in Bangladesh, Malaysia, Australia and the UK." />
      <PageHero
        eyebrow="Projects"
        title="Selected *client* work."
        lead="Platforms we’ve designed, built and supported for our clients — each with the problem, the build and the result."
        crumbs={[{ to: '/projects', label: 'Projects' }]}
        visual={<HeroCollage variant="collage" images={projects.map((p) => ({ src: p.thumbnail, alt: `${p.title} — screenshot`, seed: p.slug }))} />}
      />

      {/* Orbit = the "wow" overview; case-study cards below carry the detail. */}
      {projects.length > 1 && (
        <section className="section section--tight" aria-label="Projects in orbit">
          <div className="container">
            <ProjectOrbit projects={projects} />
          </div>
        </section>
      )}

      <section className="section section--tight" aria-labelledby="cases-title">
        <div className="container">
          <div className="toolbar">
            <h2 id="cases-title" className="h-sub" style={{ margin: 0 }}>Case studies</h2>
            {(showFilters || showSearch) && (
              <div className="toolbar__tools">
                {showFilters && <FilterBar id="projects" label="Filter by category" options={cats} value={cat} onChange={setCat} />}
                {showSearch && (
                  <label className="search">
                    <span className="sr-only">Search projects</span>
                    <input type="search" placeholder="Search projects…" value={q} onChange={(e) => setQ(e.target.value)} />
                  </label>
                )}
              </div>
            )}
          </div>
          <Reveal className="case-grid" stagger={0.08}>
            {list.map((p) => (
              <div key={p.slug} data-reveal>
                <CaseCard project={p} headingLevel="h3" />
              </div>
            ))}
          </Reveal>
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
