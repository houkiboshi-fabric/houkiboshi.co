import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import { Title, Copy } from './item.css.js';

const GalleryItem = ({ title, copy, image }) => (
  <figure>
    <Img fluid={image ? image.childImageSharp.fluid : {}} alt={title} />
    <figcaption>
      <Title>{title}</Title>
      <Copy>{copy}</Copy>
    </figcaption>
  </figure>
);

GalleryItem.propTypes = {
  title: PropTypes.string,
  copy: PropTypes.string,
  image: PropTypes.object.isRequired
};

export default GalleryItem;
