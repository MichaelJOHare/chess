const esbuild = require('esbuild');

const isDev = process.argv.includes('--watch');

const config = {
  entryPoints: ['src/main.ts'],
  bundle: true,
  outfile: 'dist/bundle.js',
  sourcemap: true,
  target: 'es2020',
  format: 'iife',
  globalName: 'ChessApp',
  external: [],  // Bundle everything - THREE.js loaded from CDN as global
  define: {
    'process.env.NODE_ENV': isDev ? '"development"' : '"production"'
  },
  minify: !isDev,
};

if (isDev) {
  esbuild.context(config).then(ctx => {
    ctx.watch();
    console.log('Watching for changes...');
  });
} else {
  esbuild.build(config).then(() => {
    console.log('Build complete!');
  });
}
