'use strict';

const { readFileSync, writeFileSync } = require('fs');
const { dirname, relative, resolve } = require('path');

const isPlainObject = require('lodash.isplainobject');
const cloneDeep = require('lodash.clonedeep');

const glob = require('glob');

const { ASSETS_DIR, CONTENTS_DIR, ROOT_DIR } = require('../data/path.js');
const { assetPathPrefixMap } = require('../data/contents-config.js');

const addAssetPrefixIfNeeded = (json, prefix) => {
  let isUpdated = false;
  const walk = tree => {
    if (Array.isArray(tree)) {
      tree.forEach(child => walk(child));
      return;
    }
    if (isPlainObject(tree)) {
      Object.keys(tree).forEach(key => {
        const val = tree[key];
        if (val && Object.keys(assetPathPrefixMap).includes(key)) {
          tree[key] = assetPathPrefixMap[key](val, prefix);
          isUpdated = true;
          return;
        }
        if (Array.isArray(val)) {
          val.forEach(child => walk(child));
          return;
        }
        if (val && isPlainObject(val)) {
          walk(val);
        }
      });
    }
  };
  walk(json);
  return { isUpdated };
};

const updateAssetPathsInContents = reporter => {
  const pattern = resolve(CONTENTS_DIR, '**', '*.json');
  const paths = glob.sync(pattern);

  paths.forEach(path => {
    try {
      const content = JSON.parse(readFileSync(path, 'utf8'));
      const relativePath = relative(dirname(path), ASSETS_DIR);
      const { isUpdated } = addAssetPrefixIfNeeded(content, relativePath);
      if (isUpdated) {
        writeFileSync(path, JSON.stringify(content, null, 2));
        reporter.success(
          `Added asset path prefix: ${relative(ROOT_DIR, path)}`
        );
      }
    } catch (err) {
      throw new Error(err);
    }
  });
};

module.exports = {
  updateAssetPathsInContents
};
