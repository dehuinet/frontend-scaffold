const path = require('path');
const {runCommand} = require('./index');
exports.Runner = class Runner{
    constructor(data, logger){
        this.data = data;
        this.logger = logger;
        this.DIR_NAMES_INSTALLED = this.DIR_NAMES = ['app'];
        this.INSTALL_COUNT = this.DIR_NAMES_INSTALLED.length;
        this.chalk = require('chalk');
        this.figlet = require('figlet');
        this._ = require('underscore');
        this.fs = require('fs-extra');
        this.co = require('co');
        this.json = require('comment-json');
    }
    printWelcomeMsg(){
        return new Promise(resolve => {
            this.figlet('MinXing', (err, data) => {
                if (err == null) {
                    this.logger.log(`\n${this.chalk.blue(data)}\n`);
                }
                this.logger.log(this.chalk.bgBlue.whiteBright.bold(
                    '【出处】定制于官方脚手架`http://vuejs-templates.github.io/webpack`的`@1.3.1`版本'
                ));
                this.logger.log(this.chalk.blue('正在定制工程，请稍候...'));
                resolve();
            });
        });
    }
    renameVSCodeConfFile(cwd, newFileName){
        this.logger.log(this.chalk.green('【进度】重命名VSCode工程组配置文件'));
        const vscodeDir = path.join(cwd, '.vscode');
        const vscodeFileOld = path.join(vscodeDir, 'vue_scaffold.code-workspace');
        const vscodeFileNew = path.join(vscodeDir, `${newFileName}.code-workspace`);
        return this.fs.rename(vscodeFileOld, vscodeFileNew);
    }
    renameSubDirs(cwd){
        return Promise.all(this.DIR_NAMES_INSTALLED.map(this.co.wrap(function *(dirOldName){
            const dirNewName = `${this.data.destDirName}-${dirOldName}`;
            this.logger.log(this.chalk.green(`【进度】重命名 子工程目录 ${dirOldName} 为 ${dirNewName}`));
            const dirOldPath = path.join(cwd, dirOldName);
            if (yield this.fs.pathExists(dirOldPath)) {
                const dirNewPath = path.join(cwd, dirNewName);
                yield this.fs.rename(dirOldPath, dirNewPath);
            }
        })));
    }
    mergeVSCodeConfFile(cwd){
        const that = this;
        const readJson = this.co.wrap(function *(filePath){
            const workspace = yield that.fs.readFile(filePath);
            return that.json.parse(workspace.toString());
        });
        return this.co(function *(){
            that.logger.log(this.chalk.green('【进度】合并VSCode项目配置'));
            const workspace = yield readJson(path.join(cwd, '.vscode/vue_scaffold.code-workspace'));
            let destSettings = that._.extendOwn({}, workspace.settings);
            const settingsPath = path.join(cwd, '.vscode/settings.json');
            if (yield that.fs.pathExists(settingsPath)) {
                const srcSettings = yield readJson(settingsPath);
                if (this.INSTALL_COUNT === 1 && this.DIR_NAMES_INSTALLED[0] === 'wasm') {
                    destSettings = srcSettings;
                } else {
                    that._.extendOwn(destSettings, srcSettings);
                }
            }
            yield that.fs.writeFile(settingsPath, that.json.stringify(destSettings, null, 4));
        });
    }
    renamePkgLockFiles(cwd){
        return Promise.all(this.DIR_NAMES_INSTALLED.map(this.co.wrap(function *(dirOldName){
            const dirNewName = `${this.data.destDirName}-${dirOldName}`;
            this.logger.log(this.chalk.green(`【进度】重命名 子工程目录 ${dirNewName} 内的 package-lock.json`));
            const dirNewPath = path.join(cwd, dirNewName);
            if (yield this.fs.pathExists(dirNewPath)) {
                yield this.renamePkgLockFile(dirNewPath);
            }
        }).bind(this)));
    }
    chmodExecPermissions(cwd){
        return Promise.all(this.DIR_NAMES_INSTALLED.map(this.co.wrap(function *(dirOldName){
            const dirNewName = `${this.data.destDirName}-${dirOldName}`;
            this.logger.log(this.chalk.green(`【进度】给子工程目录 ${dirNewName} 内的 nonce-generator-*** 与 mxtunnelclient 授予执行权限`));
            const dirNewPath = path.join(cwd, dirNewName);
            if (yield this.fs.pathExists(dirNewPath)) {
                yield this.chmodExecPermission(dirNewPath);
            }
        }).bind(this)));
    }
    multiInstallDeps(cwd){
        return Promise.all(this.DIR_NAMES_INSTALLED.map(this.co.wrap(function *(dirOldName){
            const dirNewName = `${this.data.destDirName}-${dirOldName}`;
            this.logger.log(this.chalk.green(`【进度】安装依赖给 子工程 ${dirNewName}`));
            const dirNewPath = path.join(cwd, dirNewName);
            if (yield this.fs.pathExists(dirNewPath)) {
                yield this.singleInstallDeps(dirNewPath);
            }
        }).bind(this)));
    }
    //
    transportFiles(cwd, srcDirName){
        const that = this;
        const MOVE_CONF = {overwrite: true};
        const moveFiles = this.co.wrap(function *(srcPath, destPath, excludes){
            let fileNames = yield that.fs.readdir(srcPath);
            if (excludes) {
                fileNames = fileNames.filter(fileName => !~excludes.indexOf(fileName));
            }
            fileNames = fileNames.map(fileName =>
                that.fs.move(path.join(srcPath, fileName), path.join(destPath, fileName), MOVE_CONF));
            yield Promise.all(fileNames);
        });
        return this.co(function *(){
            that.logger.log(this.chalk.green('【进度】工程目录提升'));
            const srcPath = path.join(cwd, srcDirName);
            yield moveFiles(srcPath, cwd, ['.vscode']);
            yield moveFiles(path.join(srcPath, '.vscode'), path.join(cwd, '.vscode'));
            yield that.fs.remove(srcPath);
            yield that.mergeVSCodeConfFile(cwd);
        });
    }
    removeVSCodeConfFile(cwd){
        this.logger.log(this.chalk.green('【进度】移除VSCode工程组配置文件'));
        return this.fs.remove(path.join(cwd, '.vscode/vue_scaffold.code-workspace'));
    }
    renamePkgLockFile(cwd){
        this.logger.log(this.chalk.green('【进度】重命名 package-lock.json 文件'));
        return this.co(function *(){
            const fileNames = yield this.fs.readdir(cwd);
            const fileName = fileNames.find(name => /package-lock_.+\.json/.test(name));
            if (fileName) {
                const oldName = path.join(cwd, fileName);
                const newName = path.join(cwd, 'package-lock.json');
                yield this.fs.rename(oldName, newName);
            }
        });
    }
    renameDefTypeFile(cwd, fileName){
        this.logger.log(this.chalk.green('【进度】重命名 types/_stand-ins_.d.ts 文件'));
        return this.co(function *(){
            const dTsFile = path.join(cwd, 'types/_stand-ins_.d.ts');
            if (yield this.fs.pathExists(dTsFile)) {
                const dTsFile2 = path.join(cwd, 'types', `${fileName}.d.ts`);
                yield this.fs.move(dTsFile, dTsFile2, {overwrite: true});
            }
        });
    }
    chmodExecPermission(cwd){
        this.logger.log(this.chalk.green('【进度】给 nonce-generator-*** 与 mxtunnelclient 授予执行权限'));
        return this.co(function *(){
            let exeFileName1 = 'nonce-generator-';
            let exeFileName2 = 'mxtunnelclient';
            switch (process.platform) {
            case 'darwin':
                exeFileName1 += 'macos';
                break;
            case 'win32':
                exeFileName1 += 'win.exe';
                exeFileName2 += '.exe';
                break;
            default:
                exeFileName1 += 'linux';
                break;
            }
            exeFileName1 = path.join(cwd, 'build', exeFileName1);
            exeFileName2 = path.join(cwd, 'build', exeFileName2);
            yield Promise.all([
                this.fs.chmod(exeFileName1, 700),
                this.fs.chmod(exeFileName2, 700)
            ]);
        });
    }
    singleInstallDeps(cwd){
        this.logger.log(this.chalk.green('【进度】安装依赖'));
        const retryCount = 4;
        let retryIndex = 0;
        const install = () => runCommand('npm', [
            'i',
            '--prefer-offline',
            '--registry=http://npm.dehuinet.com:8100'
        ], {
            cwd,
            env: {
                ...process.env,
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
        }).then(exit => {
            if (exit !== 0) {
                if (retryIndex++ < retryCount) {
                    this.logger.log(this.chalk.yellow('【警告】依赖安装失败，半秒后自动重试！'));
                    return new Promise(resolve => setTimeout(resolve, 500)).then(install);
                }
                this.logger.log(this.chalk.red('【错误】依赖安装失败！'));
                return Promise.reject(new Error('依赖安装失败'));
            }
            return null;
        });
        return install();
    }
    //
    buildMessage(){
        const msg = ['【完成】欢迎使用敏行VUE脚手架', ''];
        if (!this.data.installDepsImmediate) {
            msg.push('为了立即开始编程，请依次执行以下命令：', '');
            const padLeft = ' '.repeat(10);
            this.DIR_NAMES_INSTALLED.forEach(dirName => {
                if (!this.data.inPlace) {
                    if (this.INSTALL_COUNT > 1) {
                        msg.push(`${padLeft}cd ${this.data.destDirName}/${dirName}`);
                    } else {
                        msg.push(`${padLeft}cd ${this.data.destDirName}`);
                    }
                }
                msg.push(`${padLeft}minxing i`, `${padLeft}npm run dev`, '');
            });
        }
        const padLeft = ' '.repeat(3);
        let index = 1;
        msg.push(
            `${index++}. 【Jenkins】构建脚本是工程根目录下的【jenkins.build.sh】文件。`,
            `${padLeft}在【Jenkins】构建切签下的【shell编辑器】内直接录入 \${WORKSPACE}/jenkins.build.sh 即可。`
        );
        msg.push(`${index++}. 推荐 ${this.chalk.red('node 版本')} 是 ${this.chalk.red('10.17.0')}`);
        return msg.join('\n');
    }
};
