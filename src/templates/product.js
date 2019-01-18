import React from 'react';

import Img from 'gatsby-image';

import Container from '../components/Container';
import Layout from '../components/Layout';
import Title from '../components/Title';
import Head from '../components/Head';
import Breadcrumbs from '../components/Breadcrumbs';

const hasImage = image => {
  return image && image.childImageSharp && image.childImageSharp.fluid;
};

const Product = ({ pageContext: { node, breadcrumb, jsonLd } }) => {
  const instructions = node.instructions.items.reduce(
    (
      acm,
      { id, value, instruction_category_entity: { id: categoryId, label } }
    ) => {
      const categoryItems = acm.elms[categoryId] || [];
      return {
        ...acm,
        elms: {
          ...acm.elms,
          [categoryId]: [...categoryItems, <li key={id}>{value}</li>]
        },
        categories: {
          ...acm.categories,
          [categoryId]: label
        }
      };
    },
    {
      elms: {},
      categories: {}
    }
  );

  console.log(instructions);

  return (
    <Layout>
      <Head jsonLd={jsonLd} />
      <Container>
        <Breadcrumbs list={breadcrumb} />
        <Title as="h2" size="large">
          {node.name}
        </Title>

        {Object.keys(instructions.elms).map(categoryId => {
          const instructionList = instructions.elms[categoryId];
          const label = instructions.categories[categoryId];
          return (
            <ul key={categoryId}>
              <li>
                {label}
                <ul>{instructionList}</ul>
              </li>
            </ul>
          );
        })}

        {hasImage(node.image) && (
          <Img fluid={node.image.childImageSharp.fluid} />
        )}
        {node.images_alt.map(image => (
          <Img fluid={image.childImageSharp.fluid} key={image.id} />
        ))}

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
};

export default Product;
