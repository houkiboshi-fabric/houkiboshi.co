'use strict';

const { resolve } = require('path');

const { TEMPLATES_DIR } = require('../../../../data/path.js');
const { mediaImage } = require('../query-fragments.js');

module.exports = {
  query: `{
    contents: json (path: {eq: "/"}) {
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
      created_at
      modified_at
    }
  }`,
  component: resolve(TEMPLATES_DIR, 'root.js')
};
