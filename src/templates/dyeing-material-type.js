import React from 'react';

import Container from '../components/Container';
import Layout from '../components/Layout';
import Title from '../components/Title';
import Head from '../components/Head';
import Breadcrumbs from '../components/Breadcrumbs';

const DyeingMaterialType = ({ pageContext: { node, breadcrumb, jsonLd } }) => (
  <Layout>
    <Head jsonLd={jsonLd} />
    <Container>
      <Breadcrumbs list={breadcrumb} />
      <Title as="h2" size="large">
        {node.name}
      </Title>
      <p>{node.description}</p>
      <pre>
        <code>{JSON.stringify(breadcrumb, null, 2)}</code>
      </pre>
      <pre>
        <code>{jsonLd}</code>
      </pre>
    </Container>
  </Layout>
);

export default DyeingMaterialType;
