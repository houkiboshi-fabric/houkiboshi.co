'use strict';
const { buildBreadcrumb } = require('./build-breadcrumb.js');

describe('buildBreadcrumb', () => {
  test(`buildBreadcrumb('/a/b/c', routes) should be return an object that have path and name`, () => {
    const routes = [
      {
        pagePath: '/',
        title: 'home'
      },
      {
        pagePath: '/a',
        title: 'page a'
      },
      {
        pagePath: '/a/b',
        title: 'page b'
      },
      {
        pagePath: '/a/b/c',
        title: 'page c'
      },
      {
        pagePath: '/aaa',
        title: 'page aaa'
      }
    ];
    const breadcrumb = buildBreadcrumb('/a/b/c', routes);
    expect(breadcrumb[0].name).toBe('home');
    expect(breadcrumb[3].name).toBe('page c');
  });
});
