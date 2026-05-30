import { rollup } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const config = {
  input: './src/index.ts',
  output: {
    file: './dist/wc26-checklist.js',
    format: 'node',
    platform: 'node',
    banner: '#!/usr/bin/env node',
    freeze: false,
    inlineDynamicImports: true,
  },
  external: ['chalk', 'inquirer', 'pdfkit', 'conf', 'fs', 'os', 'path'],
  plugins: [
    typescript({
      compilerOptions: {
        module: 'ESNext',
        moduleResolution: 'Node',
        target: 'ESNext',
        declaration: false,
        outDir: './dist',
      },
      include: ['src/**/*'],
    }),
    nodeResolve({
      preferBuiltins: true,
      exportConditions: ['node'],
    }),
  ],
};

rollup(config).then(async (bundle) => {
  await bundle.write(config.output);
  console.log('Build complete: dist/wc26-checklist.js');
}).catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});