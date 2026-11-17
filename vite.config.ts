import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { portfolio } from './src/content/portfolio.ts';

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        character
      ]!,
  );

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    {
      name: 'portfolio-metadata',
      transformIndexHtml(html) {
        return html
          .replaceAll('%SITE_URL%', escapeHtml(portfolio.siteUrl))
          .replaceAll('%DESCRIPTION%', escapeHtml(portfolio.description));
      },
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: 'robots.txt',
          source: `User-agent: *\nAllow: /\nSitemap: ${portfolio.siteUrl}/sitemap.xml\n`,
        });
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escapeHtml(portfolio.siteUrl)}/</loc></url></urlset>\n`,
        });
      },
    },
  ],
});
