# Local validation (17 November 2026)

## DAIY Lab co-founder copy (20 November 2026)

The hero and DAIY Lab section now state the owner's co-founder role and give the team credit for Shroud. `npm run check`, `npm run build`, and all **41 Playwright tests** passed. Reviewed both sections at 1440, 768, and 320 CSS pixels in both motion settings. The hero actions fit at 320 × 720. Captures are in `artifacts/daiy-cofounder/`.

## Portfolio and sharing punctuation (19 November 2026)

Formatting, type checking, lint, the production build, and all 41 Playwright tests passed on macOS with Node 24.22.3. Checked the built page title, Open Graph and Twitter metadata, and the sharing image for em dashes.

## CI mobile touch test (19 November 2026)

The GitHub Actions run on `3ec772d` passed the clean install and build. Its mobile test timed out waiting for an exact scroll position after a synthetic swipe. The revised test checks that browser touch events move the page and both figures in each direction, then uses precise viewport positions to check individual frames. Tap interactions with both sliders remain covered.

On macOS with Node 24.22.3 and Chromium 159.0.8154.6, `npm run check`, `npm run build`, eight focused touch runs, and all **41 Playwright tests** passed. The test runs used two workers and zero retries. Validation on GitHub’s Linux runner is pending.

## Rotating loss landscape (19 November 2026)

The hero now rotates the perspective projection by 40° as the point descends. The arrow projects the negative gradient at the current point and shrinks near the valley. The caption identifies the figure as an illustrative 2D slice. The desktop descent uses 380 CSS pixels of scroll and the narrow layout uses 67% of viewport height. The desktop figure moves upward more slowly than the page during the descent so the endpoint stays visible, including on a 768 × 720 viewport. Reduced motion shows the complete route from a single viewpoint.

`npm run check`, `npm run build`, and all **41 Playwright tests** passed on Node 24.22.3 and Chromium 159.0.8154.6. Verified reversible camera rotation, a gradient arrow attached to the point, touch and keyboard scrubbing, the desktop endpoint clearance, the 320 × 720 hero actions, and the existing Maestro pinning checks. Reviewed figure screenshots at desktop, tablet, and phone widths in both motion settings using the refreshed [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md).

Chromium profiles of the hero at 1440 × 1000 and 320 × 720 measured a 95th-percentile frame interval of **16.7–16.8 ms** at normal speed and 4× CPU slowdown. The largest recorded hero paint was **1.28 ms**. Lighthouse 13.6.0 scored 100 in each standard category on both local presets. Largest contentful paint was 0.75 s on mobile and 0.38 s on desktop, with zero cumulative layout shift and total blocking time. The captures and reports are in `artifacts/scroll-figures/` and `artifacts/scroll-figures-rotation/`. The tests used Chromium with emulated phone input.

## Figure pacing and manual exploration (19 November 2026)

Extended the desktop descent from 180 to 320 CSS pixels of scroll, the narrow descent from 45% to 60% of viewport height, and the forecast from 42% to 62%. The native sliders below the figures let visitors revisit the loss path or any of the five forecast cutoffs from a stationary page. Scrolling resumes control when the scroll-driven progress or forecast week changes. Reduced motion shows the complete static figures.

`npm run check`, `npm run build`, and all **40 Playwright tests** passed on Node 24.22.3 and Chromium 159.0.8154.6. Desktop wheel and emulated touch tests crossed each sequence in a single gesture, then revisited skipped positions with the sliders using keyboard and touch. The tests verified that the page held its position during manual exploration and that scroll-driven updates resumed afterward. Reviewed desktop, tablet, and 320px screenshots in both motion settings against the refreshed [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md).

The updated Chromium traces measured a 95th-percentile frame interval of **16.7–16.8 ms** on the 1440px and 320px layouts at normal CPU speed and 4× slowdown. Lighthouse 13.6.0 scored 100 for each of performance, accessibility, best practices, and SEO on both local presets. Largest contentful paint was 0.75 s on mobile and 0.38 s on desktop, with zero cumulative layout shift and total blocking time. Reports and traces are in `artifacts/scroll-figures-paced/`, and the desktop and phone figure captures are in `artifacts/scroll-figures/`.

## Scroll-driven portfolio figures (19 November 2026)

The hero shows an illustrative loss surface along two parameter directions. The point and trail follow the same precomputed gradient-descent route. MetaFlu’s chart shows five weekly snapshots of a synthetic series. Each Bayesian forecast uses the observations through its cutoff and shows four prediction weeks with an 80% predictive interval. Reduced motion shows the full descent and the final forecast.

Validated the localhost production build on macOS 15.7.8 ARM64 with Node 24.22.3 and Chromium 159.0.8154.6. `npm ci --prefer-offline --no-audit`, `npm run check`, `npm run build`, and all **40 Playwright tests** passed. The tests exercised reversible desktop wheel and emulated mobile touch scrolling, paused snapshots in reduced motion, weekly cutoff isolation, fixed axes, the 320 × 720 hero actions, keyboard navigation, and the existing Maestro pinning. Across the responsive suite there were no clipped SVG labels, horizontal overflow, console errors, or axe A/AA violations.

