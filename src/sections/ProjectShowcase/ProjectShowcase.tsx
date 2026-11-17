import { SectionHead } from '../../components/ui/SectionHead';
import { CaseCard } from '../../components/cards/CaseCard';
import { Reveal } from '../../components/animations/Reveal';
import { Button } from '../../components/ui/Button';
import { projects } from '../../data';

/** Featured client work — real screenshots in device frames, one metric each. */
export function ProjectShowcase() {
  const featured = projects.slice(0, 3);
  if (!featured.length) return null;
  return (
    <section className="section work" data-chapter="3" aria-labelledby="work-title">
      <div className="container">
        <SectionHead eyebrow="Featured projects" index="03" titleId="work-title" title="Work built *with* our clients." align="split" lead="Selected case studies — the problem, what we built and what changed for the business." />
        <Reveal className="case-grid" stagger={0.1}>
          {featured.map((p) => (
            <div key={p.slug} data-reveal>
              <CaseCard project={p} />
            </div>
          ))}
        </Reveal>
        <div className="center-cta">
          <Button to="/projects">All projects</Button>
          <Button to="/products" variant="ghost">Our products</Button>
        </div>
      </div>
    </section>
  );
}
