import React from 'react';

import Layout from '../components/Layout';
import Container from '../components/Container';
import Title from '../components/Title';
import { Link } from 'gatsby';

const IndexTemplate = ({
  pageContext: { node, breadcrumb, jsonLd, items }
}) => {
  const links = items
    ? items.map(({ node: { path, name, title } }, i) => {
        return (
          <li key={i}>
            <Link to={path}>{title || name}</Link>
          </li>
        );
      })
    : null;
  return (
    <Layout>
      <Container>
        <Title as="h1" size="large">
          {node.title}
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

export default IndexTemplate;
