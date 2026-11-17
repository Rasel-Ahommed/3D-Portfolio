import { Link } from 'react-router';
import { SmartImage } from '../common/SmartImage';
import { DraftBadge } from '../common/Pending';
import { DeviceFrame } from '../blocks/DeviceFrame';
import type { Project } from '../../data';

/** Case-study card: screenshot in a dark device frame + one result metric. */
export function CaseCard({ project: p, headingLevel = 'h3' }: { project: Project; headingLevel?: 'h2' | 'h3' }) {
  const H = headingLevel;
  return (
    <article className="case">
      <Link to={`/projects/${p.slug}`} className="case__link">
        <DeviceFrame kind={p.device ?? 'browser'} url={p.url}>
          <SmartImage src={p.thumbnail} alt={`${p.title} — screenshot`} seed={p.slug} ratio={p.device === 'phone' ? 9 / 19 : 16 / 10} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
        </DeviceFrame>
        <div className="case__body">
          <p className="case__meta">
            <span>{p.category}</span>
            {p.country && <span>{p.country}</span>}
          </p>
          <H className="case__title">
            {p.title} <DraftBadge draft={p.draft} />
          </H>
          {p.client && <p className="case__client">for {p.client}</p>}
          {p.metric && (
            <p className="case__metric">
              <strong>{p.metric.value}</strong> {p.metric.label}
            </p>
          )}
          <span className="case__more" aria-hidden>
            Read case study <i>→</i>
          </span>
        </div>
      </Link>
    </article>
  );
}
