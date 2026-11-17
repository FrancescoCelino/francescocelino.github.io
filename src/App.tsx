import { LazyMotion, domAnimation, MotionConfig } from 'motion/react';
import { portfolio, projects } from './content/portfolio';
import { Signal } from './components/Signal';
import { ProjectFeature } from './components/ProjectFeature';
import { ResearchFeature } from './components/ResearchFeature';
import { LabFeature } from './components/LabFeature';
import { ContactSection } from './components/ContactSection';

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 id="hero-title">
          {portfolio.name} <span>{portfolio.role}</span>
        </h1>
        <p className="hero-description">{portfolio.hero}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#work">
            {portfolio.actions.work}
            <span aria-hidden="true">↘</span>
          </a>
          <a className="button button-quiet" href="#contact">
            {portfolio.actions.contact}
          </a>
        </div>
        <p className="availability">
          <span aria-hidden="true" />
          {portfolio.availability}
        </p>
      </div>
      <Signal />
      <nav className="work-index" aria-label="Featured work and collaboration">
        {portfolio.workIndex.map((item) => (
          <a href={item.href} key={item.href}>
            <span>{item.label}</span>
            <span>{item.detail}</span>
            <span aria-hidden="true">↘</span>
          </a>
        ))}
      </nav>
    </section>
  );
}

function Expertise() {
  return (
    <section
      id="expertise"
      className="expertise section-shell"
      aria-labelledby="expertise-title"
    >
      <div className="section-heading">
        <h2 id="expertise-title">{portfolio.headings.services}</h2>
        <p>{portfolio.servicesIntro}</p>
      </div>
      <div className="service-list">
        {portfolio.services.map((service) => (
          <section className="service" key={service.title}>
            <h3>{service.title}</h3>
            <div>
              <p className="service-description">{service.description}</p>
              <ul className="capabilities">
                {service.capabilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

export function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="site-header">
          <a
            className="wordmark"
            href="#"
            aria-label={`${portfolio.name}, back to top`}
          >
            {portfolio.name}
            <span aria-hidden="true">/</span>
          </a>
          <nav aria-label="Main navigation">
            {portfolio.navigation.map((item) => (
              <a href={`#${item.id}`} key={item.id}>
                {item.label}
              </a>
            ))}
          </nav>
        </header>
        <main id="main">
          <Hero />
          <section
            id="work"
            className="work section-shell"
            aria-labelledby="work-title"
          >
            <div className="section-heading">
              <h2 id="work-title">{portfolio.headings.work}</h2>
              <p>{portfolio.workIntro}</p>
            </div>
            {projects.map((project) => (
              <ProjectFeature key={project.id} project={project} />
            ))}
          </section>
          <ResearchFeature />
          <LabFeature />
          <Expertise />
          <section
            id="about"
            className="about section-shell"
            aria-labelledby="about-title"
          >
            <h2 id="about-title">{portfolio.headings.about}</h2>
            <p>{portfolio.about}</p>
          </section>
          <ContactSection contact={portfolio} />
        </main>
        <footer className="site-footer">
          <a href="#" className="wordmark">
            {portfolio.name}
            <span aria-hidden="true">/</span>
          </a>
          <p>{portfolio.role}</p>
          <a className="text-link" href="#">
            {portfolio.actions.top}
            <span aria-hidden="true">↑</span>
          </a>
        </footer>
      </MotionConfig>
    </LazyMotion>
  );
}
