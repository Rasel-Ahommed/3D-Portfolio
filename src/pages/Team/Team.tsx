import { Seo } from '../../components/common/Seo';
import { PageHero } from '../../components/common/PageHero';
import { TeamCard } from '../../components/cards/TeamCard';
import { TeamGallery } from '../../components/team/TeamGallery';
import { HeroCollage } from '../../components/blocks/HeroCollage';
import { Reveal } from '../../components/animations/Reveal';
import { CtaBand } from '../../components/common/CtaBand';
import { team } from '../../data';

export default function Team() {
  return (
    <>
      <Seo
        title="Team"
        description={`Meet the CHTS team: ${team.map((m) => `${m.name} (${m.role})`).join(', ')}.`}
        jsonLd={{
          '@type': 'Organization',
          name: 'Classical Hunter Tech Solutions LTD',
          employee: team.map((m) => ({ '@type': 'Person', name: m.name, jobTitle: m.role, sameAs: m.socials?.map((s) => s.href) })),
        }}
      />
      <PageHero
        eyebrow="Team"
        title="The people *behind* CHTS."
        lead="Leadership, engineering and partnerships — a focused team that stays with every project from first call to long after launch."
        crumbs={[{ to: '/team', label: 'Team' }]}
        visual={<HeroCollage variant="strip" images={team.map((m) => ({ src: m.portrait, alt: `Portrait of ${m.name}, ${m.role}`, seed: `team-${m.slug}` }))} />}
      />

      {/* Directory first: every name, role, bio and link visible without interaction */}
      <section className="section section--tight" aria-labelledby="directory-title">
        <div className="container">
          <h2 id="directory-title" className="h-sub">Team directory</h2>
          <Reveal className="team-grid team-grid--page" stagger={0.08}>
            {team.map((m) => (
              <div key={m.slug} data-reveal>
                <TeamCard member={m} />
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {team.length > 2 && (
        <section className="section section--tight" aria-label="Team gallery">
          <div className="container">
            <TeamGallery members={team} />
          </div>
        </section>
      )}

      <CtaBand title="Want to *join* us?" text="We’re always happy to hear from talented engineers and designers." ctaLabel="See careers" ctaTo="/careers" />
    </>
  );
}
