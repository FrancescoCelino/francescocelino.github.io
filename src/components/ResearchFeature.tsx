import { portfolio, research } from '../content/portfolio';

function ForecastSchematic() {
  return (
    <figure className="forecast">
      <div className="forecast-labels" aria-hidden="true">
        <span>{research.schematic.observed}</span>
        <span>{research.schematic.forecast}</span>
      </div>
      <svg viewBox="0 0 600 310" fill="none" aria-hidden="true">
        <path
          d="M25 260H575M25 170H575M25 80H575"
          stroke="currentColor"
          opacity=".15"
        />
        <path
          d="M25 230C60 236 65 195 95 207S135 242 165 180S200 110 230 142S265 160 290 118"
          stroke="#b1bdc8"
          strokeWidth="2.5"
        />
        <path
          d="M290 118C360 65 420 38 575 25V264C440 217 365 165 290 118Z"
          fill="#e7a57b"
          opacity=".1"
        />
        <path
          d="M290 118C365 80 450 74 575 85V225C460 195 375 156 290 118Z"
          fill="#e7a57b"
          opacity=".16"
        />
        <path
          d="M290 118C380 90 460 122 575 155"
          stroke="#e7a57b"
          strokeWidth="2.5"
          strokeDasharray="6 7"
        />
        <path
          d="M290 30V275"
          stroke="currentColor"
          opacity=".3"
          strokeDasharray="3 7"
        />
        <circle cx="290" cy="118" r="6" fill="#e7a57b" />
      </svg>
      <p className="forecast-model" aria-hidden="true">
        {research.schematic.model}
      </p>
      <figcaption>{research.schematic.caption}</figcaption>
    </figure>
  );
}

export function ResearchFeature() {
  const { publication } = research;
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
        </div>
        <ForecastSchematic />
      </div>
      <div className="publication">
        <p className="publication-meta">
          <span>
            {publication.journal} ({publication.year})
          </span>
          <span>{publication.authorship}</span>
        </p>
        <a href={publication.href} className="publication-link">
          <h3>{publication.title}</h3>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
