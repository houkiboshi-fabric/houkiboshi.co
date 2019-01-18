import React from 'react';
import PropTypes from 'prop-types';

import GalleryItem from './Item';
import { GalleryContainer } from './gallery.css.js';

const Gallery = ({ items }) => (
  <GalleryContainer>
    {items.map((item, i) => (
      <GalleryItem {...item} key={i} />
    ))}
  </GalleryContainer>
);

Gallery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Gallery;
