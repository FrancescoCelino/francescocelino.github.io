import sharp from 'sharp';
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';

const contours = Array.from({ length: 24 }, (_, index) => {
  const depth = index / 23;
  const d = Array.from({ length: 145 }, (_, point) => {
    const angle = (point / 144) * Math.PI * 2;
    const radius = 110 + depth * 85;
    const wave = Math.cos(angle * 3 + depth * 2.7) * (9 + depth * 16);
    return `${point ? 'L' : 'M'}${(943 + Math.cos(angle) * (radius + wave)).toFixed(1)},${(305 + Math.sin(angle) * (radius * 0.7 + wave) + (depth - 0.5) * 65).toFixed(1)}`;
  }).join(' ');
  return `<path d="${d}Z" fill="none" stroke="${index % 5 === 0 ? '#e7a57b' : '#8098ad'}" stroke-opacity="${index % 5 === 0 ? 1 : 0.5}" stroke-width="1.2"/>`;
}).join('');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#101923"/><g font-family="Arial, sans-serif"><text x="64" y="78" font-size="25" fill="#f2f1ec">Francesco Celino <tspan fill="#e7a57b">/</tspan></text><text x="64" y="193" font-size="20" fill="#b1bdc8">Independent AI engineer &amp; consultant</text><g font-size="74" fill="#f2f1ec" letter-spacing="-4"><text x="60" y="289">From research</text><text x="60" y="374">to real-world</text><text x="60" y="459">systems.</text></g><path d="M64 540H1136" stroke="#34414e"/><text x="64" y="583" font-size="18" fill="#b1bdc8">francescocelino.github.io</text></g>${contours}</svg>`;
await writeFile('public/social-preview.svg', svg);
await sharp(Buffer.from(svg)).png().toFile('public/social-preview.png');
const favicon = await readFile('public/favicon.svg');
await sharp(favicon).resize(32, 32).png().toFile('public/favicon-32.png');
await sharp(favicon)
  .resize(180, 180)
  .png()
  .toFile('public/apple-touch-icon.png');
console.log('Generated social preview, favicon, and Apple touch icon.');
await mkdir('public/fonts', { recursive: true });
for (const [family, filename] of [
  ['sora', 'sora'],
  ['source-sans-3', 'source-sans-3'],
]) {
  await copyFile(
    `node_modules/@fontsource-variable/${family}/files/${filename}-latin-wght-normal.woff2`,
    `public/fonts/${filename}-latin.woff2`,
  );
  await copyFile(
    `node_modules/@fontsource-variable/${family}/LICENSE`,
    `public/fonts/${filename}-OFL.txt`,
  );
}
console.log('Copied Latin variable fonts and their licenses.');
