import { Link, useParams } from 'react-router';
import { Seo } from '../../components/common/Seo';
import { PageHero } from '../../components/common/PageHero';
import { Reveal } from '../../components/animations/Reveal';
import { SmartImage } from '../../components/common/SmartImage';
import { Pending, DraftBadge } from '../../components/common/Pending';
import { DeviceFrame } from '../../components/blocks/DeviceFrame';
import { CaseCard } from '../../components/cards/CaseCard';
import { CtaBand } from '../../components/common/CtaBand';
import { Button } from '../../components/ui/Button';
import NotFound from '../NotFound/NotFound';
import { company, projects, testimonials } from '../../data';

/**
 * Case-study template: Problem → Approach → Solution → Result, with stack,
 * timeline, screenshots in device frames, client quote and live link.
 * Every block hides itself when its data is missing.
 */
export default function ProjectDetails() {
  const { slug } = useParams();
  const idx = projects.findIndex((p) => p.slug === slug);
  const p = projects[idx];
  if (!p) return <NotFound />;
  const next = projects[(idx + 1) % projects.length];
  const related = projects
    .filter((x) => x.slug !== p.slug)
    .sort((a, b) => Number(b.category === p.category) - Number(a.category === p.category))
    .slice(0, 3);
  const quote = testimonials.find((t) => t.id === p.testimonialId);
  const story = [
    ['01', 'The problem', p.challenge],
    ['02', 'Our approach', p.approach],
    ['03', 'The solution', p.solution],
    ['04', 'The result', p.outcome],
  ] as const;
  const hasStory = story.some(([, , t]) => t);
  const device = p.device ?? 'browser';

  return (
    <>
      <Seo
        title={p.title}
        description={p.summary}
        image={p.thumbnail}
        jsonLd={{
          '@type': 'CreativeWork',
          name: p.title,
          description: p.description ?? p.summary,
          creator: { '@type': 'Organization', name: company.name },
          ...(p.client ? { sourceOrganization: p.client } : {}),
          ...(p.url ? { url: p.url } : {}),
          ...(p.technologies ? { keywords: p.technologies.join(', ') } : {}),
        }}
      />
      <PageHero eyebrow={`Case study · ${p.category}`} title={p.title} lead={p.summary} crumbs={[{ to: '/projects', label: 'Projects' }, { to: `/projects/${p.slug}`, label: p.client ?? p.title }]}>
        <div className="hero-actions">
          {p.url && <Button href={p.url} external size="lg">Visit live site</Button>}
          {p.metric && (
            <p className="metric-chip">
              <strong>{p.metric.value}</strong> {p.metric.label}
            </p>
          )}
          <DraftBadge draft={p.draft} />
        </div>
      </PageHero>

      <section className="container detail-hero">
        <Reveal>
          <DeviceFrame kind={device} url={p.url} className="device--hero">
            <SmartImage src={p.thumbnail} alt={`${p.title} — main screen`} seed={p.slug} ratio={device === 'phone' ? 9 / 19 : 16 / 9} sizes="(max-width: 1440px) 100vw, 1440px" priority />
          </DeviceFrame>
        </Reveal>
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
              {p.country && (
                <div>
                  <dt>Country</dt>
                  <dd>{p.country}</dd>
                </div>
              )}
              <div>
                <dt>Category</dt>
                <dd>{p.category}</dd>
              </div>
              {p.timeline && (
                <div>
                  <dt>Timeline</dt>
                  <dd>{p.timeline}</dd>
                </div>
              )}
              {p.status && (
                <div>
                  <dt>Status</dt>
                  <dd>{p.status}</dd>
                </div>
              )}
              {p.technologies && (
                <div>
                  <dt>Stack</dt>
                  <dd>
                    <ul className="tags">{p.technologies.map((t) => <li key={t}>{t}</li>)}</ul>
                  </dd>
                </div>
              )}
            </dl>
            {p.url && <Button href={p.url} external variant="ghost">Live site</Button>}
          </aside>

          <div className="detail__body">
            <Reveal>
              <h2 className="detail__h">Overview</h2>
              <p className="detail__lead">{p.description ?? p.summary}</p>
            </Reveal>

            {hasStory && (
              <ol className="story-steps">
                {story.map(([n, label, text]) =>
                  text ? (
                    <Reveal as="li" key={label}>
                      <span className="story-steps__n">{n}</span>
                      <div>
                        <h2 className="detail__h">{label}</h2>
                        <p>{text}</p>
                        {n === '04' && p.metric && (
                          <p className="metric-big">
                            <strong>{p.metric.value}</strong>
                            <span>{p.metric.label}</span>
                          </p>
                        )}
                      </div>
                    </Reveal>
                  ) : null,
                )}
              </ol>
            )}
            {!hasStory && <Pending file="src/data/projects.ts">challenge, approach, solution, outcome and a verified metric for this case study.</Pending>}
            {!p.technologies && <Pending file="src/data/projects.ts">technologies (stack), timeline and country.</Pending>}

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

      {p.gallery && p.gallery.length > 0 && (
        <section className="section section--tight" aria-labelledby="shots-title">
          <div className="container">
            <h2 id="shots-title" className="h-sub">Screens</h2>
            <div className="gallery">
              {p.gallery.map((g, i) => (
                <Reveal key={g}>
                  <DeviceFrame kind={device}>
                    <SmartImage src={g} alt={`${p.title} — screen ${i + 1}`} seed={`${p.slug}-${i}`} ratio={device === 'phone' ? 9 / 19 : i % 3 === 0 ? 16 / 9 : 4 / 3} sizes={i % 3 === 0 ? '(max-width: 1440px) 100vw, 1440px' : '(max-width: 900px) 100vw, 50vw'} />
                  </DeviceFrame>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="section" aria-labelledby="rel-title">
          <div className="container">
            <div className="row-between">
              <h2 id="rel-title" className="h-sub">More case studies</h2>
              {next && next.slug !== p.slug && <Link to={`/projects/${next.slug}`} className="link-arrow">Next: {next.title} →</Link>}
            </div>
            <div className="case-grid">
              {related.map((r) => (
                <CaseCard key={r.slug} project={r} />
              ))}
            </div>
          </div>
        </section>
      )}
      <CtaBand />
    </>
  );
}
