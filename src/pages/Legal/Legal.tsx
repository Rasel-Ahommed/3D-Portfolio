import { Seo } from '../../components/common/Seo';
import { PageHero } from '../../components/common/PageHero';
import { Pending } from '../../components/common/Pending';
import { TableOfContents } from '../../components/blog/TableOfContents';
import { company, contact } from '../../data';

/**
 * Privacy policy & terms, written to describe what this website actually does and
 * to cover UK GDPR / Data Protection Act 2018 and the Australian Privacy Act 1988
 * expectations for overseas visitors. Have them reviewed by a lawyer before relying on them.
 */
const EFFECTIVE_DATE = '17 November 2026'; // update whenever the text changes
const POLICY_EMAIL = contact.email;

type Section = { id: string; title: string; body: React.ReactNode };

const addr = `${contact.address.line1}, ${contact.address.city} ${contact.address.postcode}, ${contact.address.country}`;

const privacy: Section[] = [
  { id: 'who-we-are', title: '1. Who we are', body: <p>{company.name} (“CHTS”, “we”, “us”) operates this website and is the data controller for personal information collected through it. Address: {addr}. Contact: <a href={`mailto:${POLICY_EMAIL}`}>{POLICY_EMAIL}</a>.</p> },
  {
    id: 'what-we-collect',
    title: '2. Information we collect',
    body: (
      <>
        <p><strong>Information you give us:</strong> when you send an enquiry or a job application we receive what you enter — name, email, phone (optional), company (optional), service interest, budget and timeline (optional), project details, and for applications a link to your CV or portfolio.</p>
        <p><strong>Information collected automatically:</strong> our hosting provider records standard server logs (IP address, browser type, pages requested, date and time) for security and troubleshooting. This website does not use advertising or analytics cookies.</p>
      </>
    ),
  },
  {
    id: 'how-we-use',
    title: '3. How and why we use it (lawful bases)',
    body: (
      <ul>
        <li>To reply to your enquiry and prepare a proposal — <em>steps prior to entering a contract</em> / <em>legitimate interests</em>.</li>
        <li>To deliver services if you become a client — <em>performance of a contract</em>.</li>
        <li>To assess job applications — <em>legitimate interests</em> and, where required, your consent.</li>
        <li>To keep the website secure — <em>legitimate interests</em>.</li>
        <li>To meet legal obligations such as accounting records — <em>legal obligation</em>.</li>
      </ul>
    ),
  },
  {
    id: 'sharing',
    title: '4. Who we share it with',
    body: (
      <>
        <p>We do not sell personal information. We share it only with service providers that help us run the website and our business, under contract and only for these purposes:</p>
        <ul>
          <li>Website hosting and email delivery providers (form submissions are delivered by email).</li>
          <li>A form-processing service, if one is configured for this site.</li>
          <li>Google (Maps embed on the Contact page) and picsum.photos (placeholder images) — these load content from their servers, which receive your IP address.</li>
          <li>Professional advisers or authorities where the law requires it.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'international',
    title: '5. International transfers',
    body: <p>We are based in Bangladesh and our providers may process data in other countries. Where we receive personal information from the UK, EU or Australia, we take reasonable steps — including contractual safeguards with providers — so that it is protected to a standard comparable to the UK GDPR and the Australian Privacy Principles.</p>,
  },
  {
    id: 'retention',
    title: '6. How long we keep it',
    body: (
      <ul>
        <li>Enquiries that don’t lead to work: up to 24 months, then deleted.</li>
        <li>Client records: for the duration of the engagement plus the period required by tax and accounting law.</li>
        <li>Job applications: up to 12 months, unless you ask us to delete them sooner.</li>
        <li>Server logs: kept by our host for a limited period for security purposes.</li>
      </ul>
    ),
  },
  {
    id: 'rights',
    title: '7. Your rights',
    body: (
      <>
        <p>Depending on where you live, you may have the right to access, correct or delete your personal information, to object to or restrict its use, to data portability, and to withdraw consent. Australian residents may request access and correction under the Australian Privacy Principles.</p>
        <p>Email <a href={`mailto:${POLICY_EMAIL}`}>{POLICY_EMAIL}</a> — we respond within one month. If you are not satisfied, you can complain to the UK Information Commissioner’s Office (ico.org.uk) or the Office of the Australian Information Commissioner (oaic.gov.au).</p>
      </>
    ),
  },
  { id: 'security', title: '8. Security', body: <p>We use HTTPS, access controls and reputable providers to protect personal information. No method of transmission over the internet is completely secure, but we work to protect your data and will notify you and regulators of a qualifying breach where the law requires.</p> },
  { id: 'cookies', title: '9. Cookies and local storage', body: <p>We do not set advertising or tracking cookies. Your browser may store small preferences (for example sound on/off) locally on your device; these never leave your device.</p> },
  { id: 'children', title: '10. Children', body: <p>This website is intended for businesses and job applicants aged 18 or over. We do not knowingly collect information from children.</p> },
  { id: 'changes', title: '11. Changes to this policy', body: <p>We will update this page when our practices change and show the new effective date at the top.</p> },
];

const terms: Section[] = [
  { id: 'about', title: '1. About these terms', body: <p>These terms govern your use of this website, operated by {company.name}, {addr}. By using the website you agree to them. They do not govern client projects — those are covered by a separate written agreement.</p> },
  { id: 'content', title: '2. Website content', body: <p>Content is provided for general information about our company, services and products. We aim to keep it accurate and current but do not guarantee that it is complete or error-free. Nothing on this website is a binding offer; scope, price and terms are agreed in writing for each engagement.</p> },
  { id: 'ip', title: '3. Intellectual property', body: <p>The CHTS name, logo, design and original website content belong to {company.name} unless stated otherwise. Client names, product names and third-party marks belong to their respective owners. You may view and share pages for personal or internal business use, but not copy or republish substantial parts without permission.</p> },
  { id: 'demos', title: '4. Product demos', body: <p>Live demos are provided for evaluation only, may be reset at any time and must not be used to store real or sensitive data. Licences for our products are granted under their own licence terms.</p> },
  {
    id: 'acceptable-use',
    title: '5. Acceptable use',
    body: (
      <ul>
        <li>Do not attempt to gain unauthorised access to the website, demos or servers.</li>
        <li>Do not submit unlawful, harmful or misleading content through our forms.</li>
        <li>Do not use automated tools to overload or scrape the website.</li>
      </ul>
    ),
  },
  { id: 'links', title: '6. External links', body: <p>Links to third-party websites and demos are provided for convenience. We are not responsible for their content or practices.</p> },
  { id: 'liability', title: '7. Liability', body: <p>To the extent permitted by law, we are not liable for loss arising from use of this website. Nothing in these terms limits liability that cannot be limited by law, including your statutory rights as a consumer in the UK or under the Australian Consumer Law.</p> },
  { id: 'law', title: '8. Governing law', body: <p>These terms are governed by the laws of Bangladesh, without affecting any mandatory consumer protections that apply where you live.</p> },
  { id: 'contact', title: '9. Contact', body: <p>Questions about these terms: <a href={`mailto:${POLICY_EMAIL}`}>{POLICY_EMAIL}</a>.</p> },
];

export default function Legal({ kind }: { kind: 'privacy' | 'terms' }) {
  const isPrivacy = kind === 'privacy';
  const sections = isPrivacy ? privacy : terms;
  const title = isPrivacy ? 'Privacy policy' : 'Terms & conditions';
  return (
    <>
      <Seo title={title} description={`${title} for ${company.name}. Effective ${EFFECTIVE_DATE}.`} />
      <PageHero eyebrow="Legal" title={title} lead={`Effective date: ${EFFECTIVE_DATE}`} crumbs={[{ to: `/${kind}`, label: title }]} />
      <section className="section section--tight">
        <div className="container post-layout">
          <aside className="post-aside">
            <TableOfContents items={sections.map((s) => ({ id: s.id, text: s.title.replace(/^\d+\.\s*/, '') }))} />
          </aside>
          <div className="prose">
            <Pending>have this text reviewed by a lawyer, and add your company registration number and hosting provider name.</Pending>
            {sections.map((s) => (
              <section key={s.id} aria-labelledby={s.id}>
                <h2 id={s.id}>{s.title}</h2>
                {s.body}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
