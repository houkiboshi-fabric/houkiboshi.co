'use strict';

const path = require('path');
const {
  createReadStream,
  createWriteStream,
  mkdirSync,
  statSync
} = require('fs');

const fetch = require('node-fetch');
const { unpack: tarUnpack } = require('tar-pack');
const rimraf = require('rimraf');

const { CONTENTS_DIR, ROOT_DIR, TMP_DIR } = require('../data/path.js');
const {
  CONTENTS_URI,
  CONTENTS_DEST,
  CONTENTS_ARCHIVE_DEST
} = require('../data/contents-config.js');

const writeContents = (res, reporter) => {
  return new Promise((resolve, reject) => {
    const writer = createWriteStream(CONTENTS_ARCHIVE_DEST);
    res.body.pipe(writer);
    writer.on('error', err => reject(err));
    writer.on('close', () => {
      reporter.success('Fetching has finished.');
      resolve();
    });
  });
};

const unpackContents = reporter => {
  return new Promise((resolve, reject) => {
    try {
      statSync(CONTENTS_ARCHIVE_DEST);
    } catch (err) {
      reject(err);
      return;
    }
    reporter.info(
      'Unpacking...',
      path.relative(ROOT_DIR, CONTENTS_ARCHIVE_DEST)
    );
    const reader = createReadStream(path.resolve(CONTENTS_ARCHIVE_DEST));
    reader.pipe(
      tarUnpack(CONTENTS_DEST, err => {
        if (err) {
          reject(err);
          return;
        }
        reporter.success('Unpacking has finished.');
        resolve();
      })
    );
  });
};

const cleanContentsArchive = reporter => {
  reporter.info(
    'Cleaning contents archive...',
    path.relative(ROOT_DIR, CONTENTS_ARCHIVE_DEST)
  );
  return new Promise((resolve, reject) => {
    rimraf(CONTENTS_ARCHIVE_DEST, err => {
      if (err) {
        reject(err);
        return;
      }
      reporter.success('Cleaning has finished.');
      resolve();
    });
  });
};

const fetchContents = reporter => {
  reporter.info('Fetching contents...', CONTENTS_URI);
  [CONTENTS_DIR, TMP_DIR].forEach(dir => {
    mkdirSync(dir, { recursive: true });
  });
  return fetch(CONTENTS_URI)
    .then(res => writeContents(res, reporter))
    .then(() => unpackContents(reporter))
    .then(() => cleanContentsArchive(reporter))
    .catch(err => reporter.error(err));
};

module.exports = {
  fetchContents
};
