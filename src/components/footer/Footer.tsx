import { Link } from 'react-router';
import { Logo } from '../ui/Logo';
import { navLinks } from '../navigation/navLinks';
import { company, contact, services, socials } from '../../data';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">Site footer</h2>
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo width={176} />
            <p>{company.description}</p>
            <p className="footer__slogan">{company.slogan}</p>
          </div>

          <nav className="footer__col" aria-label="Company">
            <h3>Company</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              {navLinks.map((l) => (
                <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
              ))}
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>

          <nav className="footer__col" aria-label="Services">
            <h3>Services</h3>
            <ul>
              {services.map((s) => (
                <li key={s.slug}><Link to={`/services#${s.slug}`}>{s.title}</Link></li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <h3>Contact</h3>
            <ul>
              <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
              <li><a href={contact.phoneHref}>{contact.phone}</a></li>
              <li><a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li>
                <address>
                  {contact.address.line1}<br />
                  {contact.address.city} {contact.address.postcode}, {contact.address.country}
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__big" aria-hidden>
          <span>Beyond</span> <em>digital</em> <span>possibilities.</span>
        </div>

        <div className="footer__bottom">
          <p>© {year} {company.name}. All rights reserved.</p>
          <ul className="footer__socials">
            {socials.map((s) => (
              <li key={s.href}><a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></li>
            ))}
          </ul>
          <ul className="footer__legal">
            <li><Link to="/privacy">Privacy policy</Link></li>
            <li><Link to="/terms">Terms &amp; conditions</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
