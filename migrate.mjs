import fs from 'fs/promises';
import path from 'path';
import * as babel from '@babel/core';

async function processDirectory(srcDir, destDir) {
  await fs.mkdir(destDir, { recursive: true });
  const entries = await fs.readdir(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(srcPath, destPath);
    } else {
      if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
        const isTsx = entry.name.endsWith('.tsx');
        const code = await fs.readFile(srcPath, 'utf8');
        const result = await babel.transformAsync(code, {
          filename: srcPath,
          presets: [
            ['@babel/preset-typescript']
          ],
          plugins: ['@babel/plugin-syntax-jsx']
        });
        
        const newExt = isTsx ? '.jsx' : '.js';
        const newDestPath = destPath.replace(/\.tsx?$/, newExt);
        // Also replace imports like './something' to '.something.js' or leave as is if Vite resolves them.
        // Actually Vite resolves extensionless imports fine, but if there's any direct .tsx imports we should fix them.
        let outCode = result.code;
        outCode = outCode.replace(/\.tsx/g, '.jsx').replace(/\.ts'/g, ".js'");
        await fs.writeFile(newDestPath, outCode);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
  }
}

async function main() {
  await fs.rm('./src', { recursive: true, force: true });
  await processDirectory('../Archive 17/src', './src');
  console.log('Migration complete!');
}

main().catch(console.error);
