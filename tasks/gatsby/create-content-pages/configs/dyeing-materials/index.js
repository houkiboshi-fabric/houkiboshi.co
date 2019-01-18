'use strict';

const { resolve } = require('path');

const { TEMPLATES_DIR } = require('../../../../../data/path.js');
const { imageSharpFluidPreferWebp } = require('../../query-fragments.js');
const { mediaImage } = require('../../query-fragments.js');

module.exports = {
  query: `{
    contents: json (path: {eq: "/dyeing-materials"}) {
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
    items: allJson (filter: {path: {glob: "/dyeing-materials/*"}}) {
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
          created_at
          modified_at
          id
          name
          name_kana
          created_at
          modified_at
          dyeing_material_type_id
          dyeing_material_type_entity {
            id
            name
            name_kana
            title
            description
            created_at
            modified_at
          }
          image {
            id
            childImageSharp {
              fluid {
                ${imageSharpFluidPreferWebp}
              }
            }
          }
          images_alt {
            id
            childImageSharp {
              fluid {
                ${imageSharpFluidPreferWebp}
              }
            }
          }
        }
      }
    }
  }`,
  component: resolve(TEMPLATES_DIR, 'index-template.js')
};
