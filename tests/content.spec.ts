import { test, expect } from '@playwright/test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { LazyMotion, domAnimation } from 'motion/react';
import { App } from '../src/App';
import { ProjectFeature } from '../src/components/ProjectFeature';
import { portfolio } from '../src/content/portfolio';

test('configured email and LinkedIn replace the contact fallback', () => {
  const previous = { email: portfolio.email, linkedin: portfolio.linkedin };
  try {
    // Synthetic test-only fixtures; never written to portfolio content or build output.
    portfolio.email = 'engineer@example.com';
    portfolio.linkedin = 'https://www.linkedin.com/in/example-test-profile/';
    const html = renderToStaticMarkup(createElement(App));
    expect(html).toContain('href="mailto:engineer@example.com"');
    expect(html).toContain(
      'href="https://www.linkedin.com/in/example-test-profile/"',
    );
    expect(html).not.toContain('Find me on GitHub');
  } finally {
    Object.assign(portfolio, previous);
  }
});

test('a future project renders without Maestro-specific claims or artwork', () => {
  const html = renderToStaticMarkup(
    createElement(LazyMotion, {
      features: domAnimation,
      children: createElement(ProjectFeature, {
        project: {
          id: 'test-fixture',
          title: 'Synthetic project fixture',
          category: 'Rendering test',
          summary: 'Test-only content.',
          tags: ['Test'],
          links: [],
          stages: [{ title: 'Test stage', description: 'Test description.' }],
        },
      }),
    }),
  );
  expect(html).toContain('Synthetic project fixture');
  expect(html).not.toContain('Maestro');
  expect(html).not.toContain('18');
  expect(html).not.toContain('privacy-note');
});
