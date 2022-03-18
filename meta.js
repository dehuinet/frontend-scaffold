const path = require('path');
const {runCommand, validatePortNumber} = require('./utils');
const {Runner} = require('./utils/Runner');
const camelCase = require('./utils/camelcase');
const Handlebars = _require_('handlebars');
module.exports = {
    prompts: {
        // 端口号
        appPort: {
            type: 'input',
            message: '请输入 移动端 webpack dev server 监听端口号',
            required: true,
            default: 9010,
            validate: validatePortNumber
        },
        // 是否立即给工程代码安装依赖
        installDepsImmediate: {
            type: 'confirm',
            message: '【是/否】是否立即给工程原型安装依赖？',
            default: true
        }
    },
    skipInterpolation: [
        'admin/build/mxtunnelclient',
        'admin/build/mxtunnelclient.exe',
        'app/build/mxtunnelclient',
        'app/build/mxtunnelclient.exe',
        'component/build/mxtunnelclient',
        'component/build/mxtunnelclient.exe'
    ],
    helpers: {
        kebab2camel(str, pascalCase){
            if (typeof str === 'string') {
                return camelCase(str, {pascalCase});
            }
            return str;
        },
        random(separator/* , options */){
            const random = Math.round(Math.random() * 100000);
            return new Handlebars.SafeString(`${separator}${random}`);
        },
        suffix(/* suffix, options */){
            return '';
        },
        nameFrom(author){
            if (typeof author === 'string') {
                const index = author.indexOf('<');
                if (~index) {
                    return author.substring(0, index).trim();
                }
            }
            return author;
        },
        replace(str, regExp, flag, replacement){
            str = Handlebars.escapeExpression(str);
            regExp = Handlebars.escapeExpression(regExp);
            replacement = Handlebars.escapeExpression(replacement);
            return new Handlebars.SafeString(str.replace(new RegExp(regExp, flag), replacement));
        },
        eq(v1, v2){
            return v1 === v2;
        },
        ne(v1, v2){
            return v1 !== v2;
        },
        lt(v1, v2){
            return v1 < v2;
        },
        gt(v1, v2){
            return v1 > v2;
        },
        lte(v1, v2){
            return v1 <= v2;
        },
        gte(v1, v2){
            return v1 >= v2;
        },
        and(...args){
            return Array.prototype.slice.call(args).every(Boolean);
        },
        or(...args){
            return Array.prototype.slice.call(args, 0, -1).some(Boolean);
        }
    },
    complete(data, {logger}){
        const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName);
        logger.log('【进度】安装脚手架依赖程序');
        runCommand('npm', ['install'], {cwd: __dirname}).then(() => {
            const runner = new Runner(data, logger);
            return runner.co(function *(){
                yield runner.printWelcomeMsg();
                if (runner.INSTALL_COUNT > 1) { // 同时安装 多个脚手架 模板。
                    yield runner.renameVSCodeConfFile(cwd, data.destDirName);
                    yield runner.renameSubDirs(cwd);
                    yield runner.renamePkgLockFiles(cwd);
                    if (data.installDepsImmediate) {
                        yield runner.multiInstallDeps(cwd);
                    }
                } else { // 仅安装了一个脚手架 模板。
                    yield runner.transportFiles(cwd, runner.DIR_NAMES_INSTALLED[0]);
                    yield runner.removeVSCodeConfFile(cwd);
                    yield runner.renamePkgLockFile(cwd);
                    if (data.installDepsImmediate) {
                        yield runner.singleInstallDeps(cwd);
                    }
                }
                logger.log(runner.chalk.blue(runner.buildMessage()));
            });
        });
    }
};
function _require_(moduleName){
    const modulePaths = module.parent.paths.map(dirPath => path.join(dirPath, moduleName));
    for (let i = 0; i < modulePaths.length; i++) {
        try {
            return require(modulePaths[i]);
        } catch (error) {
            continue;
        }
    }
    throw new Error(`不能找到模块 ${moduleName} 分别在目录 ${modulePaths.join('; ')} 中。`);
}
