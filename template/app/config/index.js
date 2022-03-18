'use strict';
/* eslint-disable no-console, no-sync */
/*
  Template version: 1.3.1
  see http://vuejs-templates.github.io/webpack for documentation.
 */
const webpack = require('webpack');
const ip = require('quick-local-ip-stzhang');
const MxBaler = require('webpack-mx-mobile-baler-plugin');
const {getGitInfo, resolve} = require('../build/utils');
const ssoproxy = require('webpack-dev-server-ssoproxy-minxing')({
    // logServer: 'http://dev7.dehuinet.com:8017',
    webpack,
    protocol: process.env.SSO_PROXY_PROTOCOL,
    host: process.env.SSO_PROXY_HOST,
    port: process.env.SSO_PROXY_PORT,
    userName: process.env.SSO_PROXY_USERNAME,
    password: process.env.SSO_PROXY_PASSWORD,
    mobileUUID: true,
    clientId: 5,
    redirectPath: `/dehuinet/apps/sso_redirect?url=${encodeURIComponent('/mxapproval/admin.html')}`,
    outputDir: 'dist',
    dbgJsSuffix: '-dev_dbg.js',
    mockData: undefined,
    context: [
        '/mxapproval/',
        '/api/v2/',
        '/photos/'
    ]
});
const BUILD_ASSETS_PUBLIC_ROOT = '';
const checknum = {
    timestamp: new Date().getTime(),
    git: getGitInfo(),
    version: MxBaler.ARGS_SHORTCUT.versionCode
};
const entries = ['app'];
const DIST_PREFIX = resolve('dist/www');
const BUILD_ASSETS_SUB_DIRECTORY = 'bundle/app';
const templates = entries.reduce((templates, entry) => {
    templates[entry] = `${entry}.html`;
    return templates;
}, {});
const indexPages = entries.reduce((indexPages, entry) => {
    indexPages[entry] = `${entry.replace(/^app$/, 'index')}.html`;
    return indexPages;
}, {});
module.exports = {
    entries,
    chunkSuffix: entries.join('~'),
    common: {
        checknum
    },
    dev: {
        index: indexPages,
        template: templates,
        // Paths
        assetsSubDirectory: BUILD_ASSETS_SUB_DIRECTORY,
        assetsPublicPath: '',
        contentBase: [...ssoproxy.mockDataConf, resolve('dist')],
        before(app, server, compiler){
            ssoproxy.beforeBuilder([]).bind(this)(app, server, compiler);
        },
        proxyTable: ssoproxy.contextTable({
            config: {
                target: ssoproxy.targetUrl,
                onProxyReq: ssoproxy.proxy.onProxyReq,
                onProxyRes: ssoproxy.proxy.onProxyRes,
                onError: ssoproxy.proxy.onError,
                secure: false,
                pathRewrite(path){
                    return `${BUILD_ASSETS_PUBLIC_ROOT}${path}`;
                }
            }
        }),
        // Various Dev Server settings
        host: ip.getLocalIP4({// can be overwritten by process.env.HOST
            excludes: [
                'VMware Network Adapter',
                'Pseudo-Interface',
                '本地连接'
            ]
        }),
        port: {{appPort}}, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        useLocalIp: true,
        notifyOnErrors: true,
        /*
          Source Maps
          https://webpack.js.org/configuration/devtool/#development
         */
        devtool: '#source-map',
        /*
          If you have problems debugging vue-files in devtools,
          set this to false - it *may* help
          https://vue-loader.vuejs.org/en/options.html#cachebusting
         */
        cacheBusting: true,
        /*
          CSS Sourcemaps off by default because relative paths are "buggy"
          with this option, according to the CSS-Loader README
          (https://github.com/webpack/css-loader#sourcemaps)
          In our experience, they generally work as expected,
          just be aware of this issue when enabling this option.
         */
        cssSourceMap: true
    },
    build: {
        // Template for index.html, relative to ${build.assetsRoot}
        index: indexPages,
        template: templates,
        // Paths
        assetsRoot: DIST_PREFIX,
        assetsSubDirectory: BUILD_ASSETS_SUB_DIRECTORY,
        assetsPublicPath: '',
        /*
          ESlint 失败即构建失败。
         */
        failOnEslintErr: false,
        /**
         * Source Maps
         */
        productionSourceMap: true,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: 'none',
        /*
          Gzip off by default as many popular static hosts such as
          Surge or Netlify already gzip all static assets for you.
          Before setting to `true`, make sure to:
          npm install --save-dev compression-webpack-plugin
         */
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        /*
          Run the build command with an extra argument to
          View the bundle analyzer report after build finishes:
          `npm run build --report`
          Set to `true` or `false` to always turn it on or off
         */
        bundleAnalyzerReport: false
    }
};
