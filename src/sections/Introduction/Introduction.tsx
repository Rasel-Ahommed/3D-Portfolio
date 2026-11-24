import { Link } from 'react-router';
import { Eyebrow } from '../../components/ui/Eyebrow';
import { SplitText } from '../../components/animations/SplitText';
import { Reveal } from '../../components/animations/Reveal';
import { company } from '../../data';

export function Introduction() {
  return (
    <section className="section intro" data-chapter="1" aria-labelledby="intro-title">
      <div className="container">
        <Eyebrow index="01">Who we are</Eyebrow>
        <div className="intro__grid">
          <div className="intro__body">
            <SplitText id="intro-title" className="intro__title" text="Technology *meets* possibility." />
            <Reveal>
              <p className="intro__lead">
                CHTS is a technology partner for businesses that want to innovate, automate and transform how they work — from a first prototype to systems that run every day.
              </p>
            </Reveal>
          </div>
          {/* The entrance animation moves the wrapper; the hover slide stays on the card.
              Animating both on one element made GSAP read a mid-transition value and
              leave the cards stuck 48px low. */}
          <Reveal className="intro__cards" stagger={0.12}>
            <div data-reveal>
              <Link to="/about#mission" className="intro__card">
                <span className="intro__card-label">Mission</span>
                <p>{company.mission}</p>
                <span className="intro__card-more">Read more →</span>
              </Link>
            </div>
            <div data-reveal>
              <Link to="/about#vision" className="intro__card">
                <span className="intro__card-label">Vision</span>
                <p>{company.vision}</p>
                <span className="intro__card-more">Read more →</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
