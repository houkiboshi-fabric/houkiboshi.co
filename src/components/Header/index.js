import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import { Container } from './header.css.js';
import Title from '../Title';
import Nav from './Nav';

const Header = ({ title }) => (
  <Container>
    <Link to="/">
      <Title as="h1">{title}</Title>
    </Link>

    <Nav />
  </Container>
);

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
