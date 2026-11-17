import { lab } from '../content/portfolio';

export function LabFeature() {
  return (
    <section
      id={lab.id}
      className="lab section-shell"
      aria-labelledby="lab-title"
    >
      <div className="lab-name">
        <h2 id="lab-title">{lab.name}</h2>
        <ul className="lab-focus">
          {lab.focus.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="lab-copy">
        <p className="lab-relationship">{lab.relationship}</p>
        <p>{lab.description}</p>
        <div className="project-links">
          {lab.links.map((link) => (
            <a className="text-link" key={link.href} href={link.href}>
              {link.label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
