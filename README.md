# 《审批》与《信采》Vue脚手架 _a

脚手架集成技术栈包括：

1. Webpack 4
    1. 【单页】与【多页】构建配置
2. Babel 7
3. ESLint
    1. Vue-ESLint
    2. 【敏行】ESLint规则集。
    3. compat 浏览器兼容性检查
4. Stylelint
5. Typescript JS Checking
    1. 默认：关闭。
    2. 开启：需要在`js`文件顶行添加`//@ts-check`注释
6. 基于`browserlist`的浏览器兼容性检查通用规则配置。
7. webpack-dev-server
    1. 代理远程登录、Token注入 与 会话保存
    2. 可编程配置的本地 Mock Server。
8. 最后，相对于拥有图形界面的`vue-cli3`。此【敏行】版本有以下特点：
    1. 兼容`Jenkins`的**node v7.1.0**打包环境。而`vue-cli3`的黑科技至少需要**node v8.9+**的环境支持。
    2. 开放配置细节 与 提供完整注释。不像`vue-cli3`把配置细节隐藏在`node_modules`依赖包里，拒绝脚手架的使用者学习与提高。`vue-cli【敏行】版`开放配置细节，并符以详细的注释，创造条件与脚手架的使用者相互促进共同提高。**了解现代前端程序打包编译细节是优秀前端开发的重要加分项。**
    3. 符合敏行前端开发习惯。即，将【桌面浏览器 Web App 工程】与【移动端-敏行-WebView Web App 工程】打包成一个 VSCode 工程组，集中配置、集中管理。避免敏行前端开发者在运行资源有限的笔记本电脑上同时打开两个甚至更多个 VSCode 实例。
    4. 在前端运行日志内，默认添加了【Git Tag/Branch】值与【打包时间】。这样使判断“新包是否被成功更新？”更加地容易。只要看一眼运行时日志，前端开发者就能立即回复测试/现场：“你们的包更新失败了。这个程序是还是某某老版本”。
    5. 借助脚手架的“交互式”安装过程，轻松开启“多页”模式。相反，`vue-cli3`到目前为止，还仅只支持纯【单页】开发模式。这一点对需求复杂的敏行前端App的适应性明显不足。
    6. 提供【Vue 组件开发】脚手架。`vue-cli【敏行】版`提供的工程模板三件套包括：
       1. 桌面浏览器 Web App 脚手架；
       2. 移动端 敏行WebView Web App 脚手架；集成了
          1. 【生成 敏行H5插件的 webpack模块】
          2. 【敏行 JS API 的Promise封装模块】（自动日志记录每一个 敏行 JS API 的调用延时）
          3. 响应式 窗口自适应 模块`px2rem`。
       3. Vue 组件开发 脚手架。`npm run build`直接输出`umd`格式的模块文件（同时适用于传统<script>标签与各种打包器导入）。

## 没有重新造轮子，仅只是插件增强。技术浅显，操作简单，人人可为。 _b

## 故事的起源 _c

之所以能够从《审批》与《信采》项目中寻找到足够多的共同点并抽离出《准VUE脚手架》。主要是源于两个主要原因：

1. 《审批》与《信采》都是基于`VUE-CLI`脚手架来构建与开发的。
2. 《审批》与《信采》同出一位牛人（前敏行H5大牛：时冬冬）之手。而我仅只是《审批》与《信采》代码的第四任开发者。

第一个因素确定了《审批》与《信采》项目的技术主旋律。而第二个因素确保了这两个项目在技术思路上是“递进”关系，至少不是“矛盾”关系。于是，才有了我今天向大家介绍的《审批/信采 Vue 脚手架》。

## 不是重新造轮子，那继承了什么？ _d

