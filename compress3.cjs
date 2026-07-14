const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'assets');

const images = [
    'beverage_placeholder_1783496402105.png',
    'ramen_placeholder_1783496335753.png',
    'rice_bowl_placeholder_1783496383669.png',
    'sushi_placeholder_1783496365043.png'
];

async function processImages() {
    for (const img of images) {
        const srcPath = path.join(srcDir, img);
        // e.g. c_beverage_placeholder.jpg
        const destName = img.replace(/_\d+\.png$/, '.jpg');
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
