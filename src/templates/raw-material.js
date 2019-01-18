import React from 'react';

import Container from '../components/Container';
import Layout from '../components/Layout';
import Title from '../components/Title';
import Head from '../components/Head';
import Breadcrumbs from '../components/Breadcrumbs';
import { Link } from 'gatsby';

const RawMaterial = ({
  pageContext: { node, breadcrumb, jsonLd, products }
}) => {
  const items = products.map(({ path, title }, i) => {
    return (
      <li key={i}>
        <Link to={path}>{title}</Link>
      </li>
    );
  });
  return (
    <Layout>
      <Head jsonLd={jsonLd} />
      <Container>
        <Breadcrumbs list={breadcrumb} />
        <Title as="h2" size="large">
          {node.name}
        </Title>
        <p>{node.description}</p>
        <Title as="h3" size="large">
          {node.name} を使っている製品
        </Title>
        {products.length > 0 && <ul>{items}</ul>}
        <pre>
          <code>{JSON.stringify(breadcrumb, null, 2)}</code>
        </pre>
        <pre>
          <code>{jsonLd}</code>
        </pre>
      </Container>
    </Layout>
  );
};

export default RawMaterial;
