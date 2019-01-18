const { siteMetadata } = require('./data/site.js');
const { ASSETS_DIR, CONTENTS_DIR } = require('./data/path.js');

require('dotenv-safe').config();

module.exports = {
  siteMetadata,
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: ASSETS_DIR,
        ignore: ['**/*.json']
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'contents',
        path: CONTENTS_DIR
      }
    },
    'gatsby-transformer-json-for-houkiboshi',
    'gatsby-transformer-remark',
    'gatsby-plugin-eslint',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-webpack-size',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images/
        }
      }
    }
  ]
};
