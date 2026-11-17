# Francesco Celino — AI engineering portfolio

A static, responsive portfolio built with React, strict TypeScript, Vite, and Motion for React. The production destination is **https://francescocelino.github.io/**. There is no backend, tracking, camera access, or contact-form service.

The visual direction is **signal to system**: Sora display typography, a slate and copper palette, an original mathematical contour illustration, and a scroll-driven Maestro system study. All fonts and artwork are served locally.

## Develop locally

Use **Node 24 LTS** and npm. With nvm installed:

```sh
nvm use
npm ci
npm run dev
```

Open the URL printed by Vite. `npm ci` installs the versions in `package-lock.json`; it is the reproducible alternative to resolving dependencies again.

| Command           | Purpose                                                                   |
| ----------------- | ------------------------------------------------------------------------- |
| `npm run dev`     | Development server with live updates                                      |
| `npm run check`   | Formatting, TypeScript, and ESLint                                        |
| `npm run build`   | Type checking and static production build into `dist/`                    |
| `npm run preview` | Preview the production build on port 4173                                 |
| `npm test`        | Browser smoke tests, accessibility scans, and content-configuration tests |
| `npm run format`  | Apply formatting                                                          |
| `npm run assets`  | Regenerate sharing graphic/icons and copy licensed local fonts            |

Before running tests for the first time, install their browser:

```sh
npx playwright install chromium
npm run build
npm test
```

The tests start a production preview automatically, or reuse an existing one on port 4173. Screenshots appear in `artifacts/`; the test report is in `playwright-report/`. Both are ignored by Git.

## Customize the content

Edit **`src/content/portfolio.ts`**. It owns the biography, services, availability, project records, contact fields, and canonical site URL. These values are public content, not secrets.

- Set `email` to your real address to enable the email CTA. Until then, the contact CTA opens the supplied GitHub profile.
- Set `linkedin` to your real profile URL to show LinkedIn. Empty fields are omitted rather than rendered as broken links.
- Update `availability` as your circumstances change.
- Add another object to `projects` using the exported `Project` interface. Supply its title, category, summary, disciplines, links, and narrative stages. A neutral visual is used by default. `visual: 'age-verification'` is specific to Maestro; do not reuse it for unrelated work.
- `privacyNote` is optional and should describe the particular project accurately.

The Maestro text deliberately distinguishes the production product, which is designed for on-device processing, from the public browser demo, which sends throttled JPEG frames to a separate backend. Its linked publication is a **technical report**. Do not add unsupported performance numbers, clients, credentials, or claims of peer review.

## How the motion works

The hero has a brief, staggered line reveal. Its vector surface translates and rotates subtly with scroll. On desktop, Maestro's sticky visual moves through input, session inference, and threshold decisions while the explanatory text stays in normal document flow. Motion values drive transforms and opacity without React state updates on each frame.

At tablet/mobile sizes, the diagram becomes a static schematic, the chapters stack, and the hero retains subtle scroll-linked depth. Short desktop viewports disable pinning. `prefers-reduced-motion` removes spatial motion, smooth scrolling, and sticky storytelling; all content and links remain available. No scrolling is intercepted, and no infinite animations run.

Design tokens and responsive rules live in `src/styles.css`. The SVG contour surface is deterministic and is generated once at module load, rather than repainted by a canvas animation.

## Publish with GitHub Pages

This checkout is prepared for deployment. **A local build does not publish the website.** No remote changes or publication are performed automatically by local commands.

1. Create or open the GitHub repository **`francescocelino/francescocelino.github.io`**. Use a public repository for free GitHub Pages hosting.
2. In **Settings → Pages → Build and deployment → Source**, choose **GitHub Actions**. Keep the custom-domain field empty for this release.
3. If this folder still has no Git metadata and the GitHub repository is empty, initialize it and connect it:

   ```sh
   git init -b main
   git remote add origin https://github.com/francescocelino/francescocelino.github.io.git
   git add .
   git commit -m "Build AI engineering portfolio"
   git push -u origin main
   ```

   If the remote already contains commits, clone it and copy this site's source into that checkout instead. Preserve its history; do not force-push.

4. Open **Actions → Validate and deploy portfolio** and wait for both `build` and `deploy` to succeed. If the `github-pages` environment requires approval, complete it in GitHub.
5. Open **https://francescocelino.github.io/** and verify navigation, fonts, social-image URL, and project links. Confirm the Pages environment reports that URL.

The workflow validates pull requests without deploying them. Pushes to `main` and manual runs install from the lockfile, validate, build, and test the production preview before deploying the `dist/` artifact. Actions are pinned to verified commit SHAs. The build has read-only repository access; only the deployment job receives `pages: write` and `id-token: write`.

Vite's `base` is `/` because this is a GitHub **user site**. Do not change it to `/francescocelino.github.io/`. No SPA routing rewrite is needed: navigation uses document anchors.

### Add a custom domain later

Update `portfolio.siteUrl`, rebuild, and configure the domain and HTTPS in GitHub Pages. Canonical/social URLs, robots.txt, and sitemap.xml derive from that value. Then update the hostname in the sharing-graphic generator and regenerate it. Add DNS records only when the domain migration is explicitly requested. There is no `CNAME` in the initial implementation.

## Quality and evidence

See `docs/validation.md` for actual local results and verification limits. Automated accessibility scans are useful checks, not a certification of WCAG conformance. Lighthouse is a lab measurement; field Core Web Vitals require real visits after deployment.

The browser tests cover five widths (1920, 1440, 768, 390, 320), keyboard focus, anchor navigation, reduced motion, scroll-linked transformations, short viewports, zoom-like reflow, metadata, static assets, contact fallbacks/configuration, future projects, and a JavaScript-disabled fallback. Full cross-device and screen-reader testing remains a separate manual check.

To repeat Lighthouse with Chrome installed:

```sh
npm run build
npm run preview
# In a second terminal:
npx lighthouse http://127.0.0.1:4173/ --view
```

## Sources and licensing

The implementation follows the reviewed [Frontend Design skill](https://github.com/anthropics/skills/tree/main/skills/frontend-design), the installed [React Best Practices](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices), and [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines). Framework/API choices were checked against [React](https://react.dev/learn/build-a-react-app-from-scratch), [Vite](https://vite.dev/guide/), [Motion](https://motion.dev/docs/react-scroll-animations), [MDN reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion), and [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) documentation.

[Bynario](https://bynar.io/) informed the emphasis on typography, technical storytelling, and spatial rhythm. Its source, artwork, branding, and layout were not reused. The contour illustration, monogram, and sharing graphic were created for this portfolio. Font licenses are included under `public/fonts/` (SIL Open Font License).
