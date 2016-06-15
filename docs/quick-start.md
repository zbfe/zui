# 如何开发一个模块

## 下载项目

```shell
# 克隆项目
git clone https://github.com/zbfe/zui.git && cd zui
```

## 安装phantomjs

> 由于`npm`安装的`phantomjs`很慢，推荐使用该方法安装

去 [phantomjs/download](http://phantomjs.org/download.html) 下载最新的版本，并放到电脑的可执行目录，并添加执行权限，如mac的可放到`~/bin/`

## 安装npm依赖

```shell
npm install
```

## 运行命令

```shell
# 本地开启http-server来预览
npm start

# 运行测试
npm test

# 以watch方式运行测试
npm run test-watch

# 运行代码覆盖率测试
npm run test-cov

# 运行fecs检查代码
npm run check

# 运行jsdoc编译文档，后续push时自动编译
npm run build-doc
```

然而在写模块测试用例时发现，把所有的测试文件都`watch`了效率太低，可以在测试命令里添加`--test=files`参数来指定只测试哪些文件，如：

```shell
# 只监听 test/zui.js
npm run test-watch -- --test=zui.js

# 监听 test/dialog/*.js，\*是为了命令行里运行转义
npm run test-watch -- --test=dialog/\*.js
```

## 目录规范

[设计思想](docs/design-idea.md#目录)

### css

`src/[module]/index.css`:

```css
/**
 * @file 模块名称
 * @author 作者信息
 */

以.zui-开头
.zui-* {
    
}
```

### js

`src/[module]/index.js`:

```js
/**
 * @file 模块描述
 * @author 作者信息
 */

define(function (require) {
    'use strict';

    // zepto引用
    var $ = require('zepto');

    // 按需引用css
    require('css!./index.css');
});
```

`src/[module]/index.js`: 依赖`zui`基类

```js
/**
 * @file 模块描述
 * @author 作者信息
 */

define(function (require) {
    'use strict';

    // zepto引用
    var $ = require('zepto');

    var Zui = require('zui');

    // 按需引用css
    require('css!./index.css');

    var Dialog = Zui.extend({
        constructor: function () {
            Dialog.super.constructor.call(this);
        }
    });

    return Dialog;
});
```

### 测试用例

`test/[module]/index.js`:

```js
/**
 * @file 模块测试名称
 * @author 作者信息
 */
define([
    这里是模块uri
], function (Base, $) {
    'use strict';

    describe(这里是模块的uri, function () {
        it('todo', function () {
        });
    });
});
```

测试用例`api`请看： [https://jasmine.github.io/2.4/introduction.html](https://jasmine.github.io/2.4/introduction.html)

### 文档

所有文档里链接其他文档都是以根目录为`baseurl`，如：`src/a/a.md`里链接`src/b/b/d.md`则写成：`[xxx](src/b/b/d.md#我是锚点)`，文档路径如：`src/[module]/[uri].md`，`[uri]`可以是`README`或者`base`等，内容如：

    # 模块名称

    > 作者信息

    模块介绍

    ## 模块一的uri

    描述

    ### use

    ```js
    使用说明
    ```

    ### api - options

    ```js
    api介绍
    ```

    ### example

    #### 例子1

    ```runjs
    可运行代码，这里的代码将可直接在浏览器打开
    并且会在该代码之后添加可执行按钮～
    自动的哦～
    ```

    #### 例子2

    ```runjs
    可运行代码，这里的代码将可直接在浏览器打开
    并且会在该代码之后添加可执行按钮～
    自动的哦～
    ```

参考：[tips/README.md](src/tips/README.md)