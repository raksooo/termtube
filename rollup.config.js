import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import rootImport from 'rollup-plugin-root-import';

const pkg = require('./package.json');

export default {
  input: 'src/index.jsx',
  external: ['prop-types', 'events', 'fs', 'path', 'v8', ...Object.keys(pkg['dependencies'])],
  plugins: [
    rootImport({
      root: [`${__dirname}/src`],
      // Because we omit .js/.jsx most of the time, we put them first, and explicitly specify that it
      // should attempt the lack of extension only after it tries to resolve with the extension.
      extensions: ['.js', '.jsx', '']
    }),
    nodeResolve({
      // Allow `import`ing of JSX files without specifying the .jsx extension in import paths.
      extensions: ['.js', '.jsx'],
    }),
    babel({
      exclude: [ 'node_modules/**' ]
    })
  ],
  output: [{
    format: 'cjs',
    file: pkg['main']
  }]
};

