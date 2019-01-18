'use strict';

const { buildDestPaths } = require('./build-dest-paths.js');

const buildBreadcrumb = (pagePath, routes) => {
  return buildDestPaths(pagePath).map((path, _i, arr) => {
    const route = routes.find(route => {
      return (
        route.pagePath === path || route.pagePath.replace(/\/$/g, '') === path
      );
    });

    if (!route || !route.pagePath || !route.title) {
      throw new Error(`Route was not found. pagePath: ${pagePath}`);
    }

    return {
      path: route.pagePath,
      name: route.title
    };
  });
};

module.exports = {
  buildBreadcrumb
};
