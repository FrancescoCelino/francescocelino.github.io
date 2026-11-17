import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react';
import type { Project } from '../content/portfolio';

function Pipeline({
  progress,
  project,
}: {
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  project: Project;
}) {
  const reduced = useReducedMotion();
  const scaleX = useTransform(progress, [0.05, 0.85], [0, 1]);
  const rotate = useTransform(progress, [0, 0.7], [-7, 0]);
  const y = useTransform(progress, [0, 0.7], [25, 0]);
  const inputOpacity = useTransform(progress, [0, 0.25, 0.37], [1, 1, 0]);
  const inferenceOpacity = useTransform(
    progress,
    [0.22, 0.36, 0.55, 0.68],
    [0, 1, 1, 0],
  );
  const inferenceScale = useTransform(progress, [0.22, 0.45], [0.86, 1]);
  const outputOpacity = useTransform(progress, [0.55, 0.72, 1], [0, 1, 1]);
  const outputY = useTransform(progress, [0.55, 0.75], [30, 0]);
  if (project.visual !== 'age-verification') {
    return (
      <figure className="pipeline generic-project">
        <p className="section-label">Engineering case study</p>
        <p className="generic-title">{project.title}</p>
        <figcaption>{project.category}</figcaption>
      </figure>
    );
  }
  return (
    <figure className="pipeline">
      <div className="pipeline-top">
        <span>{project.title} / system study</span>
        <span className="little-cross" aria-hidden="true">
          +
        </span>
      </div>
      <m.div
        className="decision-diagram"
        style={reduced ? undefined : { rotate, y }}
        aria-hidden="true"
      >
        <m.div
          className="diagram-stage stage-input"
          style={reduced ? undefined : { opacity: inputOpacity }}
        >
          <div className="sensor-frame">
            <i />
            <i />
            <i />
            <i />
            <div className="sensor-contours">
              {Array.from({ length: 10 }, (_, index) => (
                <span
                  key={index}
                  style={{
                    width: `${44 + index * 5}%`,
                    height: `${44 + index * 5}%`,
                  }}
                />
              ))}
            </div>
            <span className="threshold">
              18<span>+</span>
            </span>
          </div>
          <div className="diagram-connector">
            <m.span style={{ scaleX: reduced ? 1 : scaleX }} />
          </div>
          <div className="decision-output">
            <span className="decision-dot" />
            Threshold decision
          </div>
        </m.div>
        <m.div
          className="diagram-stage stage-inference"
          style={{ opacity: inferenceOpacity, scale: inferenceScale }}
        >
          <p className="diagram-label">02 / Inference</p>
          <div className="inference-matrix">
            {Array.from({ length: 25 }, (_, index) => (
              <span
                key={index}
                className={
                  index % 3 === 0 || index === 12 ? 'matrix-accent' : undefined
                }
              />
            ))}
          </div>
          <p className="diagram-title">
            Vision meets
            <br />
            the application.
          </p>
          <p className="diagram-detail">
            Public demo: backend session processing
          </p>
        </m.div>
        <m.div
          className="diagram-stage stage-output"
          style={{ opacity: outputOpacity, y: outputY }}
        >
          <p className="diagram-label">03 / Decision</p>
          <div className="outcome-symbol" aria-hidden="true">
            ↳
          </div>
          <p className="diagram-title">
            Leave room
            <br />
            for uncertainty.
          </p>
          <div className="outcome-options">
            <span>PASS</span>
            <span>FAIL</span>
            <span>ESCALATE</span>
          </div>
        </m.div>
      </m.div>
      <div className="pipeline-stages" aria-hidden="true">
        <span>Input</span>
        <span>Inference</span>
        <span>Decision</span>
      </div>
      <div className="pipeline-progress" aria-hidden="true">
        <m.div style={{ scaleX: reduced ? 1 : scaleX }} />
      </div>
      <figcaption>
        System schematic. The demo returns PASS, FAIL, or ESCALATE; it does not
        display an estimated age.
      </figcaption>
    </figure>
  );
}

export function ProjectFeature({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  });
  return (
    <article className="project" aria-labelledby={`${project.id}-title`}>
      <div className="project-intro">
        <div>
          <p className="section-label">Featured engineering project</p>
          <h3 id={`${project.id}-title`}>
            {project.title}
            <span className="project-period">.</span>
          </h3>
          <p className="project-category">{project.category}</p>
        </div>
        <div className="project-summary">
          <p>{project.summary}</p>
          <ul className="tags" aria-label="Project disciplines">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <div className="project-links">
            {project.links.map((link) => (
              <a key={link.href} className="text-link" href={link.href}>
                {link.label}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`project-story${reduced ? ' motion-reduced' : ''}`}
        ref={ref}
      >
        <Pipeline progress={scrollYProgress} project={project} />
        <div className="story-chapters">
          {project.stages.map((stage, index) => (
            <section className="story-chapter" key={stage.title}>
              <span className="chapter-number" aria-hidden="true">
                0{index + 1}
              </span>
              <div>
                <h4>{stage.title}</h4>
                <p>{stage.description}</p>
              </div>
            </section>
          ))}
        </div>
      </div>
      {project.privacyNote ? (
        <aside className="privacy-note">
          <span className="privacy-symbol" aria-hidden="true">
            ↳
          </span>
          <div>
            <h4>A note on privacy & the public demo</h4>
            <p>{project.privacyNote}</p>
          </div>
        </aside>
      ) : null}
    </article>
  );
}
