import { Seo } from '../../components/common/Seo';
import { PageHero } from '../../components/common/PageHero';
import { ContactForm } from '../../components/forms/ContactForm';
import { ContactDetails } from '../../components/common/ContactDetails';
import { TimeZones } from '../../components/blocks/TimeZones';
import { Reveal } from '../../components/animations/Reveal';
import { contact, company } from '../../data';

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact"
        description={`Contact ${company.name}: ${contact.email}, ${contact.phone}. ${contact.address.line1}, ${contact.address.city} ${contact.address.postcode}.`}
        jsonLd={{ '@type': 'ContactPage', mainEntity: { '@type': 'Organization', name: company.name, email: contact.email, telephone: contact.phone } }}
      />
      <PageHero eyebrow="Contact" title="Have an idea? Let’s build something *extraordinary.*" lead="Tell us about your project. You’ll get a roadmap and timeline within 48 hours of our first call." crumbs={[{ to: '/contact', label: 'Contact' }]} />
      <section className="section section--tight" aria-label="Contact form and details">
        <div className="container contact-grid">
          <Reveal className="cta__form-card">
            <h2 className="h-sub">Project enquiry</h2>
            <ContactForm showBudget />
          </Reveal>
          <Reveal className="contact-side">
            <ContactDetails />
            <div className="contact-hours">
              <h2 className="label-h">Office hours &amp; your time zone</h2>
              <TimeZones compact />
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section section--tight" aria-labelledby="map-title">
        <div className="container">
          <h2 id="map-title" className="h-sub">Find us</h2>
          <div className="map map--wide">
            <iframe
              title={`Map of ${contact.address.line1}, ${contact.address.city}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="muted-p">
            {contact.address.line1}, {contact.address.city} {contact.address.postcode}, {contact.address.country} ·{' '}
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapQuery)}`} target="_blank" rel="noopener noreferrer">Open in Google Maps ↗</a>
          </p>
        </div>
      </section>
    </>
  );
}
