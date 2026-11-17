import { SectionHead } from '../../components/ui/SectionHead';
import { TeamGallery } from '../../components/team/TeamGallery';
import { Button } from '../../components/ui/Button';
import { team } from '../../data';

export function TeamShowcase() {
  return (
    <section className="section team-sec" data-chapter="4" aria-labelledby="team-title">
      <div className="container">
        <SectionHead eyebrow="The team" index="08" titleId="team-title" title="The people *behind* the work." align="split" lead="A focused team of engineers and partners who stay with a project from first call to long after launch." />
        <TeamGallery members={team} />
        <div className="center-cta">
          <Button to="/team" variant="ghost">Meet the team</Button>
        </div>
      </div>
    </section>
  );
}
