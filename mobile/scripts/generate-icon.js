const fs = require('fs');
const path = require('path');

// Create SVG icon with AP monogram
const createIconSVG = (size, padding = 0) => {
  const bgColor = '#0C0A09';
  const goldColor = '#D4A574';
  const fontSize = size * 0.45;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="${bgColor}"/>
  <rect x="${size * 0.08}" y="${size * 0.08}" width="${size * 0.84}" height="${size * 0.84}" fill="none" stroke="${goldColor}" stroke-width="${size * 0.015}"/>
  <text
    x="50%"
    y="54%"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="${fontSize}"
    font-weight="600"
    fill="${goldColor}"
    text-anchor="middle"
    dominant-baseline="middle"
    letter-spacing="${size * 0.02}"
  >AP</text>
</svg>`;
};

// Create adaptive icon (foreground only, transparent bg)
const createAdaptiveIconSVG = (size) => {
  const goldColor = '#D4A574';
  const fontSize = size * 0.35;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect x="${size * 0.2}" y="${size * 0.2}" width="${size * 0.6}" height="${size * 0.6}" fill="none" stroke="${goldColor}" stroke-width="${size * 0.012}"/>
  <text
    x="50%"
    y="54%"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="${fontSize}"
    font-weight="600"
    fill="${goldColor}"
    text-anchor="middle"
    dominant-baseline="middle"
    letter-spacing="${size * 0.015}"
  >AP</text>
</svg>`;
};

const assetsDir = path.join(__dirname, '..', 'assets');

// Generate main icon SVG
fs.writeFileSync(
  path.join(assetsDir, 'icon.svg'),
  createIconSVG(1024)
);

// Generate adaptive icon SVG
fs.writeFileSync(
  path.join(assetsDir, 'adaptive-icon.svg'),
  createAdaptiveIconSVG(1024)
);

// Generate favicon SVG
fs.writeFileSync(
  path.join(assetsDir, 'favicon.svg'),
  createIconSVG(48)
);

// Generate splash icon SVG
fs.writeFileSync(
  path.join(assetsDir, 'splash-icon.svg'),
  createIconSVG(512)
);

console.log('SVG icons generated in assets folder!');
console.log('');
console.log('To convert to PNG, you can use an online tool or run:');
console.log('  npx sharp-cli icon.svg -o icon.png');
console.log('');
console.log('Or open the SVG files in a browser and take screenshots.');
