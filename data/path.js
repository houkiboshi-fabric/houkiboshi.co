const { resolve } = require('path');

const ROOT_DIR = resolve(__dirname, '..');
const SRC_DIR = resolve(ROOT_DIR, 'src');
const DATA_DIR = resolve(ROOT_DIR, 'data');
const PUBLIC_DIR = resolve(ROOT_DIR, 'public');
const TMP_DIR = resolve(ROOT_DIR, '.tmp');
const TEMPLATES_DIR = resolve(SRC_DIR, 'templates');
const ICONS_DIR = resolve(PUBLIC_DIR, 'icons');
const CONTENTS_DIR = resolve(DATA_DIR, 'contents');
const ASSETS_DIR = resolve(DATA_DIR, 'assets');

module.exports = {
  ROOT_DIR,
  SRC_DIR,
  DATA_DIR,
  PUBLIC_DIR,
  TMP_DIR,
  TEMPLATES_DIR,
  ICONS_DIR,
  CONTENTS_DIR,
  ASSETS_DIR
};
