# tips

> fe.xiaowu

简单提示层

## tips/index

### use

```js
require([
    'tips/index'
], function (Tips) {
    var options = {};
    new Tips(options);

    var str = 'content';
    new Tips(str);
});
```

### events

* show - 提示层显示后事件
* close - 提示层关闭（销毁dom）后事件
* destroy - 提示层销毁后事件

### api - options

```js
/**
 * @param {Object|string} options 配置参数或者提示内容
 * @param {boolean} options.lock 是否锁定屏幕
 * @param {number|null} [options.time=2000] 自动关闭时间，如果为null则不自动关闭
 * @param {string} options.className 自定义样式名
 */
```

### example

#### 简单

```runjs
require(['tips/index'], function (Tips) {
    new Tips('你好, zbfe - zui');
});
```

#### 有遮罩层

遮罩层是使用`:after`生成的一个透明`rgba(255, 255, 255, .1)`的容器，主要用来防止用户再次点击屏幕触发

```runjs
require(['tips/index'], function (Tips) {
    new Tips({
        lock: true,
        content: '你再按钮试试看能点不'
    });
});
```

#### 自动关闭的时长

`options.autoClose`默认为`true`，设置`options.time`来设置定时器时间，单位为秒

```runjs
require(['tips/index'], function (Tips) {
    new Tips({
        time: 3000,
        content: '我将在3秒后关闭'
    });
});
```

#### 显示、关闭回调

```runjs
require(['tips/index'], function (Tips) {
    var app = new Tips({
        content: 'loading'
    });

    app.on('show', function () {
        console.log('show')
    }).on('close', function () {
        console.log('close')
    }).on('destroy', function () {
        console.log('destroy')
    });
});
```

## tips/loading

`loading`是基于`tips/index`扩展的一个加载遮罩层，只提供`show`显示和`hide`隐藏方法，一个页面只能有一个并且不能自动关闭，常用于异步加载数据时“锁屏”提示处理

### use

```js
require([
    'tips/loading'
], function (loading) {
    // 显示
    loading();
    loading.show();
    loading(str);

    // 隐藏
    loading.hide();
});
```

### example

#### 默认加载

```runjs
require(['tips/loading'], function (loading) {
    loading.show();

    // 由于不自动关，这里手动关下
    setTimeout(function () {
        loading.hide();
    }, 2000);
});
```

#### 自定加载文案

```runjs
require(['tips/loading'], function (loading) {
    loading.show('真的在加载，你信不');

    // 由于不自动关，这里手动关下
    setTimeout(function () {
        loading.hide();
    }, 2000);
});
```