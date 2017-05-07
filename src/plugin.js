import { createFilter } from 'rollup-pluginutils';
import parseDwayneHTML from 'parse-dwayne-html';

export default function (options = {}) {
  if (!options.include) {
    options.include = '**/*.html';
  }

  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'dwayne-html',

    transform(code, id) {
      if (filter(id)) {
        const parsed = parseDwayneHTML(code, options);

        return {
          code: `${ parsed.additionalJs }

var ${ parsed.funcName }, ${ parsed.tmplVar };

export default ${ parsed.html };`,
          map: { mappings: '' }
        };
      }
    }
  };
};
