import React from 'react';
import PropTypes from 'prop-types';
import { ContainerDiv } from './container.css.js';

const Container = ({ children }) => <ContainerDiv>{children}</ContainerDiv>;

Container.propTypes = {
  children: PropTypes.node.isRequired
};

export default Container;
