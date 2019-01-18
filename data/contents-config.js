'use strict';

const { resolve, join } = require('path');

const { CONTENTS_DIR, TMP_DIR } = require('./path.js');

const CONTENTS_URI =
  'https://houkiboshi-fabric.github.io/contents/contents.tar.gz';
const CONTENTS_DEST = CONTENTS_DIR;
const CONTENTS_ARCHIVE_DEST = resolve(TMP_DIR, 'contents.tar.gz');

const addPrefix = (path, prefix) => {
  // remove prefix if that path already have prefix
  const [p] = path.split(prefix).filter(s => s !== prefix && s);
  return join(prefix, p);
};

const assetPathPrefixMap = {
  media_image: addPrefix,
  image: addPrefix,
  images_alt: (list, prefix) => {
    return list.map(path => addPrefix(path, prefix));
  }
};
module.exports = {
  CONTENTS_URI,
  CONTENTS_DEST,
  CONTENTS_ARCHIVE_DEST,
  assetPathPrefixMap
};
