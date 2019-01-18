'use strict';

const { buildDestPaths } = require('./build-dest-paths.js');

describe('buildDestPaths()', () => {
  test(`buildDestPaths('/a/b/c') should return ['/', '/a', '/a/b', '/a/b/c']`, () => {
    const paths = buildDestPaths('/a/b/c');
    expect(paths).toEqual(['/', '/a', '/a/b', '/a/b/c']);
  });

  test(`buildDestPaths('/a/b/c/') should ignore trailing slash`, () => {
    const paths = buildDestPaths('/a/b/c/');
    expect(paths).toEqual(['/', '/a', '/a/b', '/a/b/c']);
  });

  test(`buildDestPaths('/') should return ['/']`, () => {
    const paths = buildDestPaths('/');
    expect(paths).toEqual(['/']);
  });
});
