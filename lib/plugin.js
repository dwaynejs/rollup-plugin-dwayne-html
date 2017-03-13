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
        return {
          code: `export default ${ parseDwayneHTML(code, options) };`,
          map: { mappings: '' }
        };
      }
    }
  };
};
