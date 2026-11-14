import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { SplitText } from '../animations/SplitText';
import { Eyebrow } from '../ui/Eyebrow';
import { useUi } from '../../scenes/store';

type Crumb = { to: string; label: string };

export function PageHero({ eyebrow, title, lead, crumbs, children }: { eyebrow: string; title: string; lead?: ReactNode; crumbs?: Crumb[]; children?: ReactNode }) {
  const intro = useUi((s) => s.introDone);
  return (
    <section className="page-hero">
      <div className="container">
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
        <SplitText as="h1" text={title} trigger="intro" className="page-hero__title" />
        {lead && (
          <motion.p className="page-hero__lead" initial={{ opacity: 0, y: 20 }} animate={intro ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}>
            {lead}
          </motion.p>
        )}
        {children && (
          <motion.div className="page-hero__extra" initial={{ opacity: 0 }} animate={intro ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 0.7 }}>
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
