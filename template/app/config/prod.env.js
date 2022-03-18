'use strict';
const MxBaler = require('webpack-mx-mobile-baler-plugin');
const {common: {checknum}, build: {assetsSubDirectory}} = require('./index');
module.exports = {
    STATIC: `"${assetsSubDirectory}"`,
    CHECKNUM: JSON.stringify(checknum),
    MACRO_LOG_PRE_PROCESSOR: '"[__mx-log-macro/app/{{destDirName}}/pre-processor__]"',
    MACRO_LOG_TRANSFORMER: '"[__mx-log-macro/app/{{destDirName}}/transformer__]"',
    MACRO_LOG_POST_PROCESSOR: '"[__mx-log-macro/app/{{destDirName}}/post-processor__]"',
    RELEASE_VERSION: JSON.stringify(`{{destDirName}}_${checknum.git.tagName}_${checknum.git.branchName}@${MxBaler.ARGS_SHORTCUT.versionName}`)
};
