import { contact, socials } from '../../data';

export function ContactDetails() {
  return (
    <div className="cdetails">
      <dl>
        <div>
          <dt>Email</dt>
          <dd><a href={`mailto:${contact.email}`}>{contact.email}</a></dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd><a href={contact.phoneHref}>{contact.phone}</a></dd>
        </div>
        <div>
          <dt>WhatsApp</dt>
          <dd><a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">Chat on WhatsApp ↗</a></dd>
        </div>
        <div>
          <dt>Office</dt>
          <dd>
            <address>
              {contact.address.line1}<br />
              {contact.address.city} {contact.address.postcode}, {contact.address.country}
            </address>
          </dd>
        </div>
      </dl>
      <ul className="cdetails__socials">
        {socials.map((s) => (
          <li key={s.href}><a href={s.href} target="_blank" rel="noopener noreferrer">{s.label} ↗</a></li>
        ))}
      </ul>
    </div>
  );
}
