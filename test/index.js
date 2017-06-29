const { strictEqual, deepStrictEqual } = require('assert');
const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const { rollup } = require('rollup');
const { decode } = require('sourcemap-codec');
const chalk = require('chalk');

describe('transform', () => {
  const dirs = fs.readdirSync(__dirname + '/fixtures');

  dirs.filter((dirname) => dirname !== 'syntax_error').forEach((dirname) => {
    const root = __dirname + '/fixtures/' + dirname;

    it(dirname.replace(/_/g, ' '), () => {
      let options = _.attempt(() => (
        require(root + '/options.json')
      ));

      if (_.isError(options)) {
        options = {};
      }

      return rollup({
        entry: root + '/entry.js',
        external: [
          'dwayne'
        ],
        plugins: [
          require('../src')(options)
        ]
      }).then((bundle) => {
        const generated = bundle.generate({
          sourceMap: true,
          format: 'es'
        });

        strictEqual(
          generated.code,
          fs.readFileSync(root + '/generated.js', 'utf8')
        );
        compareMaps(
          generated.map,
          require(root + '/sourcemap.json'),
          root
        );
      });
    });
  });

  it('should throw highlighted error', () => {
    return rollup({
      entry: __dirname + '/fixtures/syntax_error/entry.js',
      external: [
        'dwayne'
      ],
      plugins: [
        require('../src')()
      ]
    }).then(() => {
      throw new Error('Not thrown');
    }, (err) => {
      strictEqual(err.message, `Syntax error in test/fixtures/syntax_error/index.html:

Unexpected token (6:7)

  ${ chalk.blue('3') } | </script>
  ${ chalk.blue('4') } | 
  ${ chalk.blue('5') } | <If if="{value}">
${ chalk.red('>') } ${ chalk.blue('6') } |   {a + *}
             ${ chalk.red('^') }
  ${ chalk.blue('7') } | </If>`);
      strictEqual(err.pos, 76);
      deepStrictEqual(err.loc, {
        line: 6,
        column: 7
      });
    });
  });
});

function compareMaps(realMap, probableMap, root) {
  const realMappings = decode(realMap.mappings);

  deepStrictEqual(probableMap.sources, realMap.sources.map((absolutePath) => (
    path.relative(root, absolutePath)
  )));
  deepStrictEqual(probableMap.names, realMap.names);

  probableMap.mappings.forEach((lineMappings, line) => {
    const realLineMapping = realMappings[line];

    lineMappings.forEach((mapping) => {
      deepStrictEqual(
        _.find(realLineMapping, ([column]) => mapping[0] === column),
        mapping
      );
    });
  });
}
