const { updateAssets } = require('./tasks/update-assets.js');
const { fetchContents } = require('./tasks/fetch-contents.js');
const { createContentPages } = require('./tasks/gatsby/create-content-pages');
const {
  updateAssetPathsInContents
} = require('./tasks/update-asset-paths-in-contents.js');

exports.onPreInit = async ({ reporter }) => {
  await updateAssets(reporter);
  await fetchContents(reporter);
  updateAssetPathsInContents(reporter);
  return Promise.resolve();
};

exports.createPages = ({ graphql, actions: { createPage }, reporter }) => {
  reporter.info('createPages');
  return Promise.all(createContentPages({ graphql, createPage, reporter }));
};
