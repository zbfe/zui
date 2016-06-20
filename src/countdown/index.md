# countdown/index

> xiaowu

倒计时

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
            duration: 40,
            end: new Date('2016/10/26 10:28:00').getTime()
        };
        var app = new Countdown(options);
        app.on('check', function () {
            var num = this.getDiffTime();
            div.content(this.getTime());
        });

        div.on('close', function () {
            app.destroy();
        });

        app.on('end', function () {
            div.close();
            this.destroy();
        });
    });
});
```