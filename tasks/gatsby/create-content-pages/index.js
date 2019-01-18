'use strict';

const path = require('path');

const { buildBreadcrumb } = require('../../lib/build-breadcrumb.js');
const { buildPageJsonLd } = require('../../lib/build-json-ld.js');
const { buildDestPaths } = require('../../lib/build-dest-paths.js');

const { site } = require('../../../data/site.js');

const configs = require('./configs');

const pickImageSrc = image => {
  if (
    image &&
    image.childImageSharp &&
    image.childImageSharp.fluid &&
    image.childImageSharp.fluid.src
  ) {
    return image.childImageSharp.fluid.src;
  }
  return site.image;
};

const createPageFromNode = ({
  node,
  additionalResults = {},
  component,
  parents,
  createPage,
  reporter
}) => {
  const {
    path,
    title,
    description,
    media_image,
    created_at,
    modified_at,
    items
  } = node;

  const pagePath = path;
  const pageList = parents.map(({ path, title, description, image }) => {
    return {
      pagePath: path,
      title,
      description,
      image: pickImageSrc(image)
    };
  });
  const breadcrumb = buildBreadcrumb(pagePath, [
    ...pageList,
    {
      pagePath,
      title,
      description,
      image: pickImageSrc(media_image)
    }
  ]);
  const jsonLd = buildPageJsonLd({
    breadcrumb,
    dateCreated: created_at,
    dateModified: modified_at,
    datePublished: modified_at,
    description,
    image: pickImageSrc(media_image),
    pagePath,
    site,
    title
  });

  const contextBase = {
    node,
    breadcrumb,
    jsonLd: JSON.stringify(jsonLd, null, 2),
    ...additionalResults
  };

  const context = items
    ? {
        ...contextBase,
        items
      }
    : contextBase;

  reporter.info(`Creating page: ${pagePath}`);

  createPage({
    path: pagePath,
    component,
    context
  });
};

const queryParents = (node, graphql, reporter) => {
  const parentPaths = buildDestPaths(path.dirname(node.path));
  const parentsQueryString = parentPaths.reduce((acm, destPath, i) => {
    return `
      ${acm}
      r${i}: json (path: {eq: "${destPath}"}) {
        title
        description
        path
        media_image {
          childImageSharp {
            fluid {
              src
            }
          }
        }
      }
      `;
  }, '');

  const query = `{${parentsQueryString}}`;
  return graphql(query).then(({ data }, errors) => {
    if (!data) {
      if (errors && errors.length > 0) {
        errors.forEach(err => {
          reporter.error('query:', query, err);
        });
      }
      return reporter.error(
        `query result was ${JSON.stringify(data, null, 2)}`,
        query
      );
    }
    if (errors && errors.length > 0) {
      return errors.forEach(err => {
        reporter.error('query:', query, err);
      });
    }
    return Object.keys(data).map(k => data[k]);
  });
};

const createContentPages = ({ graphql, createPage, reporter }) => {
  return configs.map(({ query, component, additionalQueries = {} }) => {
    return new Promise((resolve, reject) => {
      graphql(query)
        .then(async ({ data, errors }) => {
          if (errors && errors.length > 0) {
            errors.forEach(err => {
              reporter.error(err);
              reporter.error('query:', query);
            });
            reject(errors);
          }

          const { contents, items } = data;

          if (!data || !contents) {
            reporter.error('query:', query);
          }

          // Create each item pages
          if (contents.edges && Array.isArray(contents.edges)) {
            return Promise.all(
              contents.edges.map(async ({ node }) => {
                const additionalResults = await Object.keys(
                  additionalQueries
                ).reduce(async (acm, key) => {
                  return Promise.resolve({
                    ...(await acm),
                    [key]: await additionalQueries[key]({
                      graphql,
                      node,
                      items,
                      reporter
                    })
                  });
                }, Promise.resolve({}));

                return queryParents(node, graphql, reporter).then(parents => {
                  createPageFromNode({
                    node,
                    additionalResults,
                    component,
                    parents,
                    createPage,
                    reporter
                  });
                });
              })
            )
              .then(() => resolve())
              .catch(err => reject(err));
          }

          // Create a index page
          const additionalResults = await Object.keys(additionalQueries)
            .reduce(async (acm, key) => {
              return {
                ...(await acm),
                [key]: await additionalQueries[key]({
                  graphql,
                  node: contents,
                  items,
                  reporter
                })
              };
            }, Promise.resolve({}))
            .then(result => result);

          return queryParents(contents, graphql, reporter)
            .then(parents => {
              createPageFromNode({
                node: items ? { ...contents, items: items.edges } : contents,
                additionalResults,
                component,
                parents,
                createPage,
                reporter
              });
            })
            .then(() => resolve())
            .catch(err => reject(err));
        })
        .catch(reason => {
          reject(reason);
        });
    });
  });
};

module.exports = {
  createContentPages
};
