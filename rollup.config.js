const commonjs = require('rollup-plugin-commonjs');         // https://github.com/rollup/rollup-plugin-commonjs
const buble = require('rollup-plugin-buble');               // https://buble.surge.sh/guide/
//const eslint = require('rollup-plugin-eslint');             // https://github.com/TrySound/rollup-plugin-eslint
const nodeResolve = require('rollup-plugin-node-resolve');  // https://github.com/rollup/rollup-plugin-node-resolve
const uglify = require('rollup-plugin-uglify');             // https://github.com/TrySound/rollup-plugin-uglify
const replace = require('rollup-plugin-replace');
const jsx = require('rollup-plugin-jsx');

const isProduction = (process.env.NODE_ENV === 'production');

const plugins = [
  nodeResolve({
      // use "module" field for ES6 module if possible
      module: true, // Default: true

      // use "jsnext:main" if possible
      // – see https://github.com/rollup/rollup/wiki/jsnext:main
      jsnext: true,  // Default: false

      // use "main" field or index.js, even if it's not an ES6 module
      // (needs to be converted from CommonJS to ES6
      // – see https://github.com/rollup/rollup-plugin-commonjs
      main: true,  // Default: true

      // if there's something your bundle requires that you DON'T
      // want to include, add it to 'skip'. Local and relative imports
      // can be skipped by giving the full filepath. E.g.,
      // `path.resolve('src/relative-dependency.js')`
      skip: [ 'some-big-dependency' ],  // Default: []

      // some package.json files have a `browser` field which
      // specifies alternative files to load for people bundling
      // for the browser. If that's you, use this option, otherwise
      // pkg.browser will be ignored
      browser: true,  // Default: false

      // not all files you want to resolve are .js files
      extensions: [ '.js', '.json' ],  // Default: ['.js']

      // whether to prefer built-in modules (e.g. `fs`, `path`) or
      // local ones with the same names
      preferBuiltins: false  // Default: true

    }),
  commonjs({
    include: 'node_modules/**',
    namedExports: {
      'node_modules/react/react.js': ['Component', 'Children', 'createElement', 'PropTypes'],
      'node_modules/react-dom/index.js': ['render'],
      'node_modules/react-router/es/index.js': ['hashHistory'],
      'node_modules/prop-types/index.js': [
        'array', 'bool', 'func', 'object', 'arrayOf', 'oneOfType', 'element', 'shape', 'string',
      ],
    },
  }),
  //eslint(),
  buble(),
  replace({
    'process.env.NODE_ENV': JSON.stringify( 'production' )
  }),
];

if (isProduction) {

}
plugins.push(uglify({
  mangle: false,
}));

module.exports = {
  entry: 'src/js/index.js',
  dest: 'public/js/index.min.js',
  sourceMap: 'dist/index.min.js.map',
  format: 'iife',
  plugins,
    /*
    jsx( {factory: 'React.createElement'} ),
    nodeResolve({
      // use "module" field for ES6 module if possible
      module: true, // Default: true

      // use "jsnext:main" if possible
      // – see https://github.com/rollup/rollup/wiki/jsnext:main
      jsnext: true,  // Default: false

      // use "main" field or index.js, even if it's not an ES6 module
      // (needs to be converted from CommonJS to ES6
      // – see https://github.com/rollup/rollup-plugin-commonjs
      main: true,  // Default: true

      // if there's something your bundle requires that you DON'T
      // want to include, add it to 'skip'. Local and relative imports
      // can be skipped by giving the full filepath. E.g.,
      // `path.resolve('src/relative-dependency.js')`
      //skip: [ 'some-big-dependency' ],  // Default: []

      // some package.json files have a `browser` field which
      // specifies alternative files to load for people bundling
      // for the browser. If that's you, use this option, otherwise
      // pkg.browser will be ignored
      browser: true,  // Default: false

      // not all files you want to resolve are .js files
      extensions: [ '.js', '.json' ],  // Default: ['.js']

      // whether to prefer built-in modules (e.g. `fs`, `path`) or
      // local ones with the same names
      preferBuiltins: false  // Default: true

    })*/

};
