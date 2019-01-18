'use strict';

const { resolve } = require('path');

const { TEMPLATES_DIR } = require('../../../../../data/path.js');
const { imageSharpFluidPreferWebp } = require('../../query-fragments.js');
const { mediaImage } = require('../../query-fragments.js');

module.exports = {
  query: `{
    contents: json (path: {eq: "/products"}) {
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
    items: allJson (filter: {path: {glob: "/products/*"}}) {
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
          path
          created_at
          modified_at
          name_alt
          name_alt_kana
          links_to_shop
          price
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
          size {
            width_mm
            depth_mm
            height_mm
            notes
          }
          weight_g
          raw_materials {
            raw_material_ids
            raw_material_entities {
              id
              name
              name_kana
              title
              description
              created_at
              modified_at
            }
            used_at
            mixing_ratio {
              decorator
              percentage
            }
          }
          dyeing_materials {
            dyeing_material_ids
            dyeing_material_entities {
              id
              name
              name_kana
              title
              description
              media_image {
                childImageSharp {
                  id
                }
              }
              image {
                id
                childImageSharp {
                  fluid {
                    ${imageSharpFluidPreferWebp}
                  }
                }
              }
              created_at
              modified_at
            }
          }
        }
      }
    }
  }`,
  component: resolve(TEMPLATES_DIR, 'index-template.js')
};
