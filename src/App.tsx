import {
  LazyMotion,
  domAnimation,
  m,
  MotionConfig,
  useReducedMotion,
} from 'motion/react';
import { portfolio, projects } from './content/portfolio';
import { Signal } from './components/Signal';
import { ProjectFeature } from './components/ProjectFeature';

const navigation = [
  { label: 'Work', id: 'work' },
  { label: 'Expertise', id: 'expertise' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
];

function Hero() {
  const reduced = useReducedMotion();
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="hero-role">{portfolio.role}</p>
        <h1 id="hero-title">
          {['From research', 'to real-world', 'systems.'].map((line, index) => (
            <span className="line-mask" key={line}>
              <m.span
                initial={reduced ? false : { y: '105%' }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.1 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {line}
                {index < 2 ? ' ' : null}
              </m.span>
            </span>
          ))}
        </h1>
        <p className="hero-description">{portfolio.hero}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#work">
            Explore my work<span aria-hidden="true">↘</span>
          </a>
          <a className="button button-quiet" href="#contact">
            Get in touch<span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <Signal />
      <div className="hero-footer">
        <span className="availability">
          <span aria-hidden="true" />
          {portfolio.availability}
        </span>
        <a className="scroll-cue" href="#work">
          Scroll to explore<span aria-hidden="true">↓</span>
        </a>
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
            aria-label="Francesco Celino, back to top"
          >
            Francesco Celino<span aria-hidden="true">/</span>
          </a>
          <nav aria-label="Main navigation">
            {navigation.map((item) => (
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
              <h2 id="work-title">
                The work behind
                <br />
                the words.
              </h2>
              <p>
                Real engineering. An open demo.
                <br /> A closer look at the decisions.
              </p>
            </div>
            {projects.map((project) => (
              <ProjectFeature key={project.id} project={project} />
            ))}
          </section>
          <section
            id="expertise"
            className="expertise section-shell"
            aria-labelledby="expertise-title"
          >
            <div className="section-heading">
              <div>
                <p className="section-label">What I can help you build</p>
                <h2 id="expertise-title">
                  Your challenge.
                  <br />
                  An engineered answer.
                </h2>
              </div>
              <p>
                For teams exploring an idea,
                <br /> building a product, or moving
                <br /> AI into an existing system.
              </p>
            </div>
            <div className="service-list">
              {portfolio.services.map((service) => (
                <section className="service" key={service.title}>
                  <div className="service-heading">
                    <p className="section-label">{service.category}</p>
                    <h3>{service.title}</h3>
                  </div>
                  <div>
                    <p className="service-description">{service.description}</p>
                    <p className="capabilities">{service.capabilities}</p>
                  </div>
                </section>
              ))}
            </div>
          </section>
          <section
            id="about"
            className="about section-shell"
            aria-labelledby="about-title"
          >
            <div className="about-title">
              <p className="section-label">The person behind the systems</p>
              <h2 id="about-title">
                Curiosity drives it.
                <br />
                Engineering
                <br />
                makes it useful.
              </h2>
              <div className="about-signature" aria-hidden="true">
                fc<span>/</span>
              </div>
            </div>
            <div className="about-copy">
              <p className="about-lead">{portfolio.about}</p>
              <p>{portfolio.approach}</p>
              <a className="text-link" href={portfolio.github}>
                Explore my GitHub<span aria-hidden="true">↗</span>
              </a>
            </div>
          </section>
          <section
            id="contact"
            className="contact section-shell"
            aria-labelledby="contact-title"
          >
            <p className="section-label">Have something in mind?</p>
            <h2 id="contact-title">
              Let’s build
              <br />
              something useful<span>.</span>
            </h2>
            <div className="contact-bottom">
              <p>
                Discuss an AI project, a consulting engagement,
                <br className="desktop-break" /> or a role on your engineering
                team.
              </p>
              <div className="contact-links">
                {portfolio.email ? (
                  <a
                    className="button button-primary"
                    href={`mailto:${portfolio.email}`}
                  >
                    Discuss your project<span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <a className="button button-primary" href={portfolio.github}>
                    Find me on GitHub<span aria-hidden="true">↗</span>
                  </a>
                )}
                {portfolio.linkedin ? (
                  <a className="text-link" href={portfolio.linkedin}>
                    LinkedIn<span aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </div>
            </div>
          </section>
        </main>
        <footer className="site-footer">
          <a href="#" className="wordmark">
            Francesco Celino<span aria-hidden="true">/</span>
          </a>
          <p>Independent mind. Practical AI.</p>
          <a className="text-link" href="#">
            Back to top<span aria-hidden="true">↑</span>
          </a>
        </footer>
      </MotionConfig>
    </LazyMotion>
  );
}
