import { portfolio, research } from '../content/portfolio';
import { ForecastSchematic } from './ForecastSchematic';

export function ResearchFeature() {
  const { publication, forecastLink } = research;
  return (
    <section
      id="research"
      className="research section-shell"
      aria-labelledby="research-title"
    >
      <div className="research-heading">
        <p className="section-label">{portfolio.headings.research}</p>
        <h2 id="research-title">{research.title}</h2>
        <p className="research-category">{research.category}</p>
      </div>
      <div className="research-layout">
        <div className="research-copy">
          <p className="research-lead">{research.contribution}</p>
          <p>{research.context}</p>
          <ul className="tags" aria-label="Research methods">
            {research.methods.map((method) => (
              <li key={method}>{method}</li>
            ))}
          </ul>
          <div className="publication">
            <p className="publication-meta">
              {publication.journal} ({publication.year}) ·{' '}
              {publication.authorship}
            </p>
            <p className="publication-title">{publication.title}</p>
            <div className="project-links">
              {[publication, forecastLink].map(({ label, href }) => (
                <a key={href} href={href} className="text-link">
                  {label}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <ForecastSchematic />
      </div>
    </section>
  );
}
