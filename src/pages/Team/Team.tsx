import { Seo } from '../../components/common/Seo';
import { PageHero } from '../../components/common/PageHero';
import { TeamCard } from '../../components/cards/TeamCard';
import { Reveal } from '../../components/animations/Reveal';
import { CtaBand } from '../../components/common/CtaBand';
import { Pending } from '../../components/common/Pending';
import { team } from '../../data';

export default function Team() {
  return (
    <>
      <Seo
        title="Team"
        description={`Meet the CHTS team: ${team.map((m) => `${m.name} (${m.role})`).join(', ')}.`}
        jsonLd={{ '@type': 'Organization', name: 'Classical Hunter Tech Solutions LTD', employee: team.map((m) => ({ '@type': 'Person', name: m.name, jobTitle: m.role })) }}
      />
      <PageHero eyebrow="Team" title="The people *behind* CHTS." lead="Leadership, engineering and partnerships — a focused team that stays with every project from first call to long after launch." crumbs={[{ to: '/team', label: 'Team' }]} />
      <section className="section section--tight" aria-label="Team members">
        <div className="container">
          <Reveal className="team-grid team-grid--page" stagger={0.1}>
            {team.map((m) => (
              <div key={m.slug} data-reveal>
                <TeamCard member={m} headingLevel="h2" />
              </div>
            ))}
          </Reveal>
          <Pending file="src/data/people.ts">Additional team members and longer biographies, if you want to publish them.</Pending>
        </div>
      </section>
      <CtaBand title="Want to *join* us?" text="We’re always happy to hear from talented engineers and designers." />
    </>
  );
}
