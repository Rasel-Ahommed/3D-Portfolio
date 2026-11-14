import { useRef } from 'react';
import { Seo } from '../../components/common/Seo';
import { useChapters } from '../../hooks/useChapters';
import { Hero } from '../../sections/Hero/Hero';
import { Introduction } from '../../sections/Introduction/Introduction';
import { ServiceShowcase } from '../../sections/ServiceShowcase/ServiceShowcase';
import { ProjectShowcase } from '../../sections/ProjectShowcase/ProjectShowcase';
import { Technology } from '../../sections/Technology/Technology';
import { WhyChts } from '../../sections/WhyChts/WhyChts';
import { ProductShowcase } from '../../sections/ProductShowcase/ProductShowcase';
import { Testimonials } from '../../sections/Testimonials/Testimonials';
import { TeamShowcase } from '../../sections/TeamShowcase/TeamShowcase';
import { CareersTeaser } from '../../sections/CareersTeaser/CareersTeaser';
import { ContactCTA } from '../../sections/ContactCTA/ContactCTA';
import { company } from '../../data';

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  useChapters(ref);
  return (
    <div ref={ref} className="home">
      <Seo
        title="CHTS — Classical Hunter Tech Solutions | Custom Software, AI & Automation"
        description={`${company.tagline}. CHTS builds custom software, AI automation, SaaS platforms, mobile apps and websites for businesses in Bangladesh and worldwide.`}
      />
      <Hero />
      <Introduction />
      <ServiceShowcase />
      <ProjectShowcase />
      <Technology />
      <WhyChts />
      <ProductShowcase />
      <Testimonials />
      <TeamShowcase />
      <CareersTeaser />
      <ContactCTA />
    </div>
  );
}
