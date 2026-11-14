import { Reveal } from '../../components/animations/Reveal';
import { SplitText } from '../../components/animations/SplitText';
import { Eyebrow } from '../../components/ui/Eyebrow';
import { Button } from '../../components/ui/Button';
import { jobs } from '../../data';

export function CareersTeaser() {
  return (
    <section className="section careers-teaser" data-chapter="4" aria-labelledby="careers-title">
      <div className="container careers-teaser__inner">
        <div>
          <Eyebrow index="09">Careers</Eyebrow>
          <SplitText id="careers-title" text="Build what’s *next* with us." />
        </div>
        <Reveal className="careers-teaser__body">
          <p>
            We look for engineers, designers and problem-solvers who care about clean code, elegant design and the people who use what they build.
          </p>
          <p className="careers-teaser__status">
            {jobs.length > 0 ? `${jobs.length} open position${jobs.length > 1 ? 's' : ''}` : 'No open roles right now — open applications are always welcome.'}
          </p>
          <Button to="/careers">{jobs.length > 0 ? 'View openings' : 'Send an open application'}</Button>
        </Reveal>
      </div>
    </section>
  );
}
