import { Seo } from '../../components/common/Seo';
import { PageHero } from '../../components/common/PageHero';
import { Pending } from '../../components/common/Pending';
import { company, contact } from '../../data';

/**
 * Baseline policies describing what this website actually does.
 * Have them reviewed by your legal adviser before relying on them.
 */
export default function Legal({ kind }: { kind: 'privacy' | 'terms' }) {
  const privacy = kind === 'privacy';
  return (
    <>
      <Seo title={privacy ? 'Privacy policy' : 'Terms & conditions'} description={`${privacy ? 'Privacy policy' : 'Website terms and conditions'} for ${company.name}.`} />
      <PageHero eyebrow="Legal" title={privacy ? 'Privacy policy' : 'Terms & conditions'} crumbs={[{ to: `/${kind}`, label: privacy ? 'Privacy policy' : 'Terms & conditions' }]} />
      <section className="section section--tight">
        <div className="container prose">
          <Pending>Have this policy reviewed by your legal adviser and add an effective date.</Pending>
          {privacy ? (
            <>
              <h2>Who we are</h2>
              <p>This website is operated by {company.name}, {contact.address.line1}, {contact.address.city} {contact.address.postcode}, {contact.address.country}. Contact: <a href={`mailto:${contact.email}`}>{contact.email}</a>.</p>
              <h2>What we collect</h2>
              <p>When you send an enquiry through our contact form we receive the details you provide: your name, email address and, optionally, phone number, company, service interest, budget range and project description.</p>
              <h2>How we use it</h2>
              <p>We use this information only to respond to your enquiry and, if you become a client, to deliver our services. We do not sell your personal information.</p>
              <h2>Third-party services</h2>
              <p>Enquiries may be delivered through an email or form-processing provider. If you choose to load the office map, Google Maps content is loaded from Google and subject to Google’s privacy policy. Some images are served from our main domain.</p>
              <h2>Retention and your rights</h2>
              <p>We keep enquiry information for as long as needed to respond and for our legitimate business records. You can ask us to access, correct or delete your information at any time by emailing <a href={`mailto:${contact.email}`}>{contact.email}</a>.</p>
              <h2>Cookies</h2>
              <p>This website does not use advertising or tracking cookies. Your browser may store minor preferences locally.</p>
            </>
          ) : (
            <>
              <h2>Use of this website</h2>
              <p>This website is provided by {company.name} for general information about our company, services and products. By using it you agree to these terms.</p>
              <h2>Content</h2>
              <p>We aim to keep information accurate and current but make no warranty that it is complete or error-free. Information on this website does not constitute a binding offer; project scope, pricing and terms are agreed in writing for each engagement.</p>
              <h2>Intellectual property</h2>
              <p>The CHTS name, logo and website content are owned by {company.name} unless stated otherwise. Client and product names belong to their respective owners.</p>
              <h2>External links</h2>
              <p>Links to product demos and third-party websites are provided for convenience. We are not responsible for the content of third-party websites.</p>
              <h2>Contact</h2>
              <p>Questions about these terms: <a href={`mailto:${contact.email}`}>{contact.email}</a>.</p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
