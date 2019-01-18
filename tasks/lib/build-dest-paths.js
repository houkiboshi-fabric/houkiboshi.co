'use strict';

/*
 *  '/a/b/c' => ['/a', '/a/b', '/a/b/c']
 */
const buildDestPaths = path => {
  const DELIMITER = '/';
  const root = path[0] === DELIMITER ? DELIMITER : null;
  const lowerPaths = path
    .split(DELIMITER)
    .filter(e => e)
    .map((e, i, paths) => {
      const path = paths.slice(0, i + 1).join(DELIMITER);
      return `/${path}`;
    });
  return [root, ...lowerPaths].filter(e => e);
};

module.exports = {
  buildDestPaths
};