Reviewed desktop, tablet, and narrow phone captures in both motion modes. The final audit used the refreshed [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md). The SVG labels fit inside their view boxes, the forecast legend wraps on phones, and visible figcaptions explain both visuals. The trail changes the SVG stroke to draw the route, so its paint cost was included in the scrolling trace. Screenshots are in `artifacts/scroll-figures/` and the first-screen phone capture is `artifacts/llm-hero-320-no-preference.png`.

For each figure, Chromium recorded a 1.2-second forward sweep and a 1.2-second reverse sweep at both 1440 × 1000 and 320 × 720. At normal speed and 4× CPU slowdown, the 95th percentile frame interval was **16.7–16.8 ms** across the eight samples. No sampled interval exceeded 33.5 ms. The largest recorded individual paint was **1.13 ms** during the throttled narrow hero sweep. The production bundle added **1.57 kB gzip JavaScript** and **0.42 kB gzip CSS** compared with the starting checkout. Traces and timings are in `artifacts/scroll-figures/scroll-*.trace.json` and `artifacts/scroll-figures/scroll-timing.json`.

Lighthouse 13.6.0 used its simulated mobile and desktop presets against the same preview.

| Metric                                          | Mobile   | Desktop  |
| ----------------------------------------------- | -------- | -------- |
| Performance, accessibility, best practices, SEO | 100 each | 100 each |
| Largest contentful paint                        | 0.75 s   | 0.20 s   |
| Cumulative layout shift                         | 0        | 0        |
| Total blocking time                             | 0 ms     | 0 ms     |
| Experimental Agentic Browsing                   | 50       | 50       |

Reports are in `artifacts/scroll-figures/lighthouse-{mobile,desktop}.report.{html,json}`. These are local Chromium lab measurements with mobile input and CPU slowdown emulated. Physical phones and Safari were outside this run.

## LLM research engineering positioning (19 November 2026)

Shroud leads the hero and Selected Work. The hero shows the master's degree and links directly to the configured email. The MetaFlu paper and forecast links sit above the illustrative chart in reading order. Maestro's backend-processing disclosure appears beside the demo link. Search metadata, the sharing image, and the no-JavaScript introduction use the revised positioning.

Validated the production preview at `http://127.0.0.1:4173/` on macOS ARM64 with Node 24.22.3 and Chromium 159.0.8154.6. The exact lockfile installed with `npm ci --prefer-offline --no-audit`. Asset generation, `npm run check`, and `npm run build` passed. All **34 Playwright tests** passed, including direct arrivals at `#shroud`, `#research`, and `#contact` in both motion settings, the isolated hero fallback for missing email, and the existing keyboard and pinning checks.

Reviewed screenshots at 1440, 768, 390, and 320 CSS pixels in both motion settings and all three Maestro animation stages. At 320 × 720, the role, degree, availability, and both hero actions fit on the first screen. No overflow, console errors, or axe A/AA violations appeared in the responsive suite. The changed UI was reviewed against the refreshed [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md). These checks cover the tested browser and layout cases.

Lighthouse 13.6.0 ran on the same localhost build using simulated mobile throttling and the desktop preset.

| Metric                                          | Mobile   | Desktop  |
| ----------------------------------------------- | -------- | -------- |
| Performance, accessibility, best practices, SEO | 100 each | 100 each |
| Largest contentful paint                        | 0.75 s   | 0.20 s   |
| Cumulative layout shift                         | 0        | 0        |
| Total blocking time                             | 0 ms     | 0 ms     |
| Experimental Agentic Browsing                   | 50       | 50       |

These are local lab measurements. Reports are in `artifacts/lighthouse-llm-{mobile,desktop}.report.{html,json}`. Narrow first-screen captures are in `artifacts/llm-hero-320-{reduce,no-preference}.png`.

