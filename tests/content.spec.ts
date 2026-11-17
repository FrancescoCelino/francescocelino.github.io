import { test, expect } from '@playwright/test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { LazyMotion, domAnimation } from 'motion/react';
import { ContactSection } from '../src/components/ContactSection';
import { ProjectFeature } from '../src/components/ProjectFeature';
import { portfolio } from '../src/content/portfolio';

for (const [name, email, linkedin] of [
  ['both absent', '', ''],
  ['email only', 'engineer@example.com', ''],
  ['LinkedIn only', '', 'https://www.linkedin.com/in/example-test-profile/'],
  [
    'both configured',
    'engineer@example.com',
    'https://www.linkedin.com/in/example-test-profile/',
  ],
]) {
  test(`isolated contact fixture: ${name}`, () => {
    const before = { email: portfolio.email, linkedin: portfolio.linkedin };
    const html = renderToStaticMarkup(
      createElement(ContactSection, {
        contact: {
          email: email!,
          linkedin: linkedin!,
          github: 'https://github.com/example',
        },
      }),
    );
    if (email) {
      expect(html).toContain('href="mailto:engineer@example.com"');
      expect(html).not.toContain('Find me on GitHub');
    } else {
      expect(html).not.toContain('mailto:');
      expect(html).toContain('Find me on GitHub');
    }
    if (linkedin)
      expect(html).toContain(
        'href="https://www.linkedin.com/in/example-test-profile/"',
      );
    else expect(html).not.toContain('linkedin.com');
    expect(html).not.toContain('href=""');
    expect({ email: portfolio.email, linkedin: portfolio.linkedin }).toEqual(
      before,
    );
  });
}

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
