'use strict';

const minimatch = require('minimatch');

const INDEX_FILE_NAME = 'index.json';
const CONFIG_PATTERN = 'config/**/*.json';

const onCreateNode = async ({
  node,
  actions: { createNode, createParentChildLink },
  loadNodeContent,
  createNodeId,
  createContentDigest
}) => {
  if (node.internal.mediaType !== 'application/json') {
    return;
  }

  const transformObject = ({ object = {}, id = null, type = 'json' }) => {
    const jsonNode = {
      ...object,
      id,
      children: [],
      parent: node.id,
      internal: {
        contentDigest: createContentDigest(object),
        type
      }
    };
    createNode(jsonNode);
    createParentChildLink({ parent: node, child: jsonNode });
  };

  const content = await loadNodeContent(node);
  const parsed = JSON.parse(content);

  if (
    node.base !== INDEX_FILE_NAME ||
    minimatch(node.relativePath, CONFIG_PATTERN) ||
    minimatch(node.absolutePath, CONFIG_PATTERN)
  ) {
    if (Array.isArray(parsed)) {
      parsed.forEach((item, i) => {
        transformObject({
          object: item,
          id: item.id
            ? item.id
            : createNodeId(`${node.relativePath} [${i}] >>> JSON`),
          type: 'configJson'
        });
      });
      return;
    }

    transformObject({
      object: parsed,
      id: parsed.id ? parsed.id : createNodeId(`${node.relativePath} >>> JSON`),
      type: 'configJson'
    });
    return;
  }

  transformObject({
    object: parsed,
    id: parsed.id ? parsed.id : createNodeId(`${node.relativePath} >>> JSON`)
  });
};

module.exports = {
  onCreateNode
};
