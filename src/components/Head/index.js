import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { Location } from '@reach/router';

import { lang, theme, facebookAppId, twitterId } from '../../../data/site.js';

const msAppIcons = [
  {
    size: '70x70',
    name: 'square70x70'
  },
  { size: '144x144', name: 'square144x144' },
  { size: '150x150', name: 'square150x150' },
  { size: '310x150', name: 'wide310x150' },
  { size: '310x310', name: 'square310x310' }
];
const appleTouchIconSizes = [57, 60, 72, 76, 114, 120, 144, 152, 167, 180];
const faviconSizes = [16, 32];

const msAppMetas = msAppIcons.map(({ size, name }, i) => {
  return (
    <meta
      content={`/icons/mstile-${size}.png`}
      name={`msapplication-${name}`}
      key={i}
    />
  );
});

const appleTouchIconLinks = appleTouchIconSizes.map((size, i) => {
  return (
    <link
      href={`/icons/apple-touch-icon-${size}x${size}.png`}
      rel="apple-touch-icon"
      sizes={`${size}x${size}`}
      key={i}
    />
  );
});

const faviconLinks = faviconSizes.map((size, i) => {
  return (
    <link
      href={`/icons/favicon-${size}x${size}.png`}
      rel="icon"
      sizes={`${size}x${size}`}
      type="image/png"
      key={i}
    />
  );
});

const Head = ({
  siteTitle,
  siteDescription,
  siteUrl,
  pageTitle,
  pageTitleFull = pageTitle ? `${siteTitle}: ${pageTitle}` : siteTitle,
  imageUrl,
  location,
  canonical = siteUrl + (location.pathname || ''),
  jsonLd
}) => (
  <Helmet>
    <html lang={lang} />

    <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
    <meta
      content="width=device-width,initial-scale=1.0,user-scalable=yes"
      name="viewport"
    />

    <meta content={siteTitle} name="apple-mobile-web-app-title" />
    <meta content={pageTitleFull} property="og:title" />
    <meta content={pageTitleFull} name="twitter:title" />
    <title>{pageTitleFull}</title>

    <meta content={siteDescription} name="description" />
    <meta content={siteDescription} property="og:description" />
    <meta content={siteDescription} name="twitter:description" />

    <meta content="yes" name="apple-mobile-web-app-capable" />
    <meta
      content="black-translucent"
      name="apple-mobile-web-app-status-bar-style"
    />
    <meta content={theme.color} name="theme-color" />
    <meta content={siteTitle} name="application-name" />

    <meta content="website" property="og:type" />
    <meta content={siteTitle} property="og:site_name" />
    <meta content={facebookAppId} property="fb:app_id" />
    <meta content="summary_large_image" name="twitter:card" />
    <meta content={`@${twitterId}`} name="twitter:site" />
    <meta content={`@${twitterId}`} name="twitter:creator" />
    <meta content={pageTitleFull} name="twitter:text:title" />
    <meta content={canonical} property="og:url" />
    <meta content={canonical} name="twitter:url" />
    <link rel="canonical" href={canonical} />

    <meta content={imageUrl || `${siteUrl}/social.png`} property="og:image" />
    <meta content="1024" property="og:image:width" />
    <meta content="512" property="og:image:height" />
    <meta content={imageUrl || `${siteUrl}/social.png`} name="twitter:image" />
    <meta content="1024" name="twitter:image:width" />
    <meta content="512" name="twitter:image:height" />
    <meta content={imageUrl || `${siteUrl}/social.png`} property="og:image" />
    <meta content="1024" property="og:image:width" />
    <meta content="512" property="og:image:height" />

    <meta content={theme.color} name="msapplication-TileColor" />

    {msAppMetas}

    <link href="/manifest.json" rel="manifest" />

    {appleTouchIconLinks}
    {faviconLinks}

    {jsonLd && <script type="application/ld+json">{jsonLd}</script>}
  </Helmet>
);

Head.propTypes = {
  siteTitle: PropTypes.string,
  siteDescription: PropTypes.string,
  siteUrl: PropTypes.string,
  imageUrl: PropTypes.string,
  canonical: PropTypes.string,
  pageTitle: PropTypes.string,
  pageTitleFull: PropTypes.string,
  location: PropTypes.object.isRequired
};

const HeadWithQuery = props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            siteTitle
            siteDescription
            siteUrl
          }
        }
      }
    `}
    render={data => (
      <Location>
        {({ location }) => (
          <Head {...data.site.siteMetadata} {...props} location={location} />
        )}
      </Location>
    )}
  />
);

export default HeadWithQuery;
