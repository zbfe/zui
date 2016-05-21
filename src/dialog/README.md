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
 * @param {string} options.content 内容
 * @param {string} options.className 自定义样式
 * @param {Function} options.onCancel 点击遮罩层取消时回调函数
 */
```

### example

#### 简单

```runjs
require(['dialog/base'], function (Base) {
    new Base({
        content: '测试内容'
    }).show();
});
```

## dialog/base

在`popup/base`上扩展的一个弹出选择菜单

### use

```js
require([
    'dialog/base'
], function (Dialog) {
    var options = {};
    new Dialog(options);
});
```

### api - options

```js
/**
 * @param {Object} options 配置对象
 * @param {Array} options.data 数据列表，[{value, text}]
 */
```

### example

需要注意的是`onCancel`是在点击菜单中的“取消”也会执行

```runjs
require([
    'dialog/base'
], function (Dialog) {
    var options = {
        content: '我是真的内容~',
        battons:[{
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
    dialog.show();
});
```
