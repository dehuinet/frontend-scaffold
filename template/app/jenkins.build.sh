#!/bin/bash
export LANG="en_US.UTF-8"
export NVM_DIR="/home/ewhine/.nvm"
export RVM_DIR="/home/ewhine/.rvm"
[ -x "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
[ -x "$RVM_DIR/environments/ruby-2.0.0-p451" ] && . "$RVM_DIR/environments/ruby-2.0.0-p451"
nvm list
nvm use 'v10.20.1'
##
# Begin
##
cd ${WORKSPACE}
if [ -w ./package_build.json ]
then
    npm run postinstall
    cp -f ./package_build.json ./package.json
fi
# npm i
export NVM_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node
export NVM_IOJS_ORG_MIRROR=http://npm.taobao.org/mirrors/iojs
export NVMW_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node
export NVMW_IOJS_ORG_MIRROR=http://npm.taobao.org/mirrors/iojs
export NVMW_NPM_MIRROR=http://npm.taobao.org/mirrors/npm
export PHANTOMJS_CDNURL=https://npm.taobao.org/mirrors/phantomjs
export CHROMEDRIVER_CDNURL=https://npm.taobao.org/mirrors/chromedriver
export OPERADRIVER_CDNURL=http://npm.taobao.org/mirrors/operadriver
export ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/
export SASS_BINARY_SITE=http://npm.taobao.org/mirrors/node-sass
export SQLITE3_BINARY_SITE=http://npm.taobao.org/mirrors/sqlite3
export PYTHON_MIRROR=http://npm.taobao.org/mirrors/python
export PROFILER_BINARY_HOST_MIRROR=http://npm.taobao.org/mirrors/node-inspector/
export NPM_CONFIG_PROFILER_BINARY_HOST_MIRROR=http://npm.taobao.org/mirrors/node-inspector/
export PUPPETEER_DOWNLOAD_HOST=https://npm.taobao.org/mirrors
export SENTRYCLI_CDNURL=https://npm.taobao.org/mirrors/sentry-cli
export NODE_INSPECTOR_CDNURL=https://npm.taobao.org/mirrors/node-inspector
export SELENIUM_CDNURL=https://npm.taobao.org/mirrors/selenium
export DISTURL=https://npm.taobao.org/dist
npm install --registry=http://npm.dehuinet.com:8100 --prefer-offline
# clear up cache
rm -fr node_modules/.cache
# npm run build
npm run build -- --commit-id=${GIT_COMMIT} --version-code=${VERSION_CODE} --version-name=${VERSION_NAME}
##
# End
##

# Copy zip file to Web-Server static directory
DIST_JOB_DIR="$BUILD_DIST/$JOB_NAME";
mkdir -p $DIST_JOB_DIR
cp dist/*.zip  $DIST_JOB_DIR
# print the download url
ZIP_FILE_NAME=$(basename `ls -t ./dist/*.zip | head -1`)
if [ -z $DOWNLOAD_HOST ]
then
    export DOWNLOAD_HOST="http://apps.dehuinet.com:83"
fi
export ZIP_FILE_DOWNLOAD_URL="$DOWNLOAD_HOST/${JOB_NAME}/${ZIP_FILE_NAME}"
echo $ZIP_FILE_DOWNLOAD_URL
echo VERSION_NAME IS $VERSION_NAME, VERSION_CODE IS $VERSION_CODE, BRANCH IS $BRANCH.
