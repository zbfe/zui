# Dialog

> schoeu1110

弹窗基类

## Dialog/dialog

基类，主要完成对话框的动画、关闭事件和遮罩

### use

```js
require([
    'Dialog/dialog'
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
 * @param {number} options.aniTime 动画时间
 * @param {string} options.content Dialog正文内容
 * @param {string} options.title 弹窗标题
 * @param {Array} options.buttons 按钮信息数据
 */
```

### example

```runjs
require([
    'dialog/dialog'
], function (Dialog) {
    var options = {
        content: '我是真的内容~',
        horizontal: false,
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
        },{
            text:'OTHER',
            callback: function (i) {
              console.log(i);
            }
        }]
    };

    var dialog = new Dialog(options);

    dialog.on('show', function(){
        alert('base显示~');
    }).on('hide', function () {
        alert('base隐藏~');
    });

    dialog.show();
});
```

## Dialog/alert

在`Dialog/dialog`上扩展的一个提示框

### use

```js
require([
    'dialog/alert'
], function (Alert) {
    var a = new Alert({
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

```runjs
require([
    'dialog/alert'
], function (Alert) {
    var options = {
        content: '我是alert内容~'
    };
    var a = new Alert(options);
    a.on('show', function(){
        alert('alert显示~');
    }).on('hide', function () {
        alert('alert隐藏~');
    });

    a.show();
});
```

## Dialog/confirm

在`Dialog/dialog`上扩展的一个提示框

### use

```js
require([
    'dialog/confirm'
], function (Confirm) {
    var a = new Confirm({
        content: '这是Confirm!'
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
    'dialog/confirm'
], function (Confirm) {
    var options = {
        content: '我是confirm内容~'
    };
    var a = new Confirm(options);
    a.on('show', function(){
        alert('confirm显示~');
    }).on('hide', function () {
        alert('confirm隐藏~');
    });

    a.show();
});
```
