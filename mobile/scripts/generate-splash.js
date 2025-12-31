const sharp = require('sharp');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'assets');

// Create splash screen SVG
const createSplashSVG = () => {
  const width = 1284;
  const height = 2778;
  const bgColor = '#0C0A09';
  const goldColor = '#D4A574';
  const logoSize = 280;
  const fontSize = logoSize * 0.45;
  const centerX = width / 2;
  const centerY = height / 2;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${bgColor}"/>

  <!-- Logo box -->
  <rect
    x="${centerX - logoSize/2}"
    y="${centerY - logoSize/2 - 60}"
    width="${logoSize}"
    height="${logoSize}"
    fill="none"
    stroke="${goldColor}"
    stroke-width="3"
  />

  <!-- AP Text -->
  <text
    x="${centerX}"
    y="${centerY - 60 + logoSize * 0.04}"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="${fontSize}"
    font-weight="600"
    fill="${goldColor}"
    text-anchor="middle"
    dominant-baseline="middle"
    letter-spacing="8"
  >AP</text>

  <!-- Restaurant name -->
  <text
    x="${centerX}"
    y="${centerY + logoSize/2 + 50}"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="42"
    font-weight="400"
    fill="${goldColor}"
    text-anchor="middle"
    letter-spacing="6"
  >AFRICAN PARADISE</text>

  <!-- Tagline -->
  <text
    x="${centerX}"
    y="${centerY + logoSize/2 + 110}"
    font-family="Arial, sans-serif"
    font-size="18"
    fill="#A8A29E"
    text-anchor="middle"
    letter-spacing="3"
  >AUTHENTIC AFRICAN CUISINE</text>
</svg>`;
};

async function generateSplash() {
  const svgBuffer = Buffer.from(createSplashSVG());

  await sharp(svgBuffer)
    .png()
    .toFile(path.join(assetsDir, 'splash.png'));

  console.log('✓ splash.png created (1284x2778)');
}

generateSplash().catch(console.error);
