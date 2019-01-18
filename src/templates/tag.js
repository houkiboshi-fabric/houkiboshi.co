import React from 'react';

import Layout from '../components/Layout';
import Container from '../components/Container';
import Title from '../components/Title';
import { Link } from 'gatsby';

const Tag = ({ pageContext: { node, items, breadcrumb, jsonLd } }) => {
  const links = items
    ? items.map(({ path, name, title }, i) => {
        return (
          <li key={i}>
            <Link to={path}>{title || name}</Link>
          </li>
        );
      })
    : null;
  console.log('items', items);
  return (
    <Layout>
      <Container>
        <Title as="h1" size="large">
          {node.name}
        </Title>
        {node.body && (
          <div
            dangerouslySetInnerHTML={{
              __html: node.body.childMarkdownRemark.html
            }}
          />
        )}
        {items && items.length > 0 && <ul>{links}</ul>}

        <pre>
          <code>{JSON.stringify(items, null, 2)}</code>
        </pre>
        <pre>
          <code>{JSON.stringify(breadcrumb, null, 2)}</code>
        </pre>
        <pre>
          <code>{jsonLd}</code>
        </pre>
        <pre>
          <code>{JSON.stringify(node, null, 2)}</code>
        </pre>
      </Container>
    </Layout>
  );
};

export default Tag;
