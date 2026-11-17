import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { portfolio, research, lab } from '../src/content/portfolio';

for (const reducedMotion of ['reduce', 'no-preference'] as const) {
  for (const width of [1920, 1440, 768, 390, 320]) {
    test(`responsive layout and accessibility at ${width}px (${reducedMotion})`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: width < 800 ? 844 : 1000 });
      await page.emulateMedia({ reducedMotion });
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (message) => {
        if (message.type() === 'error') errors.push(message.text());
      });
      const response = await page.goto('/');
      expect(response?.status()).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(
        `${portfolio.name} ${portfolio.role}`,
      );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      if (reducedMotion === 'reduce' || width < 1024) {
        const input = await page.locator('.stage-input').boundingBox();
        const labels = await page.locator('.pipeline-stages').boundingBox();
        const top = await page.locator('.pipeline-top').boundingBox();
        expect(input!.y).toBeGreaterThanOrEqual(top!.y + top!.height);
        expect(labels!.y).toBeGreaterThanOrEqual(input!.y + input!.height);
      }
      await page.screenshot({
        path: `artifacts/portfolio-${width}-${reducedMotion}.png`,
        fullPage: true,
      });
      const audit = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(audit.violations).toEqual([]);
      expect(errors).toEqual([]);
    });
  }
}

test('navigation, configured contacts, and project destinations', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const name of ['Work', 'Research', 'Expertise', 'Contact']) {
    await page
      .getByRole('navigation')
      .getByRole('link', { name, exact: true })
      .click();
    await expect(page).toHaveURL(new RegExp(`#${name.toLowerCase()}$`));
    await expect(page.locator(`#${name.toLowerCase()}`)).toBeInViewport();
  }
  await expect(
    page.getByRole('link', { name: portfolio.email }),
  ).toHaveAttribute('href', `mailto:${portfolio.email}`);
  await expect(
    page.getByRole('link', { name: 'LinkedIn', exact: true }),
  ).toHaveAttribute('href', portfolio.linkedin);
  await expect(
    page.getByRole('link', { name: 'Try the demo' }),
  ).toHaveAttribute('href', 'https://francescocelino.github.io/maestro-demo/');
  await expect(page.getByRole('link', { name: 'View source' })).toHaveAttribute(
    'href',
    'https://github.com/francescocelino/maestro-demo',
  );
  await expect(
    page.getByRole('link', { name: 'Technical report' }),
  ).toHaveAttribute('href', 'https://doi.org/10.5281/zenodo.21509794');
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(1);
  await expect(page.locator('.privacy-note')).toContainText(
    'not fully on-device',
  );
});

test('keyboard navigation exposes the skip link and focus', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Skip to content' }),
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
  await page.keyboard.press('Tab');
  const outlineStyle = await page
    .locator(':focus')
    .evaluate((element) => getComputedStyle(element).outlineStyle);
  expect(outlineStyle).not.toBe('none');
  const reached = new Set<string>();
  for (let step = 0; step < 45; step++) {
    await page.keyboard.press('Tab');
    const href = await page.locator(':focus').getAttribute('href');
    if (href) reached.add(href);
    if (
      reached.has(`mailto:${portfolio.email}`) &&
      reached.has(portfolio.linkedin)
    )
      break;
  }
  expect(reached.has(`mailto:${portfolio.email}`)).toBe(true);
  expect(reached.has(portfolio.linkedin)).toBe(true);
  await expect(page.locator(':focus')).toBeInViewport();
});

test('scroll changes the schematic; reduced motion removes pinning', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const diagram = page.locator('.decision-diagram');
  const initial = await diagram.evaluate(
    (element) => getComputedStyle(element).transform,
  );
  await page.locator('.story-chapter').last().scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      diagram.evaluate((element) => getComputedStyle(element).transform),
    )
    .not.toBe(initial);
  await expect(page.locator('.pipeline')).toHaveCSS('position', 'sticky');
  for (const [index, stage] of ['input', 'inference', 'output'].entries()) {
    await page
      .locator('.story-chapter')
      .nth(index)
      .evaluate((element) =>
        element.scrollIntoView({ block: 'center', behavior: 'instant' }),
      );
    await expect
      .poll(() =>
        page
          .locator(`.stage-${stage}`)
          .evaluate((element) => Number(getComputedStyle(element).opacity)),
      )
      .toBeGreaterThan(0.9);
    await page.screenshot({ path: `artifacts/motion-${stage}.png` });
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.pipeline')).toHaveCSS('position', 'static');
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto');
  await expect(page.locator('.story-chapter')).toHaveCount(3);
});

