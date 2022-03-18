'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');
const {dev: {assetsSubDirectory, host, port}} = require('./index');
//
module.exports = merge(prodEnv, {
    MX_APP_ID: `"${process.env.MX_APP_ID}"`,
    DEV_HOST_IP: `"${host}"`,
    DEV_HOST_PORT: port,
    STATIC: `"${assetsSubDirectory}"`
});
