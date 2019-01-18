'use strict';

const { URL } = require('url');

const template = {
  '@context': 'http://schema.org',
  '@type': 'WebPage'
};

const breadcrumbToJsonLd = (siteUrl, breadcrumb) => {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumb.map((page, i) => {
      const position = i + 1;
      return {
        '@type': 'ListItem',
        position,
        item: {
          '@id': new URL(page.path, siteUrl).href,
          name: page.name
        }
      };
    })
  };
};

const buildPageJsonLd = (
  {
    breadcrumb,
    dateCreated,
    dateModified,
    datePublished,
    description,
    image,
    pagePath,
    site,
    title
  },
  additionalProps = {}
) => {
  return {
    ...template,
    author: site.author,
    breadcrumb: breadcrumbToJsonLd(site.url, breadcrumb),
    copyrightHolder: site.copyrightHolder,
    copyrightYear: site.copyrightYear,
    dateCreated,
    dateModified,
    datePublished,
    description,
    editor: site.author,
    encoding: site.encoding,
    headline: title,
    image: image || site.image,
    inLanguage: site.inLanguage,
    name: title,
    publisher: site.publisher,
    url: new URL(pagePath, site.url).href,
    ...additionalProps
  };
};

module.exports = {
  breadcrumbToJsonLd,
  buildPageJsonLd
};
