import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const width of [1920, 1440, 768, 390, 320]) {
  test(`responsive layout and accessibility at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: width < 800 ? 844 : 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'From research to real-world systems.',
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `artifacts/portfolio-${width}.png`,
      fullPage: true,
    });
    const audit = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(audit.violations).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test('navigation, contact fallback, and project destinations', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const name of ['Work', 'Expertise', 'About', 'Contact']) {
    await page
      .getByRole('navigation')
      .getByRole('link', { name, exact: true })
      .click();
    await expect(page).toHaveURL(new RegExp(`#${name.toLowerCase()}$`));
    await expect(page.locator(`#${name.toLowerCase()}`)).toBeInViewport();
  }
  await expect(
    page.getByRole('link', { name: 'Find me on GitHub' }),
  ).toHaveAttribute('href', 'https://github.com/francescocelino');
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
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
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
  await page.emulateMedia({ reducedMotion: 'reduce' });
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
  await expect(page).toHaveTitle('Francesco Celino — AI Engineer & Consultant');
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
  expect(await (await request.get('/')).text()).not.toContain('%SITE_URL%');
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
