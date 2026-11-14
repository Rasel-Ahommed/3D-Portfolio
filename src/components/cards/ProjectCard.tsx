import { useRef } from 'react';
import { Link } from 'react-router';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { SmartImage } from '../common/SmartImage';
import { DraftBadge } from '../common/Pending';
import type { Project } from '../../data';
import { cn } from '../../utils/cn';
import { isTouch } from '../../utils/env';

/** Project card with pointer-driven image drift (desktop) — works fully without hover. */
export function ProjectCard({ project, index, className, size = 'md' }: { project: Project; index?: number; className?: string; size?: 'md' | 'lg' }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });
  const x = useTransform(sx, (v) => `${v * -3}%`);
  const y = useTransform(sy, (v) => `${v * -3}%`);

  const onMove = (e: React.PointerEvent) => {
    if (isTouch() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <Link ref={ref} to={`/projects/${project.slug}`} className={cn('pcard', `pcard--${size}`, className)} onPointerMove={onMove} onPointerLeave={() => (mx.set(0), my.set(0))}>
      <div className="pcard__media">
        <motion.div className="pcard__img" style={{ x, y }}>
          <SmartImage src={project.thumbnail} alt={project.title} seed={project.slug} />
        </motion.div>
        <span className="pcard__view" aria-hidden>View project</span>
      </div>
      <div className="pcard__info">
        {index !== undefined && <span className="pcard__index">{String(index + 1).padStart(2, '0')}</span>}
        <div>
          <h3 className="pcard__title">
            {project.title} <DraftBadge draft={project.draft} />
          </h3>
          <p className="pcard__meta">
            <span>{project.category}</span>
            {project.client && <span>{project.client}</span>}
            {project.status && <span>{project.status}</span>}
          </p>
        </div>
      </div>
    </Link>
  );
}
