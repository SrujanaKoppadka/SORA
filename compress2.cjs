const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'assets');

const images = [
    'Donburi (2).jpg',
    'ramen (1).jpg',
    'sushii (1).jpg'
];

async function processImages() {
    for (const img of images) {
        const srcPath = path.join(srcDir, img);
        const destName = img.replace(/\s+/g, '-').replace(/[()]/g, '').toLowerCase();
        const destPath = path.join(srcDir, 'c_' + destName); 
        
        try {
            await sharp(srcPath)
                .resize({ width: 800, withoutEnlargement: true }) 
                .jpeg({ quality: 75, progressive: true })
                .toFile(destPath);
            console.log(`Processed ${img} -> c_${destName}`);
        } catch (error) {
            console.error(`Error processing ${img}:`, error);
        }
    }
}

processImages();