继承了《[vue-webpack-boilerplate](https://github.com/vuejs-templates/webpack)》的全部内容－从目录结构，到热重载，从单元测试与E2E端对端集成测试，再到CSS抽取－几乎一切的一切都被保留了下来。噢！对了，在webpack构建过程中默认开启的《ESLint检查》与《强制Linter失败》被关闭了（但是，下文会提到，另一款更优雅的VSCode集成替代方案被引入）。简而言之，《审批/信采 Vue 脚手架》的主体结构 与 你从 git-bash 命令行执行 `$ vue init webpack <project-name>` 生成的工程模板是基本一样的。所以，**并不会给大家带来额外的学习成本**。

## 插件增强，那增强了何处？ _e

提纲携领，有以下这些：

1. webpack dev server－为每一个 Ajax 请求注入SSO Token。无论你的Ajax请求指向的是 dev8，t0，还是 t1，你都可以 自动登录（环境变量预配置的）账号，并将该账号的 sso token 注入到 H5 应用程序发送的每一个 Ajax 请求头内（在《信采》是`mx_sso_token`；在《审批》则是`mxsptoken`）。因为是插件增强，所以即使你正在使用其它的《Vue脚手架》也能够 standalone 地集成此webpack插件，外加一点配置。
    * 安装：npm i [webpack-dev-server-ssoproxy](https://git.dehuinet.com/zhanghy/webpack-dev-server-ssoproxy/tree/master#webpack-dev-server-ssoproxy) --save-dev
2. 借助命令行《单选交互》（如果使用过vue-cli，你应该对此不陌生），避免你每次运行 `npm run dev/build/test` 命令前都重复性地修改webpack配置文件（这是一个非常易错的过程）。比如，
    1. 就启动 webpack-dev-server 时，你可以现场决定：
        * 连接哪台后端服务器 dev8，t0，t1
        * 自动登录哪个《敏行账号：t71, t73, t83》来获取 SSO Token
    2. 就编译输出build时，你也可以仅只通过敲击键盘上的 Up 与 Down 键来决定：
        * 网页使用哪个 favicon.ico 网页图标文件？是 ![敏行](https://git.dehuinet.com/zhanghy/vue-scaffold/raw/iview_vux_vue-cli_1.0.0/images/%E6%95%8F%E8%A1%8C.ico)，还是 ![建行－龙信](https://git.dehuinet.com/zhanghy/vue-scaffold/raw/iview_vux_vue-cli_1.0.0/images/%E5%BB%BA%E8%A1%8C_%E9%BE%99%E4%BF%A1.ico)？
        * VUE 编译结果 是被 输出到 当前工程内的 dist 目录下，还是直接被输出到 java web server 工程的《静态资源文件》的目录下（即，`${java_web_project_root}/src/main/resources/static`文件夹）。当然，这需要你事先和 @屈洪彬 获得 Server Git 的读写权限。然后，克隆 java web 代码到本地才行。否则，你就需要把 编译好的《H5程序》打成一个 zip 文件，再通过《敏行通讯》发送给server端的开发者。最后，由他们更新或添加到 server git 上。《信采》与《审批》最早是这么做的，佬麻烦了。
    3. 额外值得一提的是，此被增强了的《单选交互》相较之它的`vue-cli`版本有一个重要的创新，就是**交互等待超时**。也就是说，如果`npm script`指令是从`CI 持续集成平台`启动执行的话，工程构建过程并不会永久地阻塞在《单选交互问题》上，而是会在等待超时后，自动选择预设的默认项，然后继续运行构建程序。即，它是支持无人介入持续集成的。
    4. 因为是插件增强，所以即使你正在使用其它的《Vue脚手架》也能够 standalone 地集成此webpack插件，外加一点配置。
        * npm i [fancy-cli-prompts](https://git.dehuinet.com/zhanghy/fancy-cli-prompts/tree/master#fancy-cli-prompts) --save-dev
    5. ![选择中...](https://git.dehuinet.com/zhanghy/vue-scaffold/raw/iview_vux_vue-cli_1.0.0/images/fancy-cli-prompts-%E9%80%89%E6%8B%A9%E4%B8%AD.png)
    6. ![选择后...](https://git.dehuinet.com/zhanghy/vue-scaffold/raw/iview_vux_vue-cli_1.0.0/images/fancy-cli-prompts-%E9%80%89%E6%8B%A9%E5%90%8E.png)
3. 专门针对《 VUE 组件文件》完善了 ESLint 配置与规则；并将 ESLint 与 VSCode 集成开发环境 做了 深度关联。
    1. 就前者，使用了[vue-eslint-parser](https://github.com/mysticatea/vue-eslint-parser)和[babel-eslint](https://github.com/babel/babel-eslint)，并开启了[eslint-import-resolver-webpack](https://github.com/benmosher/eslint-plugin-import)
        1. vue-eslint-parser + babel-eslint 静态扫描/检查 .vue 文件中
            * `<script>`标签内的`JS`程序
            * `<template>`标签内的 VUE动态绑定表达式中的`JS`代码。
        2. eslint-import-resolver-webpack 编译时校对 程序员 是否 在当前ES 6模块内 导入了
            * 不存在的 js 或 vue 组件文件。（一般是文件名编写错误）
            * 不存在的导出变量/函数。
        3. 因为是插件增强，所以即使你正在使用其它的《Vue脚手架》也能够 standalone 地集成此ESLint配置插件。
            * npm i [eslint-config-minxing](https://github.com/stuartZhang/eslint-config-minxing) --save-dev
    2. 另一方面，在《审批/信采 Vue 脚手架》内打包的`.vscode`配置文件夹 完成了 ESLint 与 VSCode IDE 的关联。与集成开发环境的关联带来的福利包括：
        1. 代码编辑器 内联 高亮显示：
            * 未定义的变量/函数，
            * 在产品代码里不应该出现的 debugger 指令，
            * 不附和团队编码约定的代码片段，
            * 复杂度过高而应该被拆分的大函数，
            * 已经不再被推荐使用的 ES 3 甚至 ES 5 语法（例如，`for...in obj`就应该被`for...of Object.entries(obj)` 来代替；`String.prototype.charAt()`应该被支持`Unicode`的`String.prototype.at()`代替，等等）。
        2. 每当保存vue文件时，自动纠错JS代码段－这绝对是懒人专贡。比如，
            * 把 字符串 加号 拼接 变换成 字符串模板，
            * 根据 ESLint 规则自动补加语句结尾处的分号或是去掉分号，
            * 去掉多余的空格与空行等等。
4. 专门针对《*.vue文件》的StyleLint配置，并将 StyleLint 与 VSCode 集成开发环境 做了关联。
    1. 被定制后的 StyleLint 即能够 检查
        * VUE组件文件中`<style>`标签内的CSS代码，
        * 而且对 常规`.css/scss/less`文件也起作用。
    2. 因为是插件增强，所以即使你正在使用其它的《Vue脚手架》也能够 standalone 地集成此 StyleLint 配置插件。
        * npm i [stylelint-config-amo](https://git.dehuinet.com/zhanghy/stylelint-config-amo/tree/master#stylelint-config-amo) --save-dev
    3. 另一方面，通过关联`VSCode IDE`，代码编辑器也能够高亮提示违反`StyleLint`规则的CSS代码片段。但是，因为`VSCode-StyleLint`自身的bug，类似于VSCode ESLint的自动纠错功能还是没有的。

> 在上面提到的四个插件增强中，其实，每一项单独拿出来都能做为一次诚意满满的干货分享与技术沙龙讨论主题。但这次，我将简单介绍一下webpack-dev-server-ssoproxy。

## 目录结构－审批/信采 Vue 脚手架 _f

这款脚手架是一个VSCode工程组（，而不是单个的万金油工程模板）。以工程组内每一个特定工程分别来适配《PC管理端后台》与《敏行手机移动端 和 桌面客户端》。没错，基于响应式布局，《桌面客户端》与《手机移动端》是共享同一套代码。至少鉴于《审批》与《信采》的业务需要，这是完全正确的。

### 《审批/信采 Vue 脚手架》的目录结构： _g

```bash
|--- 工程组 根目录
    |--- 《审批/信采 Vue 脚手架》工程组 根目录
        |--- .vscode 工程组配置文件
        |--- admin   PC管理端后台工程，工程内部的目录结构与vue-webpack-boilerplate完全相同
        |--- app     敏行手机移动端和桌面客户端，工程内部的目录结构与vue-webpack-boilerplate完全相同
    |--- JAVA WEB SERVER 工程 目录
        |--- static  前端VUE工程被编译后的输出结果 会被 保存在这个目录下，并且被 git commit 到 server 团队的git分支上。最终成为server bundle的一部分。所以，我们需要server git的写权限。
```

## 其它增强配置项 _h

### 通用配置 _i

1. VUEX
2. Vue-Router （即将到来[vue-scroll-behavior](https://github.com/jeneser/vue-scroll-behavior)记忆滚动位置）
3. Babel ES 7 异步ES 6模块加载
4. 网页图标：在Webpack中，配置 `HtmlWebpackPlugin` 添加网页的 favicon.ico 文件。
5. Bundle时间戳：在Webpack中，配置 `DefinePlugin` 打印《git分支名》与《bundle更新日期》到 网页的 Console 中。
    * ![bundle更新日期](https://git.dehuinet.com/zhanghy/vue-scaffold/raw/iview_vux_vue-cli_1.0.0/images/bundle%E6%97%B6%E9%97%B4%E6%88%B3.png)
6. 收拢 会随项目不同而变化的Webpack配置项到全局常量定义内，包括
    1. BUILD_ASSETS_SUB_DIRECTORY
        1. Bundle内的资源子目录名。除了入口HTML文件外，其余的js img css都分在这里。
        2. JS img CSS 等静态资源 URL：
            * http://`host`:`port`/`BUILD_ASSETS_PUBLIC_ROOT`/`BUILD_ASSETS_SUB_DIRECTORY`/js
            * http://`host`:`port`/`BUILD_ASSETS_PUBLIC_ROOT`/`BUILD_ASSETS_SUB_DIRECTORY`/img
            * http://`host`:`port`/`BUILD_ASSETS_PUBLIC_ROOT`/`BUILD_ASSETS_SUB_DIRECTORY`/css
    2. BUILD_ASSETS_PUBLIC_ROOT	在web server上，代表了当前 webapp 的 server path。
    3. ![BUILD_ASSETS_SUB_DIRECTORY和BUILD_ASSETS_PUBLIC_ROOT](https://git.dehuinet.com/zhanghy/vue-scaffold/raw/iview_vux_vue-cli_1.0.0/images/webpack%E9%85%8D%E7%BD%AE%E9%A1%B91.png)

### PC管理端后台工程(admin) _g

1. [iView](https://www.iviewui.com/overview/)与[Webpack iView-Loader](https://github.com/iview/iview-loader)，主要是因为《信采》项目内，使用了 iVew 与 VUE 版的 JSX。
2. 即将到来[Element-UI](https://www.iviewui.com/overview/)。我计划在《审批》内，使用《Element UI组件库》来代替《AmazeUI CSS框架》进行重构。

### 敏行手机移动端和桌面客户端（app） _k

1. [Vant](https://youzan.github.io/vant/?source=vuejsorg#/zh-CN/intro)、主题定制、按需加载
2. 预封装《敏行移动API》从 回调函数接口 为 Promise A+ 接口。
3. 预置模块导出变量，标记 当前平台是《敏行移动端》，《桌面客户端》，还是《WEB Client》
4. 预配置[debug](https://github.com/visionmedia/debug)模块管理 应用程序日志。

## 封装成一个`vue-cli`工程模板 并且 与`vue-cli`集成 _l

### 使用`vue-cli`命令行工具与`vue-scaffold`模板初始化你的`VUE`工程 _m

`vue init gitlab:git.dehuinet.com:zhanghy/vue-scaffold#webpack4_babel7_vuecli2_1.0 <my project> --clone`

参考：

1. 如何制作第三方VUE工程模板？[vue-cli](https://github.com/vuejs/vue-cli/tree/master#custom-templates)
2. 如何在CLI中指定第三方工程模板？[download-git-repo](https://github.com/flipxfx/download-git-repo)

## 分支状态描述 _n

在此`VUE CLI`脚手架模板集中，共有三套`VUE Webpack`模板可做到“开箱即用”。

|    名称         | 目录           |
|:--------------|:-----------------|
|中后台管理客户端|template/admin    |
|移动与PC客户端  |template/app      |
|组件与模块开发  |template/component|

### 脚手架安装策略

#### 多个脚手架共同安装作为一个`VSCode`工程组

在`VSCode`工程组内，所有单个`VSCode`工程内的通用配置项都会从**每个工程**目录的`.vscode/settings.json`文件中抽离出来，合并入`VSCode`**工程组**的配置文件`.vscode/vue_scaffold.code-workspace`中。

#### 仅安装一个`VSCode`工程

Upcoming

### 中后台管理客户端 _o