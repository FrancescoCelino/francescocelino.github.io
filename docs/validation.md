# Local validation — 17 November 2026

The editorial/design revision is implemented and locally validated. **Nothing has been pushed or published.** The local repository contains a baseline commit preserving the previous implementation and the owner's configured contact details. Remote workflow execution and GitHub Pages hosting are separate checks.

## Environment and commands

macOS ARM64; Node **24.22.3** (temporary runtime selected explicitly because the machine default is Node 25); Playwright **1.65.1**; Chromium **159.0.8154.6**; Lighthouse **13.6.0**. Tests and Lighthouse used the production build served by Vite at `http://127.0.0.1:4173/`.

| Check                                                    | Final result                                             |
| -------------------------------------------------------- | -------------------------------------------------------- |
| Clean `npm ci` using the exact lockfile                  | Passed; 287 packages audited, 0 reported vulnerabilities |
| `npm run assets`                                         | Passed; local assets regenerated, font licenses retained |
| `npm run format` / `npm run format:check`                | Passed                                                   |
| `npm run typecheck`                                      | Passed, strict TypeScript                                |
| `npm run lint`                                           | Passed, zero warnings                                    |
| `npm run build`                                          | Passed                                                   |
| `npm test`                                               | **24 passed**                                            |
| axe WCAG A/AA checks at five widths in both motion modes | Zero detected violations                                 |
| Console/runtime errors in responsive tests               | None detected                                            |
| Horizontal overflow and static-schematic overlap checks  | Passed                                                   |
| `git diff --check`                                       | Passed                                                   |

The first restricted `npm ci` stalled on network access and was stopped; a subsequent network-enabled clean installation completed successfully. Localhost binding and Chromium execution required the execution environment's expanded permissions. These were environment restrictions, not application failures.

## Browser and visual evidence

The responsive suite captures **1920, 1440, 768, 390, and 320 CSS pixels**, each with normal and reduced motion. Additional checks cover 834px, a 1440×650 short viewport, and 720×450 reflow approximating 200% zoom on a 1440px display.

Visual inspection covered desktop, tablet, narrow mobile, both motion settings, the three Maestro scroll stages, and the new sharing graphic. Native anchor destinations, visible focus, skip navigation, keyboard reachability of email/LinkedIn, heading structure, contact wrapping, and readable text were checked. Full-page screenshots show a sampled animation position; the three separate stage captures verify the scroll narrative.

Two defects found during validation were fixed:

- **Mobile schematic overlap:** the static input layer retained absolute positioning and overlapped its labels. Static variants now participate in layout; browser assertions check the input sits below the diagram header and above the labels.
- **Font-loading shift:** the first mobile Lighthouse run measured performance **88**, CLS **0.236**. Delaying the body font confirmed the cause. The body font is now preloaded, its Arial fallback uses measured size/metric adjustments, and base line height is explicit. A delayed-font regression test verifies the work section moves less than 24px when the font arrives. The final Lighthouse runs measured CLS **0**.

The suite also checks configured contacts against the real content, four isolated missing/present contact fixtures, generic future-project rendering, research attribution and publication link, lab destinations, canonical metadata/static assets, and basic destinations with JavaScript disabled. Fixtures never mutate the production content object.

Screenshots: `artifacts/portfolio-{width}-{reduce,no-preference}.png`, `artifacts/native-motion-{834,390}.png`, and `artifacts/motion-{input,inference,output}.png`. The final sharing artwork is `public/social-preview.png`.

## Final Lighthouse measurements

Single local lab runs on the final production preview. Mobile uses Lighthouse's simulated mobile throttling (4× CPU slowdown, 150ms RTT); desktop uses its desktop preset (1× CPU, 40ms RTT). These are **not field Core Web Vitals or measurements of deployed GitHub Pages hosting**.

| Metric                   | Mobile  | Desktop |
| ------------------------ | ------- | ------- |
| Performance              | **100** | **100** |
| Accessibility            | **100** | **100** |
| Best practices           | **100** | **100** |
| SEO                      | **100** | **100** |
| First contentful paint   | 0.8 s   | 0.2 s   |
| Largest contentful paint | 0.8 s   | 0.2 s   |
| Cumulative layout shift  | 0       | 0       |
| Total blocking time      | 0 ms    | 0 ms    |

This Lighthouse version also reports an **experimental Agentic Browsing category: 50/100 on both presets**. Its accessibility-tree and CLS checks passed. The site does not supply `llms.txt` or an ARD manifest; Vite's preview returns its HTML fallback for these unrecognized paths, so the experimental checks report invalid/missing discovery documents. Adding agent discovery protocols is outside this revision. This score is separate from the four standard categories above.

Final reports: `artifacts/lighthouse-{mobile,desktop}.report.{html,json}`. The earlier mobile failure is retained locally as `artifacts/lighthouse-mobile-before-font-fix.report.{html,json}`. Reports contain no run warnings.

Production assets: approximately **108.49 kB gzip JavaScript**, **4.57 kB gzip CSS**, and **62.5 kB of local font files**. No new dependencies, third-party runtime requests, server, analytics, or contact service were added.

## Final Web Interface Guidelines audit

Reviewed the refreshed [guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md), source, and browser output. The final audit found no unresolved material issues in the changed UI:

```text
src/App.tsx: pass — one h1, semantic navigation, immediate text, native anchors
src/components/ProjectFeature.tsx: pass — captions, decorative layers, static and reduced-motion fallbacks
src/components/ResearchFeature.tsx: pass — integrated citation, illustrative diagram with explanatory caption
src/components/LabFeature.tsx: pass — clear participation, native destinations
src/components/ContactSection.tsx: pass — visible contact details, isolated optional-contact behavior
src/components/Signal.tsx: pass — hidden decorative SVG, motion values
src/styles.css: pass — focus, contrast, responsive flow, explicit transitions, font stability
index.html: pass — zoom permitted, local font preload, canonical/social metadata, no-script links
```

Sentence-case headings and first-person writing intentionally follow this personal portfolio's brief. Native page scrolling and navigation remain enabled. Automated scans and this review are **not complete WCAG 2.2 AA certification**.

## Sources, links, and remaining limitations

- Read the [PubMed publication record](https://pubmed.ncbi.nlm.nih.gov/39965358/) and abstract: they confirm Francesco Celino's co-authorship, _Epidemics_ (2025), and the collaborative Influcast ensemble context. MetaFlu's personal contribution is based on the owner's supplied facts; no individual model results were inferred from ensemble findings.
- Read the [DAIY Lab website](https://22johngalt.github.io/DIY/), its linked public repository file list, and MIT license. The public source inspected contains the website and illustrative instruments. Participation is owner-supplied; no leadership role or personal ownership of collective outputs is asserted.
- The Maestro demo and repository returned **HTTP 200**. The technical-report DOI returned **HTTP 200**, ending at `https://zenodo.org/records/21509794`. Its report contents and scientific findings were not independently evaluated. The demo's camera/session workflow was not activated.
- Email and LinkedIn remain configured with the owner's original values. Tests verify rendered destinations and keyboard access; actual email delivery and LinkedIn authentication/profile access were not tested.
- Chromium was tested. Safari, Firefox, physical devices, actual native 200% browser zoom, and screen-reader sessions remain untested. Reflow simulation is not a native zoom test.
- No remote is configured. No push, deployment, account changes, custom domain, or DNS changes occurred. The existing Pages workflow was preserved; its remote execution remains unverified.
