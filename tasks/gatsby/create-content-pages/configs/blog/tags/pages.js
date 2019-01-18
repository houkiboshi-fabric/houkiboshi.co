'use strict';

const { resolve } = require('path');

const { TEMPLATES_DIR } = require('../../../../../../data/path.js');
const { mediaImage } = require('../../../query-fragments.js');

module.exports = {
  query: `{
    contents: allJson (filter: {path: {glob: "/blog/tags/*"}}) {
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
  component: resolve(TEMPLATES_DIR, 'tag.js'),
  additionalQueries: {
    items: ({ graphql, node, reporter }) => {
      const query = `query {
        items: allJson(filter: {tag_ids: {in: ["${
          node.id
        }"]}, path: {glob: "/blog/posts/*"}}) {
          edges {
            node {
              title
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

          const { items } = data;
          return resolve(items ? items.edges.map(e => e.node) : []);
        });
      });
    }
  }
};
