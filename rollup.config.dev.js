import babel from 'rollup-plugin-babel';

import dwayneHtml from './lib/plugin';

export default {
  entry: 'entry.js',
  dest: 'bundle.js',
  format: 'iife',
  moduleName: 'index',
  plugins: [
    pugHtml({
      include: '**/*.pug'
    }),
    dwayneHtml({
      include: [
        '**/*.pug',
        '**/*.html'
      ],
      keepOriginal: false
    }),
    babel({
      include: [
        '**/*.js',
        '**/*.pug',
        '**/*.html'
      ],
      exclude: 'node/modules/**',
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
