import { expect, test, type Locator, type Page } from '@playwright/test';
import { descent, landscapeFrame } from '../src/components/lossLandscape';
import {
  observations,
  snapshots,
  weeklyForecast,
} from '../src/components/weeklyForecast';

const screenshotDir = 'artifacts/scroll-figures';

test('the example optimizer lowers loss and the forecast uses its observation prefix', () => {
  for (const [index, step] of descent.entries()) {
    const previous = descent[index - 1];
    if (previous) expect(step.loss).toBeLessThan(previous.loss);
  }
  expect(descent.at(-1)!.loss).toBeCloseTo(0.04, 3);

  for (const snapshot of snapshots) {
    const { cutoff, observed, predictions } = snapshot;
    expect(observed).toEqual(observations.slice(0, cutoff + 1));
    expect(predictions.map(({ week }) => week)).toEqual([
      cutoff + 1,
      cutoff + 2,
      cutoff + 3,
      cutoff + 4,
    ]);
    const changedFuture = observations.map((value, week) =>
      week > cutoff ? value + 100 : value,
    );
    expect(weeklyForecast(changedFuture, cutoff)).toEqual(snapshot);

    let previousWidth = 0;
    for (const { lower, median, upper } of predictions) {
      expect(lower).toBeLessThan(median);
      expect(upper).toBeGreaterThan(median);
      expect(upper - lower).toBeGreaterThan(previousWidth);
      previousWidth = upper - lower;
    }
  }
  expect(snapshots[0]!.predictions.at(-1)!.median).toBeCloseTo(34);
  expect(snapshots.at(-1)!.predictions.at(-1)!.median).toBeCloseTo(32.57);
});

async function documentTop(page: Page, figure: Locator) {
  const bounds = (await figure.boundingBox())!;
  return bounds.y + (await page.evaluate(() => window.scrollY));
}

async function captureFigure(page: Page, figure: Locator, name: string) {
  const bounds = (await figure.boundingBox())!;
  const scrollY = await page.evaluate(() => window.scrollY);
  await page.screenshot({
    path: `${screenshotDir}/${name}.png`,
    fullPage: true,
    clip: { ...bounds, y: bounds.y + scrollY },
  });
}

async function positionPage(page: Page, top: number) {
  await page.evaluate(
    (top) => window.scrollTo({ top, behavior: 'instant' }),
    top,
  );
}

