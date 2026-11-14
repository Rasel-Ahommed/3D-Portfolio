import { SplitText } from '../../components/animations/SplitText';
import { Eyebrow } from '../../components/ui/Eyebrow';
import { Reveal } from '../../components/animations/Reveal';
import { ContactForm } from '../../components/forms/ContactForm';
import { ContactDetails } from '../../components/common/ContactDetails';

export function ContactCTA() {
  return (
    <section className="section cta" data-chapter="5" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta__head">
          <Eyebrow index="10">Start a project</Eyebrow>
          <SplitText id="cta-title" className="cta__title" text="Have an idea? Let’s build something *extraordinary.*" />
        </div>
        <Reveal className="cta__grid">
          <div className="cta__form-card">
            <ContactForm />
          </div>
          <ContactDetails />
        </Reveal>
      </div>
    </section>
  );
}
