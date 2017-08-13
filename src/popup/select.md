# popup/select

> fe.xiaowu

在 [popup/base](src/popup/base.md) 上扩展的一个弹出选择菜单

### use

```js
require([
    'popup/select'
], function (Select) {
    var options = {};
    new Select(options);
});
```

### events

* select - 选择菜单后触发
* cancel - 点击遮罩层取消事件
* close - 弹出层关闭（销毁dom）后事件
* destroy - 提示层销毁后事件

### api - options

```js
/**
 * @param {Array} data 数据列表
 * @param {string} data[].text 菜单显示之本
 * @param {string} data[].value 菜单的值
 */
```

### example

需要注意的是点击菜单中的"取消"也会触发`cancel`事件

```runjs
require([
    'popup/select'
], function (Select) {
    var options = {
        data: [
            {
                text: '菜单1',
                value: '1'
            },
            {
                text: '菜单2',
                value: '2'
            },
            {
                text: '菜单3',
                value: '3'
            },
            {
                text: '菜单4',
                value: '4'
            }
        ]
    };
    new Select(options).on('select', function (data) {
        alert('你选择了:' + data.value + ', 索引是:' + data.index);
    }).on('cancel', function () {
        alert('你取消了选择');
    });
});
```