for (const viewport of [
  { width: 1440, height: 1000, touch: false },
  { width: 320, height: 720, touch: true },
]) {
  test(`both figures respond to forward and backward ${viewport.touch ? 'touch' : 'wheel'} scrolling`, async ({
    browser,
    baseURL,
  }) => {
    const { width, height, touch } = viewport;
    const context = await browser.newContext({
      baseURL,
      viewport: { width, height },
      hasTouch: touch,
      isMobile: touch,
      reducedMotion: 'no-preference',
    });
    try {
      const page = await context.newPage();
      const cdp = touch ? await context.newCDPSession(page) : null;
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);

      const scrollToStage = async (target: number) => {
        if (touch) {
          await positionPage(page, target);
          return;
        }
        const delta = Math.round(
          target - (await page.evaluate(() => window.scrollY)),
        );
        await page.mouse.move(width / 2, height / 2);
        await page.mouse.wheel(0, delta);
        await expect
          .poll(async () =>
            Math.abs(target - (await page.evaluate(() => window.scrollY))),
          )
          .toBeLessThan(8);
      };

      // Touch movement depends on the browser's gesture thresholds. Verify
      // the direction here and seek precise scroll positions for frame checks.
      const verifyTouchSwipes = async (readProgress: () => Promise<number>) => {
        if (!cdp) return;
        const origin = { x: 12, y: height / 2 }; // Page gutter, outside controls.
        for (const direction of [1, -1]) {
          const scrollBefore = await page.evaluate(() => window.scrollY);
          const progressBefore = await readProgress();
          await cdp.send('Input.dispatchTouchEvent', {
            type: 'touchStart',
            touchPoints: [origin],
          });
          try {
            for (const distance of [24, 48, 72, 96, 120]) {
              await cdp.send('Input.dispatchTouchEvent', {
                type: 'touchMove',
                touchPoints: [
                  { ...origin, y: origin.y - direction * distance },
                ],
              });
              await page.evaluate(() => new Promise(requestAnimationFrame));
            }
            await expect
              .poll(
                async () =>
                  direction *
                  ((await page.evaluate(() => window.scrollY)) - scrollBefore),
              )
              .toBeGreaterThan(30);
            await expect
              .poll(
                async () =>
                  direction * ((await readProgress()) - progressBefore),
              )
              .toBeGreaterThan(0);
          } finally {
            // Finish the controlled drag without introducing a fling.
            await cdp.send('Input.dispatchTouchEvent', {
              type: 'touchCancel',
              touchPoints: [],
            });
          }
        }
      };

      const scrub = async (input: Locator, key: string, fraction: number) => {
        await input.scrollIntoViewIfNeeded();
        const scrollY = await page.evaluate(() => window.scrollY);
        if (touch) {
          const bounds = (await input.boundingBox())!;
          await input.tap({
            position: {
              x: 4 + fraction * (bounds.width - 8),
              y: bounds.height / 2,
            },
          });
        } else {
          await input.press(key);
        }
        expect(await page.evaluate(() => window.scrollY)).toBe(scrollY);
      };

      const loss = page.locator('.signal');
      const track = loss.locator('.loss-route');
      const marker = loss.locator('.loss-current');
      const gradient = loss.locator('.loss-gradient');
      const mesh = loss.locator('.loss-mesh');
      const descentScrubber = loss.getByRole('slider', { name: 'Descent' });
      const reveal = () =>
        descentScrubber.evaluate(
          (input: HTMLInputElement) => input.valueAsNumber / 100,
        );
      const checkArrow = async () => {
        const x = await marker.getAttribute('cx');
        const y = await marker.getAttribute('cy');
        expect(
          (await gradient.getAttribute('d'))?.startsWith(`M${x},${y}L`),
        ).toBe(true);
      };
      const lossTop = await documentTop(page, loss);
      const start = touch ? lossTop - height * 0.72 - 12 : 0;
      const middle = touch ? lossTop - height * 0.385 : 190;
      const end = touch ? lossTop - height * 0.05 + 12 : 380;

      await positionPage(page, start);
      await expect.poll(reveal).toBeLessThan(0.02);
      await expect(track).toHaveAttribute('d', '');
      const startMesh = await mesh.innerHTML();
      const startX = await marker.getAttribute('cx');
      await checkArrow();
      await captureFigure(page, loss, `${width}-loss-start`);
      await scrollToStage(middle);
      await expect.poll(reveal).toBeGreaterThan(0.4);
      await expect.poll(reveal).toBeLessThan(0.6);
      await expect(marker).not.toHaveAttribute('cx', startX!);
      await expect(track).toHaveAttribute('d', /^M.+L/);
      expect(await mesh.innerHTML()).not.toBe(startMesh);
      await checkArrow();
      await captureFigure(page, loss, `${width}-loss-middle`);
      await verifyTouchSwipes(reveal);
      await scrollToStage(end);
      await expect.poll(reveal).toBeGreaterThan(0.98);
      await expect(track).toHaveAttribute('d', landscapeFrame(1).trail);
      await expect(gradient).toHaveAttribute('d', '');
      await expect(marker).toBeInViewport({ ratio: 0.99 });
      await captureFigure(page, loss, `${width}-loss-end`);
      await scrollToStage(middle);
      await expect.poll(reveal).toBeLessThan(0.6);
      await scrollToStage(start);
      await expect.poll(reveal).toBeLessThan(0.02);
      await expect(marker).toHaveAttribute('cx', startX!);
      await expect.poll(() => mesh.innerHTML()).toBe(startMesh);

      // Jump past the intermediate frames, then recover them with the slider.
      await scrollToStage(end);
      await expect(descentScrubber).toHaveValue('100');
      await scrub(descentScrubber, 'Home', 0);
      await expect.poll(reveal).toBeLessThan(0.02);
      await expect(track).toHaveAttribute('d', '');
      await scrub(descentScrubber, 'End', 1);
      await expect.poll(reveal).toBeGreaterThan(0.98);
      await scrollToStage(middle);
      await expect.poll(reveal).toBeLessThan(0.6);

      const forecast = page.locator('.forecast');
      const forecastScrubber = forecast.getByRole('slider', {
        name: 'Explore forecast weeks',
      });
      const forecastTop = await documentTop(page, forecast);
      const axis = forecast.locator('.forecast-axis').first();
      const fixedAxis = await axis.getAttribute('d');
      const centerOfWeek = (week: number) =>
        forecastTop - height * (0.7 - 0.62 * ((week + 0.5) / 5));
      const cutoffs = ['19 Jan', '26 Jan', '2 Feb', '9 Feb', '16 Feb'];
      const checkWeek = async (week: number) => {
        await expect(
          forecast.locator('.forecast-cutoff-date strong'),
        ).toHaveText(cutoffs[week]!);
        await expect(forecast.locator('.forecast-observation')).toHaveCount(
          3 + week,
        );
        await expect(forecast.locator('.forecast-latest')).toBeInViewport({
          ratio: 0.99,
        });
        await expect(axis).toHaveAttribute('d', fixedAxis!);
        const median = await forecast
          .locator('.forecast-median')
          .getAttribute('d');
        expect(median?.match(/L/g)).toHaveLength(4);
        return median;
      };

      await positionPage(page, centerOfWeek(0));
      const firstMedian = await checkWeek(0);
      await captureFigure(page, forecast, `${width}-forecast-start`);
      for (const week of [1, 2, 3, 4]) {
        await scrollToStage(centerOfWeek(week));
        expect(await checkWeek(week)).not.toEqual(firstMedian);
        if (week === 2) {
          await captureFigure(page, forecast, `${width}-forecast-middle`);
          await verifyTouchSwipes(() =>
            forecastScrubber.evaluate(
              (input: HTMLInputElement) => input.valueAsNumber,
            ),
          );
        }
        if (week === 4)
          await captureFigure(page, forecast, `${width}-forecast-end`);
      }
      for (const week of [3, 2, 1, 0]) {
        await scrollToStage(centerOfWeek(week));
        const median = await checkWeek(week);
        if (week === 0) expect(median).toEqual(firstMedian);
      }

      await scrollToStage(centerOfWeek(4));
      await checkWeek(4);
      await scrub(forecastScrubber, 'Home', 0);
      for (const week of [0, 1, 2, 3, 4]) {
        if (week > 0) await scrub(forecastScrubber, 'ArrowRight', week / 4);
        await checkWeek(week);
        await expect(forecastScrubber).toHaveAttribute(
          'aria-valuetext',
          `Observed through ${cutoffs[week]}`,
        );
      }
      await scrollToStage(centerOfWeek(3));
      await checkWeek(3);
    } finally {
      await context.close();
    }
  });
}

