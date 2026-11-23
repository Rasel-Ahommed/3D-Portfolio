import { Link, useParams } from 'react-router';
import { Seo } from '../../components/common/Seo';
import { PageHero } from '../../components/common/PageHero';
import { RevealImage } from '../../components/animations/RevealImage';
import { Reveal } from '../../components/animations/Reveal';
import { Pending, DraftBadge } from '../../components/common/Pending';
import { ProjectCard } from '../../components/cards/ProjectCard';
import { CtaBand } from '../../components/common/CtaBand';
import { Button } from '../../components/ui/Button';
import NotFound from '../NotFound/NotFound';
import { projects, testimonials } from '../../data';

export default function ProjectDetails() {
  const { slug } = useParams();
  const idx = projects.findIndex((p) => p.slug === slug);
  const p = projects[idx];
  if (!p) return <NotFound />;
  const next = projects[(idx + 1) % projects.length];
  const related = projects.filter((x) => x.slug !== p.slug).sort((a) => (a.category === p.category ? -1 : 1)).slice(0, 2);
  const quote = testimonials.find((t) => t.id === p.testimonialId);
  const story = [
    ['Challenge', p.challenge],
    ['Approach', p.approach],
    ['Solution', p.solution],
    ['Results', p.outcome],
  ] as const;

  return (
    <>
      <Seo
        title={p.title}
        description={p.summary}
        image={p.thumbnail}
        jsonLd={{ '@type': 'CreativeWork', name: p.title, description: p.summary, creator: { '@type': 'Organization', name: 'Classical Hunter Tech Solutions LTD' }, ...(p.url ? { url: p.url } : {}) }}
      />
      <PageHero eyebrow={p.category} title={p.title} lead={p.summary} crumbs={[{ to: '/projects', label: 'Projects' }, { to: `/projects/${p.slug}`, label: p.title }]}>
        <DraftBadge draft={p.draft} />
      </PageHero>

      <section className="container detail-hero">
        <RevealImage src={p.thumbnail} alt={`${p.title} — project preview`} seed={p.slug} ratio="21 / 9" priority />
      </section>

      <section className="section section--tight">
        <div className="container detail">
          <aside className="detail__meta" aria-label="Project facts">
            <dl>
              {p.client && (
                <div>
                  <dt>Client</dt>
                  <dd>{p.client}</dd>
                </div>
              )}
              <div>
                <dt>Category</dt>
                <dd>{p.category}</dd>
              </div>
              {p.status && (
                <div>
                  <dt>Status</dt>
                  <dd>{p.status}</dd>
                </div>
              )}
              {p.technologies && (
                <div>
                  <dt>Technologies</dt>
                  <dd>
                    <ul className="tags">{p.technologies.map((t) => <li key={t}>{t}</li>)}</ul>
                  </dd>
                </div>
              )}
            </dl>
            {p.url && <Button href={p.url} external>Visit website</Button>}
          </aside>

          <div className="detail__body">
            <Reveal>
              <h2 className="detail__h">Overview</h2>
              <p className="detail__lead">{p.description ?? p.summary}</p>
            </Reveal>
            {story.map(([label, text]) =>
              text ? (
                <Reveal key={label}>
                  <h2 className="detail__h">{label}</h2>
                  <p>{text}</p>
                </Reveal>
              ) : null,
            )}
            {!p.challenge && !p.solution && (
              <Pending file="src/data/projects.ts">Challenge, approach, solution and verified results for this case study.</Pending>
            )}
            {!p.technologies && <Pending file="src/data/projects.ts">Technologies used.</Pending>}
            {quote && (
              <Reveal as="figure" className="detail__quote">
                <blockquote><p>“{quote.quote}”</p></blockquote>
                <figcaption>
                  <strong>{quote.name}</strong> — {quote.designation}, {quote.company}
                </figcaption>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {p.gallery && p.gallery.length > 0 ? (
        <section className="section section--tight" aria-label="Gallery">
          <div className="container gallery">
            {p.gallery.map((g, i) => (
              <RevealImage key={g} src={g} alt={`${p.title} screenshot ${i + 1}`} ratio={i % 3 === 0 ? '16 / 9' : '4 / 3'} />
            ))}
          </div>
        </section>
      ) : (
        <div className="container">
          <Pending file="src/data/projects.ts">Project screenshots for the gallery (thumbnail + gallery fields).</Pending>
        </div>
      )}

      {related.length > 0 && (
        <section className="section" aria-labelledby="rel-title">
          <div className="container">
            <div className="row-between">
              <h2 id="rel-title" className="h-sub">Related projects</h2>
              {next && next.slug !== p.slug && <Link to={`/projects/${next.slug}`} className="link-arrow">Next project: {next.title} →</Link>}
            </div>
            <div className="related__grid">
              {related.map((r) => (
                <ProjectCard key={r.slug} project={r} />
              ))}
            </div>
          </div>
        </section>
      )}
      <CtaBand />
    </>
  );
}
