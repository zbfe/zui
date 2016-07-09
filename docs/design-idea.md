# 设计思想

* 专注移动端的组件
* 以`zepto`+`requirejs`开发
* 完整的测试用例
* 友好的`api`
* 所有回调使用事件监听
* `jsdoc`生成文档

## 目录

以`src/`为源代码，以`src/[module]/`为模块目录，目录里包括该模块使用的`js`、`css`和`README.md`文档，以`test/[module]/`为该模块的测试目录，如：

```
# 浮层基类js
src/popup/base.js

# 浮层基类css
src/popup/base.css

# 浮层扩展选择窗口js
src/popup/select.js

# 浮层扩展选择窗口css
src/popup/select.css

# 浮层的文档说明，包括接口和例子
src/popup/README.md

# 浮层基类测试用例
test/popup/base.js

# 浮层扩展选择窗口测试用例
test/popup/select.js
```

## js加载方式

使用`requirejs`加载（当前版本为`2.2.0`），以`src/`为`baseUrl`，如：

```html
<!-- html页面中引用加载器和配置文件 -->
<script src="lib/requirejs/require.js"></script>
<script src="lib/requirejs/config.js"></script>

<!-- 加载 -->
<script>
    require([
        'tips/index',
        'popup/base'
    ], function (Tips, Popup) {
        // callback
    });
</script>
```

## css样式

* 模块要独立
* 不依赖`reset`样式
* 必须以`.zui-`为前缀

## requirejs里css、tpl、text的加载

添加了`requirejs`的`css`、`text`、`tpl`插件支持，使用如：

```
define(function (require) {
    'use strict';
    // 加载样式
    require('css!./base.css');

    // 加载text文本
    var text = require('text!./base.text');
});
```

> 后续打包时会单独把该方式处理成同步的

## 模块的测试

每个模块必须有完整的测试用例，目录在：`test/[module]/`下对应你的模块的文件名

测试使用 [jasmine2.4.1](https://jasmine.github.io/) 编写用例，使用 [phantomjs](http://phantomjs.org/) 基于 [karma](https://karma-runner.github.io/) 进行`node`端测试

## 注意

* 不能依赖重置样式
* 所有模块代码必须通过 [fecs](http://fecs.baidu.com) 检查

## todo

1. 代码打包成`dist/zui.js`，并压缩、混淆，考虑到`css`、`tpl`的处理
1. 自动抽离`src/[module]/README.md`文档内的`##, ###`到`README.md`里的文档内生成demo路径
