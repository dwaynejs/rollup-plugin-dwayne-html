# rollup-plugin-dwayne-html

The plugin transforms Dwayne html into a javascript module using
[transform-dwayne-html](https://github.com/dwaynejs/transform-dwayne-html).

### Installation

```bash
npm install --save rollup-plugin-dwayne-html
```

### Usage

```js
// rollup.config.js

import dwayneHtml from 'rollup-plugin-dwayne-html';

export default {
  entry: 'entry.js',
  dest: 'bundle.js',
  format: 'iife',
  plugins: [
    dwayneHtml()
  ]
};
```

### Options

* `options.include` (default: `'**/*.html'`).
* `options.exclude` (default: `undefined`).

The rest options are passed to
[transform-dwayne-html](https://github.com/dwaynejs/transform-dwayne-html).
