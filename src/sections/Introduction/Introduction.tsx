import { Eyebrow } from '../../components/ui/Eyebrow';
import { SplitText } from '../../components/animations/SplitText';
import { Reveal } from '../../components/animations/Reveal';
import { StatsBar } from '../../components/blocks/StatsBar';
import { company, industries } from '../../data';

/** Who we are → who we serve → proof. (Mission/vision now live on the About page.) */
export function Introduction() {
  return (
    <section className="section intro" data-chapter="1" aria-labelledby="intro-title">
      <div className="container">
        <Eyebrow index="01">Who we are</Eyebrow>
        <SplitText id="intro-title" className="intro__title" text="Technology *meets* possibility." />
        <div className="intro__grid">
          <Reveal className="intro__body">
            <p className="intro__lead">
              CHTS designs, builds and supports software for growing businesses — custom platforms when you need something unique, ready systems when you need to move fast.
            </p>
            <p>{company.description}</p>
          </Reveal>
          <Reveal as="ul" className="industries" aria-label="Industries we serve" stagger={0.06}>
            {industries.map((i) => (
              <li key={i.name} data-reveal>
                <h3>{i.name}</h3>
                <p>{i.text}</p>
              </li>
            ))}
          </Reveal>
        </div>
        <StatsBar className="intro__stats" limit={4} />
      </div>
    </section>
  );
}
