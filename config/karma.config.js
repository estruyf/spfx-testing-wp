"use strict";
const existingKarmaConfig = require('@microsoft/sp-build-web/lib/karma/karma.config');
const sourcemap = require('karma-sourcemap-loader');

module.exports = function (config) {
  existingKarmaConfig(config);

  // Check if in debug mode
  const debug = process.argv.indexOf('--debug') !== -1;
  if (debug) {
    /* Adding sourcemaps to the tests */
    config.plugins.push(sourcemap);
    for (let key in config.preprocessors) {
      config.preprocessors[key].push('sourcemap');
    }
    config.webpack["devtool"] = 'inline-source-map';
  }
};
