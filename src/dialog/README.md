# Dialog

> schoeu1110

弹窗基类

## Dialog/base

基类，主要完成对话框的动画、关闭事件和遮罩

### use

```js
require([
    'popup/base'
], function (Base) {
    var options = {};
    new Base(options);
});
```

### api - options

```js
/**
 * @param {Object} options 配置对象
 * @param {boolean} options.horizontal 按钮排列方向,默认为横向
 * @param {Function} options.hideCallback 隐藏回调
 * @param {Function} options.showCallback 显示回调
 * @param {Function} options.destroyCallback 销毁实例回调
 * @param {number} options.aniTime 动画时间
 * @param {string} options.content Dialog正文内容
 * @param {string} options.title 弹窗标题
 * @param {Array} options.buttons 按钮信息数据
 */
```

### example

#### 简单

```runjs
require([
    'dialog/base'
], function (Dialog) {
    var options = {
        content: '我是真的内容~',
        buttons:[{
            text:'OK',
            callback: function (i) {
                console.log(i);
            }
        },{
            text:'CANCLE',
            callback: function (i) {
                console.log(i);
            }
        }]
    };

    var dialog = new Dialog(options);

    dialog.on('show', function(){
        alert('显示~');
    }).on('hide', function () {
        alert('隐藏~');
    });

    dialog.show();
});
```

## dialog/alert

在`popup/base`上扩展的一个提示框

### use

```js
require([
    'dialog/alert'
], function (alert) {
    var a = new Dialog({
        content: '这是alert!'
    });
    a.show();
});
```

### api - options

```js
/**
 * @param {Object} options 配置对象
 */
```

### example

需要注意的是`onCancel`是在点击菜单中的“取消”也会执行

```runjs
require([
    'dialog/alert'
], function (Alert) {
    var options = {
        content: '我是alert内容~',

    };
    var a = new Alert(options);
    a.show();
});
```
