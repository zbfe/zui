# zui

Mobile ui library created by zbfe

> 只是玩玩，别当真～

[![code style fecs](https://img.shields.io/badge/code%20style-fecs-brightgreen.svg)](https://github.com/ecomfe/fecs)
[![Build Status](https://travis-ci.org/zbfe/zui.svg?branch=master)](https://travis-ci.org/zbfe/zui)
[![Test Coverage](https://img.shields.io/coveralls/zbfe/zui/master.svg)](https://coveralls.io/r/zbfe/zui)
[![DevDependencies](https://img.shields.io/david/dev/zbfe/zui.svg?style=flat)](https://david-dm.org/zbfe/zui#info=devDependencies)

## specification

* [目录规范](docs/dir-style.md)
* [js代码规范](docs/js-style.md)
* [css代码规范](docs/css-style.md)

## demo

* [tips](src/tips/README.md)
    * [tips/index](src/tips/README.md#tips/index)
    * [tips/loading](src/tips/README.md#tips/loading)
* [popup](src/popup/README.md)
    * [popup/base](src/popup/README.md#popup/base)
    * [popup/select](src/popup/README.md#popup/select)
    * popup/multiple
    * popup/radio
* dialog
    * dialog/base
    * dialog/alert
    * dialog/confirm
    * dialog/iframe

## develop

```shell
# 克隆项目
git clone https://github.com/zbfe/zui.git && cd zui

# 安装依赖
npm install

# 安装push前检查代码勾子
npm run hook-install

# 本地开启web server查看、开发
npm start
```

## test

> [测试Case](test/index.html)

基于BDD, 使用 [jasmine](https://jasmine.github.io/) 测试, 使用 [phantomjs](http://phantomjs.org/)(请提前下载以防npm安装缓慢) 并基于 [karma](https://karma-runner.github.io/) 测试～

```shell
# 运行测试
npm run test

# 运行测试覆盖率
npm run test-cov

# 运行代码检查
npm run check
```