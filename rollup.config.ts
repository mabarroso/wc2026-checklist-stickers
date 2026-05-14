import { rollup } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { builtinModules } from 'module';

const external = [
  ...builtinModules,
  ...builtinModules.map(m => `node:${m}`)
];

const config = {
  input: './src/index.ts',
  output: {
    file: './dist/panini-stickers.js',
    format: 'node',
    platform: 'node',
    banner: '#!/usr/bin/env node',
    freeze: false
  },
  external,
  plugins: [
    nodeResolve({
      preferBuiltins: true,
      exportConditions: ['node']
    })
  ]
};

if (process.argv[1]?.endsWith('rollup.config.ts')) {
  rollup(config).then(async (bundle) => {
    await bundle.write(config.output);
    console.log('Build complete: dist/panini-stickers.js');
  }).catch((err) => {
    console.error('Build failed:', err);
    process.exit(1);
  });
}

export default config;