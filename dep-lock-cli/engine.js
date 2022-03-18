const co = require('co');
const Handlebars = require('handlebars');
const fs = require('fs-extra');
const path = require('path');
const execa = require('execa');

module.exports.pkgGen = co.wrap(function *(pkgPath, pkgLockPath, installDir, tmplConf){
    installDir = path.join(__dirname, '.tmp', installDir);
    const pkg = {
        tmplTxt: null,
        tmpl: null,
        text: null,
        json: null
    };
    pkg.tmplTxt = yield fs.readFile(path.join(__dirname, pkgPath), {
        encoding: 'utf-8'
    });
    pkg.tmpl = Handlebars.compile(pkg.tmplTxt);
    pkg.text = pkg.tmpl(tmplConf);
    pkg.json = JSON.parse(pkg.text);
    // 删除会导致安装失败的配置项
    delete pkg.json.scripts.postinstall;
    delete pkg.json.scripts.postuninstall;
    //
    yield fs.ensureDir(path.join(installDir, 'node_modules/fsevents'));
    yield fs.writeJson(path.join(installDir, 'package.json'), pkg.json, {
        encoding: 'utf-8',
        spaces: 4
    });
    const subprocess = execa('npm', [
        'i',
        '--prefer-offline',
        '--registry=http://npm.dehuinet.com:8100'
    ], {
        cwd: installDir,
        env: {
            NVM_NODEJS_ORG_MIRROR: 'http://npm.taobao.org/mirrors/node',
            NVM_IOJS_ORG_MIRROR: 'http://npm.taobao.org/mirrors/iojs',
            NVMW_NODEJS_ORG_MIRROR: 'http://npm.taobao.org/mirrors/node',
            NVMW_IOJS_ORG_MIRROR: 'http://npm.taobao.org/mirrors/iojs',
            NVMW_NPM_MIRROR: 'http://npm.taobao.org/mirrors/npm',
            PHANTOMJS_CDNURL: 'https://npm.taobao.org/mirrors/phantomjs',
            CHROMEDRIVER_CDNURL: 'https://npm.taobao.org/mirrors/chromedriver',
            OPERADRIVER_CDNURL: 'http://npm.taobao.org/mirrors/operadriver',
            ELECTRON_MIRROR: 'http://npm.taobao.org/mirrors/electron/',
            SASS_BINARY_SITE: 'http://npm.taobao.org/mirrors/node-sass',
            SQLITE3_BINARY_SITE: 'http://npm.taobao.org/mirrors/sqlite3',
            PYTHON_MIRROR: 'http://npm.taobao.org/mirrors/python',
            PROFILER_BINARY_HOST_MIRROR: 'http://npm.taobao.org/mirrors/node-inspector/',
            NPM_CONFIG_PROFILER_BINARY_HOST_MIRROR: 'http://npm.taobao.org/mirrors/node-inspector/',
            PUPPETEER_DOWNLOAD_HOST: 'https://npm.taobao.org/mirrors',
            SENTRYCLI_CDNURL: 'https://npm.taobao.org/mirrors/sentry-cli',
            NODE_INSPECTOR_CDNURL: 'https://npm.taobao.org/mirrors/node-inspector',
            SELENIUM_CDNURL: 'https://npm.taobao.org/mirrors/selenium',
            DISTURL: 'https://npm.taobao.org/dist'
        }
    });
    subprocess.stdout.pipe(process.stdout);
    subprocess.stderr.pipe(process.stderr);
    yield subprocess;
    const srcLockFile = path.join(installDir, 'package-lock.json');
    const destLockFile = path.join(__dirname, pkgLockPath);
    yield fs.copy(srcLockFile, destLockFile);
    //
    const [, nameVar] = pkg.tmplTxt.match(/^\s*"name"\s*:\s*"(.+)"\s*,\s*$/m) || [];
    const pkgLockJson = yield fs.readJson(destLockFile);
    pkgLockJson.name = nameVar;
    yield fs.writeJson(destLockFile, pkgLockJson, {
        encoding: 'utf-8',
        spaces: 4
    });
});
