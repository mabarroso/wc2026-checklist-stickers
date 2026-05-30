import * as esbuild from 'esbuild';
import { existsSync, mkdirSync, cpSync } from 'fs';
import { join } from 'path';

async function build() {
  if (!existsSync('./dist')) {
    mkdirSync('./dist', { recursive: true });
  }

  await esbuild.build({
    entryPoints: ['./src/index.ts'],
    bundle: true,
    platform: 'node',
    target: 'node18',
    outfile: './dist/wc26-checklist.js',
    format: 'esm',
    banner: {
      js: '#!/usr/bin/env node',
    },
    external: ['chalk', 'inquirer', 'pdfkit', 'conf'],
    logLevel: 'info',
  });

  const csvSource = join(__dirname, 'src/data/stickers.csv');
  const csvDest = join(__dirname, 'dist/stickers.csv');
  cpSync(csvSource, csvDest);

  console.log('Build complete: dist/wc26-checklist.js');
}

build().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});