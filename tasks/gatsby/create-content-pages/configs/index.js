'use strict';

const { resolve } = require('path');

const glob = require('glob');

const pattern = resolve(__dirname, '**', '*.js');
const INDEX_JS_PATH = resolve(__dirname, 'index.js');

module.exports = glob.sync(pattern).reduce((acm, path) => {
  if (path === INDEX_JS_PATH) {
    return acm;
  }
  return [...acm, require(path)];
}, []);