The Maestro demo, frontend, and technical report, the public MetaFlu forecast, GitHub profile, and lab site returned HTTP 200. The [Influcast paper](https://pubmed.ncbi.nlm.nih.gov/39965358/) was checked via PubMed's web record. LinkedIn rejected the automated request, so signed-out profile access remains unverified. The email href was verified without sending a message. The Maestro camera session and Shroud prototype were outside this portfolio validation. The revision is available in the local preview.

## DAIY Lab link (19 November 2026)

Removed the lab website source link. The build, checks, and all 25 browser tests passed. Verified that **Explore DAIY Lab** is the section’s only link and reviewed it at 1440, 768, and 320 CSS pixels in both motion settings.

## Shroud portfolio entry (18 November 2026)

The follow-up removed the public release announcement and added **Get in touch** and **Visit DAIY Lab**. The build, checks, and all 25 browser tests passed again. The Shroud contact link reached `#contact`, the DAIY Lab URL returned HTTP 200, and the links fit in screenshots at 1440, 768, and 320 CSS pixels in both motion settings. The Lighthouse results below are from the initial entry.

The portfolio describes the local text-masking MVP and the planned cloud-assisted workspace. Verified that the Shroud shortcut lands on its own entry after Maestro, with collaboration credit and release status. The exact lockfile installed with `npm ci --prefer-offline --no-audit` after an offline attempt could not resolve optional peer metadata. `npm run check`, `npm run build`, and all **25 Playwright tests** passed on macOS ARM64 with Node 24.22.3. The responsive suite detected zero axe A/AA violations, horizontal overflow, or console errors. Reviewed the updated navigation and project entry at 1440, 768, and 320 CSS pixels in both motion settings, plus the three Maestro scroll stages. Reviewed the changed UI against the refreshed [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md).

Lighthouse 13.6.0 with headless Chromium 159 scored **100** in performance, accessibility, best practices, and SEO on both the mobile and desktop presets. Largest contentful paint was 0.8 s on mobile and 0.2 s on desktop, with zero cumulative layout shift and zero total blocking time on both. The experimental Agentic Browsing score was 50 on both. These are localhost lab results. Reports are in `artifacts/lighthouse-shroud-{mobile,desktop}.report.{html,json}`.

## LLM applications copy (18 November 2026)

Replaced the previous example with owner-supplied LLM fine-tuning, agent orchestration, and experiments building local applications with Ollama and LM Studio. `npm run check`, `npm run build`, and all 24 Playwright tests passed. Verified that the revised text is in the production bundle and reviewed the row at 1440, 768, and 320 CSS pixels in both motion settings.

## Technical expertise copy (18 November 2026)

Checked the stack and examples against project source and commit history. `npm run check`, `npm run build`, and all 24 Playwright tests passed in Chromium using Node 24.22.3. Reviewed the revised descriptions and technology tags at 1440, 768, and 320 CSS pixels in both motion settings against the refreshed [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md). The copy and tags fit at all three widths. The Lighthouse measurements below are from the 17 November build.

## Copy update (18 November 2026)

Regenerated the sharing artwork and verified the production description and image alt text. `npm run check`, `npm run build`, and all 24 Playwright tests passed in Chromium using Node 24.22.3. Reviewed fresh screenshots at 1440, 768, and 320 CSS pixels in both motion settings. The revised copy wrapped within its columns and the schematics remained clear of surrounding text. Reviewed the revised copy and its rendering against the refreshed [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md). The Lighthouse measurements below are from the 17 November build. This update was validated locally.

## Editorial and design revision (17 November 2026)

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
src/App.tsx: pass (one h1, semantic navigation, immediate text, native anchors)
src/components/ProjectFeature.tsx: pass (captions, decorative layers, static and reduced-motion fallbacks)
src/components/ResearchFeature.tsx: pass (integrated citation, illustrative diagram with explanatory caption)
src/components/LabFeature.tsx: pass (clear participation, native destinations)
src/components/ContactSection.tsx: pass (visible contact details, isolated optional-contact behavior)
src/components/Signal.tsx: pass (hidden decorative SVG, motion values)
src/styles.css: pass (focus, contrast, responsive flow, explicit transitions, font stability)
index.html: pass (zoom permitted, local font preload, canonical/social metadata, no-script links)
```

Sentence-case headings and first-person writing intentionally follow this personal portfolio's brief. Native page scrolling and navigation remain enabled. Automated scans and this review are **not complete WCAG 2.2 AA certification**.

## Sources, links, and remaining limitations

- Read the [PubMed publication record](https://pubmed.ncbi.nlm.nih.gov/39965358/) and abstract: they confirm Francesco Celino's co-authorship, _Epidemics_ (2025), and the collaborative Influcast ensemble context. MetaFlu's personal contribution is based on the owner's supplied facts; no individual model results were inferred from ensemble findings.
- Read the [DAIY Lab website](https://22johngalt.github.io/DIY/), its linked public repository file list, and MIT license. The public source inspected contains the website and illustrative instruments. Participation is owner-supplied; no leadership role or personal ownership of collective outputs is asserted.
- The Maestro demo and repository returned **HTTP 200**. The technical-report DOI returned **HTTP 200**, ending at `https://zenodo.org/records/21509794`. Its report contents and scientific findings were not independently evaluated. The demo's camera/session workflow was not activated.
- Email and LinkedIn remain configured with the owner's original values. Tests verify rendered destinations and keyboard access; actual email delivery and LinkedIn authentication/profile access were not tested.
- Chromium was tested. Safari, Firefox, physical devices, actual native 200% browser zoom, and screen-reader sessions remain untested. Reflow simulation is not a native zoom test.
- No remote is configured. No push, deployment, account changes, custom domain, or DNS changes occurred. The existing Pages workflow was preserved; its remote execution remains unverified.
