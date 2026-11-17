import { portfolio, type ContactDetails } from '../content/portfolio';

export function ContactSection({ contact }: { contact: ContactDetails }) {
  return (
    <section
      id="contact"
      className="contact section-shell"
      aria-labelledby="contact-title"
    >
      <div className="contact-intro">
        <h2 id="contact-title">{portfolio.headings.contact}</h2>
        <p>{portfolio.contactIntro}</p>
      </div>
      <div className="contact-links">
        {contact.email ? (
          <a className="contact-email" href={`mailto:${contact.email}`}>
            {contact.email}
            <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <a className="contact-email" href={contact.github}>
            {portfolio.actions.fallback}
            <span aria-hidden="true">↗</span>
          </a>
        )}
        <div className="contact-socials">
          {contact.linkedin ? (
            <a className="text-link" href={contact.linkedin}>
              {portfolio.actions.linkedin}
              <span aria-hidden="true">↗</span>
            </a>
          ) : null}
          {contact.email ? (
            <a className="text-link" href={contact.github}>
              {portfolio.actions.github}
              <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
