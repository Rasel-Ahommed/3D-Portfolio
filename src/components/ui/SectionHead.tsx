import type { ReactNode } from 'react';
import { Eyebrow } from './Eyebrow';
import { SplitText } from '../animations/SplitText';
import { Reveal } from '../animations/Reveal';
import { cn } from '../../utils/cn';

type Props = { eyebrow: string; index?: string; title: string; lead?: ReactNode; align?: 'left' | 'split'; as?: 'h1' | 'h2'; className?: string; titleId?: string };

export function SectionHead({ eyebrow, index, title, lead, align = 'left', as = 'h2', className, titleId }: Props) {
  return (
    <header className={cn('section-head', `section-head--${align}`, className)}>
      <div>
        <Eyebrow index={index}>{eyebrow}</Eyebrow>
        <SplitText as={as} text={title} className="section-head__title" id={titleId} />
      </div>
      {lead && (
        <Reveal className="section-head__lead">
          <p>{lead}</p>
        </Reveal>
      )}
    </header>
  );
}
