const favicons = require('favicons');
const { resolve } = require('path');
const { existsSync, mkdirSync, writeFile } = require('fs');

const {
  siteTitleShort,
  theme: { color, bgColor }
} = require('../data/site.js');

const { ICONS_DIR, PUBLIC_DIR } = require('../data/path.js');

if (!existsSync(ICONS_DIR)) {
  mkdirSync(ICONS_DIR);
}

const source = 'src/images/icon.png';
const configuration = {
  path: '/icons/',
  appName: siteTitleShort,
  appDescription: null,
  developerName: null,
  developerURL: null,
  dir: 'auto',
  lang: 'en-US',
  background: bgColor,
  theme_color: color,
  display: 'standalone',
  orientation: 'any',
  start_url: '/',
  version: '1.0',
  logging: true,
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    coast: false,
    favicons: true,
    firefox: false,
    windows: true,
    yandex: false
  }
};

favicons(source, configuration, (err, res) => {
  if (err) {
    console.log(err.message);
    return;
  }

  res.images.forEach(image => {
    writeFile(resolve(ICONS_DIR, image.name), image.contents, err => {
      if (err) {
        console.log(err);
      }
    });
  });

  res.files.forEach(file => {
    writeFile(resolve(PUBLIC_DIR, file.name), file.contents, err => {
      if (err) {
        console.log(err);
      }
    });
  });
});
