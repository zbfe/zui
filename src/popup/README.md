# popup

> fe.xiaowu

由下而上的弹出层

## popup/base

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

## popup/select

在`popup/base`上扩展的一个弹出选择菜单

### use

```js
require([
    'popup/select'
], function (Select) {
    var options = {};
    new Select(options);
});
```

### api - options

```js
/**
 * @param {Object} options 配置对象
 * @param {Array} options.data 数据列表，[{value, text}]
 * @param {Function} options.onSelect 选择回调，this为当前实例，参数为{value, index}
 * @param {Function} options.onCancel 取消回调
 */
```

### example

需要注意的是`onCancel`是在点击菜单中的“取消”也会执行

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

## popup/radio

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
                value: '3',
                selected: true
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
## popup/multiple

```runjs
require([
    'popup/multiple'
], function (Multiple) {
    var options = {
        data: [
            {
                text: '菜单1菜单1菜单1菜单1菜单1菜单1菜单1菜单1菜单1菜单1菜单1菜单1',
                value: '1',
                selected: true
            },
            {
                text: '菜单2',
                value: '2',
                selected: true
            },
            {
                text: '菜单3',
                value: '3',
                selected: true
            },
            {
                text: '菜单4',
                value: '4'
            }
        ]
    };
    new Multiple(options).on('select', function (data) {
        console.log(data);
    }).on('cancel', function () {
        console.log('cancel');
    });
});
```