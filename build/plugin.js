'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var rollupPluginutils = require('rollup-pluginutils');
var parseDwayneHTML = _interopDefault(require('parse-dwayne-html'));

var plugin = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!options.include) {
    options.include = '**/*.html';
  }

  var filter = rollupPluginutils.createFilter(options.include, options.exclude);

  return {
    name: 'dwayne-html',

    transform: function transform(code, id) {
      if (filter(id)) {
        return {
          code: 'var func;\n\nexport default ' + parseDwayneHTML(code, options),
          map: { mappings: '' }
        };
      }
    }
  };
};

module.exports = plugin;
