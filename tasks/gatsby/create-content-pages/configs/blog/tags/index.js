'use strict';

const { resolve } = require('path');

const { TEMPLATES_DIR } = require('../../../../../../data/path.js');
const { mediaImage } = require('../../../query-fragments.js');

module.exports = {
  query: `{
    contents: json (path: {eq: "/blog/tags"}) {
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
    items: allJson (filter: {path: {glob: "/blog/tags/*"}}) {
      edges {
        node {
          id
          name
          title
          description
          media_image {
            childImageSharp {
              ${mediaImage}
            }
          }
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
