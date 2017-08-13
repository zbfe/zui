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
 * @param {number} [options.duration=200] 动画时间
 * @param {number|string} options.height 弹出层高度
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

    app.on('show', function () {
        console.log('show');
    }).on('cancel', function () {
        console.log('cancel');
    }).on('close', function () {
        console.log('close');
    }).on('destroy', function () {
        console.log('destroy');
    });
});
```

#### 弹一个全屏的层

```runjs
require(['popup/base'], function (Base) {
    // 判断是否有样式，为了模拟className
    if (!$('#css-popup-base-test').length) {
        $('<style id="css-popup-base-test">.popup-base-test{height:100%;background-color:#fff;color:#09f;font-size:20px;}</style>').appendTo('head');
    }

    var app = new Base({
        duration: 300,
        className: 'popup-base-test',
        content: '说真的，我就是个fe，点击关闭吧'
    }).on('show', function () {
        this.$wrap.find('.popup-base-test').on('click', function () {
            app.close();
        });
    });
});
```