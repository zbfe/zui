# dialog2/dialog

> fe.xiaowu

弹出层基类，主要完成弹出的动画、事件处理、按钮、遮罩，注意点击遮罩层不能关闭

### use

```js
require([
    'dialog2/dialog'
], function (Dialog) {
    var options = {};
    new Dialog(options);
});
```

### events

* show - 显示弹出层
* button:id - 按钮点击事件
* close - 弹出层关闭（销毁dom）后事件
* destroy - 提示层销毁后事件

### api - options

```js
/**
 * @param {boolean|Funciton} [options.ok=null] 确认按钮回调，如果为true则只显示按钮
 * @param {boolean|Funciton} [options.cancel=null] 取消按钮回调，如果为true则只显示按钮
 * @param {string} [options.okValue=确定] 确认按钮显示文字
 * @param {string} [options.cancelValue=确定] 取消按钮显示文字
 * @param {string=} options.title 显示标题，如果为空则不显示
 * @param {string} options.content 内容html代码
 * @param {Array=} options.button 按钮组数据
 * @param {string=} options.button[].id 按钮id,添加id可用来外部绑定事件，如：`on('button:id', fn);`
 * @param {string} options.button[].value 按钮显示文字
 * @param {Function=} options.button[].callback 按钮点击时回调
 * @param {string=} options.className 弹出层wrap元素的样式名
 * @param {number} [options.time=null] 是否倒计时关闭，单位毫秒
 * @param {boolean} [options.verticalButtons=false] 按钮组是否垂直对齐
 * @param {number} [options.duration=200] 显示、关闭动画时长，单位毫秒
 * @param {boolean} [options.lock=true] 是否显示遮罩层
 */
```

### example

#### 简单

```runjs
require(['dialog2/dialog'], function (Dialog) {
    new Dialog({
        content: '测试的了',
        time: 1000
    });
});
```

#### 事件

```runjs
require(['dialog2/dialog'], function (Base) {
    var app = new Base({
        content: '测试的了',
        button: [
            {
                id: 1,
                value: '测试',
                callback: function () {
                    console.log('options.button.callback');
                }
            }
        ]
    });

    app.on('cancel', function () {
        console.log('cancel');
    }).on('close', function () {
        console.log('close');
    }).on('destroy', function () {
        console.log('destroy');
    }).on('button:1', function () {
        console.log('on button:1');
    });
});
```