test('native motion keeps tablet and phone layouts readable', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  for (const width of [834, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.locator('.pipeline').scrollIntoViewIfNeeded();
    await expect(page.locator('.pipeline')).toHaveCSS('position', 'static');
    await expect(page.locator('.stage-input')).toHaveCSS('opacity', '1');
    await expect(page.locator('.stage-inference')).toBeHidden();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `artifacts/native-motion-${width}.png`,
      fullPage: true,
    });
  }
});

test('short viewports and text enlargement remain usable', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 650 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect(page.locator('.pipeline')).toHaveCSS('position', 'static');
  // A 720 CSS-pixel viewport models reflow at 200% browser zoom on a 1440px display.
  await page.setViewportSize({ width: 720, height: 450 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await expect(
    page.getByRole('link', { name: 'Explore my work' }),
  ).toBeVisible();
});

test('production metadata and local assets are complete', async ({
  page,
  request,
}) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Francesco Celino — AI Engineer');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://francescocelino.github.io/',
  );
  for (const path of [
    '/robots.txt',
    '/sitemap.xml',
    '/favicon.svg',
    '/favicon-32.png',
    '/apple-touch-icon.png',
    '/social-preview.png',
  ]) {
    expect((await request.get(path)).status(), path).toBe(200);
  }
  expect(await (await request.get('/sitemap.xml')).text()).toContain(
    'https://francescocelino.github.io/',
  );
  expect(await (await request.get('/')).text()).not.toMatch(/%[A-Z_]+%/);
});

test('basic destinations remain available without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/');
  await expect(page.getByRole('link', { name: 'my GitHub' })).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Maestro age-verification demo' }),
  ).toBeVisible();
  await context.close();
});

test('research and lab distinguish individual contributions from collaboration', async ({
  page,
}) => {
  await page.goto('/');
  const feature = page.locator('#research');
  await expect(
    feature.getByRole('heading', { name: 'MetaFlu', exact: true }),
  ).toBeVisible();
  await expect(feature).toContainText(
    'I developed a statistical modeling framework',
  );
  await expect(feature).toContainText('Co-author');
  await expect(feature).toContainText('Epidemics (2025)');
  await expect(feature).toContainText(
    'ensemble results belong to that collaboration',
  );
  await expect(
    feature.getByRole('link', { name: research.publication.title }),
  ).toHaveAttribute('href', research.publication.href);
  await expect(feature.getByRole('link')).toHaveCount(1);
  await expect(feature.locator('figcaption')).toContainText(
    'not study data or a MetaFlu result',
  );
  await expect(page.locator('#lab')).toContainText('I’m part of DAIY Lab.');
  for (const link of lab.links)
    await expect(
      page.getByRole('link', { name: link.label, exact: true }),
    ).toHaveAttribute('href', link.href);
  await expect(page.locator('#expertise')).not.toContainText(
    'Proofs of concept',
  );
  for (const item of portfolio.workIndex) {
    await page
      .getByRole('navigation', { name: 'Featured work and collaboration' })
      .getByRole('link', { name: new RegExp(item.label) })
      .click();
    await expect(page).toHaveURL(new RegExp(`${item.href}$`));
  }
});

test('delayed body font keeps the mobile introduction stable', async ({
  page,
}) => {
  await page.setViewportSize({ width: 412, height: 823 });
  let releaseFont!: () => void;
  const fontGate = new Promise<void>((resolve) => {
    releaseFont = resolve;
  });
  await page.route('**/source-sans-3-latin.woff2', async (route) => {
    await fontGate;
    await route.continue();
  });
  try {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('.hero-description')).toBeVisible();
    await page.evaluate(() => document.fonts.load('450 40px "Sora Variable"'));
    const before = await page.locator('#work').boundingBox();
    releaseFont();
    await page.evaluate(() => document.fonts.ready);
    const after = await page.locator('#work').boundingBox();
    expect(Math.abs(after!.y - before!.y)).toBeLessThan(24);
  } finally {
    releaseFont();
  }
});
