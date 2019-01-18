'use strict';

const lang = 'ja';
const siteUri = 'https://houkiboshi.co/';
const dateCreated = '2019-12-31T15:00:00.000Z';

const twitterId = 'houkiboshifab';

const accounts = {
  twitter: `https://twitter.com/${twitterId}`,
  github: 'https://github.com/houkiboshi-fabric'
};

const author = {
  '@type': 'Organization',
  name: '手織り草木染ホウキボシ',
  image: {
    '@type': 'ImageObject',
    url: 'products/chojo/main.jpg',
    width: 1000,
    height: 1000
  },
  sameAs: Object.values(accounts)
};

const site = {
  '@context': 'http://schema.org',
  '@type': 'WebSite',
  '@id': siteUri,
  inLanguage: lang,
  url: siteUri,
  name: '手織り草木染ホウキボシ',
  description: '手織り・型染め・草木染めを専門とする鳥取県の工房です。',
  dateCreated,
  datePublished: dateCreated,
  dateModified: dateCreated, // TODO getLastCommittedAt(),
  publisher: author,
  image: {
    '@type': 'ImageObject',
    url: 'products/chojo/main.jpg',
    width: 1252,
    height: 630
  },
  author,
  encoding: {
    '@type': 'MediaObject',
    encodingFormat: 'utf-8'
  },
  copyrightHolder: author,
  copyrightYear: 2019
};

// site metadata used in gatsby build and develop task
const siteMetadata = {
  siteTitle: site.name,
  siteTitleShort: 'ホウキボシ',
  siteDescription: site.description,
  siteUrl: site.url.replace(/\/$/, ''),
  author,
  pathPrefix: null
};

module.exports = {
  lang,
  twitterId,
  accounts,
  author,
  site,
  siteMetadata,
  postDirName: 'posts', // used as both of local sources and public path
  descriptionLength: 120,
  theme: {
    // Chrome and MSApplication theme colors
    color: '#000',
    bgColor: '#fff'
  },
  facebookAppId: 280562095941455
};
