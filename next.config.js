const sass = require('@zeit/next-sass');
const typescript = require('@zeit/next-typescript');
const withPlugins = require('next-compose-plugins');
const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');

dotenvLoad();

module.exports = withPlugins([

  [sass, {
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: "[local]___[hash:base64:5]",
    }
  }],

  [typescript],

  nextEnv(),

], {});