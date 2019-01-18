'use strict';

// https://www.gatsbyjs.org/packages/gatsby-image/#gatsby-transformer-sharp
// https://github.com/gatsbyjs/gatsby/blob/26582d31ab14f7bac6d5738e4245ceca2e6d411d/packages/gatsby-transformer-sharp/src/fragments.js#L88-L98
const imageSharpFluidPreferWebp = `
  base64
  aspectRatio
  src
  srcSet
  srcWebp
  srcSetWebp
  sizes
`;

const mediaImage = `
  fluid {
    src
  }
`;

module.exports = {
  imageSharpFluidPreferWebp,
  mediaImage
};
