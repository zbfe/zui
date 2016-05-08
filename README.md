# zui

Mobile ui library created by zbfe

[![code style fecs](https://img.shields.io/badge/code%20style-fecs-brightgreen.svg)](https://github.com/ecomfe/fecs)
[![Build Status](https://travis-ci.org/zbfe/zui.svg?branch=gh-pages)](https://travis-ci.org/zbfe/zui)
[![Test Coverage](https://img.shields.io/coveralls/zbfe/zui/gh-pages.svg)](https://coveralls.io/r/zbfe/zui)
[![DevDependencies](https://img.shields.io/david/dev/zbfe/zui.svg?style=flat)](https://david-dm.org/zbfe/zui#info=devDependencies)

## specification

* [目录规范](docs/dir-style.md)
* [js代码规范](docs/js-style.md#js)
* [css代码规范](docs/css-style.md)
* [测试maodian](#test)

## demo

todo

## develop

```shell
git clone https://github.com/zbfe/zui.git

cd zui

npm install

# 安装push前检查代码勾子
npm run hook-install
```

## test

BDD, Test case by [jasmine](https://jasmine.github.io/), test environment by [karma](https://karma-runner.github.io/)、[phantomjs](http://phantomjs.org/)(请提前下载以防npm安装缓慢)

```shell
# 运行测试
npm run test

# 运行测试覆盖率
npm run test-cov

# 运行代码检查
npm run check
```