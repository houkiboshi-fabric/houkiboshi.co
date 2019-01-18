'use strict';

const { resolve } = require('path');

const { TEMPLATES_DIR } = require('../../../../../data/path.js');
const { mediaImage } = require('../../query-fragments.js');

module.exports = {
  query: `{
    contents: allJson (filter: {path: {glob: "/dyeing-material-types/*"}}) {
      edges {
        node {
          title
          media_image {
            childImageSharp {
              ${mediaImage}
            }
          }
          description
          path
          body {
            childMarkdownRemark {
              html
            }
          }
          id
          name
          name_kana
          created_at
          modified_at
        }
      }
    }
  }`,
  component: resolve(TEMPLATES_DIR, 'dyeing-material-type.js')
};
