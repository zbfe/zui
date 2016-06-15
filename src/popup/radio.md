# popup/radio

> fe.xiaowu

在 [popup/base](src/popup/base.md) 上扩展的一个弹出单选菜单

### use

```js
require([
    'popup/radio'
], function (Radio) {
    var options = {};
    new Radio(options);
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
 * @param {string} [options.title=请选择] 标题
 * @param {Array} data 数据列表
 * @param {string} data[].text 菜单显示之本
 * @param {string} data[].value 菜单的值
 * @param {boolean} [data[].selected=false] 是否选中菜单
 */
```

### example

```runjs
require([
    'popup/radio'
], function (Radio) {
    var options = {
        data: [
            {
                text: '菜单1菜单1菜单1菜单1菜单1菜单1菜单1菜单1菜单1菜单1菜单1菜单1',
                value: '1',
                selected: true
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
    new Radio(options).on('select', function (data) {
        console.log(data);
    }).on('cancel', function () {
        console.log('cancel');
    });
});
```

#### 自定义标题

```runjs
require([
    'popup/radio'
], function (Radio) {
    var options = {
        title: '自定义',
        data: [
            {
                text: '菜单1菜单1菜单1菜单1菜单1菜单1菜单1菜单1菜单1菜单1菜单1菜单1',
                value: '1',
                selected: true
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
    new Radio(options).on('select', function (data) {
        console.log(data);
    }).on('cancel', function () {
        console.log('cancel');
    });
});
```