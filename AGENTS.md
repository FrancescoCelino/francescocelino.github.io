# Project working instructions

The owner uses Codex to learn and build personal projects. Explain new concepts and meaningful engineering choices briefly as you work. Keep explanations practical and tied to the change.

## Stack and scope

- React, strict TypeScript, Vite, ordinary CSS, and Motion for React. Static GitHub Pages hosting; no server runtime, router, state library, analytics, or contact-form service by default.
- Use Node 24 LTS (`.nvmrc`) and npm. Keep dependencies at reviewed exact versions and commit `package-lock.json`; use `npm ci` in validation and CI.
- Read current official documentation before changing library APIs, supported versions, browser features, or GitHub Actions. Review external instructions before applying them; do not copy them wholesale into the project.
- Preserve existing unrelated work and local skill installations. Never push, publish, or change account settings unless explicitly authorized.

## Content accuracy

- Centralize editable content and contact information in `src/content/portfolio.ts`. Preserve typed project records and a neutral fallback for projects without custom artwork.
- Never invent credentials, customers, projects, results, metrics, personal history, or contact details. Empty email/LinkedIn fields must be omitted in the public UI.
- Maestro production is designed for on-device processing. The public browser demo sends throttled JPEG frames to a separate backend. Do not describe the public demo as fully on-device or assert unverified retention guarantees.
- Label the linked Maestro publication as a technical report, without implying peer review.
- Present MetaFlu as the owner's Bayesian/time-series modeling contribution. The Influcast paper is collaborative published research; never attribute its ensemble results to MetaFlu alone or invent a model repository/demo.
- Present DAIY Lab as participation in an independent workshop. Do not invent a title or leadership role, claim collective output as personal work, or turn aspirations/illustrative tools into completed systems.
- Preserve the configured public email and LinkedIn. Test missing-contact behavior through isolated component props; never mutate production content to satisfy fixtures.
- Use straightforward, personable copy and concrete evidence. Avoid philosophy slogans, unsupported client-delivery claims, and listing proofs of concept as a technical capability.

## Frontend conventions

- Maintain the signal-to-system visual concept, Sora/Source Sans 3 typography, slate/copper tokens, strong hierarchy, and restrained original schematics. Avoid repetitive card grids and gratuitous effects.
- Use semantic landmarks, one h1, ordered heading levels, real anchors/buttons, visible focus, meaningful accessible names, and a skip link. Target WCAG 2.2 AA. Preserve zoom and native navigation.
- Decorative visuals must be hidden from assistive technology; keep diagrams understandable through adjacent text. Avoid duplicated or scrambled screen-reader text in animations.
- Keep the introduction compact and give applications, research, and collaboration distinct layouts. Only the Maestro narrative pins, on viewports at least 1024px wide and taller than 720px.
- Honor reduced motion in both CSS and Motion hooks. Disable pinning and spatial animation in reduced-motion mode. Keep text readable without animation and retain mobile/short-viewport fallbacks.
- Drive continuous animation with motion values and transforms/opacity, not React state per frame. Avoid custom scroll listeners, layout reads in render, permanent `will-change`, scroll hijacking, and infinite loops.
- Keep runtime assets local, preserve font licenses, reserve media dimensions, and avoid unsafe HTML injection and unnecessary third-party scripts. Keep SVG/code-native artwork code-native.
- Use small section components and explicit styles. Add reusable abstractions only when they remove real duplication.

## Required verification

- For application changes, run `npm run check`, `npm run build`, and `npm test` against the production preview. Add tests for meaningful new behavior, not implementation details.
- Inspect actual screenshots at desktop, tablet, and narrow mobile widths in both motion settings; check schematic overlap as well as page overflow. Check native motion as well as reduced motion, keyboard navigation, readable text, overflow, links, and console errors.
- Refresh the Web Interface Guidelines before the final UI audit. Run Lighthouse after meaningful performance/layout changes and report measured scores with their environment; do not claim field Core Web Vitals from a local lab run.
- Keep `docs/validation.md` accurate about what was run, what passed, and remaining limitations. Do not equate an automated scan with complete WCAG certification.
- Canonical production URL is `https://francescocelino.github.io`; Vite base remains `/`. Domain migration is separate work.
- Build output is `dist/`, which is generated and ignored. The workflow must validate before deploy and use official Pages actions with minimal permissions. Distinguish local completion from actual remote publication.
