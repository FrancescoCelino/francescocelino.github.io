# Local validation — 17 November 2026

Implementation and local validation are complete. **The site has not been pushed or published.** The GitHub Actions workflow has been inspected locally; its remote execution still requires a configured GitHub repository and Pages environment.

## Environment and checks

macOS ARM64, Node **24.22.3**, Chromium **159.0.8154.6**, Playwright **1.65.1**, Lighthouse **13.6.0**. The machine's default Node was 25; a temporary Node 24 runtime was used for the final installation, source checks, build, and browser tests to match the repository's supported runtime.

| Check                                                    | Result                                        |
| -------------------------------------------------------- | --------------------------------------------- |
| Clean `npm ci` from the committed lockfile               | Passed; 0 reported dependency vulnerabilities |
| `npm run format:check`                                   | Passed                                        |
| `npm run typecheck`                                      | Passed, strict TypeScript                     |
| `npm run lint`                                           | Passed, zero warnings                         |
| `npm run build`                                          | Passed                                        |
| `npm test`                                               | **14 passed**                                 |
| axe WCAG A/AA scans at all five primary widths           | Zero violations detected                      |
| Browser console/runtime errors in responsive tests       | None detected                                 |
| Horizontal overflow, including native-motion tablet case | None detected after fixes                     |

The browser suite checks 1920, 1440, 768, 390, and 320 CSS-pixel widths, plus native motion at 834 and 390 pixels. It covers keyboard focus/skip navigation, anchor destinations, reduced motion, short-viewport pinning fallback, 200%-zoom-like reflow, static metadata/assets, missing/configured contacts, future-project fallback, and basic links without JavaScript.

Three additional screenshots capture the input, inference, and decision states of the desktop scroll narrative. Assertions verify each stage's visibility at the corresponding chapter. Screenshot inspection covered wide desktop, laptop, tablet, narrow mobile, and the sharing graphic. A transformed SVG overflow at 834 pixels, mobile line-break spacing, and service-label CSS specificity were found and fixed during QA.

## Lighthouse against the final production preview

These are single local lab runs against `http://127.0.0.1:4173/`, using the mobile/default and desktop presets. They are not field Core Web Vitals or measurements of GitHub Pages hosting.

| Metric                   | Mobile  | Desktop |
| ------------------------ | ------- | ------- |
| Performance              | **100** | **100** |
| Accessibility            | **100** | **100** |
| Best practices           | **100** | **100** |
| SEO                      | **100** | **100** |
| First contentful paint   | 0.8 s   | 0.2 s   |
| Largest contentful paint | 0.8 s   | 0.2 s   |
| Cumulative layout shift  | 0       | 0.018   |
| Total blocking time      | 0 ms    | 0 ms    |

Production output: approximately **107.5 kB gzip JavaScript** and **4.6 kB gzip CSS**, plus two local Latin variable-font files (approximately 68 kB total). The social preview is not part of the page's runtime asset load. Lighthouse still identifies potentially unused JavaScript; no additional splitting was added solely to chase that diagnostic after the performance target was met.

Reports are available locally under `artifacts/lighthouse-mobile.report.html` and `artifacts/lighthouse-desktop.report.html`, with JSON counterparts. Viewport screenshots are `artifacts/portfolio-{width}.png`; motion screenshots are `artifacts/motion-{input,inference,output}.png`. These generated QA artifacts are ignored by Git and can be reproduced.

## Final Web Interface Guidelines review

Reviewed the current [guidelines source](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md) against the rendered page and source. Fixed material issues before completion.

```text
src/App.tsx: pass — semantic landmarks, native links, skip link, heading hierarchy, optional contacts
src/components/Signal.tsx: pass — decorative visual hidden from assistive technology, contained transforms
src/components/ProjectFeature.tsx: pass — accessible narrative/caption, reduced-motion and responsive alternatives
src/styles.css: pass — visible focus, contrast, responsive reflow, reduced motion, explicit transitions
index.html: pass — mobile zoom allowed, meaningful metadata, canonical/social URLs, local font preload
```

Sentence-case headings and first-person biography are intentional choices for this personal portfolio. They follow the brief and reviewed design direction rather than the guideline's generic title-case/second-person copy suggestions.

## Links and remaining limits

- The supplied Maestro demo, GitHub repository, and GitHub profile returned HTTP **200** during public link checks. The demo's camera/session workflow was not activated or tested.
- The technical-report DOI redirects to Zenodo. Zenodo returned **403** to the automated request, and the research fetch tool could not load the record. The supplied DOI is preserved; manually open it before public launch to confirm visitor access. The report's contents and findings were not independently evaluated.
- Email and LinkedIn remain intentionally unconfigured. GitHub is the working fallback. Add verified details in `src/content/portfolio.ts` for a direct hiring contact route.
- Chromium was tested. Safari, Firefox, physical mobile devices, native 200% browser zoom, and screen-reader sessions were not tested. Automated accessibility results do not certify full WCAG 2.2 AA conformance.
- Browser-control access was unavailable; native Edge access allowed a reference-site visual inspection, while the portfolio was tested and photographed using the explicitly requested automated Chromium tests. No Bynario source or artwork was copied.
- Git metadata and a remote are not configured in this folder. Follow README instructions to connect the exact user-site repository, enable Pages with GitHub Actions, push `main`, and verify the resulting deployment. No custom domain or account settings were changed.
