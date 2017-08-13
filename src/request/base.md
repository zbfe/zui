# request/base

> xiaowu

异步加载基类，主要处理容错，提供事件式驱动

### use

```js
require([
    'request/base'
], function (Request) {
    var options = {};
    var app = new Request(options);
});
```

### events

* complete - 请求完成
* success - 请求成功
* error - 请求出错
* abort - 请求取消