test('the completed rotating descent stays in view on a narrow desktop', async ({
  page,
}) => {
  await page.setViewportSize({ width: 768, height: 720 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await positionPage(page, 380);
  const loss = page.locator('.signal');
  await expect(loss.locator('.loss-route')).toHaveAttribute(
    'd',
    landscapeFrame(1).trail,
  );
  await expect(loss.locator('.loss-current')).toBeInViewport({ ratio: 0.99 });
  const [figure, workIndex] = await Promise.all([
    loss.boundingBox(),
    page.getByRole('navigation', { name: 'Featured work' }).boundingBox(),
  ]);
  expect(figure!.y + figure!.height).toBeLessThanOrEqual(workIndex!.y);
});

for (const width of [1440, 768, 320]) {
  test(`reduced motion shows both complete figures at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: width === 320 ? 720 : 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);

    const loss = page.locator('.signal');
    const forecast = page.locator('.forecast');
    await expect(loss.getByRole('slider')).toHaveCount(0);
    await expect(forecast.getByRole('slider')).toHaveCount(0);
    await expect(loss.locator('.loss-route')).toHaveAttribute(
      'd',
      landscapeFrame(1).trail,
    );
    await expect(loss.locator('.loss-gradient')).toHaveAttribute('d', '');
    await expect(loss.locator('.loss-current')).toHaveAttribute(
      'cx',
      String(landscapeFrame(1).markerX),
    );
    await expect(loss.locator('figcaption')).toContainText(
      'Illustrative 2D slice',
    );
    await expect(forecast.locator('.forecast-cutoff-date')).toHaveText(
      'Observed through 16 Feb',
    );
    await expect(forecast.locator('.forecast-observation')).toHaveCount(7);
    await expect(forecast.locator('figcaption')).toContainText(
      'next four weeks',
    );

    const completeLoss = await loss.innerHTML();
    const completeForecast = await forecast.innerHTML();
    for (const [figure, name] of [
      [loss, 'loss'],
      [forecast, 'forecast'],
    ] as const) {
      await positionPage(page, (await documentTop(page, figure)) - 80);
      await captureFigure(page, figure, `${width}-${name}-reduced`);
    }
    expect(await loss.innerHTML()).toBe(completeLoss);
    expect(await forecast.innerHTML()).toBe(completeForecast);
  });
}
