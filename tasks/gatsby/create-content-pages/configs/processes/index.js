'use strict';

const { resolve } = require('path');

const { TEMPLATES_DIR } = require('../../../../../data/path.js');
const { mediaImage } = require('../../query-fragments.js');

module.exports = {
  query: `{
    contents: json (path: {eq: "/processes"}) {
      title
      media_image {
        childImageSharp {
          ${mediaImage}
        }
      }
      description
      body {
        childMarkdownRemark {
          html
        }
      }
      created_at
      modified_at
      path
    }
    items: allJson (filter: {path: {glob: "/processes/*"}}) {
      edges {
        node {
          title
          media_image {
            childImageSharp {
              ${mediaImage}
            }
          }
          description
          body {
            childMarkdownRemark {
              html
            }
          }
          created_at
          modified_at
          path
        }
      }
    }
  }`,
  component: resolve(TEMPLATES_DIR, 'index-template.js')
};
