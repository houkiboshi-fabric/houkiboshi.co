'use strict';

const { writeFileSync } = require('fs');
const { relative, resolve } = require('path');

const glob = require('glob');
const hasha = require('hasha');

const { ASSETS_DIR, ROOT_DIR } = require('../data/path.js');

const PATTERN = resolve(ASSETS_DIR, '**', '*.*');
const INDEX = 'index.json';

const buildAssetIndex = async reporter => {
  const files = glob.sync(PATTERN, {
    nodir: true
  });
  const index = files.map(filePath => {
    return {
      path: relative(ASSETS_DIR, filePath),
      hash: hasha.fromFileSync(filePath)
    };
  });
  try {
    const indexPath = resolve(ASSETS_DIR, INDEX);
    writeFileSync(indexPath, JSON.stringify(index, null, 2));
    reporter.success(`Saved: ${relative(ROOT_DIR, indexPath)}`);
  } catch (err) {
    throw new Error(err);
  }
  return index;
};

module.exports = {
  buildAssetIndex
};
