import React from 'react';
import Layout from '../components/Layout';
import Container from '../components/Container';
import Head from '../components/Head';
import Title from '../components/Title';

const Root = ({ pageContext: { node, breadcrumb, jsonLd } }) => (
  <Layout>
    <Head pageTitle={node.name} />
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

export default Root;
