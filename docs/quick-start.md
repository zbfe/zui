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

## 目录规范

模块应该具有以下目录：

```
# 模块目录
src/[module]/

# 模块js
src/[module]/index.js

# 看情况是否需要css，如果需要则在index.js里require该css文件
src/[module]/index.css

# 模块的文档
src/[module]/README.md

# 模块index.js的测试用例
test/[module]/index.js
```

### index.js

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

## 测试用例

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

## 文档

todo