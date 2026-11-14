import { SmartImage } from '../common/SmartImage';
import type { TeamMember } from '../../data';

export function TeamCard({ member, headingLevel = 'h3' }: { member: TeamMember; headingLevel?: 'h2' | 'h3' }) {
  const H = headingLevel;
  return (
    <article className="member" id={member.slug}>
      <div className="member__photo">
        <SmartImage src={member.portrait} alt={`Portrait of ${member.name}`} seed={member.name} />
      </div>
      <div className="member__body">
        <H className="member__name">{member.name}</H>
        <p className="member__role">{member.role}</p>
        <p className="member__bio">{member.bio}</p>
        {member.socials && member.socials.length > 0 && (
          <ul className="member__socials">
            {member.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on ${s.label}`}>{s.label}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
