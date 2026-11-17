import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { SplitText } from '../animations/SplitText';
import { Eyebrow } from '../ui/Eyebrow';

type Crumb = { to: string; label: string };

export function PageHero({ eyebrow, title, lead, crumbs, children, visual }: { eyebrow: string; title: string; lead?: ReactNode; crumbs?: Crumb[]; children?: ReactNode; /** Page-specific visual shown beside the title on wide screens. */ visual?: ReactNode }) {
  return (
    <section className={visual ? 'page-hero page-hero--visual' : 'page-hero'}>
      <div className="container page-hero__grid">
        <div className="page-hero__text">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="crumbs">
            <ol>
              <li><Link to="/">Home</Link></li>
              {crumbs.map((c, i) => (
                <li key={c.to}>{i === crumbs.length - 1 ? <span aria-current="page">{c.label}</span> : <Link to={c.to}>{c.label}</Link>}</li>
              ))}
            </ol>
          </nav>
        )}
        <Eyebrow>{eyebrow}</Eyebrow>
        <SplitText as="h1" text={title} trigger="mount" className="page-hero__title" />
        {lead && (
          <motion.p className="page-hero__lead" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
            {lead}
          </motion.p>
        )}
        {children && (
          <motion.div className="page-hero__extra" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.35 }}>
            {children}
          </motion.div>
        )}
        </div>
        {visual && <div className="page-hero__visual">{visual}</div>}
      </div>
    </section>
  );
}
