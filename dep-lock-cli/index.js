#!/usr/bin/env node
const inquirer = require('inquirer');
const co = require('co');

co(function *(){
    const {'select-install-dirs': installDirs} = yield inquirer.prompt([{
        name: 'select-install-dirs',
        type: 'checkbox',
        message: '请选择 子工程',
        required: true,
        choices: [new inquirer.Separator(' = 移动端 = '), {
            name: '移动端 + Vant库',
            short: 'Mobile + Vant',
            value: 'app_1',
            checked: true
        }, {
            name: '移动端 + 无UI库',
            short: 'Mobile + none',
            value: 'app_2',
            checked: true
        }]
    }]);
    yield Promise.all(installDirs.map(installDir => pkgGen(...INSTALL_DIR[installDir])));
});

require('./handlebar-helpers'); // 注册所有 helpers
const {pkgGen} = require('./engine');

const appDir = '../template/app/package';
const INSTALL_DIR = {
    /**
     *  app 脚手架依赖
     *  参数：
     *      destDirName  string
     *      name         string
     *      author       string
     *      appUiLib     string   vant
     *      flavor       boolean  true | false
     *      appWebWorker boolean  true | false
     *      appPrerender boolean  true | false
     *      appI18n      boolean  true | false
     *      imgCompress  boolean
     *      subprojects  object   {app: true}
     */
    app_1: [`${appDir}.json`, `${appDir}-lock_vant.json`, 'app_1', {
        name: 'placeholder_name',
        author: 'placeholder_author',
        destDirName: 'placeholder_destDirName',
        appUiLib: 'vant',
        flavor: true,
        appWebWorker: true,
        appPrerender: true,
        appI18n: true,
        imgCompress: true,
        subprojects: {
            app: true
        }
    }]
};
