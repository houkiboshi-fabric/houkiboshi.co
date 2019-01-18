'use strict';

const { resolve } = require('path');

const { TEMPLATES_DIR } = require('../../../../../data/path.js');
const { mediaImage } = require('../../query-fragments.js');

module.exports = {
  query: `{
    contents: allJson (filter: {path: {glob: "/processes/*"}}) {
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
          id
          name
          name_kana
          path
          created_at
          modified_at
        }
      }
    }
  }`,
  component: resolve(TEMPLATES_DIR, 'process.js'),
  additionalQueries: {
    products: ({ graphql, node, reporter }) => {
      const query = `query {
        products: allJson(filter: {path: {glob: "/products/*"}, process_ids: {in: ["${
          node.id
        }"]}}) {
          edges {
            node {
              id
              name
              name_kana
              title
              description
              process_ids
              image {
                childImageSharp {
                  fluid {
                    src
                  }
                }
              }
              path
            }
          }
        }
      }`;
      return new Promise((resolve, reject) => {
        graphql(query).then(({ data, errors }) => {
          if (errors && errors.length > 0) {
            errors.forEach(err => {
              reporter.error(err);
              reporter.error('query:', query);
            });
            reject(errors);
          }

          const { products } = data;
          return resolve(products ? products.edges.map(e => e.node) : []);
        });
      });
    }
  }
};
