'use strict';

const {
  createWriteStream,
  mkdirSync,
  readFileSync,
  unlinkSync
} = require('fs');
const path = require('path');

const { FTP_HOST, FTP_USER, FTP_PASSWORD } = process.env;

const { Client } = require('basic-ftp');

const { ROOT_DIR, ASSETS_DIR } = require('../data/path.js');
const { buildAssetIndex } = require('./build-asset-index.js');
const { compareAssetIndex } = require('./compare-asset-index.js');
const { cleanEmptyDirs } = require('./clean-empty-dirs.js');

const REMOTE_ROOT = 'houkiboshi-fabric/assets/';
const INDEX = 'index.json';
const INDEX_REMOTE = 'index.remote.json';
const FTP_CONFIG = {
  host: FTP_HOST,
  port: 21,
  user: FTP_USER,
  password: FTP_PASSWORD,
  secure: true
};

const cleanIndexFiles = reporter => {
  reporter.info('Removing index files...');
  [INDEX, INDEX_REMOTE].forEach(fileName => {
    const filePath = path.resolve(ASSETS_DIR, fileName);
    try {
      unlinkSync(filePath);
      reporter.success(`Removed: ${path.relative(ROOT_DIR, filePath)}`);
    } catch (err) {
      reporter.info(err);
    }
  });
};

const createFtpClient = () => {
  const c = new Client();
  // c.ftp.verbose = true;
  return c;
};

const download = async (remoteFileName, savingPath, client) => {
  await client.download(createWriteStream(savingPath), remoteFileName);
};

const downloadIndex = async (client, reporter) => {
  try {
    const remoteIndexPath = path.resolve(ASSETS_DIR, INDEX_REMOTE);
    await download(INDEX, remoteIndexPath, client);
    reporter.success(`Saved: ${path.relative(ROOT_DIR, remoteIndexPath)}`);
    return JSON.parse(readFileSync(remoteIndexPath, 'utf8'));
  } catch (err) {
    throw new Error(err);
  }
};

const deleteLocalFiles = (files = [], reporter) => {
  files.forEach(filePath => {
    try {
      const p = path.resolve(ASSETS_DIR, filePath);
      unlinkSync(p);
      reporter.success(`Removed local file: ${path.relative(ROOT_DIR, p)}`);
    } catch (err) {
      throw new Error(err);
    }
  });
};

const downloadRemoteFiles = async (
  files = [],
  client,
  remoteRoot,
  reporter
) => {
  const jobs = files.map(filePath => {
    return async () => {
      try {
        const { dir, base } = path.parse(filePath);
        await client.cd(dir);
        mkdirSync(path.resolve(ASSETS_DIR, dir), { recursive: true });
        const localSavingPath = path.resolve(ASSETS_DIR, filePath);
        await download(base, localSavingPath, client);
        reporter.success(`Saved: ${path.relative(ROOT_DIR, localSavingPath)}`);
        await client.cd(remoteRoot);
      } catch (err) {
        throw new Error(err);
      }
    };
  });

  await (async () => {
    for (const job of jobs) {
      await job();
    }
  })();
};

const updateAssets = async (
  reporter = { info: console.info, success: console.log, error: console.error }
) => {
  mkdirSync(ASSETS_DIR, { recursive: true });
  cleanIndexFiles(reporter);

  const indexLocal = await buildAssetIndex(reporter);
  const cli = createFtpClient();
  await cli.access(FTP_CONFIG);
  await cli.cd(REMOTE_ROOT);
  const remoteRoot = await cli.pwd();
  const indexRemote = await downloadIndex(cli, reporter);
  const diff = compareAssetIndex(indexLocal, indexRemote);

  reporter.info('Updates:');
  reporter.inspect(diff);
  deleteLocalFiles([...diff.updated, ...diff.deleted], reporter);
  reporter.info('Downloading assets from remote...');
  await downloadRemoteFiles(
    [...diff.added, ...diff.updated],
    cli,
    remoteRoot,
    reporter
  );
  cli.close();
  reporter.info('Connection closed');
  reporter.info('Updating local index...');
  await buildAssetIndex(reporter);
  cleanEmptyDirs(ASSETS_DIR);
};

module.exports = {
  updateAssets
};
