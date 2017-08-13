# dialog2/confirm

> fe.xiaowu

在 [dialog2/dialog](src/dialog2/dialog.md) 上扩展的一个`confirm`的快捷方式

### use

```js
require([
    'dialog2/confirm'
], function (Confirm) {
    new Confirm(title, content, ok, cancel);
});
```

### events

同 [dialog2/dialog#events](src/dialog2/dialog.md#events) 一致

### api - options

```js
/**
 * @param  {string} title 标题
 * @param {string} content 内容
 * @param {Function} callback 确定回调
 * @param {Function} cancel 取消回调
 */
```

### example

`confirm`本身肯定会有确定和取消按钮

#### 只有标题

```runjs
require(['dialog2/confirm'], function (confirm) {
    new confirm('标题');
});
```

#### 有标题和确定按钮回调

```runjs
require(['dialog2/confirm'], function (confirm) {
    new confirm('str', function () {
        console.log('ok callback');
    });
});
```

#### 有标题、内容和确定、取消按钮回调

```runjs
require(['dialog2/confirm'], function (confirm) {
    new confirm('str', 'content', function () {
        console.log('ok callback');
    }, function () {
        console.log('cancel callback');
    });
});
```