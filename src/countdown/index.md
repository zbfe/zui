# countdown/index

> xiaowu

倒计时

### 版本一

使用`setTimeout`+`options.end`来计时，但发现在真实环境里，隐藏标签或者退出浏览器后（返回主屏幕）`setTimeout`停止运行了，这样就导致时间计算出错，并且使用客户端的`Date.now()`作为开始时间不太准，用户调整本地电脑时间就有问题，于是...

### 版本二

使用`setTimeout`+`options.end`+`options.start`来计时，并且每隔一段时间（10秒）定时从服务器同步时间，以来解决停止运行问题

### use

```js
require([
    'countdown/index'
], function (Countdown) {
    var options = {};
    var app = new Countdown(options);
});
```

### events

* check - 检查
* end - 时间到期
* destroy - 销毁后

### example

```runjs
require([
    'countdown/index',
    'zepto',
    'dialog2/dialog'
], function (Countdown, $, Dialog) {
    

    var div = new Dialog({
        content: '加载中',
        ok: true
    });

    div.on('show', function () {
        var options = {
            start: new Date('2016/6/22 08:00:00').getTime(),
            end: new Date('2016/6/23 08:00:00').getTime()
        };
        var app = new Countdown(options);
        app.on('check', function () {
            var num = this.getDiffTime();
            div.content(this.getTime());
            console.log('check');
        });

        div.on('close', function () {
            app.destroy();
        });

        app.on('end', function () {
            div.close();
            console.log('end');
        }).on('destroy', function () {
            console.log('destroy');
        });
    });
});
```