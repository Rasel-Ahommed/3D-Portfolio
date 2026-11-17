import { Seo } from '../../components/common/Seo';
import { PageHero } from '../../components/common/PageHero';
import { usePortalDim } from '../../hooks/usePortalDim';
import { TeamGallery } from '../../components/team/TeamGallery';
import { CtaBand } from '../../components/common/CtaBand';
import { Pending } from '../../components/common/Pending';
import { team } from '../../data';

export default function Team() {
  usePortalDim(0.85);
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
          <TeamGallery members={team} />
          <Pending file="src/data/people.ts">Additional team members and longer biographies, if you want to publish them.</Pending>
        </div>
      </section>
      <CtaBand title="Want to *join* us?" text="We’re always happy to hear from talented engineers and designers." />
    </>
  );
}
