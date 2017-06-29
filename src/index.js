const _ = require('lodash');
const path = require('path');
const { createFilter } = require('rollup-pluginutils');
const transformDwayneHTML = require('transform-dwayne-html');
const highlightError = require('highlight-error');

module.exports = (options) => {
  options = _.assign({}, options);

  options.include = _.get(options, 'include', '**/*.html');
  options.sourceType = 'module';
  options.exportType = 'es';
  options.keepScope = false;

  const filter = createFilter(options.include, options.exclude);

  delete options.include;
  delete options.exclude;

  return {
    name: 'dwayne-html',
    transform(code, id) {
      if (filter(id)) {
        options = _.assign({}, options);
        options.filename = path.relative(process.cwd(), id);

        try {
          const parsed = transformDwayneHTML(code, options);

          return {
            code: parsed.code,
            map: parsed.map
          };
        } catch (err) {
          /* istanbul ignore if */
          if (typeof err.pos !== 'number') {
            throw err;
          }

          err.message = `Syntax error in ${ options.filename }:

${ err.message }

${ highlightError(code, err.pos, { neighborLinesCount: 3 }) }`;

          throw err;
        }
      }
    }
  };
};
