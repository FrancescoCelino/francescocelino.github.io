# Francesco Celino — AI engineering portfolio

A static portfolio built with React, strict TypeScript, Vite, ordinary CSS, and Motion for React. The canonical destination is **https://francescocelino.github.io/**, with Vite base `/`. There is no backend, analytics, camera access, or contact-form service in this portfolio.

The site presents three different kinds of work: Maestro as an applied engineering project, MetaFlu as a research contribution, and participation in DAIY Lab. Sora and Source Sans 3, slate/copper colors, and original vector schematics carry the design. Fonts and runtime assets are local.

## Develop and validate

Use **Node 24 LTS** (`.nvmrc`) and npm:

```sh
nvm use
npm ci
npm run dev
```

| Command           | Purpose                                                   |
| ----------------- | --------------------------------------------------------- |
| `npm run assets`  | Regenerate social artwork/icons and copy licensed fonts   |
| `npm run format`  | Format source and documentation                           |
| `npm run check`   | Check formatting, strict TypeScript, and ESLint           |
| `npm run build`   | Build static production output into `dist/`               |
| `npm run preview` | Serve the production build on localhost                   |
| `npm test`        | Run content fixtures and production-preview browser tests |

For first-time browser setup, run `npx playwright install chromium`. Build before testing: the tests serve `dist/`, not the development source. Stop any older preview before validation so Playwright starts the current production preview on port 4173.

Screenshots, Lighthouse reports, and test artifacts are generated locally and ignored by Git. See [validation evidence](docs/validation.md) for measured results and limitations.

## Edit content

**`src/content/portfolio.ts`** owns identity, biography, availability, services, headings, contact details, metadata, sharing text, and typed evidence records:

- `portfolio` contains general content and the configured public email/LinkedIn. Empty contacts are omitted; GitHub becomes the fallback when email is absent.
- `projects` contains application case studies using `Project`. Projects without `visual: 'age-verification'` receive neutral artwork; Maestro's schematic is specific to Maestro.
- `research` uses `ResearchWork` to distinguish the personal contribution, collaborative context, methods, and publication record.
- `lab` uses `LabParticipation` to describe participation and shared interests separately from individually authored work.

Run `npm run assets` after changing sharing text, identity, or the site URL, then rebuild. Metadata is inserted and HTML-escaped at build time. The JavaScript-disabled fallback includes the research/lab destinations and conditionally rendered contact links.

`ContactSection` receives explicit contact props. Missing-contact tests use isolated fixtures; they never edit the production content object or erase real contact details.

## Content and provenance

- **Maestro:** preserve the [demo](https://francescocelino.github.io/maestro-demo/), [repository](https://github.com/francescocelino/maestro-demo), and [technical report](https://doi.org/10.5281/zenodo.21509794). The production product is designed for on-device processing. The public demo sends throttled JPEG frames to a separate backend and returns PASS, FAIL, or ESCALATE without showing an estimated age. Do not imply the browser demo is fully on-device or make unverified retention claims.
- **MetaFlu:** the modeling contribution is described from the owner's supplied facts. The [PubMed publication record](https://pubmed.ncbi.nlm.nih.gov/39965358/) confirms Francesco's co-authorship of _Collaborative forecasting of influenza-like illness in Italy: The Influcast experience_, published in _Epidemics_ (2025). Influcast's ensemble findings are collaborative results, not individual MetaFlu metrics. The diagram is illustrative and contains no study data. No MetaFlu repository or demo is asserted.
- **DAIY Lab:** participation is supplied by the owner. The [lab website](https://22johngalt.github.io/DIY/), its [public source](https://github.com/22JohnGalt/DIY), and linked license were inspected. Describe its focus without turning illustrative tools or aspirations into released AI systems, or claiming collective work as personal output.

Do not add unsupported clients, credentials, personal history, technical results, or services. Keep Maestro's technical report distinct from the published Influcast research article.

## Layout and motion

A shorter introduction leads into a linked work index. Maestro uses a compact three-stage schematic beside normal-flow explanatory text. MetaFlu has a separate research layout with an uncertainty illustration and integrated publication citation. DAIY Lab has a dedicated collaboration section, followed by practical services, a short biography, and direct contact links.

Only Maestro pins, at widths of at least 1024px and heights above 720px. Tablet, mobile, short viewports, and reduced-motion mode use a static schematic. Motion values drive transforms and opacity; no per-frame React state or custom scroll interception is used. Substantive text is readable immediately. The decorative hero contour is hidden on narrow screens. Both local fonts are preloaded; the body fallback uses measured metric adjustments to reduce layout shift while fonts load. Reduced motion also disables spatial motion and smooth scrolling.

The browser suite covers 1920, 1440, 768, 390, and 320px in both motion settings, plus 834px and short-viewport/reflow checks. Screenshots require visual inspection: automated accessibility and overflow checks do not establish complete usability or WCAG conformance.

## Local Git and future deployment

The local repository uses `main`. A baseline commit preserves the original implementation, followed by the portfolio revision. `.gitignore` excludes dependencies, build output, QA artifacts, local skills/agent configuration, environment files, and logs. `.editorconfig` and `.gitattributes` establish UTF-8, LF endings, and binary asset handling. The exact dependency lockfile and required public assets are committed.

**No remote, push, publication, or account configuration is part of this revision.** Local builds and commits do not deploy the site.

The existing GitHub Pages workflow validates, builds, and tests before deployment. Its official actions are pinned; only the deployment job receives Pages/OIDC write permissions. A future authorized push to `main` or manual workflow run can deploy once a remote repository and Pages environment are configured. Pull requests validate without deploying. Account setup and remote workflow execution remain separate verification steps.

For a future deployment, use the user-site repository `francescocelino/francescocelino.github.io`. Preserve any existing remote history. Keep Vite base `/`; domain migration and DNS changes are separate work.

## Design references and licensing

The revision follows the reviewed [Frontend Design skill](https://github.com/anthropics/skills/tree/main/skills/frontend-design), installed [React Best Practices](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices), and refreshed [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines). Motion behavior follows its official [scroll](https://motion.dev/docs/react-scroll-animations) and [reduced-motion](https://motion.dev/docs/react-use-reduced-motion) documentation.

The original implementation used [Bynario](https://bynar.io/) as a typography/storytelling reference without reusing its source or artwork. The contour, Maestro schematic, forecast illustration, monogram, and sharing graphic are original code-native artwork. Font licenses remain in `public/fonts/`. No new repository-wide license is selected by this revision.
