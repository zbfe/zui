# dialog2/alert

> fe.xiaowu

在 [dialog2/dialog](src/dialog2/dialog.md) 上扩展的一个`alert`的快捷方式

### use

```js
require([
    'dialog2/alert'
], function (Alert) {
    new Alert(title, content, callback);
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
 */
```

### example

`alert`本身肯定会有确定按钮

#### 只有标题

```runjs
require(['dialog2/alert'], function (Alert) {
    new Alert('标题');
});
```

#### 有标题和确定按钮回调

```runjs
require(['dialog2/alert'], function (Alert) {
    new Alert('str', function () {
        console.log('callback');
    });
});
```

#### 有标题、内容和确定按钮回调

```runjs
require(['dialog2/alert'], function (Alert) {
    new Alert('str', 'content', function () {
        console.log('callback');
    });
});
```