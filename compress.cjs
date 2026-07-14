const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'assets');

const images = [
    'Agedashi Tofu.jpg',
    'Ebi mayo.jpg',
    'Shio koji Chicken karage.jpg',
    'Wok fried edamame.jpg',
    'japaneese gyoza.jpg',
    'miso soup.jpg'
];

async function processImages() {
    for (const img of images) {
        const srcPath = path.join(srcDir, img);
        const destName = img.replace(/\s+/g, '-').toLowerCase();
        const destPath = path.join(srcDir, 'c_' + destName); // e.g. c_agedashi-tofu.jpg
        
        try {
            await sharp(srcPath)
                .resize({ width: 800, withoutEnlargement: true }) // Resize if width is larger than 800
                .jpeg({ quality: 75, progressive: true })
                .toFile(destPath);
            console.log(`Processed ${img} -> c_${destName}`);
        } catch (error) {
            console.error(`Error processing ${img}:`, error);
        }
    }
}

processImages();
