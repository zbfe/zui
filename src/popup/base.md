# popup/base

> fe.xiaowu

基类，主要完成弹出的动画、关闭事件和遮罩

### use

```js
require([
    'popup/base'
], function (Base) {
    var options = {};
    new Base(options);
});
```

### events

* cancel - 点击遮罩层取消事件
* close - 弹出层关闭（销毁dom）后事件
* destroy - 提示层销毁后事件

### api - options

```js
/**
 * @param {string} options.content 内容
 * @param {string} options.className 自定义样式
 */
```

### example

#### 简单

```runjs
require(['popup/base'], function (Base) {
    new Base({
        content: '测试的了'
    });
});
```

#### 事件

```runjs
require(['popup/base'], function (Base) {
    var app = new Base({
        content: '测试的了'
    });

    app.on('cancel', function () {
        console.log('cancel');
    }).on('close', function () {
        console.log('close');
    }).on('destroy', function () {
        console.log('destroy');
    });
});
```