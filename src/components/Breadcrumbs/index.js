'use strict';

import React from 'react';
import { Link } from 'gatsby';

import { List, Item, CurrentItem } from './breadcrumbs.css.js';

const Breadcrumbs = ({ list }) => {
  const items = list.map((page, i) => {
    const isCurrentPage = i + 1 === list.length;
    const props = {
      to: page.path,
      'aria-current': isCurrentPage ? 'page' : null
    };

    if (isCurrentPage) {
      return (
        <CurrentItem key={page.path}>
          <Link {...props}>{page.name}</Link>
        </CurrentItem>
      );
    }

    return (
      <Item key={page.path}>
        <Link {...props}>{page.name}</Link>
      </Item>
    );
  });

  return (
    <nav aria-label="Breadcrumb">
      <List>{items}</List>
    </nav>
  );
};

export default Breadcrumbs;
