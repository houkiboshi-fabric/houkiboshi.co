import React from 'react';
import { Link } from 'gatsby';

import { NavContainer } from './nav.css.js';

const Nav = () => (
  <NavContainer>
    <ul>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/products">Products</Link>
      </li>
      <li>
        <Link to="/dyeing-materials">Dyeing Materials</Link>
      </li>
      <li>
        <Link to="/dyeing-material-types">Dyeing Material Types</Link>
      </li>
      <li>
        <Link to="/raw-materials">Raw Materials</Link>
      </li>
    </ul>
  </NavContainer>
);

export default Nav;
