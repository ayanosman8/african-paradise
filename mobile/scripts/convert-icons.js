const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'assets');

async function convertIcons() {
  try {
    // Convert main icon (1024x1024)
    await sharp(path.join(assetsDir, 'icon.svg'))
      .resize(1024, 1024)
      .png()
      .toFile(path.join(assetsDir, 'icon.png'));
    console.log('✓ icon.png created');

    // Convert adaptive icon (1024x1024)
    await sharp(path.join(assetsDir, 'adaptive-icon.svg'))
      .resize(1024, 1024)
      .png()
      .toFile(path.join(assetsDir, 'adaptive-icon.png'));
    console.log('✓ adaptive-icon.png created');

    // Convert favicon (48x48)
    await sharp(path.join(assetsDir, 'icon.svg'))
      .resize(48, 48)
      .png()
      .toFile(path.join(assetsDir, 'favicon.png'));
    console.log('✓ favicon.png created');

    // Convert splash icon (200x200 for splash screen)
    await sharp(path.join(assetsDir, 'icon.svg'))
      .resize(200, 200)
      .png()
      .toFile(path.join(assetsDir, 'splash-icon.png'));
    console.log('✓ splash-icon.png created');

    console.log('\nAll icons converted successfully!');
  } catch (error) {
    console.error('Error converting icons:', error);
  }
}

convertIcons();
