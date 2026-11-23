import { SplitText } from '../animations/SplitText';
import { Button } from '../ui/Button';

export function CtaBand({ title = 'Have an idea? Let’s build something *extraordinary.*', text = 'Tell us what you’re planning — you’ll get a roadmap and timeline within 48 hours.' }: { title?: string; text?: string }) {
  return (
    <section className="cta-band" aria-label="Start a project">
      <div className="container cta-band__inner">
        <SplitText text={title} className="cta-band__title" />
        <div className="cta-band__side">
          <p>{text}</p>
          <Button to="/contact" size="lg">Start a project</Button>
        </div>
      </div>
    </section>
  );
}
