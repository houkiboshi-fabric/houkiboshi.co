import React from 'react';

import Container from '../components/Container';
import Layout from '../components/Layout';
import Head from '../components/Head';
import Title from '../components/Title';
import Breadcrumbs from '../components/Breadcrumbs';
import Img from 'gatsby-image';
import { Link } from 'gatsby';

const hasImage = image => {
  return image && image.childImageSharp && image.childImageSharp.fluid;
};

const Process = ({ pageContext: { node, products, breadcrumb, jsonLd } }) => {
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
          {node.title}
        </Title>

        {hasImage(node.image) && (
          <Img fluid={node.image.childImageSharp.fluid} />
        )}

        {node.body && (
          <div
            dangerouslySetInnerHTML={{
              __html: node.body.childMarkdownRemark.html
            }}
          />
        )}

        <Title as="h3" size="large">
          {node.name} で作られた製品
        </Title>
        {products.length > 0 && <ul>{items}</ul>}
        <pre>
          <code>{JSON.stringify(products, null, 2)}</code>
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

export default Process;
