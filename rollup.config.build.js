import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/plugin.js',
  dest: 'lib/plugin.js',
  external: Object.keys(require('./package.json').dependencies),
  format: 'cjs',
  plugins: [
    babel({
      include: '**/*.js',
      presets: [
        [
          'es2015',
          {
            modules: false
          }
        ],
        'stage-0'
      ],
      plugins: [
        'external-helpers'
      ]
    })
  ]
};
