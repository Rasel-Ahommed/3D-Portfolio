import { useState } from 'react';
import { Seo } from '../../components/common/Seo';
import { PageHero } from '../../components/common/PageHero';
import { ContactForm } from '../../components/forms/ContactForm';
import { ContactDetails } from '../../components/common/ContactDetails';
import { Reveal } from '../../components/animations/Reveal';
import { contact, company } from '../../data';

export default function Contact() {
  const [mapOn, setMapOn] = useState(false);
  return (
    <>
      <Seo
        title="Contact"
        description={`Contact ${company.name}: ${contact.email}, ${contact.phone}. ${contact.address.line1}, ${contact.address.city} ${contact.address.postcode}.`}
        jsonLd={{ '@type': 'ContactPage', mainEntity: { '@type': 'Organization', name: company.name, email: contact.email, telephone: contact.phone } }}
      />
      <PageHero eyebrow="Contact" title="Have an idea? Let’s build something *extraordinary.*" lead="Tell us about your project. You’ll hear back within one business day, with a roadmap and timeline within 48 hours of our first call." crumbs={[{ to: '/contact', label: 'Contact' }]} />
      <section className="section section--tight" aria-label="Contact form and details">
        <div className="container contact-grid">
          <Reveal className="cta__form-card">
            <h2 className="h-sub">Project enquiry</h2>
            <ContactForm showBudget />
          </Reveal>
          <Reveal className="contact-side">
            <ContactDetails />
            <div className="map">
              {mapOn ? (
                <iframe
                  title={`Map of ${contact.address.line1}, ${contact.address.city}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <button type="button" className="map__load" onClick={() => setMapOn(true)}>
                  <span>Show office on Google Maps</span>
                  <small>Loads content from Google</small>
                </button>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
