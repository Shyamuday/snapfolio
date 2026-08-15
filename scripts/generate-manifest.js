/**
 * Scans public/image/<Category>/ folders and writes public/image/manifest.json
 * Run: node scripts/generate-manifest.js
 * Or automatically via "prebuild" npm script.
 */

const fs = require('fs');
const path = require('path');

const IMAGE_DIR = path.join(__dirname, '..', 'public', 'image');
const OUTPUT = path.join(IMAGE_DIR, 'manifest.json');

const SUPPORTED = new Set(['.avif', '.jpg', '.jpeg', '.png', '.webp']);

const manifest = {};

const categories = fs.readdirSync(IMAGE_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

for (const cat of categories) {
    const catDir = path.join(IMAGE_DIR, cat);
    const files = fs.readdirSync(catDir)
        .filter(f => {
            const ext = path.extname(f).toLowerCase();
            return SUPPORTED.has(ext) && !f.startsWith('.');
        })
        .map(f => `image/${cat}/${f}`);   // path relative to /public

    manifest[cat] = files;
}

fs.writeFileSync(OUTPUT, JSON.stringify(manifest, null, 2));
console.log(`✔ manifest.json written — ${categories.length} categories, ${Object.values(manifest).flat().length} images`);
